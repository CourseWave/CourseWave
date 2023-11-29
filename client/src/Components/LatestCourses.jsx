import React, { useState, useEffect } from "react";
import {useDispatch ,useSelector} from 'react-redux'
import { fetchCourses } from "../Redux/CoursesSlice";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Courses = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const Courses = useSelector((state) => state.Courses.Courses);
  // const courses = useSelector((state) => state.Courses.Courses);
  const Course = Courses.find((c) => c.id === parseInt(courseId));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
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

  };  const handleCourseClick = (courseId) => {
    // Navigate to the CourseDetailPage with the course ID
    navigate(`/CourseDetailPage/${courseId}`);
  };

  return (
    <div className=" mx-auto mt-8 bg-[#0F2355] text-white h-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Check out The  Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-[6rem] mt-8">
        {currentItems && currentItems.map((course) => (
          <div
            key={course.course_id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleCourseClick(course.course_id)}
          >
            <img
              src={course.course_image}
              alt={course.course_title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 text-black">{course.course_title}</h3>
            <p className="text-gray-600">{course.course_description}</p>
          </div>
        ))}
      </div>

      {/* Pagination with central arrows */}
      <div className="flex justify-center mt-4 ">
        <button
          onClick={prevPage}
          className={`mx-1 px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <div className="mx-4 text-xl">{currentPage}</div>
        <button
          onClick={nextPage}
          className={`mx-1 px-3 py-2 rounded-md ${currentPage === Math.ceil(Courses.length / itemsPerPage) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gray-800 text-white'}`}
          disabled={currentPage === Math.ceil(Courses.length / itemsPerPage)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Courses;
