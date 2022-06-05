import React from "react";
import { Video } from "../types/video";

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
      <div className="content absolute p-5 left-0 bottom-10">
        <div className="font-bold text-4xl mb-2">{video.Title}</div>
        <div>{video.Description}</div>
      </div>
    </div>
  );
}

export default Featured;
