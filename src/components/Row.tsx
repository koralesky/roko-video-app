import { useRef, useState } from "react";
import { Video } from "../types/video";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "./Thumbnail";
import { v4 as uuidv4 } from "uuid";

interface Props {
  title: string;
  videos: Video[];
}

function Row({ title, videos }: Props) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isMoved, setIsMoved] = useState(false);

  // Handle horizontal scrolling using arrows
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 overflow-y-hidden"
        >
          {videos.map((video) => (
            <Thumbnail key={uuidv4()} video={video} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="absolute right-2 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

export default Row;
