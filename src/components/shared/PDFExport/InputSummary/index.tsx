import React from "react";

import { LINEAR_WORKFLOWS } from "@/constants/calculators";
import { InputSummary as InputSummaryType } from "@/types/calculators";

import GenericInputSummary from "./Generic";
import LinearWorkflowInputSummary from "./LinearWorkflow";

interface InputSummaryProps {
  calculatorType: string;
  inputSummary: InputSummaryType[];
  hideSite?: boolean;
}

const InputSummary: React.FC<InputSummaryProps> = ({
  calculatorType,
  inputSummary,
  hideSite,
}) => {
  if (LINEAR_WORKFLOWS.includes(calculatorType)) {
    return <LinearWorkflowInputSummary inputSummary={inputSummary} />;
  }

  return (
    <GenericInputSummary inputSummary={inputSummary} hideSite={hideSite} />
  );
};

export default InputSummary;
