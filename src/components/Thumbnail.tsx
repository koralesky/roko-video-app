import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Video } from "../types/video";

interface Props {
  video: Video;
}

function Thumbnail({ video }: Props) {
  const { isAnon } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-center justify-center relative h-28 w-[180px] cursor-pointer transition duration-200 ease-in-out md:h-36 min-w-[260px] md:hover:scale-105">
      {video.Images.findIndex((img) => img.ImageTypeCode === "FRAME") == -1 ? (
        video.Title
      ) : (
        <>
          <img
            src={
              video.Images[
                video.Images.findIndex((img) => img.ImageTypeCode === "FRAME")
              ].Url
            }
            className="rounded-sm object-cover md:rounded w-full h-full"
          ></img>
          <div className="desc absolute bottom-4 left-0 right-0 w-full bg-blue/50 p-2">
            {video.Title}
          </div>
        </>
      )}
    </div>
  );
}

export default Thumbnail;
