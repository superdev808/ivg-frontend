import React from "react";
import classNames from "classnames/bind";

import {
  INFORMATIONAL_CALCULATOR_NAMES,
} from "@/constants/calculators";
import { ItemInsights } from "@/types/calculators";
import PopupOutput, { REASONING_TEXT, SUPPORT_ARTICLES_TEXT } from "./Popup";
import styles from "./style.module.scss";
import { deserializeColInfo } from "@/helpers/calculators";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  label: string;
  item: ItemInsights;
}

const filterPopups = (shouldInclude: boolean) => (key: string) => {
  if (key == "id" || key == "quantity")
    return false;
  const { groupText, groupId, colName } = deserializeColInfo(key);
  return (groupText.startsWith(REASONING_TEXT) || groupText.startsWith(SUPPORT_ARTICLES_TEXT)) ? shouldInclude : !shouldInclude;
}

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_NAMES.includes(label),
      })}
    >
      {Object.keys(item).filter(filterPopups(false)).map((key) => {
        const { groupText, groupId, colName } = deserializeColInfo(key);
        const value = item[key];

        if (!value)
          return null;

        return (
          <div
            key={key}
            className={cx({ "text-center text-2xl": key === "torqueValue" })}
          >
            {groupText && <b>{groupText}:</b>}
            {value}
          </div>
        );
      })}
      <PopupOutput data={Object.keys(item).filter(filterPopups(true)).reduce((result, curKey) => ({...result, [curKey]: item[curKey]}), {})} />
    </div>
  );
};

export default GenericOutput;
