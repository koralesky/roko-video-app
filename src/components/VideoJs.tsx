import { useEffect, useRef } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement>();
  const player = useRef<videojs.Player>();

  useEffect(() => {
    //   @ts-ignore
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);
  //   @ts-ignore
  return <video ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
