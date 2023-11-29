import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";

const CoursesTable = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleEdit = (course) => {
    // Add logic for editing the course
    console.log(`Editing course with ID: ${course.id}`);
  };

  const handleDelete = (courseId) => {
    // Add logic for deleting the course
    console.log(`Deleting course with ID: ${courseId}`);
  };

  return (
    <div>
      <h2>Courses Table</h2>
      {courses && courses.length === 0 && <p>No courses found.</p>}
      {courses && courses.length > 0 && (
        <table className="table border-2 border-black w-[30rem]">
          <thead className="border-2 border-black">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_title}</td>
                <td>
                  {/* Add your action buttons or links here */}
                  {/* Example: */}
                  <div className="flex gap-5">
                    <button className="bg-green-500 p-2 rounded-lg text-white" onClick={() => handleEdit(course)}>Edit</button>
                    <button className="bg-red-700 p-2 rounded-lg text-white" onClick={() => handleDelete(course.course_id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesTable;
