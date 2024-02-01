import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "../Middleware/ensureAuthenticated";
import { UpdateCurriculum } from "../core/User/service/UpdateCurrriculum";

type Data = {
  title: string;
  description: string;
  name: string;
  salary: number;
  linkedin: string;
};

export default class UpdateCurriculumController {
  constructor(private readonly useCase: UpdateCurriculum) {}
  async handle(request: CustomFastifyRequestUser, reply: FastifyReply) {
    try {
      const body = request.body as Data;
      const { id } = request.params;

      const { title, description, name, salary, linkedin } = body;

      const curriculum = await this.useCase.execute({
        title,
        description,
        userId: request.user!.id,
        id,
        name,
        salary,
        linkedin,
      });
      reply.send(curriculum);
    } catch (error) {
      reply.send(error);
    }
  }
}
