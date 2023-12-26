import React, { useEffect } from "react";
import heroSection from "../Assets/heroSection.png";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../Redux/CoursesSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = () => {
    dispatch(fetchCourses());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      return;
    }

    // Redirect to the category page with the filtered courses
    navigate("/CategoryPage", { state: { searchTerm: searchTerm } });
  };

  return (
    <div className="relative bg-gray-900 h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden">
      <div className=" ">
        <img
          src={heroSection}
          alt="img"
          className="absolute md:block md:h-[25rem] md:w-[25rem] md:top-[10rem] lg:h-[25rem] lg:w-[25rem] xl:h-[30rem] xl:w-[30rem] md:-right-[2rem] xl:right-[6rem] xl:top-[10rem] hidden xl:block"
        ></img>
      </div>

      <div className="text-white text-center z-10 flex flex-col ml-3">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold mb-4 md:w-[70%] xl:w-[60%]">
          Join <span className="text-[#00ffc2]">CourseWave</span> and start your
          journey with our amazing tutors across the world
        </h1>
        <div className="flex items-center md:ml-40 xl:ml-60 w-[20rem]">
          <SearchBar isHomePage onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
