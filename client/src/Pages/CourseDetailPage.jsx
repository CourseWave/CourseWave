import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourses,
  fetchSections,
  fetchSectionVideos,
} from "../Redux/CoursesSlice";
import { addToCartAsync, getCartItemsAsync } from "../Redux/CartSlice";
import { fetchStudents, fetchTeachers } from "../Redux/UsersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getPurchasedCoursesAsync } from "../Redux/CheckoutSlice";
import { useGetUserType } from "../hooks/useGetUserType";

const CourseDetailPage = () => {
  const toastId = "fetched-nationalities";
  const navigate = useNavigate();
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const sections = useSelector((state) => state.Courses.sections);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sectionVideos, setSectionVideos] = useState({});
  const [isAlreadyPurchased, setIsAlreadyPurchased] = useState(false);
  const [course, setCourse] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { status: userStatus, error: userError } = useSelector(
    (state) => state.user
  );
  const { userType } = useGetUserType();

  const user = useSelector((state) => state.user);

  const purchasedCourses = useSelector(
    (state) => state.checkout.purchasedCourses
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const myCourses = purchasedCourses.some(
      (e) => parseInt(e.course_id) === parseInt(courseId)
    );
    setIsAlreadyPurchased(myCourses);
  }, [purchasedCourses, courseId]);

  useEffect(() => {
    dispatch(getPurchasedCoursesAsync());
    dispatch(getCartItemsAsync());
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

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
  };

  const handleAddToCart = async () => {
    const courseToAdd = courses.find((c) => c.course_id === parseInt(courseId));

    if (courseToAdd) {
      const courseExists = cartItems.some(
        (e) => e.course_id === parseInt(courseId)
      );
      if (courseExists) {
        toast.info("Course already added!", {
          position: toast.POSITION.TOP_RIGHT,
          toastId,
        });
        return;
      }
      try {
        const courseToAddId = courseId;
        await dispatch(addToCartAsync(courseToAddId));
        toast.success("Course added to cart!", {
          position: toast.POSITION.TOP_RIGHT,
          toastId,
        });
      } catch (error) {
        console.error("Failed to add course to cart:", error);
        toast.error("Failed to add course to cart", {
          position: toast.POSITION.TOP_RIGHT,
          toastId,
        });
      }
    } else {
      toast.error("Course not found.", {
        position: toast.POSITION.TOP_RIGHT,
        toastId,
      });
    }
  };

  const handleEnrollNow = async () => {
    await handleAddToCart();
    navigate(`/CartsPage`);
  };

  const handleWatchCourse = () => {
    navigate(`/CoursePreview/${courseId}`);
  };

  function getCourseImg(image) {
    return encodeURI(`http://localhost:5000/${image.replace("\\", "/")}`);
  }

  return (
    <div className="flex flex-wrap font-[Poppins]">
      {/* Main Content */}
      <div className="flex flex-col w-full">
        <div
          className="flex flex-col relative after:fixed after:w-full after:h-[calc(100vh-64px)] after:bg-[#070707b7] h-[calc(100vh-64px)] bg-fixed w-[100%] bg-cover bg-center overflow-y-auto scroll-smooth"
          style={{
            backgroundImage: `url(${getCourseImg(course.course_image)})`,
          }}
        >
          <div className="text-white z-10 m-auto my-[25%] xl:my-[10rem]">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold first-letter:uppercase border-b">
              {course.course_title}
            </h2>
            <div className="pl-2 flex flex-col gap-2 mt-2">
              <p className="text-lg text-gray-100">
                By: {course.course_author}
              </p>
            </div>
            <div className="pl-2 flex gap-2 mt-8 flex-wrap">
              {userType === "student" &&
                (!isAlreadyPurchased ? (
                  <div className="flex justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 w-full flex-wrap">
                    <button
                      className="text-white w-full md:w-1/3 px-2 bg-[#00ffc2] rounded-lg h-10 hover:scale-105 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                      onClick={handleAddToCart}
                      disabled={userStatus === "failed"}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="text-white w-full md:w-1/3 px-2 bg-[#1e293b] rounded-lg h-10 hover:scale-105 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                      onClick={handleEnrollNow}
                      disabled={userStatus === "failed"}
                    >
                      Enroll Now
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-white w-full px-2 bg-[#00ffc2] rounded-lg h-10 hover:scale-105 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    onClick={handleWatchCourse}
                    disabled={userStatus === "failed"}
                  >
                    Watch Course
                  </button>
                ))}
            </div>
          </div>

          <div className="m-10 flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-2 text-white">
              Course Description
            </h2>
            <p className="text-white text-center">
              {course.course_description}
            </p>
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
              <div className="mb-4 w-[15rem] md:w-[20rem] lg:w-[30rem]">
                {sections.map((section) => (
                  <div
                    key={section.course_section_id}
                    className={`flex flex-col m-3 rounded-lg bg-[#1e293b] font-medium text-gray-500 shadow-lg focus:ring-0 dark:text-black hover:bg-[#314360] ${
                      activeSection === section.course_section_id ? " " : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-3 font-medium text-gray-500 rounded-t-xl  dark:border-gray-700 dark:text-gray-400"
                      onClick={() => onShowContent(section.course_section_id)}
                    >
                      <span>{section.section_name}</span>
                      <svg
                        className={`w-3 h-3  shrink-0 ${
                          activeSection === section.course_section_id
                            ? "rotate-0"
                            : "rotate-180"
                        }`}
                        aria-hidden="true"
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
                                  <p className="text-white">
                                    {video.video_title}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-white">No videos available.</p>
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
        </div>

        {/* Course Content */}
      </div>
    </div>
  );
};

export default CourseDetailPage;
