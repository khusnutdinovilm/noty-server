import { IUserDto } from "@modules/user/types";

export interface ITokenModel {
  _id: string;
  userId: string;
  refreshToken: string;
}

export interface ITokenDto extends Omit<ITokenModel, "_id"> {
  id: string;
}

type TokenPayloadFields = "id" | "email" | "role";
export type TokenPayload = Pick<IUserDto, TokenPayloadFields>;

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type CreateTokenDto = Omit<ITokenModel, "_id">;

export type UpdateTokenDto = Partial<CreateTokenDto>;
