// Dashboard.js
import React, { useState, useEffect } from "react";
import { useGetUserType } from "../hooks/useGetUserType";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const { userType } = useGetUserType();

  useEffect(() => {
    if (userType === "teacher") {
      setActiveTab("TeacherDashboard");
      return;
    }
    setActiveTab("adminDashboard");
  }, [userType]);

  return (
    <div className="">
      <main className="flex-1 p-8">
        {activeTab === "adminDashboard" && <AdminDashboard />}
        {activeTab === "TeacherDashboard" && <TeacherDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
