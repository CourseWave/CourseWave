import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers , fetchStudents } from '../Redux/UsersSlice';
import { fetchCourses } from '../Redux/CoursesSlice';

const CoursesList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Assuming you have a fetchUser action
          await dispatch(fetchTeachers());
        } catch (error) {
          console.log('Error fetching user data', error.message);
        }
      };
      fetchData();
    }, [dispatch]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Assuming you have a fetchUser action
          await dispatch(fetchStudents());
        } catch (error) {
          console.log('Error fetching user data', error.message);
        }
      };
      fetchData();
    }, [dispatch]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(fetchCourses());
        } catch (error) {
          console.log('Error fetching user data', error.message);
        }
      };
      fetchData();
    }, [dispatch]);

  const courses = useSelector((state) => state.Courses.courses);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Courses List</h2>
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="mb-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              {/* Add more details about the course as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CoursesList;
