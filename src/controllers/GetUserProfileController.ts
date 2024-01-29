import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "../Middleware/ensureAuthenticated";
import { GetUserProfile } from "../core/User/service/GetUserProfile";

export default class getUserProfileController {
  constructor(private readonly useCase: GetUserProfile) {}
  async handle(request: CustomFastifyRequestUser, reply: FastifyReply) {
    try {
      const user = await this.useCase.execute(request.user!.id);
      reply.send(user);
    } catch (err) {
      reply.send(err);
    }
  }
}
