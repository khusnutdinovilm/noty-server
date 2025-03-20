import tokenModel from "@modules/token/token.model";
import { CreateTokenDto, ITokenModel } from "@modules/token/types";

class TokenRepository {
  async findTokenByRefresh(refreshToken: string): Promise<ITokenModel | null> {
    return await tokenModel.findOne({ refreshToken }).lean();
  }

  async createToken(tokenData: CreateTokenDto): Promise<ITokenModel> {
    return await tokenModel.create(tokenData);
  }

  async updateToken(_id: string, refreshToken: string): Promise<ITokenModel | null> {
    return await tokenModel.findOneAndUpdate({ _id }, { refreshToken });
  }

  async deleteToken(refreshToken: string): Promise<ITokenModel | null> {
    return await tokenModel.findOneAndDelete({ refreshToken });
  }
}

export default new TokenRepository();
