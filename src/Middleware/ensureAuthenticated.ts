import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export interface CustomFastifyRequest extends FastifyRequest {
  user?: { id: string };
}

export interface CustomFastifyRequestUser
  extends FastifyRequest<{ Params: { id: string } }> {
  user?: { id: string };
}

export function EnsureAuthenticated(
  request: CustomFastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) {
  const authToken = request.headers.authorization;

  if (!authToken) return reply.code(401).send({ message: "lost connection" });

  const [, token] = authToken.split(" ");

  try {
    const payload = verify(token, "5b1305ce-2409-4370-bbe4-5b201de352d3");

    request.user = payload as any;

    return done();
  } catch (error) {
    reply.code(401).send("invalid token" + error);
    console.error("Error verifying token:", error);
  }
}
