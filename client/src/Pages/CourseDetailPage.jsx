import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourses } from "../Redux/CoursesSlice";
import { addToCart } from "../Redux/CartSlice";

const CourseDetailPage = () => {
  // Assuming you have a Redux store with courses and categories
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [course, setCourse] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const courseToAdd = courses.find((c) => c.course_id === parseInt(courseId));

    if (courseToAdd) {
      dispatch(addToCart(courseToAdd));
      alert("Course added to cart!");
    } else {
      alert("Course not found.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating asynchronous data fetching using Redux actions
        await dispatch(fetchCourses()); // Assuming you have a fetchCourses action

        // Once data is fetched, set isDataLoaded to true
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

useEffect(()=>{
  setCourse(courses.find((c) => c.course_id === parseInt(courseId)))
  console.log(courses);
},[courses]);

 
console.log(course);
  if (!isDataLoaded) {
    return (
      <div className="text-center text-gray-500 font-bold mt-8">Loading...</div>
    );
  }
  if (!course) {
    return (
      <div className="text-center text-red-500 font-bold mt-8">
        Course not found
      </div>
    );
  }

  return (
    <>
      <div className="container flex flex-wrap relative justify-center p-2">
        {/* Right Column - Course Details */}
        <div className="flex flex-col flex-wrap p-10 border-2  w-1/6 h-[30rem] rounded-2xl bg-white fixed right-[100px]">
          <h1 className="text-3xl font-bold text-black">{course.course_title}</h1>
          <p className="text-black">{course.course_description}</p>

          <div className="flex justify-center flex-col">
            <span className="text-black">Rating: {course.course_rating}</span>
            <span className="text-black">Price: ${course.course_price}</span>
          </div>

          <div className="flex justify-center flex-col gap-5">
            <button
              className="text-white bg-indigo-900 border-2  rounded-lg h-10"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="text-white border-2 bg-green-700 rounded-lg h-10">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      {/* Left Column - Course Details */}
      <div className="flex-1 container ">
        <div className="flex flex-wrap bg-black h-[16rem] justify-center">
          <div className="m-10 flex flex-wrap ">
            <div className="text-white">
              <h1 className="text-3xl font-bold">{course.course_title}</h1>
              <p className="text-lg">{course.tagline}</p>
              <p className="text-lg">Rating: {course.course_rating}</p>
              {/* Add creator details here */}
              <p className="text-lg">Creator: {course.firstname}</p>
            </div>
          </div>
        </div>
        {/* Objectives */}
        <div className="m-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">What You Will Learn</h2>
          <ul className="list-disc list-inside">
            {course.objectives &&
              course.objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">
                  {objective}
                </li>
              ))}
          </ul>
        </div>
        {/* Course Content */}
        <div className="m-10 flex justify-center">
          <h2 className="text-2xl font-bold mb-2">Course Content</h2>
          {course.content &&
            course.content.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <ul className="list-disc list-inside">
                  {section.lectures &&
                    section.lectures.map((lecture) => (
                      <li key={lecture.id} className="text-gray-700">
                        {lecture.title}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        {/*Additional Information */}
        <div className="m-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Requirements</h2>
          <ul className="list-disc list-inside">
            {course.requirements &&
              course.requirements.map((requirements, index) => (
                <li key={index} className="text-gray-700">
                  {requirements}
                </li>
              ))}
          </ul>
        </div>

        {/* Student Interaction */}
        <div className="m-10 flex justify-center">
          <h2 className="text-2xl font-bold mb-2">Student Interaction</h2>
          {/*  Q&A Section, Discussion Forums, etc. can be added here */}
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
