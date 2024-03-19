import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "src/Middleware/ensureAuthenticated";
import { GetChatMessages } from "../core/User/service/GetChatMessage";

export class GetChatControlller {
  constructor(readonly useCase: GetChatMessages) {}

  async handle(request: CustomFastifyRequestUser, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const chat = await this.useCase.execute(id);
      console.log(chat);
      reply.send(chat);
    } catch (err) {
      reply.send(err);
    }
  }
}
