const db = require("../db/db");

const createCategoryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS course_categories  (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL UNIQUE,
      is_deleted BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await db.query(query);
    console.log("course_categories table created successfully");
  } catch (error) {
    console.error("Error creating course_categories table:", error);
    throw error;
  }
};

const addCategory = async (category_name) => {
  const query = {
    text: `
      INSERT INTO course_categories (category_name)
      VALUES ($1)
      RETURNING category_id;
    `,
    values: [category_name],
  };

  const result = await db.query(query);
  return result.rows[0].category_id;
};

const getCategories = async () => {
  const query = `
    SELECT * FROM course_categories
    WHERE is_deleted = false;
  `;

  const result = await db.query(query);
  return result.rows;
};

const updateCategory = async (category_id, category_name) => {
  const query = {
    text: `
      UPDATE course_categories
      SET category_name = $2
      WHERE category_id = $1
      RETURNING *;
    `,
    values: [category_id, category_name],
  };

  const result = await db.query(query);
  return result.rows[0];
};

const deleteCategory = async (category_id) => {
  const query = {
    text: `
      UPDATE course_categories
      SET is_deleted = true
      WHERE category_id = $1
      RETURNING *;
    `,
    values: [category_id],
  };

  const result = await db.query(query);
  return result.rows[0];
};

module.exports = {
  createCategoryTable,
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
