import classNames from "classnames/bind";
import keys from "lodash/keys";
import React from "react";

import {
  CALCULATOR_GENERIC_OUTPUT_MAPPING,
  INFORMATIONAL_CALCULATOR_NAMES,
  MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING,
} from "@/constants/calculators";
import { ItemInsights } from "@/types/calculators";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface GenericOutputProps {
  label: string;
  item: ItemInsights;
}

const GenericOutput: React.FC<GenericOutputProps> = ({ label, item }) => {
  const OUTPUT_MAPPING = {
    ...CALCULATOR_GENERIC_OUTPUT_MAPPING,
    ...MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING,
  };

  return (
    <div
      className={cx("flex flex-column gap-2", {
        "w-12": INFORMATIONAL_CALCULATOR_NAMES.includes(label),
      })}
    >
      {item.itemName && <div>{item.itemName}</div>}
      {keys(OUTPUT_MAPPING).map((key) => {
        const value = item[key as keyof ItemInsights];

        return (
          <React.Fragment key={key}>
            {value && (
              <div
                className={cx({
                  "text-center text-2xl": key === "torqueValue",
                })}
              >
                <b>{OUTPUT_MAPPING[key]}:</b> {value}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GenericOutput;
