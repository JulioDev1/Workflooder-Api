import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/routes";

const server: FastifyInstance = fastify();

const start = async () => {
  await server.register(cors);
  await server.register(routes);

  try {
    await server.listen({ port: 8080 });
    console.log("rodando uwu");
  } catch (error) {
    process.exit(1);
  }
};

start();
