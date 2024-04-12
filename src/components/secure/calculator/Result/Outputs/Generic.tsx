import React from "react";
import classNames from "classnames/bind";

import {
  INFORMATIONAL_CALCULATOR_NAMES,
} from "@/constants/calculators";
import { ItemInsights } from "@/types/calculators";
import PopupOutput, { REASONING_TEXT, SUPPORT_ARTICLES_TEXT } from "./Popup";
import styles from "./style.module.scss";
import { deserializeColInfo, isValidUrl } from "@/helpers/calculators";
import Link from "next/link";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  label: string;
  item: ItemInsights;
}

const filterPopups = (shouldInclude: boolean) => (key: string) => {
  if (key == "id" || key == "quantity" || key == "link")
    return false;
  const { groupText, groupId, colName } = deserializeColInfo(key);
  return (groupText.startsWith(REASONING_TEXT) || groupText.startsWith(SUPPORT_ARTICLES_TEXT)) ? shouldInclude : !shouldInclude;
}

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  const groupName = deserializeColInfo(Object.keys(item).filter(key => key && filterPopups(false)(key))[0]).groupName;
  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_NAMES.includes(label),
      })}
    >
      {groupName &&
        <h4>{groupName}</h4>
      }
      {Object.keys(item).filter(filterPopups(false)).map((key) => {
        const { groupText } = deserializeColInfo(key);
        const value = item[key];

        if (!value)
          return null;

        return (
          <div
            key={key}
            className={cx({ "text-center text-2xl": key === "torqueValue" })}
          >
            {groupText && <b>{groupText}: </b>}
            {typeof value == 'string' && isValidUrl(value) ?
              <Link
                href={value}
                target="_blank"
              >
                Click here
              </Link>
              : value
            }
          </div>
        );
      })}
      <PopupOutput data={Object.keys(item).filter(filterPopups(true)).reduce((result, curKey) => ({ ...result, [curKey]: item[curKey] }), {})} />
    </div>
  );
};

export default GenericOutput;
