import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  addCourseSection,
  updateCourse,
} from "../Redux/CoursesSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { fetchCategories } from "../Redux/CategoriesSlice";

const AddCourse = ({ courseObject, onSubmit }) => {
  const toastId = "add-course";
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const categories = useSelector((state) => state.Categories.categories);
  const [sectionData, setSectionData] = useState({
    sections: [
      {
        title: "",
      },
    ],
  });
  const [courseData, setCourseData] = useState({
    title: "",
    course_tagline: "",
    category_id: 0,
    objectives: [],
    requirements: [],
    description: "",
    price: 0,
    course_length: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false); // State to track loading state

  const fetchData = () => {
    dispatch(fetchCategories());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!courseObject || !Object.keys(courseObject).length) return;

    setCourseData({
      title: courseObject.course_title,
      course_tagline: courseObject.course_tagline,
      category_id: courseObject.category_id,
      objectives: courseObject.course_objectives,
      requirements: courseObject.course_requirements,
      description: courseObject.course_description,
      price: courseObject.course_price,
      course_length: courseObject.course_length,
      image: courseObject.image_url?.replace("\\", "/"),
    });
    const sectionsObj = courseObject.sections.map((e) => ({
      title: e.section_name,
    }));
    setSectionData({ sections: [...sectionsObj] });
  }, [courseObject]);

  const resetForm = () => {
    setCourseData({
      title: "",
      course_tagline: "",
      category_id: 0,
      objectives: [],
      requirements: [],
      description: "",
      price: 0,
      course_length: 0,
      image: null,
    });
    setSectionData({
      sections: [
        {
          title: "",
        },
      ],
    });
    setCurrentStep(1);
  };

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setCourseData((prevData) => {
      // Create a copy of the previous state to avoid mutation
      const updatedData = { ...prevData };

      // If the field is an array (objectives, requirements), update the specific element
      if (Array.isArray(updatedData[field])) {
        updatedData[field][index] = value;
      } else {
        // Otherwise, update the field directly
        updatedData[field] = value;
      }

      return updatedData;
    });
  };

  const handleAddObjective = useCallback(() => {
    setCourseData((prevData) => ({
      ...prevData,
      objectives: [...prevData.objectives, ""],
    }));
  }, []);

  const handleRemoveObjective = useCallback((index) => {
    setCourseData((prevData) => {
      const newObjectives = [...prevData.objectives];
      newObjectives.splice(index, 1);
      return {
        ...prevData,
        objectives: newObjectives,
      };
    });
  }, []);

  const handleAddRequirement = useCallback(() => {
    setCourseData((prevData) => ({
      ...prevData,
      requirements: [...prevData.requirements, ""],
    }));
  }, []);

  const handleRemoveRequirement = useCallback((index) => {
    setCourseData((prevData) => {
      const newRequirements = [...prevData.requirements];
      newRequirements.splice(index, 1);
      return {
        ...prevData,
        requirements: newRequirements,
      };
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleRemoveImage = () => {
    setCourseData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const handleAddSection = useCallback(() => {
    setSectionData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { title: "", videos: [] }],
    }));
  }, []);

  const handleRemoveSection = useCallback((sectionIndex) => {
    setSectionData((prevData) => {
      const newSections = [...prevData.sections];
      newSections.splice(sectionIndex, 1);
      return {
        ...prevData,
        sections: newSections,
      };
    });
  }, []);

  const validateFields = () => {
    let isValid = false;

    const requiredFields = [
      "category_id",
      "title",
      "course_tagline",
      "image",
      "course_length",
      "requirements",
      "objectives",
    ];
    const missingFields = requiredFields.filter(
      (field) => !courseData[field] || courseData[field]?.length === 0
    );
    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast.error(`${field} is missing`, {
          position: toast.POSITION.TOP_RIGHT,
          toastId,
        });
      });
      return isValid;
    }
    return !isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateFields();
    if (!isFormValid) return;

    if (!courseObject?.course_title && currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    try {
      setLoading(true);

      if (courseObject?.course_title) {
        const dataToSave = { ...courseData };
        dataToSave["course_category"] = categories.find(
          (e) => e.category_id === parseInt(courseData.category_id)
        ).category_name;

        await dispatch(
          updateCourse({
            courseId: courseObject.course_id,
            courseData: dataToSave,
          })
        );
        toast.success("Course Updated Successfully");
        resetForm();
        onSubmit();
        return;
      }

      const response = await dispatch(createCourse(courseData));
      if (response?.course) {
        await submitCourseSection(response.course.course_id);
        toast.success("Course Added Successfully");
        resetForm();
        onSubmit();
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const submitCourseSection = async (courseId) => {
    try {
      setLoading(true);
      const courseDataWithVideos = {
        sections: sectionData.sections,
        courseId: courseId,
      };
      const response = await dispatch(addCourseSection(courseDataWithVideos));
      return response;
    } catch (error) {
      toast.error("Failed to add videos. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container overflow-y-auto max-h-[32rem] mx-auto p-8 bg-gray-200 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        {courseObject?.course_title
          ? "Edit " + courseObject?.course_title
          : "Add New Course"}
        - step {currentStep}
      </h2>
      <form className="w-[]" onSubmit={handleSubmit}>
        {/*------------------------ First Step -------------------------- */}
        {currentStep === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={(e) => {
                  handleChange(e, 0, "title");
                }}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                TagLine
              </label>
              <input
                type="text"
                name="course_tagline"
                value={courseData.course_tagline}
                onChange={(e) => {
                  handleChange(e, 0, "course_tagline");
                }}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category_id"
                name="category_id"
                value={courseData.category_id}
                onChange={(e) => {
                  handleChange(e, 0, "category_id");
                }}
                className="bg-white border-gray-300 text-gray-900 text-sm mt-1 p-2 w-full border rounded-md"
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Course Length
              </label>
              <input
                type="number"
                name="course_length"
                value={courseData.course_length}
                onChange={(e) => {
                  handleChange(e, 0, "course_length");
                }}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={(e) => handleChange(e, 0, "price")}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div className="mb-4 border border-black rounded-md p-5">
              <label className="block text-sm font-medium text-gray-700">
                Objectives
              </label>
              {courseData?.objectives?.map((objective, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => handleChange(e, index, "objectives")}
                    className="mt-1 p-2 w-full border rounded-md"
                  />

                  <button
                    type="button"
                    className="m-2 p-2 rounded-md bg-red-500 text-white "
                    onClick={() => handleRemoveObjective(index)}
                  >
                    Remove field
                  </button>
                </div>
              ))}

              <button
                className="m-2 p-2 rounded-md bg-indigo-700 text-white "
                type="button"
                onClick={handleAddObjective}
              >
                Add Objective
              </button>
            </div>

            <div className="mb-4 border border-black rounded-md p-5">
              <label className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              {courseData?.requirements?.map((requirement, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleChange(e, index, "requirements")}
                    className="mt-1 p-2 w-full border rounded-md"
                  />

                  <button
                    type="button"
                    className="m-2 p-2 rounded-md bg-red-500 text-white"
                    onClick={() => handleRemoveRequirement(index)}
                  >
                    Remove field
                  </button>
                </div>
              ))}
              <button
                className="m-2 p-2 rounded-md bg-indigo-700 text-white"
                type="button"
                onClick={handleAddRequirement}
              >
                Add Requirement
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={(e) => handleChange(e, 0, "description")}
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            {!courseObject && (
              <div className="mb-4 border-2 border-black rounded-md p-5">
                <label className="block text-lg font-medium text-black">
                  Image
                </label>
                <p className="text-sm text-gray-700">
                  This Image will be shown in the card as a featured Image
                </p>
                {courseData.image && (
                  <div className="mb-2">
                    <img
                      src={URL.createObjectURL(courseData.image)}
                      alt="Course Preview"
                      className="mb-2 max-w-full h-auto rounded-md"
                    />
                    <button
                      type="button"
                      className="m-2 p-2 rounded-md bg-red-500 text-white"
                      onClick={handleRemoveImage}
                    >
                      Delete Image
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 disabled:bg-indigo-800 disabled:opacity-25 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "loading..."
                  : courseObject?.course_title
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </>
        )}
        {/*------------------------ Second Step -------------------------- */}
        {currentStep === 2 && (
          <>
            <div className="mb-4 border-2 border-black rounded-md p-5">
              <label className="block text-lg font-medium text-black">
                Sections
              </label>
              {sectionData?.sections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newSections = [...sectionData.sections];
                      newSections[sectionIndex].title = e.target.value;
                      setSectionData((prevData) => ({
                        ...prevData,
                        sections: newSections,
                      }));
                    }}
                    className="mt-1 p-2 w-full border rounded-md"
                  />

                  <button
                    type="button"
                    className="m-2 p-2 rounded-md bg-red-500 text-white"
                    onClick={() => handleRemoveSection(sectionIndex)}
                  >
                    Remove Section
                  </button>
                </div>
              ))}
              <button
                className="m-2 p-2 rounded-md bg-indigo-700 text-white"
                type="button"
                onClick={handleAddSection}
              >
                Add Section
              </button>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-25 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddCourse;
