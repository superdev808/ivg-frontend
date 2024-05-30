import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import { useInView } from "react-intersection-observer";
import { Image } from "primereact/image";

const cx = classNames.bind(styles);

const playbackConst = 1000; // Adjust the constant as needed
const videoUrl =
  "https://ivoryguide.s3.us-west-1.amazonaws.com/images/about/output-mockup.mp4";

interface AboutContentVideoScrollerProps {
  children?: React.ReactNode
}

export default function AboutContentSectionScoller({ children }: AboutContentVideoScrollerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [animDone, setAnimDone] = useState(false);

  // Debounce the scroll event for better performance
  const debouncedScrollPlay = useCallback(() => {
    if (videoRef.current) {
      const frameNumber = window.pageYOffset / playbackConst;
      videoRef.current.currentTime = frameNumber;
    }
  }, []);

  useEffect(() => {
    if (inView === true)
      setAnimDone(true);
    if (inView === false && window.scrollY < 2000)
      setAnimDone(false);
  }, [inView]);

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
      <div className={cx("video-wrapper")} ref={ref}>
        <video ref={videoRef} preload="preload" className={cx("video-custom")} style={{ transform: animDone ? 'scale(0.7)' : 'scale(1)' }}>
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src={videoUrl}
          ></source>
        </video>
        <Image
          className="absolute top-50 left-50"
          style={{
            transform: 'translate(-50%, -46%)',
            width: '92.5%',
            opacity: animDone ? '1' : '0',
            transition: `all .5s ease-in-out ${animDone ? 1 : 0.3}s`,
          }}
          src="https://ivoryguide.s3.us-west-1.amazonaws.com/images/about/pc-frame.png"
          alt="PC Frame"
          width="100%"
        />
        {children}
      </div>
      <div ref={scrollSectionRef} id={cx("scrollSection")}></div>
    </div>
  );
}
