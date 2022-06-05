import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Featured from "../components/Featured";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import mediaService from "../features/media/mediaService";
import { RootState } from "../store";
import { Video } from "../types/video";

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaArr, setMediaArr] = useState<any>([]);
  const [chunkedArray, setChunkedArray] = useState<any>([]);
  const [featuredVideo, setFeaturedVideo] = useState<Video | undefined>(
    undefined
  );

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
        setFeaturedVideo(mediaArr[Math.floor(Math.random() * mediaArr.length)]);
        // Divide array into smaller - max 10 items size arrays.
        const chunkSize = 10;
        for (let i = 0; i < mediaArr.length; i += chunkSize) {
          const chunk = mediaArr.slice(i, i + chunkSize);
          chunkedArray.push(chunk);
        }
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
      <Navbar />
      <main className="space-y-16">
        {console.log(featuredVideo)}
        <Featured />
        {chunkedArray.map((innerArray: [Video], index: number) => (
          <Row title={`Videos ${index}`} videos={innerArray} />
        ))}
      </main>
    </div>
  );
}

export default Home;
