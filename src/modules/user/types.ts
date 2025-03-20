import { RoleType } from "@modules/role/types";

export interface IUserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActivated: boolean;
  role: RoleType;
}

export interface IUserDto extends Omit<IUserModel, "_id" | "password"> {
  id: IUserModel["_id"];
}

export interface IUserAuthDto extends Omit<IUserModel, "_id"> {
  id: IUserModel["_id"];
}

export type CreateUserDto = Omit<IUserModel, "_id">;

export type UpdateUserDto = Partial<CreateUserDto>;
