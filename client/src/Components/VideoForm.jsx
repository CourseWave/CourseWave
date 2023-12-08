// // VideoForm.jsx
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addCourseVideo } from "../Redux/CoursesSlice";

// const VideoForm = ({ courseId, sectionId, onClose }) => {
//   const dispatch = useDispatch();
//   const [videoTitle, setVideoTitle] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

//   const handleAddVideo = () => {
//     const formData = new FormData();
//     formData.append("course_id", courseId);
//     formData.append("course_section_id", sectionId);
//     formData.append("title", videoTitle);
//     formData.append("video", videoFile);

//     dispatch(addCourseVideo(formData));
//     onClose();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setVideoFile(file);
//   };

//   return (
//     <div>
//       <label>
//         Video Title:
//         <input
//           type="text"
//           name="videoTitle"
//           value={videoTitle}
//           onChange={(e) => setVideoTitle(e.target.value)}
//           className="text-black"
//         />
//       </label>
//       <label>
//         Video File:
//         <input type="file" onChange={handleFileChange} />
//       </label>
//       <button className="border-2 px-2 rounded-sm" onClick={handleAddVideo}>
//         Add Video
//       </button>
//     </div>
//   );
// };

// export default VideoForm;

// VideoForm.jsx
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addCourseVideo } from "../Redux/CoursesSlice";

// const VideoForm = ({ courseId, sectionId, onClose }) => {
//   const dispatch = useDispatch();
//   const [videoTitle, setVideoTitle] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideoUrl((prevData) =>({
//       ...prevData,
//       videoUrl:file,
//     }))
//    }

//   const handleAddVideo = () => {
//     console.log("Adding video...", { sectionId, videoTitle });

//     // Dispatch an action to add the video to the section
//     dispatch(addCourseVideo({
//       course_section_id: sectionId,
//       video_titles: videoTitle,
//     }));
//     onClose(); // Close the form/modal
//   };

//   return (
//     <div>
//       <label>
//         Video Title:
//         <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}  className="text-black"/>
//       </label>
//       <label>
//         Video URL:
//         <input type="file" onChange={handleVideoChange} />
//       </label>
//       <button  onClick={handleAddVideo}>Add Video</button>
//     </div>
//   );
// };

// export default VideoForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseVideo } from "../Redux/CoursesSlice";

const VideoForm = ({ sectionId, onClose }) => {
  const dispatch = useDispatch();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleAddVideo = () => {
    if (sectionId !== undefined && videoTitle !== "" && videoFile !== null) {
      const formData = new FormData();
      formData.append("course_section_id", sectionId);
      formData.append("video_titles", videoTitle);
      formData.append("video", videoFile);

      console.log("Request Payload:", {
        course_section_id: sectionId,
        video_titles: videoTitle,
        video: videoFile,
      });

      // Dispatch an action to add the video to the section
      dispatch(addCourseVideo(formData));
      onClose(); // Close the form/modal
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  return (
    <div>
      <label>
        Video Title:
        <input
          type="text"
          name="videoTitle"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="text-black"
        />
      </label>
      <label>
        Video File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button className="border-2 px-2 rounded-sm" onClick={handleAddVideo}>
        Add Video
      </button>
    </div>
  );
};

export default VideoForm;
