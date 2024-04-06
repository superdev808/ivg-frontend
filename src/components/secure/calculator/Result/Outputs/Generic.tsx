import React from "react";
import classNames from "classnames/bind";

import {
  INFORMATIONAL_CALCULATOR_NAMES,
} from "@/constants/calculators";
import { ItemInsights } from "@/types/calculators";
import PopupOutput, { REASONING_TEXT, SUPPORT_ARTICLES_TEXT } from "./Popup";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  label: string;
  item: ItemInsights;
}

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_NAMES.includes(label),
      })}
    >
      {Object.keys(item).map((key) => {
        const [groupText, colName, groupId] = key.split("___");
        const value = item[key];

        if (!value)
          return null;

        return (
          <React.Fragment key={key}>
            {(groupText.startsWith(REASONING_TEXT) || groupText.startsWith(SUPPORT_ARTICLES_TEXT)
              ? <PopupOutput label={groupText} text={value} />
              : (
                < div
                  className={
                    cx({
                      "text-center text-2xl": key === "torqueValue",
                    })}
                >
                  {groupText !== "EMPTY" && <b>{groupText}:</b>}
                  {value}
                </div>
              ))
            }
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GenericOutput;
