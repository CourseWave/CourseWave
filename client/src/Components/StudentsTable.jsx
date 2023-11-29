// StudentsTable.js
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
      
    }
  , [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Students Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstname}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
