import jwt from "jsonwebtoken";

import { ITokenModel, TokenData, TokenPayload } from "@modules/token/types";
import tokenRepository from "./token.repository";

class TokenService {
  generateTokens(tokenPayload: TokenPayload): TokenData {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

    const accessToken = jwt.sign(tokenPayload, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(tokenPayload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(accessToken: string): TokenPayload | null {
    try {
      const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
      const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET) as TokenPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): TokenPayload | null {
    try {
      const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
      const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<ITokenModel> {
    return await tokenRepository.createToken({ userId, refreshToken });
  }

  async findTokenByRefresh(refreshToken: string): Promise<ITokenModel | null> {
    return await tokenRepository.findTokenByRefresh(refreshToken);
  }

  async deleteTokenByRefresh(refreshToken: string): Promise<ITokenModel | null> {
    return await tokenRepository.deleteToken(refreshToken);
  }
}

export default new TokenService();
