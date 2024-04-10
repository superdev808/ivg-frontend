import classNames from "classnames/bind";
import keys from "lodash/keys";
import React from "react";

import { isValidUrl } from "@/helpers/calculators";
import { Summary } from "@/types/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

interface SummaryTable {
  item: Summary;
}

const camelCaseToWords = (str: string) => str.replace(/([A-Z])/g, ' $1')
  .replace(/\b(\w)/g, (match) => match.toUpperCase())

const SummaryTable: React.FC<SummaryTable> = ({ item }) => {
  const filteredKeys = keys(item).filter(key => key !== "id");
  return (
    <table className={cx("striped-table")}>
      <thead>
        <tr>
          {filteredKeys.map((key) => {
            if (key == "id")
              return null;
            const value = item[key as keyof Summary];
            return (
              <React.Fragment key={key}>
                {value && <th>{camelCaseToWords(key)}</th>}
              </React.Fragment>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {filteredKeys.map((key) => {
            if (key == "id")
              return null;
            const value = item[key as keyof Summary];
            return (
              <React.Fragment key={key}>
                {value && <td>
                  {typeof value == 'string' && isValidUrl(value)
                    ?
                    <a
                      href={value}
                      target="_blank"
                      className="text-light-green"
                    >
                      {camelCaseToWords(key)}
                    </a>
                    : value
                  }
                </td>}
              </React.Fragment>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default SummaryTable;
