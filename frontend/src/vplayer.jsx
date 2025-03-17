import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const HlsVideoPlayer = ({ vUrl_english, subtitleSrc,vUrl_japanese, isSub }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initialize HLS.js for streaming .m3u8 videos
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(isSub? vUrl_japanese:vUrl_english);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = isSub? vUrl_japanese:vUrl_english;
    }

    // Ensure subtitles are added
    if (subtitleSrc) {
      console.log("Loading subtitle:", subtitleSrc);

      // Remove existing subtitle track (to prevent duplicates)
      const oldTrack = video.querySelector("track");
      if (oldTrack) {
        video.removeChild(oldTrack);
      }

      // Create and append a new <track> element
      const track = document.createElement("track");
      track.label = "English";
      track.kind = "subtitles";
      track.srcLang = "en";
      track.src = subtitleSrc;
      track.default = true;

      video.appendChild(track);

      // Ensure subtitles are always shown
      track.track.mode = "showing";
    }
  }, [vUrl_english, subtitleSrc,isSub]);

  return (
    <div className="w-full mx-auto bg-black">
      <video ref={videoRef} className="w-full " controls crossOrigin="anonymous">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HlsVideoPlayer;