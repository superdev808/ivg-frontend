import classNames from "classnames/bind";
import trim from "lodash/trim";
import React from "react";

import { isValidUrl } from "@/components/calculator/AllOnX/AllOnXUtills";

import { TotalQuantities } from "../../constants";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

export interface Summary {
  description: string;
  name: string;
  amount: number | undefined;
  link: string;
}
interface ComponentSummaryProps {
  summary: Summary[];
  totalQuantities: TotalQuantities[];
}
const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  summary,
  totalQuantities,
}) => {
  if (!summary || summary.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="mb-1">Options:</h3>

      <table className={cx("striped-table")}>
        <thead>
          <tr>
            {["Description", "Name", "Quantity"].map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {summary.map((data, summaryIdx) => {
            const indexOfItem: number = totalQuantities.findIndex(
              (item: TotalQuantities) => item.itemName === data.name
            );
            const amount =
              indexOfItem !== -1
                ? totalQuantities[indexOfItem].quantity
                : data.amount;
            const link = trim(data.link);

            return (
              <tr
                key={`${data.description}-${summaryIdx}`}
                className={cx(summaryIdx % 2 === 0 ? "even" : "odd")}
              >
                <td>{data.description}</td>
                <td>
                  {isValidUrl(link) ? (
                    <a href={link} target="_blank">
                      {data.name}
                    </a>
                  ) : (
                    data.name
                  )}
                </td>
                <td>{amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ComponentSummary;
