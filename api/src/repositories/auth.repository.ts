import { db } from "../db";

export class AuthRepository {
  static async createUser(email: string, password: string) {
    return db.pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
  }

  static async findByEmail(email: string) {
    const [rows]: any = await db.pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }
}
