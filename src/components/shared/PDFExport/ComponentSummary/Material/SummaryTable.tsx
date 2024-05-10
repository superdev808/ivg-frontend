import classNames from "classnames/bind";
import keys from "lodash/keys";
import React from "react";

import { isValidUrl } from "@/helpers/calculators";
import { Summary } from "@/types/calculators";

import styles from "../../InputSummary/styles.module.scss";

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
      {filteredKeys.map((key) => (
        <tr key={key}>
          <th>{camelCaseToWords(key)}</th>
          {
            items.map((item, idx) => {
              const value = item[key as keyof Summary];
              return (
                <td key={idx}>
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
              )
            })
          }
        </tr>
      ))}
    </table>
  );
};

export default SummaryTable;
