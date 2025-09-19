import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  public pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
  }
}

export const db = new Database();
