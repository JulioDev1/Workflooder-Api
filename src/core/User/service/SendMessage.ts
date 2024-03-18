import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { sockets } from "../../../index";
import { Message } from "../model/User";
type Input = {
  senderId: string;
  receiverId: string;
  content: string;
};

export class SendMessage implements UseCase<Input, Message> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute({ receiverId, content, senderId }: Input): Promise<Message> {
    console.log(receiverId + ": " + receiverId + "Id + " + content);

    const userReceiver = await this.repository.getUserProfile(receiverId);

    if (!userReceiver) throw new Error("receiver not found");

    if (receiverId === senderId)
      throw new Error("receiver dont be sender user!");

    let chat = await this.repository.chatExist(senderId, receiverId);

    if (!chat) {
      chat = await this.repository.createChat(senderId, receiverId);
    }

    const message = await this.repository.createMessage({
      receiverId,
      content,
      senderId,
      chatId: chat.id,
    });

    if (message) {
      sockets.emit("message", message);
    } else {
      throw new Error("message not created");
    }

    return message;
  }
}
