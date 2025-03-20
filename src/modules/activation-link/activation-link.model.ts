import { model, Schema } from "mongoose";

import { IActivationLinkModel } from "@modules/activation-link/types";

const ActivationLinkSchema = new Schema<IActivationLinkModel>({
  userId: { type: String, required: true, ref: "User" },
  link: { type: String, unique: true, required: true },
});

const activationLinkModel = model("ActivationLink", ActivationLinkSchema);

export default activationLinkModel;
