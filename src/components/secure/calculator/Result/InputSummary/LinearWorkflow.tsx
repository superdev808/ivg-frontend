import classNames from "classnames/bind";
import React from "react";

import { InputDetail } from "@/types/calculators";

const cx = classNames.bind({});

interface LinearWorkflowInputSummaryProps {
  quiz: InputDetail[];
}

const LinearWorkflowInputSummary: React.FC<LinearWorkflowInputSummaryProps> = ({
  quiz,
}) => (
  <>
    {quiz.map((question, questionIdx) => {
      const isAction = /^action/gi.test(question.questionText);

      return (
        <div
          key={questionIdx}
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
  </>
);

export default LinearWorkflowInputSummary;
