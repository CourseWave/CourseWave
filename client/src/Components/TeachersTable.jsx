import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrainerAsync, fetchTeachers } from "../Redux/UsersSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const TeachersTable = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.user.teachers);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch]);

  const handleDelete = async (teacherId) => {
    try {
      dispatch(deleteTrainerAsync(teacherId));
      toast.success("Teacher Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="p-2">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">Teachers List</h3>
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
              <th scope="col" className="px-6 py-3">
                field
              </th>
              <th scope="col" className="px-6 py-3">
                degree
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          {teachers.length === 0 && (
            <p className="text-2xl text-black w-full">No Teachers Available</p>
          )}
          <tbody>
            {teachers?.map((teacher) => (
              <tr
                key={teacher.trainer_id}
                className="border-b bg-gray-800 border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {teacher.firstname} {teacher.lastname}
                </th>
                <td className="px-6 py-4 text-white">{teacher.email}</td>

                <td className="px-6 py-4 text-white">{teacher.field}</td>
                <td className="px-6 py-4 text-white">{teacher.degree}</td>

                <td className="flex px-6 py-4 space-x-2 justify-center text-white">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      handleDelete(teacher.trainer_id);
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

export default TeachersTable;
