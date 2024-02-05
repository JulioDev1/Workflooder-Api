import cors from "@fastify/cors";
import fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes/routes";

const server: FastifyInstance = fastify();

const start = async () => {
  await server.register(cors);
  await server.register(routes);

  try {
    await server.listen({ port: 8080 });
    console.log("rodando UwU");
  } catch (error) {
    process.exit(1);
  }
};

start();
