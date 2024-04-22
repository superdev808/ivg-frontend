import classNames from "classnames/bind";
import Link from "next/link";
import { confirmPopup } from "primereact/confirmpopup";
import React, { useRef, useState } from "react";

import { SHOULD_DISPLAY_TEXT_ONLY } from "@/constants/calculators";

import styles from "./style.module.scss";
import { deserializeColInfo, isValidUrl } from "@/helpers/calculators";

const cx = classNames.bind(styles);

interface PopupOutputProps {
  data: {
    [key: string]: string;
  };
  size?: number;
}

const PopupOutput: React.FC<PopupOutputProps> = ({ data, size = 16 }) => {
  const [opened, setOpened] = useState(false);
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
          {Object.entries(data).map(([label, text]) => {
            const { groupText } = deserializeColInfo(label);
            return (
              <div key={label}>
                {!label.includes(SHOULD_DISPLAY_TEXT_ONLY) &&
                  (isValidUrl(text) ? (
                    <Link
                      className="text-beige justify-self-center"
                      href={text}
                      target="_blank"
                    >
                      {groupText}
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
  return Object.keys(data).length > 0 ? (
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
