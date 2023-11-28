// CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";
import CourseCard from "../Components/CourseCard";
import SearchBar from "../Components/SearchBar";
import { fetchCourses } from "../Redux/CoursesSlice";
import { useLocation } from "react-router-dom";
const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const courses = useSelector((state) => state.Courses.Courses);
  const location = useLocation();  // Use useLocation to get the location object

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const fetchData = () => {
     dispatch(fetchCategories());
     dispatch(fetchCourses());
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      return;
    }
    // Filter courses based on the search term
    const filtered = courses.filter((course) => {
      const titleIncludesTerm = course.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryIncludesTerm = course.category?.toLowerCase().includes(searchTerm.toLowerCase());
  
      return titleIncludesTerm || categoryIncludesTerm;
      // Add more conditions if needed
    });
  
    setFilteredCourses(filtered);
  };
  
  useEffect(() => {
    if (location.state && location.state.filteredCourses) {
      // Use the filteredCourses from location state
      setFilteredCourses(location.state.filteredCourses);
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, location.state]);

  useEffect(() => {
    if (!courses.length) return;
    setFilteredCourses(courses);
  }, [courses]);

  const handleCategoryClick = (categoryType) => {
    const filtered = courses.filter((course) => course.type === categoryType);
    setFilteredCourses(categoryType == "All" ? courses : filtered);
    setSelectedCategory(categoryType);
  };

  return (
    <>
      <div className="bg-gray-100 ">
        <img
          src="https://i.pinimg.com/564x/e3/dd/74/e3dd74701e3a69c6d01c86737303ad51.jpg"
          alt=""
          className="w-full h-[35rem] md:h-[45rem] xl:h-[40rem]"
        />
        <div className="bg-cover bg-center h-40 md:h-60 xl:h-96">
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-96">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className="bg-[#0F2355] text-white py-4 mt-[-11rem] md:mt-[-15rem] xl:mt-[-24rem] rounded-b-3xl">
          <div className="flex items-center flex-wrap space-x-4 justify-around">
            <button onClick={() => handleCategoryClick("All")}>
              Filter: All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.type)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
        {/* Course Cards Section */}
        <div className="">
          <CourseCard courses={filteredCourses} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
