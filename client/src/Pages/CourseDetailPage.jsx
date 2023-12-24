import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourses,
  fetchSections,
  fetchSectionVideos,
} from "../Redux/CoursesSlice";
import { addToCartAsync } from "../Redux/CartSlice";
import { fetchStudents, fetchTeachers } from "../Redux/UsersSlice";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const sections = useSelector((state) => state.Courses.sections);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sectionVideos, setSectionVideos] = useState({});

  const [course, setCourse] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { status: userStatus, error: userError } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the actions to fetch students, teachers, and courses
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddToCart = async () => {
    const courseToAdd = courses.find((c) => c.course_id === parseInt(courseId));

    if (courseToAdd) {
      try {
        const courseToAddId = courseId;
        await dispatch(addToCartAsync(courseToAddId));
        alert("Course added to cart!");
      } catch (error) {
        console.error("Failed to add course to cart:", error);
        alert("Failed to add course to cart");
      }
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

    if (!sectionVideos[courseSectionId]) {
      dispatch(fetchSectionVideos(courseSectionId))
        .then((response) => {
          const videos = response.payload?.sectionVideos || [];
          setSectionVideos((prevVideos) => ({
            ...prevVideos,
            [courseSectionId]: videos,
          }));
        })
        .catch((error) => {
          console.error("Error fetching section videos:", error);
          setSectionVideos((prevVideos) => ({
            ...prevVideos,
            [courseSectionId]: [],
          }));
        });
    }
    console.log("Section Videos:", sectionVideos); // Add this line to check the state
  };

  function getCourseImg(image) {
    return encodeURI(`http://localhost:5000/${image.replace("\\", "/")}`);
  }

  return (
    <div className="flex flex-wrap font-[Poppins]">
      {/* Main Content */}
      <div className="flex flex-col container md:w-3/4 lg:w-4/5 ">
        <div
          className="flex flex-col relative after:fixed after:w-full after:h-[calc(100vh-64px)] after:bg-[#0707078a] h-[calc(100vh-64px)] bg-fixed w-[100%] bg-cover bg-center overflow-y-auto scroll-smooth"
          style={{
            backgroundImage: `url(${getCourseImg(course.course_image)})`,
          }}
        >
          <div className="text-white z-10 m-auto my-[25%]">
            <h2 className="text-8xl font-bold first-letter:uppercase border-b">
              {course.course_title}
            </h2>
            <div className="pl-2 flex flex-col gap-2 mt-2">
              <p className="text-lg text-gray-100">
                By: {course.course_author}
              </p>
            </div>
          </div>

          <div className="m-10 flex flex-col items-center z-10">
          <h2 className="text-2xl font-bold mb-2 text-white">
              Course Description
            </h2>
            <p className="text-white">{course.course_description}</p>
          </div>
          
          <div className="m-10 flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-2 text-white">
              What You Will Learn
            </h2>
            <ul className="list-disc list-inside">
              {course.course_objectives &&
                course.course_objectives.map((objective, index) => (
                  <li key={index} className="text-gray-200">
                    {objective}
                  </li>
                ))}
            </ul>
          </div>

          <div className="m-10 flex flex-col items-center z-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Course Content</h2>
            {sections && (
              <div className="mb-4 w-[30rem]">
                {sections.map((section) => (
                  <div
                    key={section.course_section_id}
                    className={`flex flex-col m-3 rounded-lg bg-[#1e293b] font-medium text-gray-500 shadow-lg focus:ring-0 dark:text-black hover:bg-[#314360] ${
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
                        {sectionVideos[section.course_section_id]?.length >
                        0 ? (
                          <ul>
                            {sectionVideos[section.course_section_id].map(
                              (video) => (
                                <li key={video.video_id}>
                                  <video width="320" height="240" controls>
                                    <source
                                      src={video.video_link}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                  <p>{video.video_title}</p>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p>No videos available.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="m-10 flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-2 text-white">Requirements</h2>
            <ul className="list-disc list-inside">
              {course.course_requirements &&
                course.course_requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-200">
                    {requirement}
                  </li>
                ))}
            </ul>
          </div>
          <div className="m-10 flex justify-center z-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Student Interaction</h2>
            {/* Additional sections for student interaction can be added here */}
          </div>
        </div>

        {/* Course Content */}
      </div>
      {/* Sidebar */}
      <div className="flex flex-col p-10  md:w-1/4 lg:w-1/5 bg-gray-900 gap-8 border-t-2 border-gray-600 z-10">
        <div className="flex flex-col p-5 gap-5">
          <h1 className="text-3xl font-bold text-white">
            {course.course_title}
          </h1>
          <span className="text-white">Rating: {course.course_rating}</span>
          <span className="text-white">Price: ${course.course_price}</span>
        </div>

        <div className="flex justify-center flex-col gap-5">
          <button
            className="text-white bg-[#00ffc2] rounded-lg h-10 hover:scale-105 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={userStatus === "failed"}
          >
            Add to Cart
          </button>
          <button
            className="text-white bg-[#1e293b] rounded-lg h-10 hover:scale-105 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            disabled={userStatus === "failed"}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
