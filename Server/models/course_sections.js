const db = require("../db/db");

const createCourseSectionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS course_sections (
      course_section_id SERIAL PRIMARY KEY,
      section_name TEXT NOT NULL,
      course_id INTEGER NOT NULL REFERENCES courses(course_id),
      is_deleted BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await db.query(query);
    console.log("Course sections table created successfully");
  } catch (error) {
    console.error("Error creating course sections table:", error);
    throw error;
  }
};

// Add new course section
const addCourseSection = async (courseId, sections) => {
  if (!Array.isArray(sections)) {
    throw new Error("Sections must be an array");
  }

  const queries = sections.map((section) => {
    return {
      text: `
        INSERT INTO course_sections (section_name, course_id)
        VALUES ($1, $2)
        RETURNING course_section_id;
      `,
      values: [section, courseId],
    };
  });

  try {
    const results = await Promise.all(queries.map((query) => db.query(query)));
    return results.map((result) => result.rows[0].course_section_id);
  } catch (error) {
    console.error("Error adding course sections:", error);
    throw error;
  }
};

// Update course section details
async function updateCourseSection(course_section_id, sectionData) {
  const { section_name } = sectionData;

  await db.query({
    text: "UPDATE course_sections SET section_name = $1 WHERE course_section_id = $2",
    values: [section_name, course_section_id],
  });
}

// Soft delete a course section
async function deleteCourseSection(course_section_id) {
  try {
    await db.query(
      "UPDATE course_sections SET is_deleted = true WHERE course_section_id = $1",
      [course_section_id]
    );

    // Soft delete related videos
    await db.query(
      "UPDATE section_videos SET is_deleted = true WHERE course_section_id = $1",
      [course_section_id]
    );

    return true; // Success
  } catch (error) {
    console.error(
      "Error soft-deleting course section and related videos: ",
      error
    );
    throw error;
  }
}

// Get details of a course section
async function getCourseSections(course_id) {
  const result = await db.query({
    text: "SELECT * FROM course_sections WHERE course_id = $1 AND is_deleted = false",
    values: [course_id],
  });
  console.log(result.rows)
  return result.rows;
}

module.exports = {
  createCourseSectionsTable,
  addCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getCourseSections,
};

// const { DataTypes } = require("sequelize");
// const sequelize = require("../db/db");

// const course_sections = sequelize.define(
//   "course_sections",
//   {
//     course_section_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     section_name: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     course_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "courses",
//         key: "course_id",
//       },
//     },
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

// module.exports = course_sections;
