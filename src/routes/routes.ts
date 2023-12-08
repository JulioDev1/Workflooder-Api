import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import RegisterController from "../controllers/RegisterController";
import { Register } from "../core/User/service/Register";
import RepositoryPrismaPg from "../external/prisma/RepositoryPrismaPg";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const repository = new RepositoryPrismaPg();
  const register = new Register(repository);

  fastify.post(
    "/register-user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new RegisterController(register).handle(request, reply);
    }
  );
}
