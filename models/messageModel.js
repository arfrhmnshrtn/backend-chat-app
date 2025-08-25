import db from "../config/db.js";

export const createMessage = async (senderId, content) => {
  const [result] = await db.query(
    "INSERT INTO messages (sender_id, content) VALUES (?, ?)",
    [senderId, content]
  );
  return result.insertId; // langsung return insertId
};

export const getMessages = async () => {
  const [rows] = await db.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return rows;
};
