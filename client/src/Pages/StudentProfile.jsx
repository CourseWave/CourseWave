// StudentProfile.js

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../Redux/UsersSlice";
import UserInfoCard from "../Components/UserInfoCard";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const userId = ""; // Replace with the actual user ID

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [dispatch, userId]);

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Student Profile</h1>
      <UserInfoCard />
    </div>
  );
};

export default StudentProfile;
