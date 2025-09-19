import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { AuthService } from "../utils/authService";

export class AuthController {
  static async signup(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    const hashed = await AuthService.hashPassword(password);

    try {
      await db.pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);
      return reply.code(201).send({ message: "User created" });
    } catch (e: any) {
      return reply.code(400).send({ error: e.message });
    }
  }

  static async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    const [rows]: any = await db.pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!rows.length) return reply.code(400).send({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await AuthService.comparePassword(password, user.password);
    if (!match) return reply.code(400).send({ error: "Invalid credentials" });

    const token = AuthService.generateToken({ id: user.id, email: user.email });
    return reply.send({ token });
  }
}
