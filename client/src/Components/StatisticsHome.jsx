import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchTeachers } from "../Redux/UsersSlice";
import { fetchCourses } from "../Redux/CoursesSlice";

const StatisticsHome = () => {
  const dispatch = useDispatch();
  const {
    students,
    teachers,
    status: userStatus,
    error: userError,
  } = useSelector((state) => state.user);
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    // Dispatch the actions to fetch students, teachers, and courses
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchCourses());
  }, [dispatch]);

  if (userStatus === "failed") {
    return null;
  }

  return (
    <>
      <div className="bg-[#1e293b] p-4 text-center text-white flex justify-around">
        {userStatus === "loading" && <p>Loading user data...</p>}
        {userStatus === "failed" && (
          <p>Error fetching user data: {userError}</p>
        )}

        {userStatus === "succeeded" && (
          <>
          <div>
          <p className="text-white text-4xl">+{students.length}  </p>
          <p className="text-white text-lg">Students</p>
          </div>

          <div>
          <p className="text-white text-4xl">+{courses.length}  </p>
          <p className="text-white text-lg">Courses</p>
          </div>

          <div>
          <p className="text-white text-4xl">+{teachers.length}  </p>
          <p className="text-white text-lg">Tutors</p>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default StatisticsHome;
