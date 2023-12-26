import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  fetchCourses,
  fetchSections,
  getCourseById,
} from "../Redux/CoursesSlice";
import SectionsModal from "../Components/SectionsModal";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Modal } from "../Components/modal";
import AddCourse from "../Components/AddCourse";
import Cookies from "js-cookie";
import { getAllPurchasedCoursesAsync } from "../Redux/CheckoutSlice";
import { TeacherStatistics } from "../Components/TeacherStatistics";
import { EditSections } from "../Components/EditSections";
import TeacherCourses from "../Components/TeacherCourses";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.Courses.Courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseObject, setCourseObject] = useState({});
  const [teacherObject, setTeacherObject] = useState({});
  const [isSectionEditMode, setIsSectionEditMode] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch the purchased courses when the component mounts
    dispatch(getAllPurchasedCoursesAsync());
  }, []);

  useEffect(() => {
    let token = Cookies.get("userInfo");
    if (!token) return;
    token = JSON.parse(token);
    if (token.trainer) {
      setTeacherObject(token.trainer);
    }
  }, [user, courses]);

  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        await dispatch(fetchCourses());
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchCoursesList();
  }, [dispatch]);

  const fetchCoursesList = async (courseId) => {
    try {
      await dispatch(fetchSections(courseId));
    } catch (error) {
      console.log("Error fetching data", error.message);
    }
  };

  const toggleModal = (course) => {
    setIsModalOpen((prevValue) => !prevValue);
    setSelectedCourse(course);
  };

  const handleEditSection = async (course) => {
    await fetchCoursesList(course.course_id);
    setIsSectionEditMode((prevValue) => !prevValue);
    setSelectedCourse(course);
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
    toast.success("Course Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddCourse = () => {
    setIsAddMode(true);
  };

  const handleEditCourse = async (courseId) => {
    const result = await getCourseById(courseId);
    setCourseObject(result);
    setIsEditMode(true);
  };

  return (
    <div className="relative sm:rounded-lg mb-6 overflow-y-auto h-full">
      <div>
        {isModalOpen && (
          <SectionsModal
            isOpen={isModalOpen}
            onClose={() => toggleModal(null)}
            courseId={selectedCourse?.course_id}
            courseName={selectedCourse?.course_title}
          />
        )}
        {isSectionEditMode && (
          <Modal
            isOpen={isSectionEditMode}
            onClose={() => setIsSectionEditMode(null)}
            title={"Edit " + selectedCourse?.course_title}
          >
            <EditSections courseId={selectedCourse?.course_id} />
          </Modal>
        )}
      </div>
      <div>
        <TeacherStatistics teacherObject={teacherObject} />
        <TeacherCourses
          teacherObject={teacherObject}
          toggleModal={toggleModal}
          handleAddCourse={handleAddCourse}
          handleEditSection={handleEditSection}
          handleEditCourse={handleEditCourse}
          handleDelete={handleDelete}
        />
      </div>

      {isAddMode && (
        <Modal
          isOpen={isAddMode}
          title={"Add Course"}
          onClose={() => {
            setIsAddMode(false);
          }}
        >
          <AddCourse onSubmit={() => setIsAddMode(false)} />
        </Modal>
      )}
      {isEditMode && (
        <Modal
          isOpen={isEditMode}
          title={"Edit " + courseObject.course_title}
          onClose={() => {
            setIsEditMode(false);
          }}
        >
          <AddCourse
            courseObject={courseObject}
            onSubmit={() => setIsEditMode(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TeacherDashboard;
