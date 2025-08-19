import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const rows = await db.queryAsync("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const createUser = async (email, passwordHash, displayName) => {
  const result = await db.queryAsync(
    "INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)",
    [email, passwordHash, displayName]
  );
  return result.insertId;
};
