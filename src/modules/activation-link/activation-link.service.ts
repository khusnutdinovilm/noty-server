import activationLinkRepository from "@modules/activation-link/activation-link.repository";
import { IActivationLinkDto } from "@modules/activation-link/types";

class ActivationLinkService {
  async getActivationLink(link: string): Promise<IActivationLinkDto | null> {
    const activationLink = await activationLinkRepository.getActivationLinkByLink(link);

    if (!activationLink) {
      throw new Error("Ссылка для активации не найдена :(");
    }

    return {
      id: activationLink._id,
      userId: activationLink.userId,
      link: activationLink.link,
    };
  }

  async createActivationLink(userId: string, link: string): Promise<IActivationLinkDto | null> {
    const newActivationLink = await activationLinkRepository.createActivationLink(userId, link);

    if (!newActivationLink) {
      throw new Error("Не удалось создать ссылку для активации аккаунта");
    }

    return {
      id: newActivationLink._id,
      userId: newActivationLink.userId,
      link: newActivationLink.link,
    };
  }

  async deleteActivationLinkByLink(link: string): Promise<IActivationLinkDto | null> {
    const deletedActivationLink = await activationLinkRepository.deleteActivationLinkByLink(link);

    if (!deletedActivationLink) {
      throw new Error("Не удалось удалить ссылку для активации аккаунта");
    }

    return {
      id: deletedActivationLink._id,
      userId: deletedActivationLink.userId,
      link: deletedActivationLink.link,
    };
  }
}

export default new ActivationLinkService();
