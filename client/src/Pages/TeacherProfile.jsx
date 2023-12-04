// // TeacherProfile.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../Redux/UsersSlice";
import UserInfoCard from "../Components/UserInfoCard";
import CoursesList from "../Components/CourseList";
import AddCourse from "../Components/AddCourse";
import SectionsList from "../Components/SectionsList";

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
    <div className="container p-8 bg-white rounded-lg  flex ">
      <div className="w-1/4 h-[40rem] bg-indigo-900 p-10 rounded-lg shadow-md flex flex-col">
        <img src={user.image} alt="qwer" />
        <button
          className={`w-full py-2 mb-2 rounded ${
            activeTab === "userInfo" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("userInfo")}
        >
          User Info
        </button>
        <button
          className={`w-full py-2 mb-2 rounded ${
            activeTab === "coursesList" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("coursesList")}
        >
          Courses List
        </button>
        <button
          className={`w-full py-2 mb-2 rounded ${
            activeTab === "addCourse" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("addCourse")}
        >
          Add Course
        </button>
        <button
          className={`w-full py-2 mb-2 rounded ${
            activeTab === "SectionsList" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("SectionsList")}
        >
          Sections List
        </button>
      </div>
      <div className="container  p-4  ">
        {activeTab === "userInfo" && <UserInfoCard />}
        {activeTab === "coursesList" && <CoursesList />}
        {activeTab === "addCourse" && <AddCourse />}
        {activeTab === "SectionsList" && <SectionsList />}
      </div>
    </div>
  );
};

export default TeacherProfile;
