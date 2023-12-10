import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";
import SectionsModal from "./SectionsModal";

const CoursesList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        await dispatch(fetchCourses());
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchCoursesList();
  }, [dispatch]);

  const toggleModal = (courseId) => {
    setIsModalOpen(!isModalOpen);
    setSelectedCourseId(courseId);
  };

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg h-[37rem]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <>
              <div>
                {isModalOpen && selectedCourseId === course.course_id && (
                  <SectionsModal
                    isOpen={isModalOpen}
                    onClose={() => toggleModal("")}
                    courseId={selectedCourseId}
                    courseName={course.course_title}
                  />
                )}
              </div>
              <tr
                key={course.course_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {course.course_title}
                </th>
                <td className="px-6 py-4">{course.course_category}</td>
                <td className="px-6 py-4">${course.course_price}</td>
                <td className="flex px-6 py-4 space-x-2 text-right">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      // Handle edit action here
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleModal(course.course_id)}
                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                  >
                    View
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      // Handle delete action here
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;
