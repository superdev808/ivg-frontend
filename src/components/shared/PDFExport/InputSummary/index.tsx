import classNames from "classnames/bind";
import chunk from "lodash/chunk";
import get from "lodash/get";
import React, { useMemo } from "react";

import { InputSummary as InputSummaryType } from "@/types/calculators";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputSummaryProps {
  inputSummary: InputSummaryType[];
  hideSite?: boolean;
}

const InputSummary: React.FC<InputSummaryProps> = ({
  inputSummary,
  hideSite,
}) => {
  const questions = useMemo(() => {
    const inputDetails = get(inputSummary, [0, "inputDetails"]);

    return inputDetails
      .filter((item) => Boolean(item.answer))
      .map((item) => item.question);
  }, [inputSummary]);

  return (
    <>
      <h3 className="mb-1">Inputs:</h3>

      {chunk(questions, 9).map((questions, idx) => (
        <table
          className={cx("striped-table", { "mt-4": idx !== 0 })}
          key={`uniqueQuestions-${idx}`}
        >
          <thead>
            <tr>
              {!hideSite && <th>Site Number</th>}
              {questions.map((question, index) => (
                <th key={index}>{question}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {inputSummary.map(({ site, inputDetails }) => (
              <tr key={site}>
                {!hideSite && (
                  <td>{(site || "").replace("Site", "").trim()}</td>
                )}

                {questions.map((question, index) => {
                  const item =
                    inputDetails.find((elem) => elem.question === question)
                      ?.answer || "";

                  return <td key={index}>{item || "-"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </>
  );
};

export default InputSummary;
