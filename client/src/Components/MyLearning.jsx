import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPurchasedCoursesAsync } from "../Redux/CheckoutSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MyLearning = () => {
  const dispatch = useDispatch();
  const purchasedCourses = useSelector(
    (state) => state.checkout.purchasedCourses
  );

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
          {purchasedCourses.map(
            (course) => (
              (
                <Link
                  to={`/CoursePreview/${course.course_id}`}
                  key={course.course_id}
                >
                  <div className="bg-white p-4 rounded-md shadow-md">
                    {/* Display course image */}
                    <img
                      src={encodeURI(
                        `http://localhost:5000/${course.course_image.replace(
                          "\\",
                          "/"
                        )}`
                      )}
                      alt={course.course_title}
                      className="w-full h-32 object-cover mb-4 rounded-md"
                    />

                    <h2 className="text-xl font-bold mb-2">
                      {course.course_title}
                    </h2>
                    <p
                      className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={course.course_description}
                    >
                      {course.course_description}
                    </p>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
