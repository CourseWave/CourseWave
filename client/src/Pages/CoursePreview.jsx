import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSections,
  fetchSectionVideos,
  getCourseById,
} from "../Redux/CoursesSlice";
import { VideoPlayer } from "../Components/video-player";

const CoursePreview = () => {
  const { courseId } = useParams();
  const sections = useSelector((state) => state.Courses.sections);

  const [activeSection, setActiveSection] = useState(null);
  const [sectionVideos, setSectionVideos] = useState({});
  const [videoObject, setVideoObject] = useState({});
  const [course, setCourse] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getSectionVideos(sections[0]?.course_section_id);
  }, [sections]);

  useEffect(() => {
    playFirstVideo(sections[0]?.course_section_id);
  }, [sectionVideos]);

  useEffect(() => {
    const fetchSectionsList = async () => {
      try {
        await dispatch(fetchSections(courseId));
      } catch (error) {
        console.log("Error fetching sections", error.message);
      }
    };

    if (courseId) {
      getCourse(courseId);
    }
    setCourse(getCourse(courseId));

    fetchSectionsList();
  }, [dispatch, courseId]);

  const getCourse = async (courseId) => {
    setCourse(await getCourseById(courseId));
  };

  const playFirstVideo = (id) => {
    const firstVideo = sectionVideos[id];
    if (firstVideo?.length) setVideoObject(firstVideo[0]);
    else {
      setVideoObject({});
    }
  };

  const getSectionVideos = (courseSectionId) => {
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

  const DummyCommentComponent = () => {
    return (
      <div className="border border-gray-500 p-4 rounded-lg">
        <div className="flex gap-2">
          <div>
            <span className="rounded-full bg-amber-500 py-1 px-3 w-4 h-4 shadow-md text-white font-bold">
              B
            </span>
          </div>
          <div>
            <p>Haitham Alzyoud</p>
          </div>
        </div>

        <div className="p-4 pl-11">
          <p>Great Course 👏</p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex justify-between font-[Poppins] flex-wrap flex-col lg:flex-row">
      <div className="order-2 lg:order-1 p-2 shadow-md bg-[#27364e] text-gray-500 flex-1 h-[calc(100vh-64px)] overflow-y-auto">
        <VideoPlayer
          videoTitle={`${course.course_title} - ${videoObject?.video_title}`}
          key={videoObject.video_link}
          videoUrl={videoObject.video_link}
          courseName={course.course_title}
        />

        <div>
          <h3 className="text-2xl text-white mt-4">Description</h3>
          <div className="text-white mt-2 ml-2">
            {course.course_description}
          </div>
        </div>
        <div>
          <h3 className="text-2xl text-white mt-4">Comments</h3>
          <div className="flex flex-col text-white p-2 mt-2 gap-4 ml-2">
            {new Array(5).fill(1).map((e) => (
              <DummyCommentComponent />
            ))}
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 w-full lg:w-[20rem]">
        {sections && (
          <div className="flex flex-col h-full bg-[#1e293b] font-medium overflow-y-auto shadow-lg focus:ring-0 ">
            {sections.map((section) => (
              <div
                key={section.course_section_id}
                className={`p-3 mb-5 ${
                  activeSection === section.course_section_id ? "active" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => getSectionVideos(section.course_section_id)}
                  className="flex justify-between w-full p-3 font-medium rounded-t-2xl border-gray-700 text-white border-b-[1px]"
                >
                  <span>{section.section_name}</span>
                  <ArrowIcon
                    active={activeSection === section.course_section_id}
                  />
                </button>

                {activeSection === section.course_section_id && (
                  <VideosList
                    sectionVideos={sectionVideos[section.course_section_id]}
                    setVideoUrl={setVideoObject}
                    videoUrl={videoObject.video_link}
                  ></VideosList>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const VideosList = ({ sectionVideos, setVideoUrl, videoUrl }) => {
  return (
    <div className="overflow-y-auto p-3 mt-2 max-h-56 text-left">
      {sectionVideos?.length > 0 ? (
        <ul>
          {sectionVideos.map((video, index) => (
            <li
              key={video.video_id}
              className={`border-b border-dashed mb-3 transition-all delay-200 ${
                video.video_link === videoUrl
                  ? "border-blue-500"
                  : "border-gray-400"
              } `}
            >
              <button
                className={`cursor-pointer my-2 text-left transition-all delay-100 ${
                  video.video_link === videoUrl
                    ? "text-blue-500"
                    : "text-gray-400"
                } `}
                onClick={() => {
                  setVideoUrl(video);
                }}
              >
                {index + 1} - {video.video_title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No videos available.</p>
      )}
    </div>
  );
};

const ArrowIcon = ({ active }) => {
  return (
    <svg
      className={`w-3 h-3 shrink-0 ${active ? "rotate-0" : "rotate-180"}`}
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
  );
};

export default CoursePreview;
