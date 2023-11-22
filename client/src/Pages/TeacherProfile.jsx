// // TeacherProfile.js

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTeachers } from '../Redux/UsersSlice';

// const TeacherProfile = () => {
//   const dispatch = useDispatch();
//   const userId = 1; // Replace with the actual user ID

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchTeachers());
//       } catch (error) {
//         console.log('Error fetching data', error.message);
//       }
//     };
//     fetchData();
//   }, [dispatch]);

//   const teachers = useSelector((state) => state.user.teachers);

//   if (!teachers.length) {
//     return <div className="text-center text-gray-500 font-bold mt-8">Loading...</div>;
//   }

//   const user = teachers.find((teacher) => teacher.id === userId);

//   if (!user) {
//     return <div className="text-center text-red-500 font-bold mt-8">Teacher not found</div>;
//   }

//   return (
//     <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-4">Teacher Profile</h1>
//       <div>
//         <p className="text-gray-700">Name: {user.firstname}</p>
//         <p className="text-gray-700">Email: {user.email}</p>
//         {/* Additional teacher information can be displayed here */}
//       </div>
//     </div>
//   );
// };

// export default TeacherProfile;


// TeacherProfile.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../Redux/UsersSlice';

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log('Error fetching data', error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  // Function to handle form submission
  const handleSubmit = (formData) => {
    // Dispatch an action to add the new course using the form data
    // For example: dispatch(addCourse(formData));
    // You'll need to implement the addCourse action in your Redux slice
    // Reset the form or close it after successful submission
    setShowForm(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-200">
        {/* Teacher Info */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Teacher Info</h2>
          {user && (
            <div>
              <p className="text-gray-700">Name: {user.firstname}</p>
              <p className="text-gray-700">Email: {user.email}</p>
              {/* Additional teacher information can be displayed here */}
            </div>
          )}
        </div>

        {/* Courses List */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">My Courses</h2>
          {/* Display a list of courses taught by the teacher */}
          {/* For example: user.courses.map(course => <div key={course.id}>{course.name}</div>) */}
        </div>

        {/* Add New Course Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New Course
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">
        {/* Form for Adding a New Course */}
        {showForm && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            {/* Your form fields go here */}
            {/* Example input for Course Name */}
            <div className="mb-4">
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                // Add state and onChange handler for the input
              />
            </div>
            {/* Add other input fields based on your requirements */}

            {/* Submit Button */}
            <button
              onClick={() => handleSubmit(formData)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
