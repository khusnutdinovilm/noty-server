import { model, Schema } from "mongoose";

import { ITokenModel } from "@modules/token/types";

const TokenSchema = new Schema<ITokenModel>(
  {
    userId: { type: String, required: true, ref: "User" },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true } // Добавит createdAt и updatedAt
);

const tokenModel = model("Token", TokenSchema);

export default tokenModel;
