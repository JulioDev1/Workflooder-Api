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
    // sockets.on("newMessage", (message: Message) => {
    //   console.log(message);
    // });
    if (!userReceiver) throw new Error("receiver not found");

    const message = await this.repository.createMessage({
      receiverId,
      content,
      senderId,
    });

    if (message) {
      sockets.emit("message", message);
    } else {
      throw new Error("message not created");
    }

    return message;
  }
}
