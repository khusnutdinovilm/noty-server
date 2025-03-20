import { CreateUserDto, IUserAuthDto, IUserDto, IUserModel, UpdateUserDto } from "@modules/user/types";
import UserDto from "@modules/user/user.dto";
import usersRepository from "@modules/user/user.repository";

class UserService {
  async getAllUsers(): Promise<IUserDto[]> {
    const users = await usersRepository.getAllUsers();

    if (users.length === 0) {
      throw new Error("Список пользователей пуст:(");
    }

    const usersDtos = users.map((user) => new UserDto(user).toDto());

    return usersDtos;
  }

  async getUserById(userId: IUserModel["_id"]): Promise<IUserDto> {
    const user = await usersRepository.getUserById(userId);

    if (!user) {
      throw new Error("Данного пользователя не существует");
    }

    return new UserDto(user).toDto();
  }

  async getUserByEmail(email: IUserModel["email"]): Promise<IUserAuthDto> {
    const user = await usersRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Данного пользователя не существует");
    }

    return new UserDto(user).toAuthDto();
  }

  async createUser(userData: CreateUserDto): Promise<IUserDto> {
    const newUser = await usersRepository.createUser(userData);

    if (!newUser) {
      throw new Error("Не удалось создать пользователя");
    }

    return new UserDto(newUser).toDto();
  }

  async updateUser(userId: IUserModel["_id"], userData: UpdateUserDto): Promise<void> {
    const updateResult = await usersRepository.updateUser(userId, userData);

    if (!updateResult) {
      throw new Error("Не удалось обновить пользователя");
    }
  }

  async deleteUserById(userId: IUserModel["_id"]): Promise<void> {
    const deleteResult = await usersRepository.deleteUserById(userId);

    if (!deleteResult) {
      throw new Error("Не удалось удалить пользователя");
    }
  }
}

export default new UserService();
