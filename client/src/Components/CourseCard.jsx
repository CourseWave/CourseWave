// CourseCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();
  if (!courses) {
    return <div>Loading...</div>;
  }
  const handleCourseClick = (courseId) => {
    // Navigate to the CourseDetailPage with the course ID
    navigate(`/CourseDetailPage/${courseId}`);
  };

  return (
    <div className="flex items-center justify-center flex-wrap">
      {courses.map((course) => (
        <div key={course.id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" onClick={()=> handleCourseClick(course.id)}>
          <div className="p-4 rounded-lg shadow-md mb-5 flex flex-col">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2" >{course.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
