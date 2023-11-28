// StudentProfile.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Redux/UsersSlice";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const userId = ""; // Replace with the actual user ID

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.user);

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Student Profile</h1>
      {user && (
        <div>
          <p className="text-gray-700">Name: {user.name}</p>
          <p className="text-gray-700">Email: {user.email}</p>
          {/* Additional student information can be displayed here */}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
