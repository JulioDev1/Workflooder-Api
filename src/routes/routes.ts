import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import {
  CustomFastifyRequest,
  CustomFastifyRequestUser,
  EnsureAuthenticated,
} from "../Middleware/ensureAuthenticated";
import AuthenticateController from "../controllers/AuthenticateController";
import CreateCurriculumController from "../controllers/CreateCurriculumController";
import { GetAllCurriculumController } from "../controllers/GetAllCurriculumController";
import { GetCurriculumUserLoggedController } from "../controllers/GetCurriculumUserLoggedController";
import { GetUserByIdController } from "../controllers/GetUserByIDController";
import getUserProfileController from "../controllers/GetUserProfileController";
import { RefreshTokenController } from "../controllers/RefreshTokenController";
import RegisterController from "../controllers/RegisterController";
import UpdateCurriculumController from "../controllers/UpdateCurriculumController";
import { RefreshTokenUser } from "../core/Tokens/RefreshToken";
import { Authenticate } from "../core/User/service/Authenticate";
import { CurriculumBuilder } from "../core/User/service/CurriculumBuilder";
import { GetAllCurriculum } from "../core/User/service/GetAllCurriculum";
import { GetUserCurriculum } from "../core/User/service/GetUserCurriculum";
import { GetUserCurriculumLogged } from "../core/User/service/GetUserCurriculumlogged";
import { GetUserProfile } from "../core/User/service/GetUserProfile";
import { Register } from "../core/User/service/Register";
import { UpdateCurriculum } from "../core/User/service/UpdateCurrriculum";
import RepositoryPrismaPg from "../external/prisma/RepositoryPrismaPg";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const repository = new RepositoryPrismaPg();
  const register = new Register(repository);
  const authenticate = new Authenticate(repository);
  const refreshToken = new RefreshTokenUser(repository);
  const createCurriculum = new CurriculumBuilder(repository);
  const getCurriculum = new GetAllCurriculum(repository);
  const getUserById = new GetUserCurriculum(repository);
  const getUserLogged = new GetUserCurriculumLogged(repository);
  const updateCurriculum = new UpdateCurriculum(repository);
  const getUserProfile = new GetUserProfile(repository);

  fastify.post(
    "/register-user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new RegisterController(register).handle(request, reply);
    }
  );

  fastify.post(
    "/authenticate-user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AuthenticateController(authenticate).handle(request, reply);
    }
  );

  fastify.get(
    "/view-invoices",
    { preHandler: EnsureAuthenticated },
    async (request: CustomFastifyRequest, reply: FastifyReply) => {
      return reply.send("bem vindo usuario " + request.user?.id);
    }
  );
  fastify.post(
    "/refresh-token",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new RefreshTokenController(refreshToken).handle(request, reply);
    }
  );

  fastify.post(
    "/create-curriculum",
    { preHandler: EnsureAuthenticated },
    async (request: CustomFastifyRequest, reply: FastifyReply) => {
      return new CreateCurriculumController(createCurriculum).handle(
        request,
        reply
      );
    }
  );

  fastify.get(
    "/get-curriculum",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetAllCurriculumController(getCurriculum).handle(
        request,
        reply
      );
    }
  );

  fastify.get(
    "/get-curriculum/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      return new GetUserByIdController(getUserById).handle(request, reply);
    }
  );

  fastify.get(
    "/get-curriculum-user-online",
    { preHandler: EnsureAuthenticated },
    async (request: CustomFastifyRequest, reply: FastifyReply) => {
      return new GetCurriculumUserLoggedController(getUserLogged).handle(
        request,
        reply
      );
    }
  );

  fastify.put<{ Params: { id: string } }>(
    "/update-curriculum/:id",
    { preHandler: EnsureAuthenticated },
    async (request: CustomFastifyRequestUser, reply: FastifyReply) => {
      return new UpdateCurriculumController(updateCurriculum).handle(
        request,
        reply
      );
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/get-user-profile/:id",
    { preHandler: EnsureAuthenticated },
    async (request: CustomFastifyRequestUser, reply: FastifyReply) => {
      return new getUserProfileController(getUserProfile).handle(
        request,
        reply
      );
    }
  );
}
