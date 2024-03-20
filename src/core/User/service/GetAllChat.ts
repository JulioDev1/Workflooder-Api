import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";

export class GetAllChat implements UseCase<string, any> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(senderId: string): Promise<any> {
    const newChat = await this.repository.getAllChat(senderId);

    if (!newChat) {
      return { message: "not have messages" };
    }
    const member = newChat.map((chat) => {
      const lastMessage = chat.message[0];
      return {
        lastMessage: lastMessage.content,
        name: chat.members.map((member) => {
          return member.name;
        }),
      };
    });
    console.log("aqui", member);
    return member;
  }
}
