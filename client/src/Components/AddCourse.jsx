// AddCourse.jsx
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, addCourseSection } from "../Redux/CoursesSlice";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer, toast } from "react-toastify";

const AddCourse = () => {
  const toastId = "add-course";
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const courses = useSelector((state) => state.Courses);

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
    // course_catagory: "",
    objectives: [],
    requirements: [],
    description: "",
    price: 0,
    // videos: [],
    course_length: 0,
    image: null,
  });
  const [createdCourseId, setCreatedCourseId] = useState(null); // State to store created course id
  const [loading, setLoading] = useState(false); // State to track loading state

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
      // "course_catagory",
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

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    try {
      setLoading(true);
      console.log("Dispatching createCourse action with data:", courseData);

      const response = await dispatch(createCourse(courseData));
      console.log("Response from createCourse:", response.course_id);
      setCreatedCourseId(response.course_id);

      if (response.course_id) {
        await submitCourseSection(response.course_id);
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
      console.log(response);
      return response.course_section_id;
      // setCreatedCourseId(response.course_section_id);
    } catch (error) {
      console.error("Error adding videos:", error);
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
    <div className="container mx-auto p-8 bg-gray-200 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Add New Course - step {currentStep}
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

            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Course Catagory
              </label>
              <input
                type="text"
                name="course_catagory"
                value={courseData.course_catagory}
                onChange={(e) => {
                  handleChange(e, 0, "course_catagory");
                }}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div> */}
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

            <div className="flex justify-end">
              <button
                className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                type="submit"
              >
                Next
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
                className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                type="submit"
              >
                Add Course
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddCourse;
