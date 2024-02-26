import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import styles from "./ScrollCard.module.scss";

const cx = classNames.bind(styles);

interface ScrollCardProps {
  description: string;
  className?: string;
  cardClassName?: string;
  rtl?: boolean;
}

export const ScrollCard = ({
  description,
  rtl,
  cardClassName,
  ...props
}: ScrollCardProps) => {
  const [length, setLength] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const handleScroll = () => {
      const targetScrollPosition = 500;
      const currentScrollPosition =
        document.body.scrollTop || document.documentElement.scrollTop;

      const scrollPercent = currentScrollPosition / targetScrollPosition;
      const scrollPercentClamped = Math.min(Math.max(scrollPercent, 0), 1);
      var widthPercentage = scrollPercentClamped * 100;

      const line = lineRef.current;
      const card = cardRef.current;
      if (!line || !card) return;
      card.style.opacity = scrollPercentClamped.toString();
      line.style.width = widthPercentage + "%";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [length]);
  return (
    <div className={cx("scroll-card", cardClassName)} ref={cardRef}>
      <div className={cx("card", "flex z-2", { "flex-order-1": rtl })}>
        {description}
      </div>
      <div
        className={cx(
          "line-container",
          { "flex-grow-1": !props.className },
          props.className
        )}
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        <div
          ref={lineRef}
          className="relative flex align-items-center"
          style={{ width: "0%", overflow: "hidden" }}
        >
          <svg width="calc(100% - 25px)" height="60px">
            <path
              d="M5 30 H595"
              strokeWidth="2"
              style={{ stroke: "var(--primary-color)" }}
              strokeDasharray="5,5"
            />
          </svg>
          <svg
            width="30px"
            height="30px"
            className={cx("circle")}
            style={{ right: rtl ? "unset" : "0", left: rtl ? "0" : "unset" }}
          >
            <g>
              <circle
                style={{
                  stroke: "var(--primary-color)",
                  fillOpacity: "0",
                  strokeWidth: "2",
                  strokeDasharray: "none",
                  strokeOpacity: "1",
                }}
                cx="15"
                cy="15"
                r="9"
              />
              <circle fill="var(--primary-color)" cx="15" cy="15" r="6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
