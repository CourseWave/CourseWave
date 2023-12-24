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
  const location = useLocation(); // Use useLocation to get the location object

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
      setFilteredCourses(courses)
      return;
    }

    // Filter courses based on the search term
    const filtered = courses.filter((course) => {
      const titleIncludesTerm = course.course_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryIncludesTerm = course.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return titleIncludesTerm || categoryIncludesTerm;
      // Add more conditions if needed
    });

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    if (location.state?.searchTerm?.length && courses.length) {
      const searchValue = location.state?.searchTerm;
      
      setSearchTerm(searchValue);

      const filteredCourse = courses.filter((e) =>
        e.course_title.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredCourses(filteredCourse || courses);
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, location]);

  const handleCategoryClick = (categoryType) => {
    // const filtered = courses.filter((course) => course.type === categoryType);
    // setFilteredCourses(categoryType === "All" ? courses : filtered);
    // setSelectedCategory(categoryType);
  };

  return (
    <div className="flex h-full bg-white ">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white py-16 md:w-1/4 lg:w-1/5">
        <div className="px-2">
          <SearchBar defaultValue={searchTerm} onValueChange={handleSearch} />
        </div>
        <div className="py-10 pl-5">
          <button onClick={() => handleCategoryClick("All")}>
            Filter: All
          </button>
          <h3 className="">Categories</h3>
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
      <div className="flex-1 p-8 bg-slate-200 h-[calc(100vh-65px)] overflow-y-auto">
      {
        filteredCourses.length === 0 && (<>
        {
          <p className="text-center text-3xl">No Result </p>
        }
        </>)
      }
        <CourseCard courses={filteredCourses} />
      </div>
    </div>
  );
};

export default CategoryPage;
