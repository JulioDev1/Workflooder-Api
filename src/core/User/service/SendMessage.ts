import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Message } from "../model/User";
type Input = {
  senderId: string;
  receiverId: string;
  content: string;
};

export class SendMessage implements UseCase<Input, Message> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute({ receiverId, content, senderId }: Input): Promise<Message> {
    const userReceiver = await this.repository.getUserProfile(receiverId);

    if (!userReceiver) throw new Error("receiver not found");

    const message = await this.repository.createMessage({
      receiverId,
      content,
      senderId,
    });

    return message;
  }
}
