import React from "react";

import { LINEAR_WORKFLOWS } from "@/constants/calculators";
import { InputDetail } from "@/types/calculators";

import GenericInputSummary from "./Generic";
import LinearWorkflowInputSummary from "./LinearWorkflow";

interface InputSummaryProps {
  calculatorType: string;
  image?: string;
  name: string;
  quiz: InputDetail[];
}

const InputSummary: React.FC<InputSummaryProps> = ({
  calculatorType,
  image,
  quiz,
  name,
}) => {
  if (LINEAR_WORKFLOWS.includes(calculatorType)) {
    return <LinearWorkflowInputSummary quiz={quiz} />;
  }

  return (
    <GenericInputSummary
      calculatorType={calculatorType}
      image={image}
      quiz={quiz}
      name={name}
    />
  );
};
export default InputSummary;
