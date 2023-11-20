// CourseCard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchCourses} from '../Redux/CoursesSlice'



const CourseCard = ({ courseId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses()); 
  }, [dispatch]);

  const course = useSelector((state) =>
  state.Courses.Courses.find((course) => course.id === courseId)
);

if (!course) {
  return <div>Loading...</div>; 
}

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover mb-4 rounded-md" />
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">{course.category}</p>
    </div>
  );
};

export default CourseCard;
