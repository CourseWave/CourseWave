// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeachers, fetchStudents } from "../Redux/UsersSlice";
// import { fetchCourses } from "../Redux/CoursesSlice";
// import { fetchSections } from "../Redux/CoursesSlice";

// // Add Accordion component
// const Accordion = ({ sections }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleAccordion}
//         className="text-blue-600 dark:text-blue-500 hover:underline"
//       >
//         {isOpen ? "Hide Sections" : "Show Sections"}
//       </button>
//       {isOpen && sections && sections.length > 0 && (
//         <ul>
//           {sections &&
//             sections.map((section) => (
//               <li key={section.section_id}>{section.title}</li>
//             ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const CoursesList = () => {
//   const dispatch = useDispatch();
//   const courses = useSelector((state) => state.Courses.Courses);
//   const updatedCourses = useSelector((state) => state.Courses.Courses);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchTeachers());
//       } catch (error) {
//         console.log("Error fetching user data", error.message);
//       }
//     };
//     fetchCoursesList();
//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       await dispatch(fetchStudents());
//   //     } catch (error) {
//   //       console.log("Error fetching user data", error.message);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   const fetchCoursesList = async () => {
//     try {
//       await dispatch(fetchCourses());

//       // Now that fetchCourses() is complete, you can access the updated courses state

//       // Fetch sections for each course
//       updatedCourses.forEach((course) => {
//         dispatch(fetchSections(course.id));
//       });
//     } catch (error) {
//       console.log("Error fetching course data", error.message);
//     }
//   };

//   const handleEdit = (course) => {
//     console.log("Editing course", course);
//   };

//   const handleDelete = (course) => {
//     console.log("Deleting course", course);
//   };

//   return (
//     <div className="relative overflow-auto shadow-md sm:rounded-lg h-[37rem]">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Title
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Category
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Price
//             </th>
//             <th scope="col" className="px-6 py-3">
//               <span className="sr-only">Edit</span>
//             </th>
//             <th scope="col" className="px-6 py-3">
//               <span className="sr-only">Delete</span>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((course) => (
//             <tr
//               key={course.course_id}
//               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//             >
//               <th
//                 scope="row"
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {course.course_title}
//                 <Accordion sections={course.sections} />
//               </th>
//               <td className="px-6 py-4">{course.course_category}</td>
//               <td className="px-6 py-4">${course.course_price}</td>
//               <td className="px-6 py-4 text-right">
//                 <button
//                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                   onClick={() => handleEdit(course)}
//                 >
//                   Edit
//                 </button>
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <button
//                   className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                   onClick={() => handleDelete(course)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CoursesList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchSections } from "../Redux/CoursesSlice";
import AccordionSections from "./AccordionSections";

const CoursesList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);
  const [isOpen, setIsOpen] = useState(false);
  const [num, setNum] = useState("");
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
  // console.log(courses[1].course_id);

  const toggleAccordion = (course_id) => {
    setIsOpen(!isOpen);
    setNum(course_id);
  };

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg h-[37rem]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            {/* ... (other table headers) */}
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr
              key={course.course_id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {course.course_title}
                <div>
                  <button
                    onClick={() => {
                      toggleAccordion(course.course_id);
                    }}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {isOpen && num === course.course_id
                      ? "hide Sections"
                      : "Show Sections"}
                  </button>

                  {isOpen && num === course.course_id && (
                    <AccordionSections id={course.course_id} />
                  )}
                </div>
              </th>
              <td className="px-6 py-4">{course.course_category}</td>
              <td className="px-6 py-4">${course.course_price}</td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  // ... (handleEdit logic)
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  // ... (handleDelete logic)
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
