import { createMessage, getMessages } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const messageId = await createMessage(req.user.sub, content); // sub = userId di token

    return res.status(201).json({
      id: messageId,
      senderId: req.user.sub,
      content,
      createdAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error sending message", error });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await getMessages();
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching messages", error });
  }
};
