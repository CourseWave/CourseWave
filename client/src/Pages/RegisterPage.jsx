import React, { useState } from "react";
import StudentForm from "../Components/StudentForm";
import TeacherForm from "../Components/TeacherForm";

const RegistrationPage = () => {
  const [registrationType, setRegistrationType] = useState("student");

  const handleTypeSelection = (type) => {
    setRegistrationType(type);
  };

  return (
    <div className="container mx-auto h-full">
      <div className="flex justify-center mt-5 mb-0 flex-wrap">
        <button
          className={`px-4 py-2 ${
            registrationType === "student"
              ? "bg-indigo-700 text-white"
              : "text-indigo-800"
          } rounded-l flex justify-center border-2 border-indigo-700`}
          onClick={() => handleTypeSelection("student")}
        >
          SignUp as Student
        </button>
        <button
          className={`px-4 py-2 ${
            registrationType === "teacher"
              ? "bg-indigo-700 text-white"
              : "text-indigo-800"
          } rounded-r flex justify-center border-2 border-indigo-700`}
          onClick={() => handleTypeSelection("teacher")}
        >
          SignUp as Teacher
        </button>
      </div>

      {registrationType === "student" && <StudentForm />}
      {registrationType === "teacher" && <TeacherForm />}
    </div>
  );
};

export default RegistrationPage;
