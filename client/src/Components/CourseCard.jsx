import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();

  if (!courses) {
    return <div>Loading...</div>;
  }

  const handleCourseClick = (courseId) => {
    navigate(`/CourseDetailPage/${courseId}`);
  };

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {courses?.map((course) => (
        <div
          key={course.course_id}
          className="bg-[#1e293b] rounded-lg relative shadow-md justify-center min-w-[300px] cursor-pointer overflow-hidden hover:scale-105 transition-all "
          onClick={() => handleCourseClick(course.course_id)}
        >
          <img
            src={encodeURI(
              `http://localhost:5000/${course.course_image?.replace("\\", "/")}`
            )}
            alt={course.course_title}
            className="w-full h-32 object-cover mix-blend-difference"
          />
          <p className="px-5 rounded-md rounded-tl-none rounded-bl-none bg-[#00ffc2] absolute top-2 left-0 shadow-md text-black">
            {course.course_tagline}
          </p>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold  text-white">
                  {course.course_title}
                </h3>
                <h3 className="text-sm  text-[#94a3b8] flex">
                  {course.course_author}
                </h3>
              </div>

              <div className="">
                <span className="px-5 rounded-xl text-[#00ffc2]">
                  ${course.course_price}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[#94a3b8] overflow-hidden text-ellipsis">
                {course.course_description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
