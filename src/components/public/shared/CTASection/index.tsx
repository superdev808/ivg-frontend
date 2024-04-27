import classNames from "classnames/bind";
import React from "react";

import styles from "./CTASection.module.scss";

const cx = classNames.bind(styles);

interface CTASectionProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
}

export const CTASection: React.FC<CTASectionProps> = ({ title, text }) => (
  <div
    className={cx(
      "cta-container",
      "w-full flex justify-content-center text-white py-3 z-2"
    )}
  >
    <div className="flex flex-column align-items-center px-4 md:py-6 text-center">
      <span className="my-2 px-2 text-2xl md:text-6xl font-bold text-dark-green">
        {title}
      </span>

      <span className="my-1 mx-2 text-lg md:text-xl text-center text-dark-green">
        {text}
      </span>
    </div>
  </div>
);
