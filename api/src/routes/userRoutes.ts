import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function UserRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/me", { 
    schema: {
    tags: ['User'],
    summary: 'get me',
    security: [{ bearerAuth: [] }],
  }}, UserController.me);
}

