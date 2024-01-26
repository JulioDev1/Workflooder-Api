import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllCurriculum } from "../core/User/service/GetAllCurriculum";

export class GetAllCurriculumController {
  constructor(readonly useCase: GetAllCurriculum) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const curriculum = await this.useCase.execute();

      reply.send(curriculum);
    } catch (error) {
      reply.send(error);
    }
  }
}
