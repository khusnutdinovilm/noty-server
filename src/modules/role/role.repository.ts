import roleModel from "@modules/role/role.model";
import { IRoleModel } from "@modules/role/types";

class RoleRepository {
  async getAllRoles(): Promise<IRoleModel[]> {
    return await roleModel.find().lean();
  }

  async getRoleById(id: string): Promise<IRoleModel | null> {
    return await roleModel.findById(id).lean();
  }

  async createRole(role: IRoleModel): Promise<IRoleModel> {
    return await roleModel.create(role);
  }

  async updateRole(_id: string, role: IRoleModel): Promise<IRoleModel | null> {
    return await roleModel.findOneAndUpdate({ _id }, role);
  }

  async deleteRoleById(_id: string): Promise<IRoleModel | null> {
    return await roleModel.findOneAndDelete({ _id });
  }
}

export default new RoleRepository();
