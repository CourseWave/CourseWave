import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, fetchStudents } from "../Redux/UsersSlice";
import Cookies from "js-cookie";

const UserInfoCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    let token = Cookies.get("userInfo");
    if (!token) return;
    token = JSON.parse(token);
    if (token.trainer) {
      setCurrentUser(
        user.teachers.find(
          (c) => c.trainer_id === parseInt(token.trainer.trainer_id)
        )
      );
    } else {
      setCurrentUser(
        user.students.find((c) => c.user_id === parseInt(token.user.user_id))
      );
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStudents());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleEdit = () => {
    // Add your logic for editing user information here
    console.log("Editing user information", currentUser);
  };

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg mb-4">
      <div className="p-5 flex justify-between items-center text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-900">
        User Info
        <button
          className="hover:underline text-blue-600 dark:text-blue-500"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
      {currentUser && (
        <div className="text-sm text-left rtl:text-right text-white p-5 bg-white dark:bg-gray-700">
          <p className="mb-2">
            <span className="font-bold">Name:</span> {currentUser.firstname}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {currentUser.email}
          </p>
          {/* Additional user information can be displayed here */}
          {/* Add a photo of the user */}
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;

