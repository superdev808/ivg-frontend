import classNames from "classnames/bind";
import { flattenDeep, get, keys, omit, orderBy, values } from "lodash";
import React, { useMemo } from "react";

import { deserializeColInfo, isValidUrl } from "@/helpers/calculators";
import { InputSummary } from "@/types/calculators";

import styles from "../InputSummary/styles.module.scss";

const cx = classNames.bind(styles);

const regExPatterns = {
  withParen: {
    main: /\(step \d\)/i,
    number: /\(step (\d)\)/i,
    description: /\(step \d\)$/i,
    property: /\(step \d\) (.+)/i,
  },
  withoutParen: {
    main: /step \d/i,
    number: /step (\d)/i,
    description: /step \d$/i,
    property: /step \d (.+)/i,
  },
};

interface CustomSummaryProps {
  summary: InputSummary[];
  calculatorType: string;
}

const CustomSummary: React.FC<CustomSummaryProps> = ({
  summary,
  calculatorType,
}) => {
  const formattedItems = useMemo(() => {
    const items = get(summary, [0, "componentDetails", calculatorType])
      .filter((elem) => elem.info.length > 0)
      .map((elem) => ({
        label: elem.label,
        info: elem.info.map((it) => omit(it, ["id", "quantity"])),
      }));

    return items
      .map((item) => ({
        label: item.label,
        info: flattenDeep(
          item.info.map((elem) => {
            const parsedData = keys(elem).reduce((acc, key) => {
              const { colName } = deserializeColInfo(key);
              acc[colName] = elem[key];
              return acc;
            }, {} as Record<string, string | number>);

            const isStepWithParen = keys(parsedData).some((key) =>
              regExPatterns.withParen.main.test(key)
            );
            const isStepWitoutParen = keys(parsedData).some((key) =>
              regExPatterns.withoutParen.main.test(key)
            );

            if (!isStepWithParen && !isStepWitoutParen) {
              return [{ data: [parsedData] }];
            }

            const steps: Record<number, Record<string, string | number>> = {};
            const others: Record<string, string | number> = {};

            const regExPattern =
              regExPatterns[isStepWithParen ? "withParen" : "withoutParen"];

            keys(parsedData).forEach((key) => {
              const value = parsedData[key];

              const stepNumberRegEx = regExPattern.number;
              let match = stepNumberRegEx.exec(key);
              if (!match) {
                others[key] = value;
                return;
              }

              const stepNumber = Number(match[1]);
              if (!steps[stepNumber]) {
                steps[stepNumber] = { Step: stepNumber };
              }

              const stepDescriptionRegEx = regExPattern.description;
              if (stepDescriptionRegEx.test(key)) {
                steps[stepNumber]["Description"] = value;
                return;
              }

              const stepPropertyRegEx = regExPattern.property;
              match = stepPropertyRegEx.exec(key);
              if (match && match[1]) {
                steps[stepNumber][match[1]] = value;
              } else {
                others[key] = value;
              }
            });

            const res = [];

            if (keys(steps).length > 0) {
              res.push({
                data: orderBy(values(steps), ["Step"], ["asc"]),
              });
            }

            if (keys(others).length > 0) {
              res.push({ data: [others] });
            }

            return res;
          })
        ),
      }))
      .filter((item) => item.info.length > 0);
  }, [summary, calculatorType]);

  const renderTable = (data: any[]) => {
    const dataKeys = keys(data[0]);

    return (
      <table className={cx("striped-table")}>
        {
          dataKeys.map((key) => (
            <tr key={key}>
              <th>{key}</th>
              {
                data.map((elem, trIdx) => (
                  <td key={trIdx}>
                    {isValidUrl(elem[key]) ? (
                      <a
                        href={elem[key]}
                        target="_blank"
                        className="text-light-green"
                      >
                        Link
                      </a>
                    ) : (
                      elem[key]
                    )}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </table>
    );
  };

  return (
    <div>
      {formattedItems.map(({ label, info }, idx) => (
        <div key={idx}>
          {label && <div className="mt-4 mb-2 text-xl">{label}</div>}
          {info.map((elem, eidx) => (
            <div key={eidx}>{renderTable(elem.data)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomSummary;
