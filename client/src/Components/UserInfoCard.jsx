
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers , fetchStudents } from '../Redux/UsersSlice';

const UserInfoCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a fetchUser action
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log('Error fetching user data', error.message);
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a fetchUser action
        await dispatch(fetchStudents());
      } catch (error) {
        console.log('Error fetching user data', error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  // Assuming you have a user slice in your Redux store
  const user = useSelector((state) => state.user);

  // State to manage the visibility of user info
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

  const toggleUserInfo = () => {
    setIsUserInfoVisible(!isUserInfoVisible);
  };

  return (
    <div className="mb-4">
      <button onClick={toggleUserInfo} className="text-blue-500 hover:underline focus:outline-none">
        {isUserInfoVisible ? 'Hide User Info' : 'Show User Info'}
      </button>
      {isUserInfoVisible && user && (
        <>
          <h2 className="text-xl font-bold mb-2">User Info</h2>
          <p className="text-gray-700">Name: {user.firstname}</p>
          <p className="text-gray-700">Email: {user.email}</p>
          {/* Additional user information can be displayed here */}
          {/* Add a photo of the user */}
          {user.photo && (
            <img src={user.image} alt="User" className="mt-4 rounded-full w-20 h-20" />
          )}
        </>
      )}
    </div>
  );
};

export default UserInfoCard;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStudents, fetchTeachers } from '../Redux/UsersSlice';

// const UserInfoCard = () => {
//   const dispatch = useDispatch();

//   // Assuming you have an authentication slice in your Redux store
//   const authUser = useSelector((state) => state.auth.user);

//   // State to manage the visibility of user info
//   const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Assuming you have a fetchStudents and fetchTeachers action in your UsersSlice
//         await dispatch(fetchStudents());
//         await dispatch(fetchTeachers());
//       } catch (error) {
//         console.log('Error fetching user data', error.message);
//       }
//     };
//     if (authUser) {
//       fetchData();
//     }
//   }, [dispatch, authUser]);

//   const { students, teachers } = useSelector((state) => state.users);

//   const toggleUserInfo = () => {
//     setIsUserInfoVisible(!isUserInfoVisible);
//   };

//   return (
//     <div className="mb-4">
//       <button onClick={toggleUserInfo} className="text-blue-500 hover:underline focus:outline-none">
//         {isUserInfoVisible ? 'Hide User Info' : 'Show User Info'}
//       </button>
//       {isUserInfoVisible && authUser && (
//         <>
//           <h2 className="text-xl font-bold mb-2">User Info</h2>
//           <p className="text-gray-700">Name: {authUser.firstname}</p>
//           <p className="text-gray-700">Email: {authUser.email}</p>
//           {/* Display student and teacher information */}
//           <h3 className="text-lg font-bold mb-2">Student Data:</h3>
//           {students.map((student) => (
//             <div key={student.id}>
//               <p className="text-gray-700">Student ID: {student.id}</p>
//               {/* Display other student information as needed */}
//             </div>
//           ))}
//           <h3 className="text-lg font-bold mb-2">Teacher Data:</h3>
//           {teachers.map((teacher) => (
//             <div key={teacher.id}>
//               <p className="text-gray-700">Teacher ID: {teacher.id}</p>
//               {/* Display other teacher information as needed */}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserInfoCard;

