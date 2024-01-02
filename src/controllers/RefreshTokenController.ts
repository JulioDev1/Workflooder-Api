import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenUser } from "../core/Tokens/RefreshToken";

type token = {
  refreshToken: string;
};
export class RefreshTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as token;

      const { refreshToken } = body;

      const refresh_tokens = new RefreshTokenUser();

      const token = await refresh_tokens.execute(refreshToken);

      reply.send(token);
    } catch (error) {
      reply.send(error);
    }
  }
}
