import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCourseSection,
  deleteCourseSection,
  updateCourseSection,
} from "../Redux/CoursesSlice";
import { useState } from "react";

const SectionCard = ({ section, sectionsCount }) => {
  const [sectionName, setSectionName] = useState(section.section_name);
  const dispatch = useDispatch();
  const handleSubmit = async (sectionId, sectionName) => {
    if (!sectionName) return;
    try {
      await dispatch(
        updateCourseSection({
          course_section_id: sectionId,
          section_name: sectionName,
        })
      );
      toast.success("Course Section Updated Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemoveSection = async (sectionId) => {
    try {
      if (sectionsCount === 1) {
        toast.info("Course must at least have 1 section");
        return;
      }
      await dispatch(deleteCourseSection(sectionId));
      toast.success("Course Section Deleted Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mb-4 p-8 bg-gray-200 rounded-lg shadow-lg border">
      <label className="block text-md mb-2 font-medium text-black">
        Section Title
      </label>
      <div className="flex items-center">
        <input
          type="text"
          name={section.course_section_id}
          value={sectionName}
          onChange={(e) => {
            setSectionName(e.target.value);
          }}
          className="p-2 w-full border rounded-md h-full"
        />

        <button
          className="mx-2 p-2 h-full rounded-md text-green-600 font-bold text-lg"
          type="button"
          onClick={() => {
            handleSubmit(section.course_section_id, sectionName);
          }}
        >
          ✔
        </button>
        <button
          type="button"
          onClick={() => {
            handleRemoveSection(section.course_section_id);
          }}
          className="p-2 h-full rounded-md text-white"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export const EditSections = ({ courseId }) => {
  const sections = useSelector((state) => state.Courses.sections);
  const dispatch = useDispatch();

  const handleAddSection = async (sectionName) => {
    try {
      const courseDataWithVideos = {
        sections: [{ title: sectionName }],
        courseId: courseId,
      };
      const response = await dispatch(addCourseSection(courseDataWithVideos));
      return response;
    } catch (error) {
      toast.error("Failed to add videos. Please try again.");
    }
  };

  return (
    <div className="container overflow-y-auto max-h-[32rem] mx-auto">
      {sections.map((section) => (
        <SectionCard
          key={section.course_section_id}
          section={section}
          sectionsCount={sections.length}
        />
      ))}
      {sections.length === 0 && <p className="">No Sections Available</p>}
      <button
        className="m-2 p-2 rounded-md bg-indigo-700 text-white"
        type="button"
        onClick={() => handleAddSection("Default Section Name")}
      >
        Add Section
      </button>
    </div>
  );
};
