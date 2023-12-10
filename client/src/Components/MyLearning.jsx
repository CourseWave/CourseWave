import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPurchasedCoursesAsync } from "../Redux/CheckoutSlice";

const MyLearning = () => {
  const dispatch = useDispatch();
  const purchasedCourses = useSelector((state) => state.purchasedCourses.courses);

  useEffect(() => {
    // Fetch the purchased courses when the component mounts
    dispatch(getPurchasedCoursesAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>
      {purchasedCourses.length === 0 ? (
        <p>No courses purchased yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {purchasedCourses.map((course) => (
            <div key={course.course_id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-2">{course.course_title}</h2>
              <p className="text-gray-600">{course.course_description}</p>
              {/* Add more details or links to the course */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
