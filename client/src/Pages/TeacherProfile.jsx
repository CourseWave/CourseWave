import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../Redux/UsersSlice";
import UserInfoCard from "../Components/UserInfoCard";
import CoursesList from "../Components/CourseList";
import AddCourse from "../Components/AddCourse";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[15rem] h-[70rem] dark:bg-gray-900 p-10  shadow-md flex flex-col">
        <img src={user.image} alt="User Avatar" className="mb-4" />

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
            activeTab === "addCourse" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActiveTab("addCourse")}
        >
          Add Course
        </button>

        <button
          className={`py-2 mb-2 rounded text-white ${
            activeTab === "coursesList" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActiveTab("coursesList")}
        >
          Courses List
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "userInfo" && <UserInfoCard />}
        {activeTab === "coursesList" && <CoursesList />}
        {activeTab === "addCourse" && <AddCourse />}
      </div>
    </div>
  );
};

export default TeacherProfile;
