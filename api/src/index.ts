import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import Fastify from "fastify";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  validatorCompiler
} from 'fastify-type-provider-zod';
import { db } from "./db";
import { AuthRoutes } from "./routes/authRoutes";
import { UserRoutes } from "./routes/userRoutes";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

async function main() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
  app.setValidatorCompiler(validatorCompiler)
  await db.init();
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API de Autenticação",
        version: "1.0.0",
        description: "API simples com signup, login e perfil protegido",
      },
      components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "full" },
  });
  await AuthRoutes(app);
  await UserRoutes(app);

  await app.listen({ port: PORT, host: "0.0.0.0" });
  app.log.info(`API running at http://localhost:${PORT}`);
  app.log.info(`Swagger docs at http://localhost:${PORT}/docs`);
}

main().catch(err => {
  // app.log.error(err);
  process.exit(1);
});
