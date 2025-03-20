import { CreateUserDto, IUserModel, UpdateUserDto } from "@modules/user/types";
import userModel from "@modules/user/user.model";

class UsersRepository {
  async getAllUsers(): Promise<IUserModel[]> {
    return await userModel.find().lean();
  }

  async getUserById(_id: string): Promise<IUserModel | null> {
    return await userModel.findById(_id).lean();
  }

  async getUserByEmail(email: string): Promise<IUserModel | null> {
    return await userModel.findOne({ email });
  }

  async createUser(userData: CreateUserDto): Promise<IUserModel> {
    return await userModel.create(userData);
  }

  async updateUser(_id: string, userData: UpdateUserDto): Promise<IUserModel | null> {
    return await userModel.findOneAndUpdate({ _id }, userData).lean();
  }

  async deleteUserById(_id: string): Promise<IUserModel | null> {
    return await userModel.findOneAndDelete({ _id }).lean();
  }
}

export default new UsersRepository();
