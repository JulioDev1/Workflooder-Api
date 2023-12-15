import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export function EnsureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) {
  const authToken = request.headers.authorization;

  if (!authToken) return reply.code(401).send({ message: "lost connection" });

  const [, token] = authToken.split(" ");

  try {
    verify(token, "5b1305ce-2409-4370-bbe4-5b201de352d3");
    return done();
  } catch (error) {
    reply.code(401).send("invalid token");
  }
}
