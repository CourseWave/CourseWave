import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, fetchStudents } from "../Redux/UsersSlice";
import { toast } from "react-toastify";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.user.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (studentId) => {
    try {
      dispatch(deleteUserAsync(studentId));
      toast.success("Student Deleted Successfully");
    } catch (error) {
      toast.error(error);
      console.error("Error deleting Student:", error);
    }
  };

  return (
    <div className="p-2">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">Students List</h3>
      </div>

      <div className="text-gray-400 max-h-[22rem] overflow-y-auto rounded shadow-md">
        <table className="w-full text-sm text-left rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          {students.length === 0 && (
            <p className="text-2xl text-black w-full">No Students Available</p>
          )}
          <tbody>
            {students?.map((student) => (
              <tr
                key={student.user_id}
                className="border-b bg-gray-800 border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {student.firstname} {student.lastname}
                </th>
                <td className="px-6 py-4 text-white">{student.email}</td>

                <td className="flex px-6 py-4 space-x-2 justify-center text-white">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      handleDelete(student.user_id);
                    }}
                  >
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
