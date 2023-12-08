import { FastifyReply, FastifyRequest } from "fastify";
import { Input, Register } from "../core/User/service/Register";

export default class RegisterController {
  constructor(private readonly useCase: Register) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as Input;

      const { name, email, password } = body;

      const user = await this.useCase.execute({ name, email, password });

      reply.send(user);
    } catch (error: any) {
      reply.code(500).send({ error: true, message: error.message });
    }
  }
}
