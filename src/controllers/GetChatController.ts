import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "src/Middleware/ensureAuthenticated";
import { GetChatMessages } from "../core/User/service/GetChatMessage";

export class getChatControlller {
  constructor(readonly useCase: GetChatMessages) {}

  async handle(request: CustomFastifyRequestUser, reply: FastifyReply) {
    try {
      const user = await this.useCase.execute(request.user!.id);
      reply.send(user);
    } catch (err) {
      reply.send(err);
    }
  }
}
