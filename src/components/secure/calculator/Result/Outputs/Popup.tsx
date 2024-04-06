import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

export const REASONING_TEXT = "Reasoning";
export const SUPPORT_ARTICLES_TEXT = "Supporting Article";

interface PopupOutputProps {
  data: {
    [key: string]: string;
  }
}


const PopupOutput: React.FC<PopupOutputProps> = ({ data }) => {
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
          {
            Object.entries(data).map(([label, text]) => (
              <>
                {label.startsWith(REASONING_TEXT) && (
                  <div>
                    <b>{REASONING_TEXT}:</b> {text}
                  </div>
                )}
                {label.startsWith(SUPPORT_ARTICLES_TEXT) && (
                  <Link
                    className="text-beige"
                    href={text}
                    target="_blank"
                  >
                    {SUPPORT_ARTICLES_TEXT}
                  </Link>
                )}
              </>
            ))
          }
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
