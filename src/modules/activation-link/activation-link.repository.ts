import activationLinkModel from "@modules/activation-link/activation-link.model";
import { IActivationLinkModel } from "@modules/activation-link/types";

class ActivationLinkRepository {
  async getActivationLinkByLink(link: string): Promise<IActivationLinkModel | null> {
    return await activationLinkModel.findOne({ link }).lean();
  }

  async createActivationLink(userId: string, link: string): Promise<IActivationLinkModel> {
    return await activationLinkModel.create({ userId, link });
  }

  async deleteActivationLinkByLink(link: string): Promise<IActivationLinkModel | null> {
    return await activationLinkModel.findOneAndDelete({ link });
  }
}

export default new ActivationLinkRepository();
