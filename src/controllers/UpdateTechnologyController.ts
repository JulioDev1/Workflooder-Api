import { FastifyReply } from "fastify";
import { CustomFastifyRequestUser } from "../Middleware/ensureAuthenticated";
import { UpdateTechnology } from "../core/User/service/UpdateTechnology";

type Data = {
  name: string;
};

export default class UpdateTechnologyController {
  constructor(private readonly useCase: UpdateTechnology) {}

  async handle(
    request: CustomFastifyRequestUser,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const body = request.body as Data;
      const { id } = request.params;

      const { name } = body;

      const technology = await this.useCase.execute({
        name,
        id,
      });

      reply.send(technology);
    } catch (error) {
      reply.send(error);
    }
  }
}
