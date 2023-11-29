import React, { useState } from 'react';
import StudentForm from '../Components/StudentForm';
import TeacherForm from '../Components/TeacherForm';

const RegistrationPage = () => {
  const [registrationType, setRegistrationType] = useState(null);

  const handleTypeSelection = (type) => {
    setRegistrationType(type);
  };

  return (
    <div className="container mx-auto h-full">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Choose your registration type:</h2>
      <div className="flex justify-center mb-5">
        <button
          className="mr-4 px-4 py-2 bg-[#0F2355] text-white rounded hover:bg-blue-700 flex justify-center"
          onClick={() => handleTypeSelection('student')}
        >
          SignUp as Student
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex justify-center"
          onClick={() => handleTypeSelection('teacher')}
        >
          SignUp as Teacher
        </button>
      </div>
      
      {registrationType === 'student' && <StudentForm />}
      {registrationType === 'teacher' && <TeacherForm />}
      
    </div>
  );
};

export default RegistrationPage;
