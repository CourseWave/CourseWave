import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchSections } from "../Redux/CoursesSlice";
import { fetchSectionVideos } from "../Redux/CoursesSlice";
import VideoForm from "./VideoForm";
import { addCourseVideos } from "../Redux/CoursesSlice";
import { toast } from "react-toastify";

const AccordionSections = ({ id }) => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.Courses.sections);

  const [selectedSection, setSelectedSection] = useState(null);
  const [videosList, setVideosList] = useState({});

  useEffect(() => {
    const fetchSectionsList = async () => {
      try {
        await dispatch(fetchSections(id));
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchSectionsList();
  }, [dispatch, id]);

  const toggleAccordion = (section) => {
    setSelectedSection(selectedSection === section ? null : section);
    if (
      selectedSection !== section &&
      !videosList[section.course_section_id]?.length
    ) {
      handleAddVideoClick(section);
    }
  };

  const handleAddVideoClick = (section) => {
    setSelectedSection(section);

    if (videosList && videosList[section.course_section_id]) {
      setVideosList((prevValue) => {
        const z = videosList[section.course_section_id];

        z.push({});

        return {
          ...{ prevValue },
          [section.course_section_id]: z,
        };
      });
      return;
    }
    setVideosList((prevValue) => {
      return { ...{ prevValue }, [section.course_section_id]: [{}] };
    });
  };

  const closeForm = (section) => {
    setVideosList((prevValue) => {
      return { ...{ prevValue }, [section.course_section_id]: [] };
    });
  };

  const handleSubmitVideo = (section) => {

    videosList[section.course_section_id].forEach(
      ({ sectionId, videoTitle, videoFile }) => {
        if (
          sectionId !== undefined &&
          videoTitle !== "" &&
          videoFile !== null
        ) {
          const formData = new FormData();
          formData.append("course_section_id", sectionId);
          formData.append("video_titles[]", videoTitle);
          formData.append("video_links", videoFile);
          // Dispatch an action to add the video to the section
          dispatch(addCourseVideos(formData));
          toast.success("Videos Uploaded");
        }
      }
    );
    // setVideosList((prevValue) => {
    //   return {
    //     ...{ prevValue },
    //     [sectionId]: [{ sectionId, videoTitle, videoFile }],
    //   };
    // });
  };

  const handleFormChange = (updatedForm, section) => {
    if (!updatedForm || !updatedForm.title || !updatedForm.file) {
      return;
    }
    setVideosList((prevValue) => {
      const z = videosList[section.course_section_id];

      z.push({
        sectionId: section.course_section_id,
        videoTitle: updatedForm.title,
        videoFile: updatedForm.file,
      });

      return {
        ...{ prevValue },
        [section.course_section_id]: z,
      };
    });
  };

  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
      className="flex flex-col gap-4"
    >
      {sections?.map((section) => (
        <div key={section.course_section_id}>
          <h2 id={`accordion-color-heading-${section.course_section_id}`}>
            <button
              type="button"
              className="flex items-center justify-between rounded-lg bg-slate-200 w-full p-5 font-medium text-gray-500 shadow-md focus:ring-0 dark:text-black hover:bg-blue-100 dark:hover:bg-slate-100 gap-3"
              data-accordion-target={`#accordion-color-body-${section.course_section_id}`}
              aria-expanded={selectedSection === section}
              aria-controls={`accordion-color-body-${section.course_section_id}`}
              onClick={() => toggleAccordion(section)}
            >
              <span>{section.section_name}</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 ${
                  selectedSection === section ? "rotate-0" : "rotate-180"
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
          </h2>
          <div
            id={`accordion-color-body-${section.course_section_id}`}
            className={`${selectedSection === section ? "" : "hidden"}`}
            aria-labelledby={`accordion-color-heading-${section.course_section_id}`}
          >
            <div className="p-5 border border-slate-300 rounded-lg mx-1">
              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                {section.videos &&
                  section.videos.map((video) => (
                    <span key={video.id}>{video.title}</span>
                  ))}
              </p>

              {
                videosList &&
                  selectedSection === section &&
                  videosList[selectedSection.course_section_id]?.length > 0 && (
                    <>
                      {videosList[selectedSection.course_section_id].map(
                        (e, index) => (
                          <div key={index}>
                            <VideoForm
                              courseId={id}
                              onChange={(e) => handleFormChange(e, section)}
                              video={e.videoFile}
                              sectionId={selectedSection.course_section_id}
                              onClose={() => closeForm(section)}
                            />
                          </div>
                        )
                      )}
                    </>
                  )
                // Render the VideoForm component inside the section
              }
              <div className="flex justify-end pe-1">
                <button
                  className="border-2 mt-2 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSubmitVideo(section)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {!sections ||
        (!sections.length && (
          <>
            <p className="text-center">
              No Sections were added for this course
            </p>
          </>
        ))}
    </div>
  );
};

export default AccordionSections;
