import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { AuthController } from "../controllers/authController";
import { loginSchema, signupSchema } from "../utils/auth.schema";

export async function AuthRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/signup", { 
    schema: {
    tags: ['Auth'],
    summary: 'Create a new account',
    body: signupSchema,       
  }}, AuthController.signup);


  app.withTypeProvider<ZodTypeProvider>().post("/login", { 
    schema: {
    tags: ['Auth'],
    summary: 'Create a new account',
    body: loginSchema,       
  }}, AuthController.login);

}
