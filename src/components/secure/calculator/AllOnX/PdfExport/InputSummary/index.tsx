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
}

const InputSummary: React.FC<InputSummaryProps> = ({
  selectedSites,
  sitesData,
}) => {
  let sitesObj: { [key: string]: InputDetail[] } = {};

  selectedSites.map((site: Site) => {
    const inputDetailArr: InputDetail[] = [];
    const questionnaire: InputDetail[] =
      sitesData[site.name]?.inputDetails || [];
    questionnaire.map((data: InputDetail) => {
      !!data.answer && inputDetailArr.push(data);
    });

    sitesObj = { ...sitesObj, [site.name]: inputDetailArr };
  });

  const uniqueQuestions: string[] = uniq(
    flatMap(Object.values(sitesObj), (site: InputDetail[]) =>
      site.map((item: InputDetail) => item.question)
    )
  ).filter(Boolean);

  return (
    <>
      {chunk(uniqueQuestions, 9).map((questions: string[], idx: number) => (
        <table
          className={cx("striped-table", { "mt-4": idx !== 0 })}
          key={`uniqueQuestions-${idx}`}
        >
          <thead>
            {idx === 0 && (
              <tr>
                <span className="font-bold my-0 pb-1">Inputs:</span>
              </tr>
            )}

            <tr>
              <th>Site Number</th>
              {questions.map((question: string, index: number) => (
                <th key={index}>{question}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.keys(sitesObj).map((site, siteIdx) => (
              <tr key={site} className={cx(siteIdx % 2 === 0 ? "even" : "odd")}>
                <td>{site.replace("Site", "").trim()}</td>

                {questions.map((question: string, index: number) => {
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
