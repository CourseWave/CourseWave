import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Redux/UsersSlice";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.user.students);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (studentId) => {
    try {
      // Add logic to dispatch an action to delete the student with the given ID
      // For example: await dispatch(deleteStudent(studentId));

      console.log(`Deleting student with ID: ${studentId}`);
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle errors or show user-friendly messages
    }
  };

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg mb-4">
      <div className="p-5 flex justify-between items-center text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-900">
        Students Table
      </div>
      <div className="text-sm text-left rtl:text-right p-5 bg-white dark:bg-gray-700 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
            {students?.map((student) => (
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{student.id}</td>
                <td className="px-6 py-4">{student.firstname}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-red-700 hover:underline" onClick={() => handleDelete(student.id)}>
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

export default StudentsTable;
