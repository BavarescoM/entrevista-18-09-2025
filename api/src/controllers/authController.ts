import { FastifyReply, FastifyRequest } from "fastify";
import { signupSchema, loginSchema } from "../utils/auth.schema";
import { AuthBusiness } from "../services/auth.service";

export class AuthController {
  static async signup(req: FastifyRequest, reply: FastifyReply) {
    const parsed = signupSchema.parse(req.body);
    const { name, email, password } = parsed;
    try {
      console.log("Signup request:", { name, email, password });
      await AuthBusiness.signup(name, email, password);
      return reply.code(201).send({ message: "User created" });
    } catch (e: any) {
      return reply.code(400).send({ error: e.message });
    }
  }

  static async login(req: FastifyRequest, reply: FastifyReply) {
    const parsed = loginSchema.parse(req.body);
    const { email, password } = parsed;
    try {
      const token = await AuthBusiness.login(email, password);
      return reply.send({ token });
    } catch (e: any) {
      return reply.code(400).send({ error: e.message });
    }
  }
}
