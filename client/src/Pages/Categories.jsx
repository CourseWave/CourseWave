import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";
import CourseCard from "../Components/CourseCard";
import SearchBar from "../Components/SearchBar";
import { fetchCourses } from "../Redux/CoursesSlice";
import { useLocation } from "react-router-dom";
import { useClickAway } from "@uidotdev/usehooks";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useClickAway(() => {
    setIsDropdownOpen(false);
  });

  const fetchData = () => {
    dispatch(fetchCategories());
    dispatch(fetchCourses());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCourses(courses);
      return;
    }

    // Filter courses based on the search term
    const filtered = courses.filter((course) => {
      const titleIncludesTerm = course.course_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryIncludesTerm = course.course_category
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

      const filteredCourse = courses.filter(
        (e) =>
          e.course_title.toLowerCase().includes(searchValue.toLowerCase()) ||
          e.course_category.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredCourses(filteredCourse || courses);
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, location]);

  return (
    <div>
      <div className="h-full bg-slate-200">
        <div className="flex-1 xl:p-10">
          <div className="px-10">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex flex-1">
                <SearchBar
                  defaultValue={searchTerm}
                  onValueChange={handleSearch}
                />
              </div>
              <div className="relative mt-6" ref={ref}>
                <button
                  className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen((prev) => !prev);
                  }}
                >
                  Sort By
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={`z-10 bg-white right-0 absolute divide-y divide-gray-100 rounded-lg shadow w-44 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        href="#"
                        className={`block px-4 py-2 hover:bg-gray-100 w-full ${
                          sortBy === "name" ? "text-blue-400" : ""
                        }`}
                        onClick={() => {
                          setSortBy("name");
                          setFilteredCourses(
                            courses
                              .filter((e) => !!e)
                              .sort((a, b) =>
                                a.course_title.localeCompare(b.course_title)
                              )
                          );
                        }}
                      >
                        Name
                      </button>
                    </li>

                    <li>
                      <button
                        href="#"
                        className={`block px-4 py-2 hover:bg-gray-100 w-full ${
                          sortBy === "category" ? "text-blue-400" : ""
                        }`}
                        onClick={() => {
                          setSortBy("category");
                          setFilteredCourses(
                            filteredCourses
                              .filter((e) => !!e)
                              .sort((a, b) =>
                                a.course_category.localeCompare(
                                  b.course_category
                                )
                              )
                          );
                        }}
                      >
                        Category Name
                      </button>
                    </li>

                    <li>
                      <button
                        href="#"
                        className={`block px-4 py-2 hover:bg-gray-100 w-full ${
                          sortBy === "teacher" ? "text-blue-400" : ""
                        }`}
                        onClick={() => {
                          setSortBy("teacher");
                          setFilteredCourses(
                            filteredCourses
                              .filter((e) => !!e)
                              .sort((a, b) =>
                                a.course_author.localeCompare(b.course_author)
                              )
                          );
                        }}
                      >
                        Teacher Name
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {filteredCourses.length === 0 && (
              <>
                {<p className="text-center text-2xl mt-10">No Result Found </p>}
              </>
            )}
            <div className="mt-10 xl:px-20 overflow-y-auto">
              <CourseCard
                courses={filteredCourses
                  .filter((e) => !!e)
                  .sort((a, b) => a.course_title.localeCompare(b.course_title))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
