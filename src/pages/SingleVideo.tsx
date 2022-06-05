import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import mediaService from "../features/media/mediaService";
import { RootState } from "../store";
import VideoPlayer from "../components/VideoJs";
import mime from "mime";
import helpers from "../utils/helpers";
import { toast } from "react-toastify";

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
  const [error, setError] = useState(0);

  useEffect(() => {
    if (user) {
      mediaService
        .getMediaPlayInfo(
          { mediaId: parseInt(id!), isAnon: isAnon },
          user.AuthorizationToken.Token
        )
        .then((result) => {
          setVideo(result);
          console.log(result);
          console.log(helpers.getFileType(result.ContentUrl));
          setMimeType(helpers.getFileType(result.ContentUrl));
          setVideoSrc(result.ContentUrl);
        })
        .catch((error) => {
          setError(error.response.status);
          console.log(error.response.status);
          error.response.status === 403 &&
            toast.error("Subscribe to view this content.");
        })
        .then(() => setIsLoading(false));
    }

    return () => {
      setError(0);
    };
  }, [id, user]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: videoSrc,
        type: mimeType ? mimeType : "video/mp4",
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex flex-col w-full gap-5">
      <h1 className="text-4xl font-bold">{video?.Title}</h1>
      <div className="player w-full">
        {videoSrc ? (
          <VideoPlayer options={videoJsOptions} />
        ) : (
          <div>Video Not Available</div>
        )}
        {error === 403 && (
          <div className="mt-4 text-2xl text-orangeDark">
            Video available only for subscribed users!
          </div>
        )}
      </div>
    </main>
  );
}

export default SingleVideo;
