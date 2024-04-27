import React from "react";

import { MATERIAL_CALCULATOR_TYPES } from "@/constants/calculators";
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
  const isMaterialCalculator =
    MATERIAL_CALCULATOR_TYPES.includes(calculatorType);

  return (
    <>
      <h3 className="mb-1">Options:</h3>

      {isMaterialCalculator ? (
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
