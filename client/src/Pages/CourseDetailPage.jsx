import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourses } from '../Redux/CoursesSlice';

const CourseDetailPage = () => {
  // Assuming you have a Redux store with courses and categories
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating asynchronous data fetching using Redux actions
        await dispatch(fetchCourses()); // Assuming you have a fetchCourses action

        // Once data is fetched, set isDataLoaded to true
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [dispatch]); 

  const course = isDataLoaded ? courses.find((c) => c.id === parseInt(courseId)) : null;



  if (!isDataLoaded) {
    return <div className="text-center text-gray-500 font-bold mt-8">Loading...</div>;
  }
  if (!course) {
    return <div className="text-center text-red-500 font-bold mt-8">Course not found</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 bg-blue-500">
        {/* Left Column - Course Image */}
        <div className="mb-8 m-5 ml-10">
          <img src={course.image} alt={course.title} className="w-full h-auto rounded-md shadow-md" />
        </div>

        {/* Right Column - Course Details */}
        <div className="space-y-4 border-2 z-50 m-5 bg-slate-500 p-5 w-80">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-700">{course.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Rating: {course.rating}</span>
            <span className="text-gray-700">Students: {course.students}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Price: ${course.price}</span>
            {/* Add to Cart/Wishlist button can be added here */}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Course Content</h2>
        {course.content && course.content.map((section, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mb-2">{section.title}</h3>
            <ul className="list-disc list-inside">
              {section.lectures && section.lectures.map((lecture) => (
                <li key={lecture.id} className="text-gray-700">{lecture.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Requirements</h2>
        <p className="text-gray-700">{course.requirements}</p>

        <h2 className="text-2xl font-bold mb-2">Target Audience</h2>
        <p className="text-gray-700">{course.targetAudience}</p>
      </div>

      {/* Additional Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Additional Features</h2>
        {/* Quizzes, assignments, certificates, etc. can be added here */}
      </div>

      {/* Student Interaction */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Student Interaction</h2>
        {/* Q&A Section, Discussion Forums, etc. can be added here */}
      </div>

      {/* Additional Resources */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Additional Resources</h2>
        {/* Downloadable materials, external links, etc. can be added here */}
      </div>
    </div>

    </>
  );
};

export default CourseDetailPage;
