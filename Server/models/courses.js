const db = require("../db/db");

const createCoursesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS courses (
      course_id SERIAL PRIMARY KEY,
      course_title TEXT NOT NULL,
      course_description TEXT NOT NULL,
      course_price DOUBLE PRECISION NOT NULL,
      course_rate DOUBLE PRECISION DEFAULT 0,
      course_length DOUBLE PRECISION NOT NULL,
      course_image TEXT NOT NULL,
      trainer_id INTEGER NOT NULL REFERENCES trainers(trainer_id),
      is_deleted BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await db.query(query);
    console.log("Courses table created successfully");
  } catch (error) {
    console.error("Error creating courses table:", error);
    throw error;
  }
};

async function addCourse({
  course_title,
  course_description,
  course_price,
  course_rate,
  course_length,
  course_image,
  trainer_id,
}) {
  const query = {
    text: `
      INSERT INTO courses (course_title, course_description, course_price, course_rate, course_length, course_image, trainer_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING course_id;
    `,
    values: [
      course_title,
      course_description,
      course_price,
      course_rate,
      course_length,
      course_image,
      trainer_id,
    ],
  };

  const result = await db.query(query);
  return result.rows[0].course_id;
}

async function updateCourse({
  course_id,
  course_title,
  course_description,
  course_price,
  course_rate,
  course_length,
}) {
  const query = {
    text: `
      UPDATE courses
      SET
        course_title = $2,
        course_description = $3,
        course_price = $4,
        course_rate = $5,
        course_length = $6
      WHERE course_id = $1
      RETURNING course_id;
    `,
    values: [
      course_id,
      course_title,
      course_description,
      course_price,
      course_rate,
      course_length,
    ],
  };

  const result = await db.query(query);
  return result.rows[0].course_id;
}

async function deleteCourse(course_id) {
  try {
    // Soft delete the course
    await db.query(
      "UPDATE courses SET is_deleted = true WHERE course_id = $1",
      [course_id]
    );

    // Soft delete related course objects
    await db.query(
      "UPDATE course_objects SET is_deleted = true WHERE course_id = $1",
      [course_id]
    );

    // Soft delete related course requirements
    await db.query(
      "UPDATE course_requirements SET is_deleted = true WHERE course_id = $1",
      [course_id]
    );

    // Soft delete related course sections and their videos
    const sectionIds = await db.query(
      "SELECT course_section_id FROM course_sections WHERE course_id = $1",
      [course_id]
    );
    for (const sectionId of sectionIds.rows) {
      const sectionIdValue = sectionId.course_section_id;

      // Soft delete the course section
      await db.query(
        "UPDATE course_sections SET is_deleted = true WHERE course_section_id = $1",
        [sectionIdValue]
      );

      // Soft delete related videos
      await db.query(
        "UPDATE section_videos SET is_deleted = true WHERE course_section_id = $1",
        [sectionIdValue]
      );
    }

    return true;
  } catch (error) {
    console.error("Error soft-deleting course and related details: ", error);
    throw error;
  }
}

async function getCourseDetails(course_id) {
  const query = {
    text: `
      SELECT
        c.course_id,
        c.course_title,
        c.course_description,
        c.course_price,
        c.course_rate,
        c.course_length,
        o.object,
        r.requirement,
        s.section_name,
        v.video_title,
        v.video_link
      FROM courses c
      LEFT JOIN course_objects o ON c.course_id = o.course_id AND o.is_deleted = false
      LEFT JOIN course_requirements r ON c.course_id = r.course_id AND r.is_deleted = false
      LEFT JOIN course_sections s ON c.course_id = s.course_id AND s.is_deleted = false
      LEFT JOIN section_videos v ON s.course_section_id = v.course_section_id AND v.is_deleted = false
      WHERE c.course_id = $1 AND c.is_deleted = false;
    `,
    values: [course_id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

module.exports = {
  createCoursesTable,
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseDetails,
};
