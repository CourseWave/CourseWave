import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";

const LiveSessionPlayer = ({ mode, onSessionStopped, sessionName }) => {
  if (!mode) return;
  console.log({ sessionName });
  return (
    <MeetingProvider
      config={{
        meetingId: "7mpr-8hp4-aoue",
        micEnabled: true,
        webcamEnabled: true,
        name: sessionName,
        mode,
      }}
      joinWithoutUserInteraction
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzODM0ZWExMS1iZTNjLTQ0MGItOWY4ZS00MDE3Nzc5YzE3MmYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMzQzMzMwMiwiZXhwIjoxNzAzNTE5NzAyfQ.BfNwuIFMwSQTbQ51HlLq-zm3I6MP2Eb7SIt1rvbeZv4"
    >
      {mode === Constants.modes.CONFERENCE ? (
        <SpeakerView onSessionStopped={onSessionStopped} />
      ) : (
        <>
          <ViewerView onSessionStopped={onSessionStopped} />
        </>
      )}
    </MeetingProvider>
  );
};

export default LiveSessionPlayer;

function SpeakerView({ onSessionStopped }) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participant list to display all participants
  const { participants } = useMeeting();

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
      //we will pin the local participant if he joins in CONFERENCE mode
      mMeetingRef.current.localParticipant.pin();
    },
  });

  //We will create a ref to meeting object so that when used inside the
  //Callback functions, meeting state is maintained
  const mMeetingRef = useRef(mMeeting);

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()];
    return speakerParticipants;
  }, [participants]);

  return (
    <>
      {joined && joined === "JOINED" ? (
        <>
          {speakers.map((participant) => (
            <ParticipantView
              participantId={participant.id}
              key={participant.id}
            />
          ))}
          <Controls onSessionStopped={onSessionStopped} />
          {}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);

  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls
          muted
          playing
          url={videoStream}
          style={{}}
          className="!w-full bg-black custom-video !object-cover !rounded-md !shadow-lg"
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </>
  );
}

function Controls({ onSessionStopped }) {
  const { hlsState, startHls, stopHls, participants, leave, stopVideo } =
    useMeeting();

  useEffect(() => {
    startHls({
      layout: {
        type: "SPOTLIGHT",
        priority: "PIN",
        gridSize: 4,
      },
      theme: "DARK",
      orientation: "landscape",
    });
  }, []);

  const _handleHLS = () => {
    console.log(hlsState);
    // Iterate through participants and kick them
    participants.forEach((participant) => {
      participant.remove();
    });
    leave();
    stopHls();
    stopVideo();
    onSessionStopped(true);
  };
  return (
    <>
      {hlsState === "HLS_PLAYABLE" ? (
        <button
          className="bg-red-500 rounded absolute -top-[48px] right-[1px] text-white py-2 px-4"
          onClick={() => {
            _handleHLS();
          }}
        >
          Stop Live
        </button>
      ) : (
        <p className="text-red-500 absolute -top-[45px] right-1">
          loading session...
        </p>
      )}
    </>
  );
}

function ViewerView({ onSessionStopped }) {
  // States to store downstream url and current HLS state
  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, hlsState, leave } = useMeeting();

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      //we will pin the local participant if he joins in CONFERENCE mode
      mMeetingRef.current.localParticipant.pin();
    },
    onHlsStateChanged: (data) => {
      console.log(data);
      if (data.status === "HLS_STOPPED") {
        leave();
      }
    },
  });

  const mMeetingRef = useRef(mMeeting);

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  //Playing the HLS stream when the downstreamUrl is present and it is playable
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });
        let player = document.querySelector("#hlsPlayer");
        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState, playerRef.current]);

  return (
    <div>
      {/* Showing message if HLS is not started or is stopped by HOST */}
      {hlsState !== "HLS_PLAYABLE" ? (
        <div className="mt-52 gap-2 flex items-center flex-col justify-center">
          <p className="text-xl">Session is Over or has not started yet</p>
          <button
            className="bg-red-500 px-4 py-2 text-white rounded"
            onClick={() => {
              onSessionStopped(true);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div>
            <div>
              <video
                ref={playerRef}
                id="hlsPlayer"
                autoPlay
                controls
                className="w-full h-[36rem] 2xl:h-full object-cover rounded-md shadow-lg"
                playsinline
                muted
                playing
                onError={(err) => {
                  console.log(err, "hls video error");
                }}
              ></video>
            </div>

            <button
              className="bg-red-500 rounded absolute -top-[48px] right-[1px] text-white py-2 px-4"
              onClick={() => {
                leave();
                onSessionStopped();
              }}
            >
              Leave Session
            </button>
          </div>
        )
      )}
    </div>
  );
}
