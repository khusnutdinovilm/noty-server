import bcrypt from "bcrypt";
import { v4 } from "uuid";

import activationLinkService from "@modules/activation-link/activation-link.service";
import { ILoginPayload, IRegisterPayload } from "@modules/auth/types";
import tokenService from "@modules/token/token.service";
import { CreateUserDto, IUserDto } from "@modules/user/types";
import UserDto from "@modules/user/user.dto";
import userService from "@modules/user/user.service";
import mailService from "@services/mail-service";
import ApiError from "@utils/api-error";

class AuthService {
  async register(registerPayload: IRegisterPayload) {
    const candidate = await userService.getUserByEmail(registerPayload.email);
    if (candidate) {
      throw ApiError.BadRequest("Данный email уже зарегистрирован");
    }

    const hashPwd = await bcrypt.hash(registerPayload.password, 3);

    const createUserPayload: CreateUserDto = {
      ...registerPayload,
      password: hashPwd,
      isActivated: false,
      role: "user",
    };

    const newUser = await userService.createUser(createUserPayload);

    const link = v4();
    await activationLinkService.createActivationLink(newUser._id, link);
    const activationUrl = `${process.env.APP_URL}/api/activate/${link}`;

    await mailService.sendActivationLink(newUser.email, activationUrl);
  }

  async activate(link: string) {
    const activationLink = await activationLinkService.getActivationLink(link);
    if (!activationLink) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    await userService.updateUser(activationLink.userId, { isActivated: true });
    await activationLinkService.deleteActivationLinkByLink(link);
  }

  async login(loginPayload: ILoginPayload) {
    const user = await userService.getUserByEmail(loginPayload.email);
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPassEqual = await bcrypt.compare(loginPayload.password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const tokenPayload = new UserDto(user).toTokenPayload();
    const userDto = new UserDto(user).toDto();

    const { accessToken, refreshToken } = tokenService.generateTokens(tokenPayload);

    await tokenService.saveRefreshToken(userDto.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: userDto,
    };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const isTokenValid = tokenService.validateRefreshToken(refreshToken);
    const refreshTokenFromDb = await tokenService.findTokenByRefresh(refreshToken);
    if (!isTokenValid || !refreshTokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const userModel = await userService.getUserById(isTokenValid.id);
    if (!userModel) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const userDto = new UserDto(userModel).toDto();
    const userTokenPayloadDto = new UserDto(userModel).toTokenPayload();
    const tokenPayload = tokenService.generateTokens(userTokenPayloadDto);
    await tokenService.saveRefreshToken(userDto.id, tokenPayload.refreshToken);

    return {
      ...tokenPayload,
      user: userDto,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const deletedToken = await tokenService.deleteTokenByRefresh(refreshToken);
    if (!deletedToken) {
      throw new Error("Не удалось выполнить выход из системы");
    }
  }

  async getAuthUser(refreshToken: string): Promise<IUserDto> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const tokenPayload = tokenService.validateRefreshToken(refreshToken);
    if (!tokenPayload) {
      throw ApiError.UnauthorizedError();
    }

    const { id: userId } = tokenPayload;
    const user = await userService.getUserById(userId);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    return new UserDto(user).toDto();
  }
}

export default new AuthService();
