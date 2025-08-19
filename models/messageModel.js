import db from "../config/db.js";

export const createMessage = (senderId, content) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO messages (sender_id, content) VALUES (?, ?)",
      [senderId, content],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

export const getMessages = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM messages ORDER BY created_at DESC", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
