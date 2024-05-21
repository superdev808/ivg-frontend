import classNames from "classnames/bind";
import Link from "next/link";
import React from "react";

import { INFORMATIONAL_CALCULATOR_TYPES } from "@/constants/calculators";
import { deserializeColInfo, getLinkText, isLinkText, isPopup, isValidUrl } from "@/helpers/calculators";
import { ItemInsights } from "@/types/calculators";

import PopupOutput from "./Popup";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  calculatorType: string;
  label: string;
  item: ItemInsights;
}

const GenericOutput: React.FC<GenericOutputProps> = ({
  item,
  calculatorType,
}) => {
  const { groupName } = deserializeColInfo(
    Object.keys(item).filter((key) => key && isPopup(key) == false)[0]
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
      if (isPopup(sortedKeys[j]) === false && isLinkText(sortedKeys[j]) === false) {
        // if the key is not reasoning column or supporting article column
        count += 1;
        newSubGroupItem["id"] = transformedItems.length;
      }
      if (count === 2) break;
      newSubGroupItem[sortedKeys[j]] = item[sortedKeys[j]];
    }
    transformedItems.push(newSubGroupItem);
  }

  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_TYPES.includes(calculatorType),
      })}
    >
      {groupName && <h4 className="m-0 text-xl">{groupName}</h4>}
      {transformedItems.map((subgroupItem) => (
        <div className="flex gap-2 align-items-start" key={subgroupItem["id"]}>
          <div style={{ paddingTop: 2 }}>
            <PopupOutput
              data={Object.keys(subgroupItem)
                .filter(isPopup)
                .reduce(
                  (result, curKey) => ({
                    ...result,
                    [curKey]: subgroupItem[curKey],
                  }),
                  {}
                )}
            />
          </div>
          {Object.keys(subgroupItem)
            .filter((key) => isPopup(key) === false && isLinkText(key) === false)
            .map((key) => {
              const { groupText } = deserializeColInfo(key);
              const value = subgroupItem[key];
              const linkText = getLinkText(subgroupItem, groupText);

              if (!value) return null;

              return (
                <div
                  key={key}
                  className={cx("flex-1", {
                    "text-center text-2xl": key === "torqueValue",
                  })}
                >
                  {typeof value == "string" && isValidUrl(value) ? (
                    <Link
                      href={value}
                      target="_blank"
                      className="no-underline text-dark-green"
                    >
                      {groupText && <b>{groupText}: </b>} {linkText}
                    </Link>
                  ) : typeof value === "string" && /required/gi.test(value) ? (
                    <>
                      <i
                        className="pi pi-check text-light-green mr-2 font-bold"
                        style={{ width: 16, height: 16 }}
                      />
                      {groupText && <>{groupText}</>}
                    </>
                  ) : (
                    <>
                      {groupText && <b>{groupText}: </b>}
                      {value}
                    </>
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
