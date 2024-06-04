import React from "react";
import { InputSummary, Summary, TotalQuantities } from "@/types/calculators";

import CustomSummary from "./Custom";
import GenericComponentSummary from "./Generic";
import MaterialComponentSummary from "./Material";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { isChairsideProceduresCalculator } from "@/helpers/calculators";

interface ComponentSummaryProps {
  calculatorType: string;
  inputSummary: InputSummary[];
  componentSummary: Summary[];
  totalQuantities: TotalQuantities[];
}

const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  calculatorType,
  inputSummary,
  componentSummary,
  totalQuantities,
}) => {
  const { calcInfoMap } = useCalculatorsInfo();
  const renderContent = () => {
    if (
      calcInfoMap[calculatorType].outputType === "CALC-4") {
      return <MaterialComponentSummary summary={componentSummary} />;
    }

    if (isChairsideProceduresCalculator(calcInfoMap[calculatorType].outputType)) {
      return (
        <CustomSummary summary={inputSummary} calculatorType={calculatorType} />
      );
    }

    return (
      <GenericComponentSummary
        summary={componentSummary}
        totalQuantities={totalQuantities}
      />
    );
  };

  return (
    <>
      <h3 className="mb-1">Options:</h3>

      {renderContent()}
    </>
  );
};

export default ComponentSummary;
