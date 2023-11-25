// AddCourse.jsx
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createCourse } from "../Redux/CoursesSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    tagline: "",
    objectives: [],
    requirements: [],
    description: "",
    price: 0,
    videos: [],
    image: null,
    imageUrl: "",
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

  const handleAddVideo = useCallback(() => {
    setCourseData((prevData) => ({
      ...prevData,
      videos: [...prevData.videos, ""],
    }));
  }, []);

  const handleRemoveVideo = useCallback((index) => {
    setCourseData((prevData) => {
      const newVideos = [...prevData.videos];
      newVideos.splice(index, 1);
      return {
        ...prevData,
        videos: newVideos,
      };
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prevData) => ({
      ...prevData,
      image: file,
      imageUrl: "", // Reset imageUrl when a new image is selected
    }));
  };

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setCourseData((prevData) => ({
      ...prevData,
      imageUrl,
      image: null, // Reset image when a new imageUrl is provided
    }));
  };

  const handleRemoveImage = () => {
    setCourseData((prevData) => ({
      ...prevData,
      image: null,
      imageUrl: "",
    }));
  };
  // const handleSubmit = (e) => {
  //   if (!courseData.title && !courseData.tagline) return;
  //   e.preventDefault();
  //   dispatch(createCourse(courseData));
  //   // Here, you can dispatch an action to send the courseData to your backend/API
  //   // Example: dispatch(addCourse(courseData));

  //   // Reset the form after submission
  //   setCourseData({
  //     title: "",
  //     tagline: "",
  //     objectives: [],
  //     requirements: [],
  //     description: "",
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Move to the next step
      setCurrentStep(2);
    } else {
      // Submit the form
      dispatch(createCourse(courseData));
      // Reset the form after submission
      setCourseData({
        title: "",
        tagline: "",
        objectives: [],
        requirements: [],
        description: "",
        price: 0,
        videos: [],
        image: null,
        imageUrl: "",
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
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={courseData.tagline}
                onChange={(e) => {
                  handleChange(e, 0, "tagline");
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

            <div className="mb-4 border border-black rounded-md p-5" >
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
              <p className="text-sm text-gray-700">This Image will be shown in the card as a featured Image</p>
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
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  or Image URL
                </label>
                <input
                  type="text"
                  value={courseData.imageUrl}
                  onChange={handleImageUrlChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 border-2 border-black rounded-md p-5">
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
