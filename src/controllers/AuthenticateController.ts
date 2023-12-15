import { FastifyReply, FastifyRequest } from "fastify";
import { Authenticate } from "../core/User/service/Authenticate";
import { Auth } from "../core/User/model/User";

export default class AuthenticateController {
  constructor(private readonly usecase: Authenticate) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as Auth;

      const { email, password } = body;

      const user = await this.usecase.execute({ email, password });

      reply.send(user);
    } catch (error: any) {
      reply.code(500).send({ error: true, message: error.message });
    }
  }
}
