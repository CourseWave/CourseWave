import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";
import "react-toastify/dist/ReactToastify.css";
import { getAllPurchasedCoursesAsync } from "../Redux/CheckoutSlice";
import { StatisticsCard } from "../Components/TeacherStatistics";
import TeachersTable from "../Components/TeachersTable";
import StudentsTable from "../Components/StudentsTable";
import CategoriesTable from "../Components/CategoriesTable";
import CoursesTable from "../Components/CoursesTable";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);
  const teachers = useSelector((state) => state.user.teachers);
  const students = useSelector((state) => state.user.students);
  const categories = useSelector((state) => state.Categories.categories);
  const [activeTab, setActiveTab] = useState("teachers");

  useEffect(() => {
    // Fetch the purchased courses when the component mounts
    dispatch(getAllPurchasedCoursesAsync());
  }, []);

  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        await dispatch(fetchCourses());
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchCoursesList();
  }, [dispatch]);

  const tabs = {
    teachers: <TeachersTable />,
    students: <StudentsTable />,
    courses: <CoursesTable />,
    categories: <CategoriesTable />,
  };
  return (
    <div className="relative sm:rounded-lg mb-6 overflow-y-auto h-full">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-center flex-wrap">
        <StatisticsCard label={"Number of teachers"} value={teachers?.length} />
        <StatisticsCard label={"Number of students"} value={students?.length} />
        <StatisticsCard
          label={"Number of categories"}
          value={categories?.length}
        />
        <StatisticsCard label={"Number of courses"} value={courses?.length} />
      </div>

      <div>
        <div className="mb-1">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 text-lg border-b-2 transition-all delay-100 rounded-t-lg hover:border-blue-600 hover:text-blue-500 ${
                  activeTab === "teachers" && "border-blue-400 text-blue-600"
                }`}
                type="button"
                onClick={() => {
                  setActiveTab("teachers");
                }}
              >
                Teachers
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 text-lg border-b-2 transition-all delay-100  rounded-t-lg hover:border-blue-600 hover:text-blue-500 ${
                  activeTab === "students" && "border-blue-400 text-blue-600"
                }`}
                onClick={() => {
                  setActiveTab("students");
                }}
              >
                Students
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 text-lg transition-all delay-100  border-b-2 rounded-t-lg hover:border-blue-600 hover:text-blue-500 ${
                  activeTab === "categories" && "border-blue-400 text-blue-600"
                }`}
                type="button"
                onClick={() => {
                  setActiveTab("categories");
                }}
              >
                Categories
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 transition-all delay-100  text-lg border-b-2 rounded-t-lg hover:border-blue-600 hover:text-blue-500 ${
                  activeTab === "courses" && "border-blue-400 text-blue-600"
                }`}
                onClick={() => {
                  setActiveTab("courses");
                }}
              >
                Courses
              </button>
            </li>
          </ul>
        </div>
        <div className="">{tabs[activeTab]}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
