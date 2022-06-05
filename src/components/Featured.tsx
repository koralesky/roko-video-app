import React from "react";
import { Video } from "../types/video";
import { FaPlay } from "react-icons/fa";

interface Props {
  video: Video;
}

function Featured({ video }: Props) {
  return (
    <div className="w-full rounded-md relative overflow-hidden">
      <img
        src={
          video.Images[
            video.Images.findIndex((img) => img.ImageTypeCode === "FRAME")
          ].Url
        }
        className="w-full max-h-[60vh] object-cover object-top aspect-video"
        aria-disabled
      ></img>
      <div className="overlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blueDark to-blueDark/0"></div>
      <div className="content absolute p-5 left-0 bottom-10">
        <div className="font-bold text-4xl mb-2">{video.Title}</div>
        <div className="mb-2">{video.Description}</div>
        <button className="button flex items-center gap-2">
          <FaPlay className="h-3 w-3 text-black" />
          Play
        </button>
      </div>
    </div>
  );
}

export default Featured;
