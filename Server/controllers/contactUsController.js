const contactUsModel = require("../models/contact_us");

exports.sendMessage = async (req, res) => {
  try {
    const { message_author, author_email, message_content } = req.body;
    const messageId = await contactUsModel.addMessage(
      message_author,
      author_email,
      message_content
    );

    res.status(201).json({
      message: "Message sent successfully",
      message_id: messageId,
    });
  } catch (error) {
    console.error("Failed to send message: ", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { message_id } = req.body;
    const deletedMessageId = await contactUsModel.deleteMessage(message_id);

    res.status(200).json({
      message: "Message deleted successfully",
      deleted_message_id: deletedMessageId,
    });
  } catch (error) {
    console.error("Failed to delete message: ", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await contactUsModel.getMessages();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to get messages: ", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};
