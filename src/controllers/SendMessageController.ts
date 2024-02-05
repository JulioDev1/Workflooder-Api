import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "../Middleware/ensureAuthenticated";
import { SendMessage } from "../core/User/service/SendMessage";

type Data = {
  content: string;
};
export default class SendMessageController {
  constructor(private useCase: SendMessage) {}
  async handle(request: CustomFastifyRequestUser, reply: FastifyReply) {
    try {
      const body = request.body as Data;
      const { id } = request.params;
      const { content } = body;

      const message = await this.useCase.execute({
        receiverId: id,
        content,
        senderId: request.user!.id,
      });

      reply.send(message);
    } catch (error) {
      console.log(error);
    }
  }
}
