// AddCourse.jsx
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../Redux/CoursesSlice";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import {
  addObjectiveAsync,
  updateObjectiveAsync,
  deleteObjectiveAsync,
  addRequirementAsync,
  updateRequirementAsync,
  deleteRequirementAsync,
} from "../Redux/CoursesSlice";

const AddCourse = () => {
  const toastId = "fetched-nationalities";
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const courses = useSelector((state) => state.Courses);
  const [sectionData, setSectionData] = useState({
    sections: [],
  });
  const [courseData, setCourseData] = useState({
    title: "",
    course_catagory: "",
    objectives: [],
    requirements: [],
    description: "",
    price: 0,
    // videos: [],
    course_length: 0,
    image: null,
  });

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    const updatedData = { ...courseData };

    if (!updatedData[field]) {
      updatedData[field] = [];
    }

    updatedData[field] = value;
    setCourseData(updatedData);
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

  // const handleAddVideo = useCallback(() => {
  //   setCourseData((prevData) => ({
  //     ...prevData,
  //     videos: [...prevData.videos, ""],
  //   }));
  // }, []);

  // const handleRemoveVideo = useCallback((index) => {
  //   setCourseData((prevData) => {
  //     const newVideos = [...prevData.videos];
  //     newVideos.splice(index, 1);
  //     return {
  //       ...prevData,
  //       videos: newVideos,
  //     };
  //   });
  // }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file, e);
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

  const handleRemoveSection = useCallback((index) => {
    setSectionData((prevData) => {
      const newSections = [...prevData.sections];
      newSections.splice(index, 1);
      return {
        ...prevData,
        sections: newSections,
      };
    });
  }, []);

  const handleAddVideoInSection = (sectionIndex) => {
    setSectionData((prevData) => {
      const newSections = [...prevData.sections];
      newSections[sectionIndex].videos.push("");
      return {
        ...prevData,
        sections: newSections,
      };
    });
  };

  const handleRemoveVideoFromSection = (sectionIndex, videoIndex) => {
    setSectionData((prevData) => {
      const newSections = [...prevData.sections];
      newSections[sectionIndex].videos.splice(videoIndex, 1);
      return {
        ...prevData,
        sections: newSections,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Move to the next step
      setCurrentStep(2);
    } else {
      const requiredFields = [
        "course_catagory",
        "title",
        "image",
        "course_length",
        "requirements",
      ];
      const missingFields = requiredFields.filter(
        (field) => !courseData[field]
      );
      console.log(missingFields);
      if (missingFields.length > 0) {
        missingFields.forEach((field) => {
          toast.error(`${field} is missing`, {
            position: toast.POSITION.TOP_RIGHT,
            toastId,
          });
        });
        return;
      }

      // Submit the form
      dispatch(createCourse(courseData)).then((e) => {
        console.log({ e });
        if (courseData.objectives.length) {
          const objectiveData = {
            object: courseData.objectives,
            course_id: e.course_id,
          };
          dispatch(addObjectiveAsync(objectiveData));
        }
        if (courseData.requirements.length) {
          const requirementsData = {
            requirement: courseData.requirements,
            course_id: e.course_id,
          };
          dispatch(addRequirementAsync(requirementsData));

        }
      });

      // Reset the form after submission
      setCourseData({
        title: "",
        course_catagory: "",
        course_length: 0,
        objectives: [],
        requirements: [],
        description: "",
        price: 0,
        videos: [],
        image: null,
      });
      // Reset the step to the first step
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Move back to the previous step
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4">
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
                    onChange={(e) => {
                      const newObjectives = [...courseData.objectives];
                      newObjectives[index] = e.target.value;
                      setCourseData((prevData) => ({
                        ...prevData,
                        objectives: newObjectives,
                      }));
                    }}
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
                    onChange={(e) => {
                      const newRequirements = [...courseData.requirements];
                      newRequirements[index] = e.target.value;
                      setCourseData((prevData) => ({
                        ...prevData,
                        requirements: newRequirements,
                      }));
                    }}
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

                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Videos
                  </label>
                  {section.videos.map((video, videoIndex) => (
                    <div key={videoIndex}>
                      <input
                        type="text"
                        value={video}
                        onChange={(e) => {
                          const newSections = [...sectionData.sections];
                          newSections[sectionIndex].videos[videoIndex] =
                            e.target.value;
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
                        onClick={() =>
                          handleRemoveVideoFromSection(
                            sectionIndex,
                            videoIndex
                          )
                        }
                      >
                        Remove Video
                      </button>
                    </div>
                  ))}
                  <button
                    className="m-2 p-2 rounded-md bg-indigo-700 text-white"
                    type="button"
                    onClick={() => handleAddVideoInSection(sectionIndex)}
                  >
                    Add Video
                  </button>

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
            {/* <div className="mb-4 border-2 border-black rounded-md p-5">
              <label className="block text-lg font-medium text-blacK ">
                Add Your Videos Here
              </label>
              {courseData?.videos?.map((video, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={video}
                    onChange={(e) => {
                      const newVideos = [...courseData.videos];
                      newVideos[index] = e.target.value;
                      setCourseData((prevData) => ({
                        ...prevData,
                        videos: newVideos,
                      }));
                    }}
                    className="mt-2 p-2 w-full border rounded-md "
                  />
                  <button
                    type="button"
                    className="m-2 p-2 rounded-md bg-red-500 text-white"
                    onClick={() => handleRemoveVideo(index)}
                  >
                    Remove video
                  </button>
                </div>
              ))}
              <button
                className="m-2 p-2 rounded-md bg-indigo-700 text-white"
                type="button"
                onClick={handleAddVideo}
              >
                Add Video
              </button>
            </div> */}
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
