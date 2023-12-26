import { useRef } from "react";

export const VideoPlayer = ({ videoUrl , videoTitle}) => {
  const videoRef = useRef(null);

  if (!videoUrl) {
    return (
      <p className="text-white h-full text-3xl font-[Poppins] flex justify-center items-center">
        Please select a video{" "}
      </p>
    );
  }
  return (
    <div className="w-full h-full overflow-hidden group relative">
      <h3 className="text-white text-2xl flex rounded-md p-2 h-16 items-center bg-opacity-40 absolute bg-slate-500 w-full group-hover:hidden">
        {videoTitle}
      </h3>
      <video
        ref={videoRef}
        className="w-full h-full object-contain rounded-md shadow-lg"
        src={encodeURI(`http://localhost:5000${videoUrl}`)}
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
