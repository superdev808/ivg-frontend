import classNames from "classnames";
import get from "lodash/get";
import values from "lodash/values";
import React, { useMemo } from "react";

import { SiteData } from "../../constants";

interface InputSummary {
  sitesData: SiteData;
}

const InputSummary: React.FC<InputSummary> = ({ sitesData }) => {
  const questions = useMemo(() => {
    const inputDetails = get(values(sitesData), [0, "inputDetails"]);

    return inputDetails
      .filter((item) => Boolean(item.answer))
      .map((item) => item.question);
  }, [sitesData]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3">Inputs:</h3>

      <div className="flex border-left-1 border-top-1 border-gray-400 w-fit">
        <div className="flex flex-column">
          {["Questions", ...questions].map((question) => (
            <div
              key={question}
              style={{ height: 45 }}
              className="flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400 font-bold"
            >
              {question}
            </div>
          ))}
        </div>

        {Object.keys(sitesData).map((siteName) => {
          const site = sitesData[siteName];
          const answers = site.inputDetails
            .filter((item) => Boolean(item.answer))
            .map((item) => item.answer);

          return (
            <div key={siteName} className="flex flex-column">
              {[siteName, ...answers].map((answer, idx) => (
                <div
                  key={answer}
                  style={{ height: 45 }}
                  className={classNames(
                    "flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400",
                    { "font-bold": idx === 0 }
                  )}
                >
                  {answer}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputSummary;
