// CourseCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice";
const CourseCard = ({ courses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!courses) {
    return <div>Loading...</div>;
  }
  const handleCourseClick = (courseId) => {
    // Navigate to the CourseDetailPage with the course ID
    navigate(`/CourseDetailPage/${courseId}`);
  };
  const handleAddToCart = () => {
    // Dispatch an action to add the course to the cart
    dispatch(addToCart(courses));
  };
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {courses.map((course) => (
        <div
          key={course.course_id}
          className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          onClick={() => handleCourseClick(course.course_id)}
        >
          <div className="p-4 rounded-lg shadow-md mb-5 flex flex-col">
            <img
              src={course.course_image}
              alt={course.course_title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2">{course.course_title}</h3>
            <p>{course.course_description}</p>
            <p>${course.course_price}</p>
            <button className="text-black" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
