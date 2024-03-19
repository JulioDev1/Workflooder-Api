import RepositoryPrismaPg from "src/external/prisma/RepositoryPrismaPg";
import { UseCase } from "../../shared/useCase";

export class GetChatMessages implements UseCase<string, any | null> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(id: string): Promise<any | null> {
    const chat = await this.repository.getChatMessage(id);

    if (!chat) {
      throw new Error(`Could not find chat message`);
    }
    return chat;
  }
}
