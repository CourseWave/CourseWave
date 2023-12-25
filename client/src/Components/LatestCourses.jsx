import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

const Courses = () => {
  const dispatch = useDispatch();
  const Courses = useSelector((state) => state.Courses.Courses);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Courses.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(Courses.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mx-auto mt-9 bg-[#0f172a] text-white h-auto p-6 pt-0 relative">
      <h2 className="text-3xl font-bold mb-4 pt-4 text-center">
        CHECK OUT THE COURSES
      </h2>
      <div className="flex flex-wrap gap-8 mx-[6rem] mt-8 pb-5 justify-center">
        <CourseCard courses={currentItems} />
      </div>

      {/* Pagination with central arrows */}
      <button
        onClick={prevPage}
        className={` px-3 text-3xl absolute left-0 top-1/2 ${
          currentPage === 1
            ? " text-gray-700 cursor-not-allowed"
            : " text-white"
        }`}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <button
        onClick={nextPage}
        className={` px-3  text-3xl absolute right-0 top-1/2 ${
          currentPage === Math.ceil(Courses.length / itemsPerPage)
            ? " text-gray-700 cursor-not-allowed"
            : "bg-transparent text-white"
        }`}
        disabled={currentPage === Math.ceil(Courses.length / itemsPerPage)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Courses;
