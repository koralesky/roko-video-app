import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import mediaService from "../features/media/mediaService";
import { RootState } from "../store";
import VideoPlayer from "../components/VideoJs";
import mime from "mime";
import helpers from "../utils/helpers";

interface IVideo {
  ContentUrl: string;
  Description: string;
  MediaId: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  Provider: string;
  StreamId: number;
  Title: string;
}

function SingleVideo() {
  const { id } = useParams();
  const { user, isAnon } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<IVideo | null>(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [mimeType, setMimeType] = useState("");

  useEffect(() => {
    mediaService
      .getMediaPlayInfo(
        { mediaId: parseInt(id!), isAnon: isAnon },
        user.AuthorizationToken.Token
      )
      .then((result) => {
        setVideo(result);
        console.log(result);
        setMimeType(helpers.getFileType(result.ContentUrl));
        setVideoSrc(result.ContentUrl);
      })
      .then(() => setIsLoading(false));
  }, [id, user]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: videoSrc,
        type: mimeType,
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex flex-col w-full gap-5">
      <h1 className="text-4xl font-bold">{video?.Title}</h1>
      <div className="player w-full h-[60vh]">
        {videoSrc && mimeType ? (
          <VideoPlayer options={videoJsOptions} />
        ) : (
          <>Video Not Available</>
        )}
      </div>
    </main>
  );
}

export default SingleVideo;
