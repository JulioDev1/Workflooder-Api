import { FastifyReply } from "fastify";
import { CustomFastifyRequest } from "../Middleware/ensureAuthenticated";
import { Curriculum } from "../core/User/model/User";
import { CurriculumBuilder } from "../core/User/service/CurriculumBuilder";

export default class CreateCurriculumController {
  constructor(private readonly usecase: CurriculumBuilder) {}
  async handle(request: CustomFastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as Curriculum;

      const {
        title,
        technology: [{ name }],
        description,
      } = body;
      const curriculum = await this.usecase.execute({
        title,
        technology: [{ name }],
        description,
        userId: request.user!.id,
      });

      reply.send(curriculum);
    } catch (error: any) {
      reply.code(500).send({ error: true, message: error.message });
    }
  }
}
