// LiveSessionPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLiveSessions } from "../Redux/liveSessionsSlice";
import LiveSessionCard from "../Components/LiveSessionCard";
import { Modal } from "../Components/modal";
import { CreateSession } from "../Components/CreateSession";
import LiveSessionPlayer from "../Components/liveSessionPlayer";
import Cookies from "js-cookie";
import { fetchCourses } from "../Redux/CoursesSlice";

const LiveSessionPage = () => {
  const dispatch = useDispatch();
  const liveSessions = useSelector((state) => state.liveSessions.liveSessions);
  const status = useSelector((state) => state.liveSessions.status);
  const error = useSelector((state) => state.liveSessions.error);
  const [isOpen, setIsOpen] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [teacherObject, setTeacherObject] = useState({});
  const [mode, setMode] = useState(null);
  const [sessionObject, setSessionObject] = useState({});
  const [courseAuthor, setCourseAuthor] = useState("");
  const [studentObject, setStudentObject] = useState({});

  const courses = useSelector((state) => state.Courses.Courses);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let token = Cookies.get("userInfo");
    if (!token) return;
    token = JSON.parse(token);
    if (token.trainer) {
      setIsTeacher(true);
      setTeacherObject(token.trainer);
      const courseAuth = courses.find(
        (course) => course.trainer_id === token.trainer.trainer_id
      );
      setCourseAuthor(courseAuth?.course_author);
    } else {
      setIsTeacher(false);
      setStudentObject(token.user);
    }
  }, [user, courses]);

  useEffect(() => {
    // Dispatch the fetchLiveSessions action when the component mounts
    dispatch(fetchLiveSessions());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (liveSessions?.length === 0) {
    return <p>No live sessions at the moment.</p>;
  }

  const handleStartSession = (session) => {
    setSessionObject(session);
    if (isTeacher) {
      setMode("CONFERENCE");
      return;
    }
    setMode("VIEWER");
  };

  return (
    <div className="bg-slate-300 p-4 text-white h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex justify-between">
        <h3 className="text-3xl text-black font-bold">Live Sessions</h3>
        {isTeacher && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-cyan-700 hover:bg-cyan-800 px-2 text-white rounded-lg py-2 mr-8"
          >
            Create Session
          </button>
        )}
      </div>
      <div className="flex flex-wrap m-4 mb-0">
        {liveSessions
          .filter((e) =>
            isTeacher ? e.trainer_id === teacherObject.trainer_id : true
          )
          .map((session) => (
            <LiveSessionCard
              key={session.session_id}
              session={session}
              courseAuthor={courseAuthor}
              isTeacher={isTeacher}
              handleStartSession={handleStartSession}
            />
          ))}
      </div>
      {isOpen && (
        <Modal isOpen onClose={() => setIsOpen(false)} title={"Create Session"}>
          <CreateSession onSave={(e) => setIsOpen(!e)} />
        </Modal>
      )}

      <Modal
        isOpen={mode?.length}
        onClose={() => setIsOpen(false)}
        title={`Streaming ${sessionObject.session_title}...`}
        isFullScreen
      >
        <div className="bg-white flex w-full h-full flex-col relative">
          <LiveSessionPlayer
            onSessionStopped={() => setMode(null)}
            mode={mode}
            sessionName={courseAuthor || studentObject?.firstname}
          ></LiveSessionPlayer>
        </div>
      </Modal>
    </div>
  );
};

export default LiveSessionPage;
