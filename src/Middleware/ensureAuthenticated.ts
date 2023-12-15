import { FastifyReply, FastifyRequest } from "fastify";

export function EnsureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) {}
