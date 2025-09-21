import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../utils/authService";
import { AuthRepository } from "../repositories/auth.repository";

export class UserController {
  static async me(req: FastifyRequest, reply: FastifyReply) {
    const authHeader = (req.headers.authorization || "") as string;
    console.log("Auth Header:", authHeader);
    console.log("Header:", req.headers);
    if (!authHeader) return reply.code(401).send({ error: "No token" });
    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = AuthService.verifyToken(token);
      console.log("Decoded token:", decoded);
      let user = await AuthRepository.findByEmail(decoded.email)      
      return reply.send(user);
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  }
}
