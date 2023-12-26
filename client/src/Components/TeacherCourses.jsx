import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TeacherCourses = ({
  teacherObject,
  toggleModal,
  handleAddCourse,
  handleEditSection,
  handleEditCourse,
  handleDelete,
}) => {
  const courses = useSelector((state) => state.Courses.Courses);

  return (
    <div className="p-2">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">My Courses</h3>
        <button
          className="text-white bg-[#1e293b] rounded-lg px-4 py-2 disabled:opacity-20"
          onClick={handleAddCourse}
        >
          Add
        </button>
      </div>

      <div className="text-gray-400 max-h-[22rem] overflow-y-auto">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Section
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses
              ?.filter((e) => e.trainer_id === teacherObject.trainer_id)
              .map((course) => (
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
                  <td className="px-6 py-4 text-white">
                    {course.course_category}
                  </td>
                  <td className="px-6 py-4 text-white">
                    ${course.course_price}
                  </td>
                  <td className="px-6 py-4 text-white">
                    <div className="flex">
                      <button
                        onClick={() => handleEditSection(course)}
                        className="font-medium mr-2 text-green-500 hover:underline"
                      >
                        Edit Sections
                      </button>
                      |
                      <button
                        onClick={() => toggleModal(course)}
                        className="font-medium ml-2 text-cyan-400 hover:underline"
                      >
                        Add Videos
                      </button>
                    </div>
                  </td>

                  <td className="flex px-6 py-4 space-x-2 justify-center text-white">
                    <button
                      className="font-medium  text-blue-500 hover:underline"
                      onClick={() => {
                        handleEditCourse(course.course_id);
                      }}
                    >
                      Edit
                    </button>

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

export default TeacherCourses;
