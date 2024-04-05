import classNames from "classnames/bind";
import trim from "lodash/trim";
import React, { useMemo } from "react";

import { Summary, TotalQuantities } from "@/types/calculators";
import { isValidUrl } from "@/helpers/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

interface GenericComponentSummaryProps {
  summary: Summary[];
  totalQuantities: TotalQuantities[];
}

const GenericComponentSummary: React.FC<GenericComponentSummaryProps> = ({
  summary,
  totalQuantities,
}) => {
  const showManufacturer = useMemo(() => {
    return summary.some(
      (item) => item.manufacturer && item.manufacturer !== item.brand
    );
  }, [summary]);

  const columns = [
    "Description",
    "Name",
    "Number",
    showManufacturer ? "Manufacturer" : "",
    "Quantity",
  ].filter(Boolean);

  return (
    <table className={cx("striped-table")}>
      <thead>
        <tr>
          {columns.map((columnName) => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {summary.map((data, summaryIdx) => {
          const indexOfItem = totalQuantities.findIndex(
            (item) => item.itemName === data.itemName
          );
          const quantity =
            indexOfItem !== -1
              ? totalQuantities[indexOfItem].quantity
              : data.quantity;
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
                    {data.itemName}
                  </a>
                ) : (
                  data.itemName
                )}
              </td>
              <td>{data.itemNumber}</td>
              {showManufacturer && (
                <td>
                  {data.manufacturer && data.manufacturer !== data.brand
                    ? data.manufacturer
                    : ""}
                </td>
              )}
              <td>{quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GenericComponentSummary;
