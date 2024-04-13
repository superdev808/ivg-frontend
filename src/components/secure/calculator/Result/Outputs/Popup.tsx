import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React from "react";

import styles from "./style.module.scss";
import { isValidUrl } from "@/helpers/calculators";

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
        <div className="flex flex-column align-items-center gap-2 text-center text-beige -ml-3">
          {
            Object.entries(data).map(([label, text]) => (
              <>
                {!isValidUrl(text)&& (
                  <div>
                    <b>{REASONING_TEXT}:</b> {text}
                  </div>
                )}
                {isValidUrl(text) && (
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

  return Object.keys(data).length > 0 && (
    <i
      className="pi pi-question-circle text-light-green cursor-pointer pt-1"
      onClick={handleOpenPopup}
    />
  );
};

export default PopupOutput;
