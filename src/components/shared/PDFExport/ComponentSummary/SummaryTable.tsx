import classNames from "classnames/bind";
import keys from "lodash/keys";
import React from "react";

import { isValidUrl } from "@/helpers/calculators";
import { ItemInsights } from "@/types/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

interface SummaryTable {
  mapping: Record<string, string>;
  item: ItemInsights;
  isPopup?: boolean;
}

const SummaryTable: React.FC<SummaryTable> = ({ mapping, item, isPopup }) => {
  return (
    <table className={cx("striped-table")}>
      <thead>
        <tr>
          {keys(mapping).map((key) => {
            const value = item[key as keyof ItemInsights];
            return (
              <React.Fragment key={key}>
                {value && <th>{mapping[key]}</th>}
              </React.Fragment>
            );
          })}
          {isPopup && (
            <>
              <th>Reasoning</th>
              <th>Supporting Article</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          {keys(mapping).map((key) => {
            const value = item[key as keyof ItemInsights];
            return (
              <React.Fragment key={key}>
                {value && <td>{value}</td>}
              </React.Fragment>
            );
          })}
          {isPopup && (
            <>
              <td>{item.reasoning}</td>
              <td>
                {isValidUrl(item.supportingArticle) ? (
                  <a
                    href={item.supportingArticle}
                    target="_blank"
                    className="text-light-green"
                  >
                    Supporting Article
                  </a>
                ) : (
                  item.supportingArticle
                )}
              </td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default SummaryTable;
