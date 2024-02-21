import classNames from "classnames/bind";
import chunk from "lodash/chunk";
import flatMap from "lodash/flatMap";
import uniq from "lodash/uniq";
import React from "react";

import { InputDetail, Site, SiteData } from "../../constants";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputSummaryProps {
  selectedSites: Site[];
  sitesData: SiteData;
  hideSite?: boolean;
}

const InputSummary: React.FC<InputSummaryProps> = ({
  selectedSites,
  sitesData,
  hideSite,
}) => {
  let sitesObj: Record<string, InputDetail[]> = {};

  selectedSites.forEach((site) => {
    const inputDetailArr: InputDetail[] = [];
    const questionnaire = sitesData[site.name]?.inputDetails || [];

    questionnaire.forEach((data) => {
      if (data.answer) {
        inputDetailArr.push(data);
      }
    });

    sitesObj = { ...sitesObj, [site.name]: inputDetailArr };
  });

  const uniqueQuestions = uniq(
    flatMap(Object.values(sitesObj), (site) =>
      site.map((item) => item.question)
    )
  ).filter(Boolean);

  return (
    <>
      <h3 className="mb-1">Inputs:</h3>

      {chunk(uniqueQuestions, 9).map((questions, idx) => (
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
            {Object.keys(sitesObj).map((site) => (
              <tr key={site}>
                {!hideSite && <td>{site.replace("Site", "").trim()}</td>}

                {questions.map((question, index) => {
                  const item =
                    sitesObj[site].filter(
                      (obj: InputDetail) => obj.question === question
                    ) || [];

                  return <td key={index}>{item[0]?.answer || "-"}</td>;
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