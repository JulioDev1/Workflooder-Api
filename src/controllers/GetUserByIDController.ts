import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserCurriculum } from "../core/User/service/GetUserCurriculum";

export class GetUserByIdController {
  constructor(readonly useCase: GetUserCurriculum) {}
  async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const user = await this.useCase.execute(id);

      reply.send(user);
    } catch (error: any) {
      reply.code(500).send({ error: true, message: error.message });
    }
  }
}
