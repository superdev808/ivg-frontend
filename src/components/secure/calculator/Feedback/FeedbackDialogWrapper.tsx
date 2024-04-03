"use client";

import React, { useState } from "react";

import { event as gaEvent } from "@/lib/gtag";

import FeedbackDialog, { FeedbackUserTrackingProps } from "./FeedbackDialog";

export interface FeedbackDialogWrapperProps extends FeedbackUserTrackingProps {}

const FeedbackDialogWrapper: React.FC<FeedbackDialogWrapperProps> = ({
  calculatorName,
  userAnswers,
}) => {
  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const onClickFeedback = () => {
    gaEvent({
      action: "Feedback",
      category: "Button",
      label: calculatorName
        ? `${calculatorName}\n${JSON.stringify(userAnswers, null, 2)}`
        : "",
    });
    setFeedbackShow(true);
  };

  return (
    <>
      <div
        className="fixed text-2xl m-1 bg-light-green text-beige border-round-3xl m-0 p-3 pl-5"
        style={{
          transform: "rotate(180deg)",
          writingMode: "vertical-rl",
          top: "30%",
          right: "-30px",
          cursor: "pointer",
        }}
        onClick={onClickFeedback}
      >
        Feedback
      </div>

      {feedbkackShow && (
        <FeedbackDialog
          visible={feedbkackShow}
          setVisible={setFeedbackShow}
          calculatorName={calculatorName}
          userAnswers={userAnswers}
        />
      )}
    </>
  );
};

export default FeedbackDialogWrapper;
