import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Message } from "../model/User";

type members = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  act_area: string;
  createAt: Date;
  status: boolean;
  updateAt: Date;
};
type chatMessage = {
  members: members[];
  message: Message[];
};

export class GetAllChat implements UseCase<string, any> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(senderId: string): Promise<any> {
    const newChat = await this.repository.getAllChat(senderId);

    if (!newChat) {
      return { message: "not have messages" };
    }

    const member = newChat.map((chat: chatMessage) => {
      const lastMessage = chat.message[0];

      return {
        lastMessage: lastMessage.content,

        name: chat.members.map((member: members) => {
          return member.name;
        }),

        receiverId: lastMessage.receiverId,

        senderId: lastMessage.senderId,
      };
    });

    console.log("aqui", member);

    return member;
  }
}
