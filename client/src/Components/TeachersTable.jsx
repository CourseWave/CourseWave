import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../Redux/UsersSlice";

const TeachersTable = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.user.teachers);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch]);

  const handleDelete = async (teacherId) => {
    try {
      // Add logic to dispatch an action to delete the teacher with the given ID
      // For example: await dispatch(deleteTeacher(teacherId));

      console.log(`Deleting teacher with ID: ${teacherId}`);
    } catch (error) {
      console.error('Error deleting teacher:', error);
      // Handle errors or show user-friendly messages
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
      <div className="p-5 flex justify-between items-center text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-900">
        Teachers Table
      </div>
      <div className="text-sm text-left rtl:text-right p-5 bg-white dark:bg-gray-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {status === "failed" && (
              <tr>
                <td colSpan="3">Error: {error}</td>
              </tr>
            )}
            {teachers?.map((teacher) => (
              <tr key={teacher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{teacher.id}</td>
                <td className="px-6 py-4">{teacher.firstname}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-red-700 hover:underline" onClick={() => handleDelete(teacher.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersTable;
