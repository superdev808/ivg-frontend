import classNames from "classnames/bind";
import keys from "lodash/keys";
import React from "react";

import { isValidUrl } from "@/helpers/calculators";
import { Summary } from "@/types/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

interface SummaryTableProps {
  items: Summary[];
}

const camelCaseToWords = (str: string) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/\b(\w)/g, (match) => match.toUpperCase());

const EXCLUDE_KEYS = ["id", "quantity", "brand", "manufacturer"];

const SummaryTable: React.FC<SummaryTableProps> = ({ items }) => {
  const filteredKeys = keys(items[0])
    .filter((key) => !EXCLUDE_KEYS.includes(key))
    .filter(Boolean);

  return (
    <table className={cx("striped-table")}>
      <thead>
        <tr>
          {filteredKeys.map((key) => (
            <th key={key}>{camelCaseToWords(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx}>
            {filteredKeys.map((key) => {
              const value = item[key as keyof Summary];

              return (
                <td key={key}>
                  {isValidUrl(value) ? (
                    <a
                      href={value}
                      target="_blank"
                      className="text-light-green"
                    >
                      {camelCaseToWords(key)}
                    </a>
                  ) : (
                    value || ""
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
