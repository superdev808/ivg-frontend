import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

const playbackConst = 500; // Adjust the constant as needed
const videoUrl =
  "https://ivoryguide.s3.us-west-1.amazonaws.com/images/about/output-mockup.mp4";

interface AboutContentVideoScrollerProps {
  children: React.ReactNode
}

export default function AboutContentSectionScoller({ children }: AboutContentVideoScrollerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setLoaded] = useState(false);

  // Debounce the scroll event for better performance
  const debouncedScrollPlay = useCallback(() => {
    if (videoRef.current) {
      const frameNumber = window.pageYOffset / playbackConst;
      videoRef.current.currentTime = frameNumber;
    }
  }, []);

  useEffect(() => {
    setLoaded(true);
    // Attach the debouncedScrollPlay function to the scroll event
    window.addEventListener("scroll", debouncedScrollPlay);
    return () => {
      // Cleanup: Remove the event listener on unmount
      window.removeEventListener("scroll", debouncedScrollPlay);
    };
  }, [debouncedScrollPlay]);

  useEffect(() => {
    const video = videoRef.current as HTMLVideoElement;

    const setScrollSectionHeight = () => {
      if (videoRef.current) {
        const { duration } = video;
        const scrollSection = scrollSectionRef.current as HTMLDivElement;
        scrollSection.style.height =
          Math.floor(duration) * playbackConst + "px";
      }
    };

    video.addEventListener("loadedmetadata", setScrollSectionHeight);

    return () => {
      video.removeEventListener("loadedmetadata", setScrollSectionHeight);
    };
  }, []);

  return (
    <div className={cx("content-video-scroller")}>
      <div className={cx("video-wrapper")}>
        <video ref={videoRef} preload="preload" className={cx("video")}>
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src={videoUrl}
          ></source>
        </video>
        {children}
      </div>
      <div ref={scrollSectionRef} id={cx("scrollSection")}></div>
    </div>
  );
}
