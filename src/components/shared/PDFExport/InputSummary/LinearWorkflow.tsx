import classNames from "classnames/bind";
import get from "lodash/get";
import React, { useMemo } from "react";

import { InputSummary as InputSummaryType } from "@/types/calculators";

const cx = classNames.bind({});

interface LinearWorkflowInputSummaryProps {
  inputSummary: InputSummaryType[];
}

const LinearWorkflowInputSummary: React.FC<LinearWorkflowInputSummaryProps> = ({
  inputSummary,
}) => {
  const quiz = useMemo(() => {
    const inputDetails = get(inputSummary, [0, "inputDetails"]);

    return inputDetails.filter((item) => Boolean(item.answer));
  }, [inputSummary]);

  return (
    <div className="flex flex-column gap-4">
      {quiz.map((question) => {
        const isAction = /^action/ig.test(question.questionText);

        return (
          <div
            key={question.id}
            className={cx(
              "flex flex-column gap-3 border-2 border-round-md p-3 text-dark-green",
              {
                "border-light-green": !isAction,
                "border-dark-brown": isAction,
              }
            )}
          >
            {isAction ? (
              <div>
                <b>Action:</b> {question.answer}
              </div>
            ) : (
              <>
                <div>
                  <b>Question:</b> {question.questionText}
                </div>
                <div>
                  <b>Response:</b> {question.answer}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LinearWorkflowInputSummary;
