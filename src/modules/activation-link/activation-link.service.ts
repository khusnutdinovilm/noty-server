import activationLinkRepository from "@modules/activation-link/activation-link.repository";
import { IActivationLinkModel } from "@modules/activation-link/types";

class ActivationLinkService {
  async getActivationLink(link: string): Promise<IActivationLinkModel | null> {
    return await activationLinkRepository.getActivationLinkByLink(link);
  }

  async createActivationLink(userId: string, link: string): Promise<IActivationLinkModel> {
    return await activationLinkRepository.createActivationLink(userId, link);
  }

  async deleteActivationLinkByLink(link: string): Promise<IActivationLinkModel | null> {
    return await activationLinkRepository.deleteActivationLinkByLink(link);
  }
}

export default new ActivationLinkService();
