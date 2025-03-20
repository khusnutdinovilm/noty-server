import roleRepository from "@modules/role/role.repository";
import { IRoleModel } from "@modules/role/types";

class RoleService {
  async getAllRoles(): Promise<IRoleModel[]> {
    const roles = await roleRepository.getAllRoles();

    if (roles.length === 0) {
      throw new Error("Список ролей пуст :(");
    }

    return roles;
  }
}

export default new RoleService();
