"use client";

import React, { useState } from "react";

import { event as gaEvent } from "@/lib/gtag";

import FeedbackDialog from "./FeedbackDialog";

interface FeedbackDialogWrapperProps {
  label?: string;
}

const FeedbackDialogWrapper: React.FC<FeedbackDialogWrapperProps> = ({
  label,
}) => {
  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const onClickFeedback = () => {
    gaEvent({
      action: "Feedback",
      category: "Button",
      label: label ?? "",
    });
    setFeedbackShow(true);
  };

  return (
    <>
      <div
        className="fixed text-2xl m-1 bg-green-300 border-round-3xl m-0 p-3 pl-5"
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
        <FeedbackDialog visible={feedbkackShow} setVisible={setFeedbackShow} />
      )}
    </>
  );
};

export default FeedbackDialogWrapper;
