import { FastifyReply, FastifyRequest } from "fastify";
import { Input, Register } from "../core/User/service/Register";

export default class RegisterController {
  constructor(private readonly useCase: Register) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as Input;

      const {
        name,
        email,
        password,
        number: [{ ddd, number }],
        role,
        act_area,
      } = body;

      const user = await this.useCase.execute({
        name,
        email,
        password,
        number: [{ ddd, number }],
        role,
        act_area,
      });

      reply.send(user);
    } catch (error: any) {
      reply.code(500).send({ error: true, message: error.message });
    }
  }
}
