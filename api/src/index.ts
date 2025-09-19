import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Auth API",
      description: "API simples de autenticação com Fastify",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

const start = async () => {
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    server.log.info(`🚀 Server rodando em http://localhost:4000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
