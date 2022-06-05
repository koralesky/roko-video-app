import { Video } from "../types/video";
import { FaPlay } from "react-icons/fa";
import helpers from "../utils/helpers";
import { Link } from "react-router-dom";

interface Props {
  video: Video;
}

function Featured({ video }: Props) {
  return (
    <div className="w-full rounded-md relative overflow-hidden">
      <img
        src={video.Images[helpers.findIndexOfImg(video, "FRAME")].Url}
        className="w-full max-h-[60vh] object-cover object-top aspect-video"
        aria-disabled
      ></img>
      <div className="overlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blueDark to-blueDark/0"></div>
      <div className="content absolute p-5 left-0 bottom-5">
        <div className="font-bold text-4xl mb-2">{video.Title}</div>
        <div className="mb-2 hidden md:block">{video.Description}</div>
        <Link to={`/watch/${video.Id}`}>
          <button className="button flex items-center gap-2 mt-4">
            <FaPlay className="h-3 w-3 text-black" />
            Play
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
