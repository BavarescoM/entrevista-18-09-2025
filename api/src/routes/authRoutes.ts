import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/authController";

export class AuthRoutes {
  constructor(private fastify: FastifyInstance) {}

  register() {
    this.fastify.post("/auth/signup", AuthController.signup);
    this.fastify.post("/auth/login", AuthController.login);
  }
}
