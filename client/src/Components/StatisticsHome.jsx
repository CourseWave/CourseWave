import React, { useEffect, useState } from "react";

 const StatisticsHome = () => {
    const [data, setData] = useState({
        courses: 0,
        tutors: 0,
        students: 0,
      });
      const fetchData = async () => {
        try {
          // Replace with your actual API endpoint
          const response = await fetch("your-api-endpoint");
          const result = await response.json();
    
          // Update state with fetched data
          setData({
            courses: result.courses,
            tutors: result.tutors,
            students: result.students,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      // Fetch data when the component mounts
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <>
      <div className="bg-[#6F97FF] p-4 text-center text-white flex justify-around">
        <p>Courses: {data.courses.lenght}</p>
        <p>Tutors: {data.tutors.lenght}</p>
        <p>Students: {data.students.lenght}</p>
      </div>
    </>
  )
}
export default StatisticsHome;