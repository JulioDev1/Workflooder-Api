import { FastifyInstance } from "fastify";
import { Server, Socket } from "socket.io";

export function socketConfig(fastify: FastifyInstance) {
  const sockets = new Server(fastify.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  sockets.on("connection", (socket: Socket) => {
    console.log("user are connected!", socket.id);
  });

  return sockets;
}
