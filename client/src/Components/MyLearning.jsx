import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPurchasedCoursesAsync } from "../Redux/CheckoutSlice";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchasedCourses = useSelector(
    (state) => state.checkout.purchasedCourses
  );

  useEffect(() => {
    // Fetch the purchased courses when the component mounts
    dispatch(getPurchasedCoursesAsync());
  }, [dispatch]);

  function handleCourseClick(courseId) {
    navigate(`/CoursePreview/${courseId}`);
  }
  return (
    <div className="container mx-auto p-8 h-full">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>
      {purchasedCourses.length === 0 ? (
        <p>No courses purchased yet.</p>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center">
          {purchasedCourses?.map((course) => (
            <div
              key={course.course_id}
              className="bg-[#1e293b] rounded-lg relative shadow-md justify-center min-w-[240px] cursor-pointer overflow-hidden hover:scale-105 transition-all "
              onClick={() => handleCourseClick(course.course_id)}
            >
              <img
                src={encodeURI(
                  `http://localhost:5000/${course.course_image?.replace(
                    "\\",
                    "/"
                  )}`
                )}
                alt={course.course_title}
                className="w-full h-32 object-cover mix-blend-difference max-w-[240px]"
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
                </div>

                <div>
                  <p className="text-[#94a3b8] overflow-hidden text-ellipsis">
                    {course.course_category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
