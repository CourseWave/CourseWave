const db = require("../db/db");

async function createContactUsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS contact_us (
      message_id SERIAL PRIMARY KEY,
      message_author VARCHAR (50) NOT NULL,
      author_email VARCHAR (100) NOT NULL,
      message_content TEXT NOT NULL,
      is_deleted BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await db.query(query);
    console.log("Contact us table created successfully");
  } catch (error) {
    console.error("Error creating contact us table:", error);
    throw error;
  }
}

const addMessage = async (message_author, author_email, message_content) => {
  const query = {
    text: `
      INSERT INTO contact_us
      (message_author, author_email, message_content)
      VALUES ($1, $2, $3)
      RETURNING message_id;
    `,
    values: [message_author, author_email, message_content],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].message_id;
  } catch (error) {
    console.log(error)
    console.error("Failed to add message: ", error);
    throw error;
  }
};

const deleteMessage = async (message_id) => {
  const query = {
    text: `
      UPDATE contact_us
      SET is_deleted = true
      WHERE message_id = $1 AND is_deleted = false
      RETURNING message_id;
    `,
    values: [message_id],
  };

  try {
    const result = await db.query(query);
    return result.rows[0].message_id;
  } catch (error) {
    console.error("Failed to delete message: ", error);
    throw error;
  }
};

const getMessages = async () => {
  const query = {
    text: `
      SELECT * FROM contact_us
      WHERE is_deleted = false
      ORDER BY message_id;
    `,
  };

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Failed to get messages: ", error);
    throw error;
  }
};

module.exports = {
  createContactUsTable,
  addMessage,
  deleteMessage,
  getMessages,
};
