import React from "react";

import { InputDetail, ItemData } from "@/types/calculators";

import GenericInputSummary from "./Generic";
import LinearWorkflowInputSummary from "./LinearWorkflow";
import { isTroubleshootingCalculator } from "@/helpers/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

interface InputSummaryProps {
  calculatorType: string;
  image?: string;
  name: string;
  quiz: InputDetail[];
  items: ItemData[];
}

const InputSummary: React.FC<InputSummaryProps> = ({
  calculatorType,
  image,
  quiz,
  name,
  items,
}) => {
  const { calcInfoMap } = useCalculatorsInfo();

  if (isTroubleshootingCalculator(calcInfoMap[calculatorType].outputType)) {
    return <LinearWorkflowInputSummary quiz={quiz} />;
  }

  return (
    <GenericInputSummary
      items={items}
      calculatorType={calculatorType}
      image={image}
      quiz={quiz}
      name={name}
    />
  );
};
export default InputSummary;
