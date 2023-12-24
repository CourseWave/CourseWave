// LiveSessionPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLiveSessions } from "../Redux/liveSessionsSlice";
import LiveSessionCard from "../Components/LiveSessionCard";

const LiveSessionPage = () => {
  const dispatch = useDispatch();
  const liveSessions = useSelector((state) => state.liveSessions.liveSessions);
  const status = useSelector((state) => state.liveSessions.status);
  const error = useSelector((state) => state.liveSessions.error);

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

  return (
    <div>
      <h1>Live Sessions</h1>
      {liveSessions.map((session) => (
        <LiveSessionCard key={session.id} session={session} />
      ))}
    </div>
  );
};

export default LiveSessionPage;
