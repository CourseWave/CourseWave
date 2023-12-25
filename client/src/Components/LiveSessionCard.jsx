import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";

const LiveSessionCard = ({
  session,
  handleStartSession,
  isTeacher,
  courseAuthor,
}) => {
  const { session_title, session_date, session_time, trainer_id } = session;

  const courses = useSelector((state) => state.Courses.Courses);

  function getTeacherName() {
    const courseAuth = courses.find(
      (course) => course.trainer_id === trainer_id
    );

    return courseAuth?.course_author || 'Unknown';
  }

  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <>
      <div className="p-4 group text-white flex w-[200px] basis-1/3 h-[200px] justify-between cursor-pointer transition-all hover:scale-105">
        <div className="border rounded-lg rounded-tr-none rounded-br-none font-[Poppins]  bg-white group-hover:blur-[1.2px] group-hover:bg-white group-hover:brightness-75 text-black  flex flex-col justify-center text-center items-center p-2 border-r w-1/3">
          <p className="text-2xl font-bold">{session_title}</p>
          <p className="text-sm mt-2">
            by {courseAuthor ? courseAuthor : getTeacherName()}
          </p>
        </div>

        <div className="flex border border-l-0 flex-col p-4 justify-between bg-[#1e293b] rounded-lg group-hover:blur-[1.2px] rounded-tl-none rounded-bl-none  w-2/3">
          <div className="border-b h-1/2">
            <p className="font-bold">Date</p>
            <p>{formatDate(session_date)}</p>
          </div>
          <div className="">
            <p className="font-bold">Time</p>
            <p>{session_time}</p>
          </div>
        </div>
        <div className="hidden group-hover:flex justify-center absolute items-center w-full h-full top-0">
          <button
            onClick={() => {
              handleStartSession(session);
            }}
            className="rounded-md h-[10.5rem] w-full text-white px-2"
          >
            <span className="border border-whie text-lg bg-white hover:bg-slate-200 text-black rounded py-2 px-4">
              {isTeacher ? "Start Session" : "Join Now"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveSessionCard;
