// LiveSessionCard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";

const LiveSessionCard = ({ session }) => {
  const { session_title, session_date, session_time, trainer_id } = session;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    // Dispatch the fetchCourses action when the component mounts
    dispatch(fetchCourses());
  }, [dispatch]);

  // Assuming that trainer_id corresponds to the course author
  const courseAuthor = courses.find((course) => course.id === trainer_id);

  return (
    <div className="">
      {/* <h2>{session_title}</h2> */}
      {/* <p>Date: {session_date}</p>
      <p>Time: {session_time}</p> */}
      {/* <p>Teacher: {courseAuthor ? courseAuthor.course_author : "Unknown"}</p> */}
    </div>
  );
};

export default LiveSessionCard;
