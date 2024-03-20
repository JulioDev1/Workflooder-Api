import { FastifyReply } from "fastify";
import { CustomFastifyRequest } from "../Middleware/ensureAuthenticated";
import { GetAllChat } from "../core/User/service/GetAllChat";

export class GetAllChatController {
  constructor(readonly useCase: GetAllChat) {}
  async handle(request: CustomFastifyRequest, reply: FastifyReply) {
    try {
      const allChat = await this.useCase.execute(request.user!.id);

      reply.send(allChat);
    } catch (error) {
      reply.send(error);
    }
  }
}
