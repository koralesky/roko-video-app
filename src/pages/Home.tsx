import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import mediaService from "../features/media/mediaService";
import { RootState } from "../store";
import { Video } from "../types/video";

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaArr, setMediaArr] = useState<any>([]);

  useEffect(() => {
    let promises = [];
    if (user) {
      for (let i = 2; i <= 7; i++) {
        promises.push(
          mediaService.getMediaList(
            {
              PageSize: 15,
              MediaListId: i,
              IncludeCategories: true,
              IncludeMedia: true,
              IncludeImages: true,
            },
            user.AuthorizationToken.Token
          )
        );
      }
    }

    Promise.all(promises)
      .then((result) => {
        result.map((promiseResult) => {
          mediaArr.push(...promiseResult.Entities);
        });
      })
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div>Home</div>
      <ul className="vids">
        {mediaArr.map((video: Video, index: number) => (
          <li key={index}>{video.Title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
