import mysql from "mysql2/promise";

async function testConnection() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "db",
      user: process.env.DB_USER || "devuser",
      password: process.env.DB_PASS || "devpass",
      database: process.env.DB_NAME || "authdb",
      port: Number(process.env.DB_PORT) || 3306,
    });

    console.log("✅ Conectado ao MySQL!");
    const [rows] = await conn.query("SELECT DATABASE() as db");
    console.log("Banco atual:", rows);
    await conn.end();
  } catch (err) {
    console.error("❌ Erro de conexão:", err);
  }
}

testConnection();
