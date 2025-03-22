import { IUserModel } from "@modules/user/types";

export interface IRegisterPayload extends Omit<IUserModel, "_id" | "role" | "isActivated"> {}

export interface ILoginPayload extends Pick<IUserModel, "email" | "password"> {}
