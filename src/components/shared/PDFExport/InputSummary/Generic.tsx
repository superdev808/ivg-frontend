import classNames from "classnames/bind";
import chunk from "lodash/chunk";
import get from "lodash/get";
import React, { useMemo } from "react";

import { InputSummary as InputSummaryType } from "@/types/calculators";

import styles from "./styles.module.scss";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";

const cx = classNames.bind(styles);

interface GenericInputSummaryProps {
  inputSummary: InputSummaryType[];
  hideSite?: boolean;
}

const GenericInputSummary: React.FC<GenericInputSummaryProps> = ({
  inputSummary,
  hideSite,
}) => {
  const isMobile = useCheckMobileScreen();
  const questions = useMemo(() => {
    const inputDetails = get(inputSummary, [0, "inputDetails"]);

    return inputDetails
      .filter((item) => Boolean(item.answer))
      .map((item) => item.question);
  }, [inputSummary]);

  if (!isMobile) {
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
              {inputSummary.map(({ site, inputDetails }, idx) => (
                <tr key={`${site}-${idx}`}>
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
  }

  return (
    <>
      <h3 className="mb-1">Inputs:</h3>
      <table className={cx("striped-table")}>
        {!hideSite && (
          <tr>
            {!hideSite && <th>Site Number</th>}
            {inputSummary.map(({ site }, idx) => (
              <td key={`${site}-${idx}`}>
                {(site || "").replace("Site", "").trim()}
              </td>
            ))}
          </tr>
        )}
        {questions.map((question, index) => (
          <tr key={index}>
            <th>{question}</th>
            {inputSummary.map(({ site, inputDetails }, idx) => {
              const item =
                inputDetails.find((elem) => elem.question === question)
                  ?.answer || "";
              return <td key={`${site}-${idx}`}>{item || "-"}</td>;
            })}
          </tr>
        ))}
      </table>
    </>
  );
};

export default GenericInputSummary;
