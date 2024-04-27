import classNames from "classnames/bind";
// import { useEffect, useRef, useState } from "react";

import styles from "./ScrollCard.module.scss";

const cx = classNames.bind(styles);

interface ScrollCardProps {
  description: string;
  rtl?: boolean;
  svgLine: React.ReactNode;
}

export const ScrollCard: React.FC<ScrollCardProps> = ({
  description,
  svgLine,
  rtl,
}) => {
  // const [length, setLength] = useState(0);
  // const lineRef = useRef<HTMLDivElement>(null);
  // const cardRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const line = lineRef.current;
  //   if (!line) return;
  //   const handleScroll = () => {
  //     const targetScrollPosition = 500;
  //     const currentScrollPosition =
  //       document.body.scrollTop || document.documentElement.scrollTop;

  //     const scrollPercent = currentScrollPosition / targetScrollPosition;
  //     const scrollPercentClamped = Math.min(Math.max(scrollPercent, 0), 1);
  //     var widthPercentage = scrollPercentClamped * 100;

  //     const line = lineRef.current;
  //     const card = cardRef.current;
  //     if (!line || !card) return;
  //     card.style.opacity = scrollPercentClamped.toString();
  //     line.style.width = widthPercentage + "%";
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [length]);

  return (
    <div
      className={cx("scroll-card", {
        "line-right": rtl,
        "line-left": !rtl,
      })}
      // ref={cardRef}
    >
      <div className={cx("scroll-card__description", "flex z-2")}>
        {description}

        <div
          className={cx("scroll-card__line-container")}
          style={{
            direction: rtl ? "rtl" : "ltr",
          }}
        >
          <div
            // ref={lineRef}
            className="relative flex align-items-center"
            style={{
              // width: "0%",
              overflow: "hidden",
            }}
          >
            {svgLine}
          </div>
        </div>
      </div>
    </div>
  );
};
