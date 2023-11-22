// CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";
import CourseCard from "../Components/CourseCard";
import SearchBar from "../Components/SearchBar";
import { fetchCourses } from "../Redux/CoursesSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const courses = useSelector((state) => state.Courses.Courses);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
        await dispatch(fetchCourses());
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error (e.g., display an error message)
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryClick = (categoryType) => {
    console.log(categoryType);
    setSelectedCategory(categoryType);
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <>
          <button onClick={()=>handleCategoryClick('aaaa')}> Click</button>
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
            <button key={category.id} onClick={() => handleCategoryClick(category.type)}>
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
