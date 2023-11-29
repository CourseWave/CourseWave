import React, { useEffect, useState } from 'react'
import forhero from '../Assets/forhero.png'
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../Redux/CoursesSlice';
import { useNavigate } from 'react-router-dom'; 

 const HeroSection = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courses = useSelector((state) => state.Courses.Courses);
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

    // Filter courses based on the search term
    const filtered = courses.filter((course) => {
      const titleIncludesTerm = course.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryIncludesTerm = course.category?.toLowerCase().includes(searchTerm.toLowerCase());

      return titleIncludesTerm || categoryIncludesTerm;
    });

    setFilteredCourses(filtered);

    // Redirect to the category page with the filtered courses
    navigate('/CategoryPage', { state: filteredCourses });
  };
  return (
    <div className="relative bg-[#0F2355] h-[600px] md:h-[400px] lg:h-[550px] flex items-center justify-center">
        <div className=" ">
          <div className="absolute md:h-[18rem] md:w-[18rem] lg:h-[22rem] lg:w-[22rem] right-[11rem] md:right-[6rem] lg:right-[8rem] top-20 md:top-24 lg:top-32 bg-[#6F97FF] rounded-full"></div>
          <div className="absolute md:h-[14rem] md:w-[14rem] lg:h-[18rem] lg:w-[18rem] right-[13rem] md:right-[8rem] lg:right-[10rem] top-28 md:top-32 lg:top-40 bg-[#466AC6] rounded-full"></div>
          <div className="absolute md:h-[10rem] md:w-[10rem] lg:h-[14rem] lg:w-[14rem] right-[15rem] md:right-[10rem] lg:right-[12rem] top-36 md:top-40 lg:top-48 bg-[#0F2355] rounded-full"></div>
          {/* <img src={forhero} alt="img" className='absolute md:h-[10rem] md:w-[10rem] lg:h-[22rem] lg:w-[27rem] right-[15rem] md:right-[10rem] lg:right-[8rem] top-36 md:top-40 lg:top-[9rem] '></img> */}
        </div>

        <div className="text-white text-center z-10 flex flex-col ml-3">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:w-[50%] lg:w-[60%]">
            Join <span className="text-[#00FFC2]">CourseWave</span> and start
            your journey with our amazing tutors across the world
          </h1>
          <div className="flex items-center ml-[6rem] ">
          <SearchBar onSearch={handleSearch}/>
          </div>
         
        </div>
      </div>
  )
}

export default HeroSection;
