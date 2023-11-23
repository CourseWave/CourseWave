const db = require("../db/db");

const createCommentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS comments (
      comment_id SERIAL PRIMARY KEY,
      comment_content TEXT NOT NULL,
      comment_author VARCHAR(255) NOT NULL,
      comment_rate INTEGER NOT NULL,
      course_id INTEGER NOT NULL REFERENCES courses(course_id),
      user_id INTEGER NOT NULL REFERENCES users(user_id),
      is_deleted BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await db.query(query);
    console.log("Comments table created successfully");
  } catch (error) {
    console.error("Error creating comments table:", error);
    throw error;
  }
};

module.exports = {
  createCommentsTable,
};

// const { DataTypes } = require("sequelize");
// const sequelize = require("../db/db");

// const comments = sequelize.define(
//   "comments",
//   {
//     comment_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     comment_content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     comment_author: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     comment_rate: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     course_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "courses",
//         key: "course_id",
//       },
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "users",
//           key: "user_id",
//         },
//       },
//     is_deleted: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: false, // This disables the createdAt and updatedAt columns
//   }
// );

// module.exports = comments;
