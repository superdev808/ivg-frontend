import React from "react";

import { InputSummary as InputSummaryType } from "@/types/calculators";

import GenericInputSummary from "./Generic";
import LinearWorkflowInputSummary from "./LinearWorkflow";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { isTroubleshootingCalculator } from "@/helpers/calculators";

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
  const { calcInfoMap } = useCalculatorsInfo();
  if (isTroubleshootingCalculator(calcInfoMap[calculatorType].outputType)) {
    return <LinearWorkflowInputSummary inputSummary={inputSummary} />;
  }

  return (
    <GenericInputSummary inputSummary={inputSummary} hideSite={hideSite} />
  );
};

export default InputSummary;
