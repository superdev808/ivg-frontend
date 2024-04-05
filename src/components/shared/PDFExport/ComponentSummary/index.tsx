import React from "react";

import { MATERIAL_CALCULATOR_NAMES } from "@/constants/calculators";
import { Summary, TotalQuantities } from "@/types/calculators";

import GenericComponentSummary from "./Generic";
import MaterialComponentSummary from "./Material";

interface ComponentSummaryProps {
  calculatorName: string;
  summary: Summary[];
  totalQuantities: TotalQuantities[];
}

const ComponentSummary: React.FC<ComponentSummaryProps> = ({
  calculatorName,
  summary,
  totalQuantities,
}) => {
  const isMaterialCalculator =
    MATERIAL_CALCULATOR_NAMES.includes(calculatorName);

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
