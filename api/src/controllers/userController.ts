import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../utils/authService";

export class UserController {
  static async me(req: FastifyRequest, reply: FastifyReply) {
    const authHeader = (req.headers.authorization || "") as string;
    if (!authHeader) return reply.code(401).send({ error: "No token" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = AuthService.verifyToken(token);
      return reply.send({ id: decoded.id, email: decoded.email });
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  }
}
