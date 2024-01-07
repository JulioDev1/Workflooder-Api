import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenUser } from "../core/Tokens/RefreshToken";

type token = {
  refreshToken: string;
};
export class RefreshTokenController {
  constructor(readonly useCase: RefreshTokenUser) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as token;

      const { refreshToken } = body;

      const token = await this.useCase.execute(refreshToken);

      reply.send(token);
    } catch (error) {
      reply.send(error);
    }
  }
}
