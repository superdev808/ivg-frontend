import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React, { useState } from "react";

import { SHOULD_DISPLAY_TEXT_ONLY } from "@/constants/calculators";
import { deserializeColInfo, getLinkText, isEmptyAnswer, isLinkText, isPopup, isValidUrl } from "@/helpers/calculators";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface PopupOutputProps {
  className?: string;
  data: {
    [key: string]: string | number;
  };
  size?: number;
}

const PopupOutput: React.FC<PopupOutputProps> = ({ data, size = 16 }) => {
  const [opened, setOpened] = useState(false);

  const popupData = Object.keys(data)
    .filter(key => isPopup(key) && isLinkText(key) === false)
    .reduce(
      (result, curKey) => ({
        ...result,
        [curKey]: data[curKey] as string,
      }),
      {} as {
        [key: string]: string
      }
    )

  const handleOpenPopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      className: cx("material-popup"),
      style: {
        maxWidth: 600,
      },
      footer: <></>,
      message: (
        <div className="flex flex-column align-items-center gap-2 text-center text-beige mx-4 my-4">
          {Object.entries(popupData).map(([label, text]) => {
            const { groupText } = deserializeColInfo(label);
            const linkText = getLinkText(data, groupText);
            return (
              <div key={label}>
                {!label.includes(SHOULD_DISPLAY_TEXT_ONLY) &&
                  (isValidUrl(text) ? (
                    <Link
                      className="no-underline text-beige justify-self-center"
                      href={text}
                      target="_blank"
                    >
                      {groupText && <b>{groupText}: </b>} {linkText}
                    </Link>
                  ) : (
                    <div>
                      <b>{groupText}:</b> {text}
                    </div>
                  ))}
                {label.includes(SHOULD_DISPLAY_TEXT_ONLY) && text}
              </div>
            );
          })}
        </div>
      ),
      onShow: () => setOpened(true),
      onHide: () => setOpened(false),
    });
  };

  return Object.keys(popupData).length > 0 && !isEmptyAnswer(popupData) ? (
    <i
      className={cx(
        "pi text-light-green cursor-pointer pi-question-circle border-round-full",
        { "text-light-green bg-secondary": opened }
      )}
      style={{
        fontSize: size,
        width: size,
        height: size,
      }}
      onClick={handleOpenPopup}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default PopupOutput;
