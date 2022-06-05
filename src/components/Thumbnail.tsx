import { Video } from "../types/video";

interface Props {
  video: Video;
}

function Thumbnail({ video }: Props) {
  return (
    <div className=" relative h-28 w-[180px] cursor-pointer transition duration-200 ease-in-out md:h-36 min-w-[260px] md:hover:scale-105">
      {video.Images[0] ? (
        <img
          src={video.Images[0].Url}
          className="rounded-sm object-cover md:rounded"
        />
      ) : (
        video.Title
      )}
    </div>
  );
}

export default Thumbnail;
