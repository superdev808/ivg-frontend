import classNames from "classnames/bind";
import React from "react";

import styles from "./CTASection.module.scss";

const cx = classNames.bind(styles);

interface CTASectionProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  light?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  text,
  light,
}) => (
  <div
    className={cx(
      "w-full flex justify-content-center text-white py-3 z-2",
      "cta-container",
      { light }
    )}
  >
    <div className="flex flex-column align-items-center px-4 md:py-6 text-center">
      <span
        className={cx("my-2 px-2 text-2xl md:text-6xl font-bold", {
          "text-primary": !light,
          "text-dark-green": light,
        })}
      >
        {title}
      </span>

      <span
        className={cx("my-1 mx-2 text-lg md:text-xl text-center", {
          "text-dark-green": light,
        })}
      >
        {text}
      </span>
    </div>
  </div>
);
