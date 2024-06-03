import classNames from "classnames/bind";
import Link from "next/link";
import React from "react";

import { deserializeColInfo, getLinkText, isLinkText, isPopup, isValidUrl } from "@/helpers/calculators";
import { ItemInsights } from "@/types/calculators";
import parse from "html-react-parser";

import PopupOutput from "./Popup";

import styles from "./style.module.scss";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

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
    Object.keys(item).filter((key) => key && isPopup(key) != null)[0]
  );
  const sortedKeys = Object.keys(item).sort(
    (left, right) =>
      deserializeColInfo(left).colIndex - deserializeColInfo(right).colIndex
  );
  const transformedItems = [];
  const { calcInfoMap } = useCalculatorsInfo();

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
        "w-12": calcInfoMap[calculatorType].outputType === 'CALC-1A',
      })}
    >
      {groupName && <h4 className="m-0 text-xl">{groupName}</h4>}
      {transformedItems.map((subgroupItem) => {
        const mainKey = Object.keys(subgroupItem)
          .filter((key) => isPopup(key) === false && isLinkText(key) === false)[0];
        if (mainKey === undefined)
          return null;
        const { groupText } = deserializeColInfo(mainKey);
        const value = subgroupItem[mainKey];
        const linkText = getLinkText(subgroupItem, groupText);

        return (
          <div className="flex gap-2 align-items-start" key={subgroupItem["id"]}>
            {/* {/step/ig.test(groupText) && <Image src="/images/calculators/movie-videos-icon.svg" alt="Play" width={32} height={32} className="relative" style={{ top: '-3px' }} />} */}
            <div style={{ paddingTop: 2 }}>
              <PopupOutput
                data={subgroupItem}
              />
            </div>
            {value && (
              <div
                className={cx("flex-1", {
                  "text-center text-2xl": mainKey === "torqueValue",
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
                    <span>{parse(value.toString().replaceAll("\n", "<br />"))}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  );
};

export default GenericOutput;
