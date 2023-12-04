// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeachers, fetchStudents } from "../Redux/UsersSlice";
// import { fetchCourses } from "../Redux/CoursesSlice";

// const CoursesList = () => {
//   const dispatch = useDispatch();
//   const courses = useSelector((state) => state.Courses.Courses);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Assuming you have a fetchUser action
//         await dispatch(fetchTeachers());
//       } catch (error) {
//         console.log("Error fetching user data", error.message);
//       }
//     };
//     fetchCoursesList();
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Assuming you have a fetchUser action
//         await dispatch(fetchStudents());
//       } catch (error) {
//         console.log("Error fetching user data", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchCoursesList = async () => {
//     try {
//       await dispatch(fetchCourses());
//     } catch (error) {
//       console.log("Error fetching user data", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-4">Courses List</h2>
//       {courses && courses.length > 0 ? (
//         <ul>
//           {courses.map((course) => (
//             <li key={course.course_id} className="mb-4">
//               <h3 className="text-xl font-bold mb-2">{course.course_title}</h3>
//               <p className="text-gray-700">{course.course_description}</p>
//               {/* Add more details about the course as needed */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No courses available.</p>
//       )}
//     </div>
//   );
// };

// export default CoursesList;

// CoursesList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, fetchStudents } from "../Redux/UsersSlice";
import { fetchCourses } from "../Redux/CoursesSlice";

const CoursesList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchCoursesList();
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStudents());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, []);

  const fetchCoursesList = async () => {
    try {
      await dispatch(fetchCourses());
    } catch (error) {
      console.log("Error fetching user data", error.message);
    }
  };

  const handleEdit = (course) => {
    console.log("Editing course", course);
  };

  const handleDelete = (course) => {
    console.log("Deleting course", course);
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
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {course.course_title}
              </th>
              <td className="px-6 py-4">
                {course.course_category}
              </td>
              <td className="px-6 py-4">
                ${course.course_price}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;




