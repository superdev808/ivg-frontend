import React from "react";
import { InputDetail, Site, SiteData } from "../../constants";
import _ from "lodash";
import styles from "./InputSummary.module.scss";
import classNames from "classnames/bind";

interface InputSummaryProps {
  selectedSites: Site[];
  sitesData: SiteData;
}

const cx = classNames.bind(styles);
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
  const uniqueQuestions: string[] = _.uniq(
    _.flatMap(Object.values(sitesObj), (site: InputDetail[]) =>
      site.map((item: InputDetail) => item.question)
    )
  ).filter(Boolean);

  return (
    <>
      {_.chunk(uniqueQuestions, 7).map((questions: string[], idx: number) => {
        return (
          <table className={cx("striped-table")} key={`uniqueQuestions-${idx}`}>
            <thead>
              {idx === 0 && <tr><h3>Inputs:</h3></tr>}
              <tr>
                <th>Site Number</th>
                {questions.map((question: string, index: number) => (
                  <th key={index}>{question}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(sitesObj).map((site: string, siteIdx: number) => (
                <tr
                  key={site}
                  className={cx(siteIdx % 2 === 0 ? "even" : "odd")}
                >
                  <td>{site.replace("Site","").trim()}</td>
                  {questions.map((question: string, index: number) => {
                    const item =
                      sitesObj[site].filter(
                        (obj: InputDetail) => obj.question === question
                      ) || [];

                    return <td key={index}>{item[0]?.answer}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )
      })}
    </>
  );
};

export default InputSummary;
