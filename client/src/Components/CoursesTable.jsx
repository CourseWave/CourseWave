import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, fetchCourses } from "../Redux/CoursesSlice";
import { toast } from "react-toastify";

const CoursesTable = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
    toast.success("Course Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="p-2">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">Courses List</h3>
      </div>

      <div className="text-gray-400 max-h-[22rem] overflow-y-auto rounded shadow-md">
        <table className="w-full text-sm text-left rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                Trainer
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          {courses.length === 0 && (
            <p className="text-2xl text-black w-full">No Courses Available</p>
          )}

          <tbody>
            {courses?.map((course) => (
              <tr
                key={course.course_id}
                className="border-b bg-gray-800 border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {course.course_title}
                </th>
                <td className="px-6 py-4 text-white">${course.course_price}</td>

                <td className="px-6 py-4 text-white">
                  {course.course_category}
                </td>
                <td className="px-6 py-4 text-white">{course.course_author}</td>

                <td className="flex px-6 py-4 space-x-2 justify-center text-white">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      handleDelete(course.course_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
