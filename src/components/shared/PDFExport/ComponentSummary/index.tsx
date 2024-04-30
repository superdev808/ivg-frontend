import React from "react";

import { INFORMATIONAL_CALCULATOR_TYPES } from "@/constants/calculators";
import { Summary, TotalQuantities } from "@/types/calculators";

import GenericComponentSummary from "./Generic";
import MaterialComponentSummary from "./Material";

interface ComponentSummaryProps {
  calculatorType: string;
  summary: Summary[];
  totalQuantities: TotalQuantities[];
}

const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  calculatorType,
  summary,
  totalQuantities,
}) => {
  const isInformationalCalculator =
    INFORMATIONAL_CALCULATOR_TYPES.includes(calculatorType);

  return (
    <>
      <h3 className="mb-1">Options:</h3>

      {isInformationalCalculator ? (
        <MaterialComponentSummary summary={summary} />
      ) : (
        <GenericComponentSummary
          summary={summary}
          totalQuantities={totalQuantities}
        />
      )}
    </>
  );
};

export default ComponentSummary;
