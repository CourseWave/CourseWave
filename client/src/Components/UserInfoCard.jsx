import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, fetchStudents } from "../Redux/UsersSlice";
import Cookies from "js-cookie";

const UserInfoCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurruntUsers] = useState(null);

  useEffect(() => {
    if (!user) return;
    let token = Cookies.get("userInfo");
    token = JSON.parse(token);
    if (token.trainer) {
      setCurruntUsers(
        user.teachers.trainers.find(
          (c) => c.trainer_id === parseInt(token.trainer.trainer_id)
        )
      );
    } else {
      setCurruntUsers(
        user.students.users.find(
          (c) => c.user_id === parseInt(token.student.user_id)
        )
      );
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a fetchUser action
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a fetchUser action
        await dispatch(fetchStudents());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, []);

  // Assuming you have a user slice in your Redux store

  return (
    <div className="mb-4">
      {currentUser && (
        <>
          <h2 className="text-xl font-bold mb-2">User Info</h2>
          <p className="text-gray-700">Name: {currentUser.firstname}</p>
          <p className="text-gray-700">Email: {currentUser.email}</p>
          {/* Additional user information can be displayed here */}
          {/* Add a photo of the user */}
        </>
      )}
    </div>
  );
};

export default UserInfoCard;
