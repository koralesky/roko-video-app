import { Link } from "react-router-dom";
import { Video } from "../types/video";
import helpers from "../utils/helpers";

interface Props {
  video: Video;
}

function Thumbnail({ video }: Props) {
  return (
    <Link to={`/watch/${video.Id}`}>
      <div className="flex items-center justify-center relative w-[180px] aspect-video cursor-pointer transition duration-200 ease-in-out min-w-[260px] md:hover:scale-105">
        {helpers.findIndexOfImg(video, "FRAME") == -1 ? (
          video.Title
        ) : (
          <>
            <img
              src={video.Images[helpers.findIndexOfImg(video, "FRAME")].Url}
              className="rounded-sm object-cover md:rounded w-full h-full"
              aria-disabled
            ></img>
            <div className="desc absolute bottom-4 left-0 right-0 w-full bg-blue/50 p-2">
              {video.Title}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default Thumbnail;
