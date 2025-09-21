import { db } from "../db";

export class AuthRepository {
  static async createUser(name:string, email: string, password: string) {
    return db.pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
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
