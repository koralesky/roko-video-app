import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Featured from "../components/Featured";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import { anonUser } from "../features/auth/authSlice";
import mediaService from "../features/media/mediaService";
import { RootState, useAppDispatch } from "../store";
import { Video } from "../types/video";
import helpers from "../utils/helpers";
import isInThePast from "../utils/isInThePast";

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaArr, setMediaArr] = useState<any>([]);
  const [chunkedArray, setChunkedArray] = useState<any>([]);
  const [featuredVideo, setFeaturedVideo] = useState<Video | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Array that contains all promises from API
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

    // Resolve all promises, and push results into one array
    Promise.all(promises)
      .then((result) => {
        result.map((promiseResult, index: number) => {
          mediaArr.push(...promiseResult.Entities);
        });
      })
      .then(() => {
        // Divide array into smaller - max 10 items size arrays.
        const chunkSize = 10;
        for (let i = 0; i < mediaArr.length; i += chunkSize) {
          const chunk = mediaArr.slice(i, i + chunkSize);
          chunkedArray.push(chunk);
        }
        // Set featured video as random video that has Images and has "FRAME" ImageTypeCode
        setFeaturedVideo(
          mediaArr.filter(
            (el: Video) =>
              el.Images.length > 0 && helpers.findIndexOfImg(el, "FRAME") > -1
          )[Math.floor(Math.random() * mediaArr.length)]
        );
        console.log(mediaArr);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <main className="space-y-16">
        {featuredVideo && <Featured video={featuredVideo} />}
        {chunkedArray.map((innerArray: [Video], index: number) => (
          <Row title={`Videos ${index + 1}`} videos={innerArray} />
        ))}
      </main>
    </div>
  );
}

export default Home;
