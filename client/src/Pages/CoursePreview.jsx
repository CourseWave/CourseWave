import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSections,
  fetchSectionVideos,
  getCourseById,
} from "../Redux/CoursesSlice";
import { VideoPlayer } from "../Components/video-player";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "../Redux/CommentSlice";
import Avatar from "react-string-avatar";

import { Modal } from "../Components/modal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const CoursePreview = () => {
  const { courseId } = useParams();
  const sections = useSelector((state) => state.Courses.sections);
  const comments = useSelector((state) => state.comments.comments);
  const [activeSection, setActiveSection] = useState(null);
  const [sectionVideos, setSectionVideos] = useState({});
  const [videoObject, setVideoObject] = useState({});
  const [course, setCourse] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [userId, setUserId] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    let userInfo = Cookies.get("userInfo");

    if (!userInfo) return;

    userInfo = JSON.parse(userInfo);
    if (userInfo.user && userInfo.user.role_id !== 1) {
      setUserId(userInfo.user.user_id);
    } else {
      setUserId(-1);
    }
  }, []);

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
        await dispatch(fetchComments(courseId));
        getCourse(courseId);
      } catch (error) {
        console.log("Error fetching sections", error.message);
      }
    };

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

  function handleAddComment() {
    if (commentMessage.trim() !== "") {
      dispatch(
        addComment({
          comment_content: commentMessage,
          comment_rate: rating || 1,
          course_id: parseInt(courseId),
        })
      );
      toast.success("Comment Added Successfully!");

      setCommentMessage("");
      setRating(null);
      setIsModalOpen(false);
    }
  }

  function handleDeleteComment(commentId) {
    try {
      dispatch(deleteComment(commentId));
      toast.success("Comment Deleted Successfully");
    } catch (error) {
      toast.error(error);
      console.error("Error deleting Comment:", error);
    }
  }
  return (
    <div className="flex justify-between font-[Poppins] flex-wrap flex-col lg:flex-row">
      <Modal
        isOpen={isModalOpen}
        title="Add Comment"
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <CommentsForm
          handleAddComment={handleAddComment}
          commentMessage={commentMessage}
          setCommentMessage={setCommentMessage}
          rating={rating}
          setRating={setRating}
        />
      </Modal>
      <div className="order-2 lg:order-1 p-2 shadow-md bg-[#27364e] text-gray-500 flex-1 h-[calc(100vh-64px)] overflow-y-auto">
        <VideoPlayer
          videoTitle={`${course.course_title} - ${videoObject?.video_title}`}
          key={videoObject.video_link}
          videoUrl={videoObject.video_link}
          courseName={course.course_title}
        />

        <div className="p-5 rounded-lg  shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h3 className="text-2xl text-white mt-4 font-semibold border-b border-gray-600 pb-2">
            Description
          </h3>
          <div className="max-h-32 overflow-y-auto">
            <p className="text-white mt-4 text-sm leading-relaxed">
              {course.course_description}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div className="flex mb-2 mt-4 overflow-hidden gap-4 pb-2 items-center justify-between border-b border-gray-600">
            <h3 className="text-2xl text-white font-semibold">Comments</h3>
            <button
              className="text-white bg-[#1e293b] rounded-lg px-4 py-2 disabled:opacity-20"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add comment
            </button>
          </div>
          <div className="flex flex-col text-white p-2 mt-2 gap-4 ml-2">
            {comments.length === 0 && (
              <p className="text-white text-lg">No Comments Yet!</p>
            )}
            {comments?.map((comment) => (
              <CommentsList
                key={comment.comment_id}
                comment={comment}
                userId={userId}
                handleDeleteComment={handleDeleteComment}
              />
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

const CommentsForm = ({
  handleAddComment,
  commentMessage,
  setCommentMessage,
  rating,
  setRating,
}) => {
  return (
    <div className="flex my-4 overflow-hidden gap-4 justify-between flex-col mb-4 p-6 bg-gray-200 rounded-lg shadow-lg border">
      <label className="block text-md font-medium text-black">
        Comment Message
      </label>

      <textarea
        type="text"
        placeholder="Share your thoughts... 🤔"
        value={commentMessage}
        onChange={(e) => setCommentMessage(e.target.value)}
        className="ring-0 outline-none border-[#1e293b] border p-2 w-full  rounded-md h-full"
      ></textarea>
      <div className="">
        <label className="block text-md font-medium text-black mb-2">
          Comment Rate
        </label>
        <div className="ring-0 outline-none border-[#1e293b] border p-2 w-full  rounded-md h-full">
          <CommentsRate rating={rating} setRating={setRating} />
        </div>
      </div>

      <div className="text-end">
        <button
          className="text-white bg-[#1e293b] rounded-lg px-4 py-2 disabled:opacity-20"
          onClick={() => {
            handleAddComment();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const CommentsRate = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);
  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index} className="">
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="cursor-pointer text-2xl m-1 text-gray-500 transition-all delay-100"
              style={{
                color:
                  currentRating <= (hover || rating)
                    ? "#ffc107"
                    : "rgb(138 138 141)",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </>
  );
};

const CommentsList = ({ comment, userId, handleDeleteComment }) => {
  if (!comment) return null;
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
      <div className="flex gap-4 items-start">
        {/* Avatar and author name */}
        <div className="flex-shrink-0">
          <Avatar
            string={comment.comment_author}
            autoColor
            wrapper
            roundShape
            pixelated={false}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-200">
            {comment.comment_author}
          </p>
          <p className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-2xl ${
                  index < comment.comment_rate
                    ? "text-yellow-400"
                    : "text-gray-400"
                } transition-colors duration-200`}
              >
                &#9733;
              </span>
            ))}
          </p>
          {/* Comment content */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {comment.comment_content}
          </p>
        </div>
      </div>
      <div>
        {userId === comment.user_id && (
          <button
            className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 text-xs rounded hover:bg-red-600 transition-colors duration-200"
            onClick={() => {
              handleDeleteComment(comment.comment_id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 30 30"
            >
              <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursePreview;
