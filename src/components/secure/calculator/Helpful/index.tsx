import classNames from "classnames/bind";
import React from "react";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HelpfulButtonProps {
  onClickThumbUp: () => void;
  onClickThumbDown: () => void;
}

const HelpfulButton: React.FC<HelpfulButtonProps> = ({
  onClickThumbUp,
  onClickThumbDown,
}) => (
  <div
    className={`fixed text-2xl m-1 left-50 bg-light-green text-beige
      flex align-items-center gap-3 p-3 pb-6 border-round-3xl m-0`}
    style={{
      transform: "translate(-50%, -50%)",
      bottom: "-90px",
      zIndex: "100",
    }}
  >
    <i
      className={cx("pi pi-thumbs-up text-3xl cursor-pointer", "thumbButton")}
      onClick={onClickThumbUp}
    />
    Was this helpful?
    <i
      className={cx("pi pi-thumbs-down text-3xl cursor-pointer", "thumbButton")}
      onClick={onClickThumbDown}
    />
  </div>
);

export default HelpfulButton;
