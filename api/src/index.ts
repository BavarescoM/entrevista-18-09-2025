import Fastify from "fastify";
import dotenv from "dotenv";
import { db } from "./db";
import { AuthRoutes } from "./routes/authRoutes";
import { UserRoutes } from "./routes/userRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

dotenv.config();

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 4000;

async function main() {
  await db.init();

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API de Autenticação",
        version: "1.0.0",
        description: "API simples com signup, login e perfil protegido",
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "full" },
  });

  new AuthRoutes(fastify).register();
  new UserRoutes(fastify).register();

  await fastify.listen({ port: PORT, host: "0.0.0.0" });
  fastify.log.info(`API running at http://localhost:${PORT}`);
  fastify.log.info(`Swagger docs at http://localhost:${PORT}/docs`);
}

main().catch(err => {
  fastify.log.error(err);
  process.exit(1);
});
