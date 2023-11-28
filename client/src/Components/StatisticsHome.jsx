import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchTeachers } from "../Redux/UsersSlice";
import { fetchCourses } from "../Redux/CoursesSlice";

const StatisticsHome = () => {
  const dispatch = useDispatch();
  const { students, teachers, status: userStatus, error: userError } = useSelector((state) => state.user);
  const { courses, status: coursesStatus, error: coursesError } = useSelector((state) => state.Courses);

  useEffect(() => {
    // Dispatch the actions to fetch students, teachers, and courses
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <>
      <div className="bg-[#6F97FF] p-4 text-center text-white flex justify-around">
        {/* Display user-related information */}
        {userStatus === "loading" && <p>Loading user data...</p>}
        {userStatus === "failed" && <p>Error fetching user data: {userError}</p>}

        {userStatus === "succeeded" && (
          <>
            <p>Students: {students.length}</p>
            <p>Tutors: {teachers.length}</p>
          </>
        )}

        {/* Display course-related information */}
        {coursesStatus === "loading" && <p>Loading course data...</p>}
        {coursesStatus === "failed" && <p>Error fetching course data: {coursesError}</p>}

        {/* Check if courses is defined before accessing its length property */}
        {coursesStatus === "succeeded" && courses && (
          <p>Total Courses: {courses.length}</p>
        )}
      </div>
    </>
  );
};

export default StatisticsHome;
