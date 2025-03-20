import { model, Schema } from "mongoose";

import { IUserModel } from "@modules/user/types";

const UserSchema = new Schema<IUserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: { type: String, required: true, default: "user", ref: "Role" },
  },
  { timestamps: true } // Добавит createdAt и updatedAt
);

const userModel = model("User", UserSchema);

export default userModel;
