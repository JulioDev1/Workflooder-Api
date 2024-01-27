import { FastifyReply } from "fastify";
import { GetUserCurriculumLogged } from "src/core/User/service/GetUserCurriculumlogged";
import { CustomFastifyRequest } from "../Middleware/ensureAuthenticated";

interface UserId {
  id: string;
}

export class GetCurriculumUserLoggedController {
  constructor(readonly useCase: GetUserCurriculumLogged) {}
  async handle(request: CustomFastifyRequest, reply: FastifyReply) {
    try {
      const curriculum = await this.useCase.execute(request.user!.id);

      reply.send(curriculum);
    } catch (error) {
      reply.send(error);
    }
  }
}
