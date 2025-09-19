import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";

export class UserRoutes {
  constructor(private fastify: FastifyInstance) {}

  register() {
    this.fastify.get("/me", UserController.me);
  }
}
