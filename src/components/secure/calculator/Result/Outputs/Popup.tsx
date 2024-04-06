import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface PopupOutputProps {
  label: string;
  text: string;
}

export const REASONING_TEXT = "Reasoning";
export const SUPPORT_ARTICLES_TEXT = "Supporting Articles";

const PopupOutput: React.FC<PopupOutputProps> = ({ label, text }) => {
  const handleOpenPopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      className: cx("material-popup"),
      style: {
        maxWidth: 600,
      },
      footer: <></>,
      message: (
        <div className="flex flex-column align-items-center gap-4 text-center text-beige -ml-3">
          {label.startsWith(REASONING_TEXT) && (
            <div>
              <b>{label}:</b> {text}
            </div>
          )}
          {label.startsWith(SUPPORT_ARTICLES_TEXT) && (
            <Link
              className="text-beige"
              href={text}
              target="_blank"
            >
              {label}
            </Link>
          )}
        </div>
      ),
    });
  };

  return (
    <i
      className="pi pi-question-circle text-light-green cursor-pointer"
      onClick={handleOpenPopup}
    />
  );
};

export default PopupOutput;
