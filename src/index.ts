import cors from "@fastify/cors";
import fastify, { FastifyInstance } from "fastify";
import { socketConfig } from "./adpater/socket";
import { routes } from "./routes/routes";
export const app: FastifyInstance = fastify();
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT"],
});

export const sockets = socketConfig(app);

app.register(routes);
try {
  app.listen({ port: 8080 }, () => {
    console.log("Server running on port 8080");
  });
} catch (error) {
  console.log(error);
}
