import React from "react";
import _ from "lodash";
import styles from "../InputSummary/InputSummary.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export interface summary {
  description: string;
  name: string;
  amount: number | undefined;
  link: string;
}
interface ComponentSummaryProps {
  summary: summary[];
}
const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  summary
}) => {
  

  return (
    <>
      {summary && summary.length ? (
          <table className={cx("striped-table")}>
            <thead>
              <tr>
                <h3 className="my-0 pb-1">Summary:</h3>
              </tr>
              <tr>
                {["Description", "Name", "Amount"].map(
                  (columnName: string, index: number) => (
                    <th key={index}>{columnName}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {summary.map((data: any, summaryidx: number) => (
                <tr
                  key={`${data.description}-${summaryidx}`}
                  className={cx(summaryidx % 2 === 0 ? "even" : "odd")}
                >
                  <td>{data.description}</td>
                  <td>
                    <a href={data.link} target="_blank">
                      {data.name}
                    </a>
                  </td>
                  <td>{data.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
    </>
  );
};

export default ComponentSummary;
