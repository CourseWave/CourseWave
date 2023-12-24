import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../Redux/UsersSlice";
import UserInfoCard from "../Components/UserInfoCard";
import MyLearning from "../Components/MyLearning";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("userInfo");
  const userId = ""; // Replace with the actual user ID

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [dispatch, userId]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="md:w-1/4 lg:w-1/5 h-[70rem] dark:bg-gray-900 p-10  shadow-md flex flex-col">
        {/* Add user image or avatar here if needed */}

        <button
          className={`py-2 mb-2 rounded text-white ${
            activeTab === "userInfo" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActiveTab("userInfo")}
        >
          User Info
        </button>

        <button
          className={`py-2 mb-2 rounded text-white ${
            activeTab === "myLearning" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActiveTab("myLearning")}
        >
          My Learning
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "userInfo" && <UserInfoCard />}
        {activeTab === "myLearning" && <MyLearning />}
      </div>
    </div>
  );
};

export default StudentProfile;
