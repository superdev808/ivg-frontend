import React from "react";
import _ from "lodash";
import styles from "../InputSummary/InputSummary.module.scss";
import classNames from "classnames/bind";
import { isValidUrl } from "@/components/calculator/AllOnX/AllOnXUtills";
import { TotalQuantities } from "../../constants";

const cx = classNames.bind(styles);
export interface summary {
  description: string;
  name: string;
  amount: number | undefined;
  link: string;
}
interface ComponentSummaryProps {
  summary: summary[];
  totalQuantities: TotalQuantities[]
}
const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  summary,
  totalQuantities
}) => {
  

  return (
    <>
      {summary && summary.length ? (
          <table className={cx("striped-table", "mt-4")}>
            <thead>
              <tr>
                <div className="font-bold my-0 pb-1">Options:</div>
              </tr>
              <tr>
                {["Description", "Name", "Quantity"].map(
                  (columnName: string, index: number) => (
                    <th key={index}>{columnName}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {summary.map((data: summary, summaryidx: number) => { 
                const indexOfItem: number = totalQuantities.findIndex(
                  (item: TotalQuantities) => item.itemName === data.name
                );
                const amount = indexOfItem !== -1 ? totalQuantities[indexOfItem].quantity : data.amount;
                
                return(
                <tr
                  key={`${data.description}-${summaryidx}`}
                  className={cx(summaryidx % 2 === 0 ? "even" : "odd")}
                >
                  <td>{data.description}</td>
                  <td>
                    {isValidUrl(data.link) ? (
                      <a href={data.link} target="_blank">
                        {data.name}
                      </a>
                    ) : (
                      data.name
                    )}
                  </td>
                  <td>{amount}</td>
                </tr>
              )})}
            </tbody>
          </table>
        ) : null}
    </>
  );
};

export default ComponentSummary;
