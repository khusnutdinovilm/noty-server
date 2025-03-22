import { CreateUserDto, IUserModel, UpdateUserDto } from "@modules/user/types";
import usersRepository from "@modules/user/user.repository";

// TODO: сделать выбрасывание ошибок бд

class UserService {
  async getAllUsers(): Promise<IUserModel[]> {
    const users = await usersRepository.getAllUsers();

    if (users.length === 0) {
      throw new Error("Список пользователей пуст:(");
    }

    return users;
  }

  async getUserById(userId: IUserModel["_id"]): Promise<IUserModel | null> {
    return await usersRepository.getUserById(userId);
  }

  async getUserByEmail(email: IUserModel["email"]): Promise<IUserModel | null> {
    return await usersRepository.getUserByEmail(email);
  }

  async createUser(userData: CreateUserDto): Promise<IUserModel> {
    const newUser = await usersRepository.createUser(userData);

    if (!newUser) {
      throw new Error("Не удалось создать пользователя");
    }

    return newUser;
  }

  async updateUser(userId: IUserModel["_id"], userData: UpdateUserDto): Promise<IUserModel> {
    const updatedUser = await usersRepository.updateUser(userId, userData);

    if (!updatedUser) {
      throw new Error("Не удалось обновить пользователя");
    }

    return updatedUser;
  }

  async deleteUserById(userId: IUserModel["_id"]): Promise<IUserModel> {
    const deletedUser = await usersRepository.deleteUserById(userId);

    if (!deletedUser) {
      throw new Error("Не удалось удалить пользователя");
    }

    return deletedUser;
  }
}

export default new UserService();
