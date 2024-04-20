import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import {
  REASONING_TEXT,
  SHOULD_DISPLAY_TEXT_ONLY,
  SUPPORT_ARTICLES_TEXT,
} from "@/constants/calculators";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface PopupOutputProps {
  className?: string;
  data: {
    [key: string]: string;
  };
}

const PopupOutput: React.FC<PopupOutputProps> = ({ className, data }) => {
  const handleOpenPopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      className: cx("material-popup"),
      style: {
        maxWidth: 600,
      },
      footer: <></>,
      message: (
        <div className="flex flex-column align-items-center gap-2 text-center text-beige -ml-3">
          {Object.entries(data).map(([label, text]) => (
            <div key={label}>
              {label.includes(REASONING_TEXT) && (
                <div>
                  <b>{REASONING_TEXT}:</b> {text}
                </div>
              )}
              {label.includes(SUPPORT_ARTICLES_TEXT) && (
                <Link
                  className="text-beige justify-self-center"
                  href={text}
                  target="_blank"
                >
                  {SUPPORT_ARTICLES_TEXT}
                </Link>
              )}
              {label.includes(SHOULD_DISPLAY_TEXT_ONLY) && text}
            </div>
          ))}
        </div>
      ),
    });
  };
  return (
    Object.keys(data).length > 0 && (
      <i
        className={cx("pi pi-question-circle cursor-pointer", className)}
        onClick={handleOpenPopup}
      />
    )
  );
};

export default PopupOutput;
