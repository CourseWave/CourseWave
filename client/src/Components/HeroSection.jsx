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
    <div className="relative bg-gray-900 h-[calc(100vh-120px)] flex items-center justify-center">
      <div className=" ">
        <img
          src={heroSection}
          alt="img"
          className="absolute  lg:h-[35rem] lg:w-[35rem] right-[15rem] lg:right-[6rem] top-36 lg:top-[7rem] hidden lg:block"
        ></img>
      </div>

      <div className="text-white text-center z-10 flex flex-col ml-3">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:w-[50%] lg:w-[60%]">
          Join <span className="text-[#00ffc2]">CourseWave</span> and start your
          journey with our amazing tutors across the world
        </h1>
        <div className="flex items-center ml-60 w-[20rem]">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
