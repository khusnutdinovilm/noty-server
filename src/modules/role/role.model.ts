import { model, Schema } from "mongoose";

import { IRoleModel } from "@modules/role/types";

const RoleSchema = new Schema<IRoleModel>(
  {
    role: { type: String, unique: true, default: "user" },
  },
  { timestamps: true } // Добавит createdAt и updatedAt
);

const roleModel = model("Role", RoleSchema);

export default roleModel;
