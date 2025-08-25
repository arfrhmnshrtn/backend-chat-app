// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Ambil konfigurasi dari environment
const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  waitForConnections: true,
  connectionLimit: process.env.DB_CONN_LIMIT || 10, // default 10, bisa disesuaikan
  queueLimit: 0, // 0 berarti unlimited
};

// Buat connection pool
const db = mysql.createPool(config);

// Utility function untuk query
export const query = async (sql, params) => {
  try {
    const [rows] = await db.query(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

// Test koneksi (opsional, bagus untuk dev & monitoring)
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Database connected:", config.host);
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

export default db;
