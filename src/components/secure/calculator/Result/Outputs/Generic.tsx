import React from "react";
import classNames from "classnames/bind";

import { INFORMATIONAL_CALCULATOR_NAMES } from "@/constants/calculators";
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
  if (key == "id" || key == "quantity" || key == "link") return false;
  const { groupText, groupId, colName } = deserializeColInfo(key);
  return groupText.startsWith(REASONING_TEXT) ||
    groupText.startsWith(SUPPORT_ARTICLES_TEXT)
    ? shouldInclude
    : !shouldInclude;
};

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  const { groupName } = deserializeColInfo(
    Object.keys(item).filter((key) => key && filterPopups(false)(key))[0]
  );
  const sortedKeys = Object.keys(item).sort(
    (left, right) =>
      deserializeColInfo(left).colIndex - deserializeColInfo(right).colIndex
  );
  const transformedItems = [];

  for (let i = 0, j; i < sortedKeys.length; i = j) {
    let newSubGroupItem: Record<string, string | number> = {},
      count = 0;
    for (j = i; j < sortedKeys.length; ++j) {
      if (filterPopups(false)(sortedKeys[j]) == true) {
        // if the key is not reasoning column or supporting article column
        count += 1;
        newSubGroupItem["id"] = transformedItems.length;
      }
      if (count == 2) break;
      newSubGroupItem[sortedKeys[j]] = item[sortedKeys[j]];
    }
    transformedItems.push(newSubGroupItem);
  }

  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_NAMES.includes(label),
      })}
    >
      {groupName && <h4>{groupName}</h4>}
      {transformedItems.map((subgroupItem) => (
        <div className="flex gap-2" key={subgroupItem['id']}>
          <PopupOutput
            data={Object.keys(subgroupItem)
              .filter(filterPopups(true))
              .reduce(
                (result, curKey) => ({
                  ...result,
                  [curKey]: subgroupItem[curKey],
                }),
                {}
              )}
          />
          {Object.keys(subgroupItem)
            .filter(filterPopups(false))
            .map((key) => {
              const { groupText } = deserializeColInfo(key);
              const value = subgroupItem[key];

              if (!value) return null;

              return (
                <div
                  key={key}
                  className={cx({
                    "text-center text-2xl": key === "torqueValue",
                  })}
                >
                  {groupText && <b>{groupText}: </b>}
                  {typeof value == "string" && isValidUrl(value) ? (
                    <Link href={value} target="_blank">
                      Click here
                    </Link>
                  ) : (
                    value
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default GenericOutput;
