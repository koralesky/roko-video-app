import axios from "axios";
import { MEDIA_API_URL as API_URL } from "../../constants/api";

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

const mediaService = {
  getMediaList,
};

export default mediaService;
