import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourses,
  fetchSections,
  fetchSectionVideos,
} from "../Redux/CoursesSlice";
import { addToCart } from "../Redux/CartSlice";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const sections = useSelector((state) => state.Courses.sections);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sectionVideos, setSectionVideos] = useState([]);

  const [course, setCourse] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const courseToAdd = courses.find((c) => c.course_id === parseInt(courseId));

    if (courseToAdd) {
      dispatch(addToCart(courseToAdd));
      alert("Course added to cart!");
    } else {
      alert("Course not found.");
    }
  };

  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        await dispatch(fetchSections(courseId));
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchCoursesList();
  }, [dispatch, courseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCourses());
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCourse(courses.find((c) => c.course_id === parseInt(courseId)));
  }, [courses, courseId]);

  if (!isDataLoaded) {
    return (
      <div className="text-center text-gray-500 font-bold mt-8">Loading...</div>
    );
  }

  if (!course) {
    return (
      <div className="text-center text-red-500 font-bold mt-8">
        Course not found
      </div>
    );
  }

  const onShowContent = (courseSectionId) => {
    setActiveSection(
      activeSection === courseSectionId ? null : courseSectionId
    );

    dispatch(fetchSectionVideos(courseSectionId))
      .then((response) => {
        const videos = response.payload?.sectionVideos || [];
        setSectionVideos(videos);
      })
      .catch((error) => {
        console.error("Error fetching section videos:", error);
        setSectionVideos([]);
      });
  };

  return (
    <div className="container flex flex-wrap justify-center p-2">
      {/*------------------------ Right column ------------------------*/}
      <div className="flex flex-col flex-wrap p-10 border-2 w-1/6 h-[30rem] rounded-2xl bg-white fixed right-[100px]">
        <h1 className="text-3xl font-bold text-black">{course.course_title}</h1>
        <p className="text-black">{course.course_description}</p>
        <div className="flex justify-center flex-col">
          <span className="text-black">Rating: {course.course_rating}</span>
          <span className="text-black">Price: ${course.course_price}</span>
        </div>

        <div className="flex justify-center flex-col gap-5">
          <button
            className="text-white bg-indigo-900 border-2 rounded-lg h-10"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className="text-white border-2 bg-green-700 rounded-lg h-10">
            Enroll Now
          </button>
        </div>
      </div>
      {/*------------------------ Left column ------------------------*/}
      <div className="flex-1 container">
        <div className="flex flex-wrap bg-black h-[16rem] justify-center">
          <div className="m-10 flex flex-wrap ">
            <div className="text-white">
              <h1 className="text-3xl font-bold">{course.course_title}</h1>
              <p className="text-lg">{course.course_tagline}</p>
              <p className="text-lg">Rating: {course.course_rating}</p>
              <p className="text-lg">
                Creator: {course.firstname}
                {course.lastName}
              </p>
            </div>
          </div>
        </div>

        <div className="m-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">What You Will Learn</h2>
          <ul className="list-disc list-inside">
            {course.course_objectives &&
              course.course_objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">
                  {objective}
                </li>
              ))}
          </ul>
        </div>

        {/* Course Content */}
        <div className="m-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Course Content</h2>
          {sections && (
            <div className="mb-4 w-[30rem]">
              {sections.map((section, index) => (
                <div
                  key={section.course_section_id}
                  className={`flex flex-col m-3 rounded-lg bg-slate-200 font-medium text-gray-500 shadow-lg focus:ring-0 dark:text-black hover:bg-blue-100 dark:hover:bg-slate-100  ${
                    activeSection === section.course_section_id
                      ? "bg-blue-100 "
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-medium rtl:text-right text-gray-500 rounded-t-xl  dark:border-gray-700 dark:text-gray-400"
                    onClick={() => onShowContent(section.course_section_id)}
                  >
                    <span>{section.section_name}</span>
                    <svg
                      className={`w-3 h-3 rotate-180 shrink-0 ${
                        activeSection === section.course_section_id
                          ? "rotate-180"
                          : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                  {activeSection === section.course_section_id && (
                    <div className="p-5 w-[20rem] text-black">
                      {sectionVideos?.length > 0 &&
                        sectionVideos.map((video) => (
                          <p key={video.video_id}> {video?.video_title}</p>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="m-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Requirements</h2>
          <ul className="list-disc list-inside">
            {course.course_requirements &&
              course.course_requirements.map((requirement, index) => (
                <li key={index} className="text-gray-700">
                  {requirement}
                </li>
              ))}
          </ul>
        </div>

        <div className="m-10 flex justify-center">
          <h2 className="text-2xl font-bold mb-2">Student Interaction</h2>
          {/* Additional sections for student interaction can be added here */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
