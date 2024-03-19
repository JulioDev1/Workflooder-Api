import RepositoryPrismaPg from "src/external/prisma/RepositoryPrismaPg";
import { UseCase } from "../../shared/useCase";

export class GetChatMessages implements UseCase<string, any | null> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(id: string): Promise<any | null> {
    const newChat = await this.repository.getChatMessage(id);

    if (!newChat) {
      throw new Error(`Could not find chat message`);
    }

    const member = newChat.members.map(
      ({ password, email, status, role, ...rest }) => {
        return rest;
      }
    );
    const message = newChat.message.map((messages) => {
      return messages;
    });

    const chat = {
      member,
      message,
    };

    return chat;
  }
}
