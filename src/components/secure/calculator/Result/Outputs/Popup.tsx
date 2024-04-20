import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React, { useState } from "react";

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
  const [isOpened, setIsOpened] = useState<boolean>(false);

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
      onShow: () => setIsOpened(true),
      onHide: () => setIsOpened(false),
    });
  };

  const hasContent = Object.keys(data).length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <div>
      <i
        className={cx("pi pi-question-circle cursor-pointer", className, {
          "bg-dark-green text-beige border-round-3xl": isOpened,
        })}
        onClick={handleOpenPopup}
      />
    </div>
  );
};

export default PopupOutput;
