import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesSlice, { fetchCategories } from "../Redux/CategoriesSlice";
import CourseCard from "../Components/CourseCard";
import SearchBar from "../Components/SearchBar";
import { fetchCourses } from "../Redux/CoursesSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);

  useEffect(() => {
    dispatch(fetchCategories()); 
  }, [dispatch]);

 
  console.log(courses);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <img src="https://i.pinimg.com/564x/e3/dd/74/e3dd74701e3a69c6d01c86737303ad51.jpg" alt="" 
      className="w-full h-[35rem] md:h-[45rem] xl:h-[40rem]"/>
      <div className="bg-cover bg-center h-40 md:h-60 xl:h-96 relative">
        <div className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-96 ">
        <SearchBar onSearch={handleSearch} />
      </div>
      </div>

      <div className="bg-[#0F2355] text-white py-4 mt-[-11rem] md:mt-[-15rem] xl:mt-[-24rem] rounded-b-3xl">
        <div className="flex items-center justify-center flex-wrap space-x-4">   
          <span>Filter: All</span>
          <span>Development</span>
          <span>Design</span>
          <span>IT and Software</span>
          <span>Online Classes</span>
          <span>Self Development</span>
          <span>Marketing</span>
        </div>
      </div>

      {/* Course Cards Section */}
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
       
        {courses &&
        courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;