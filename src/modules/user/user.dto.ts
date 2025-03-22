import { IUserAuthDto, IUserDto, IUserModel } from "@modules/user/types";

export default class UserDto {
  private user: IUserModel;

  constructor(user: IUserModel) {
    this.user = user;
    return this;
  }

  public toDto(): IUserDto {
    const { _id: id, firstName, lastName, email, isActivated, role } = this.user;
    return {
      id,
      firstName,
      lastName,
      email,
      isActivated,
      role,
    };
  }

  public toAuthDto(): IUserAuthDto {
    const { _id: id, firstName, lastName, email, isActivated, role, password } = this.user;
    return {
      id,
      firstName,
      lastName,
      email,
      isActivated,
      role,
      password,
    };
  }

  public toTokenPayload() {
    const { _id: id, email, role, isActivated } = this.user;
    return { id, email, role, isActivated };
  }
}
