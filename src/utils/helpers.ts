import { useSelector } from "react-redux";
import mediaService from "../features/media/mediaService";
import { RootState } from "../store";
import { Video } from "../types/video";
const mime = require("mime");

const findIndexOfImg = (video: Video, imgType: string) => {
  return video.Images.findIndex((img) => img.ImageTypeCode === imgType);
};

const getMediaPromises = (user: any) => {
  const promises = [];

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
  return promises;
};

const getFileType = (file: string) => {
  return mime.getType(file);
};

const helpers = {
  findIndexOfImg,
  getMediaPromises,
  getFileType,
};

export default helpers;
