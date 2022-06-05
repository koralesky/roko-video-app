import axios from "axios";
import { MEDIA_API_URL as API_URL } from "../../constants/api";

interface IGetMediaPlayInfo {
  mediaId: number;
  isAnon: boolean;
}

// Get media list
const getMediaList = async (mediaData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    API_URL + "/GetMediaList",
    JSON.stringify(mediaData),
    config
  );
  return response.data;
};

const getMediaPlayInfo = async (
  mediaData: IGetMediaPlayInfo,
  token: string
) => {
  const mediaId = mediaData.mediaId;
  const streamType = mediaData.isAnon ? "TRIAL" : "MAIN";
  const mediaRequest = { mediaId, streamType };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    API_URL + "/GetMediaPlayInfo",
    JSON.stringify(mediaRequest),
    config
  );
  return response.data;
};

const mediaService = {
  getMediaList,
  getMediaPlayInfo,
};

export default mediaService;
