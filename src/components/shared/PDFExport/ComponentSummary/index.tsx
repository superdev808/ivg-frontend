import React from "react";

import { MATERIAL_CALCULATOR_TYPES } from "@/constants/calculators";
import { InputSummary, Summary, TotalQuantities } from "@/types/calculators";

import CustomSummary from "./Custom";
import GenericComponentSummary from "./Generic";
import MaterialComponentSummary from "./Material";

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
  const renderContent = () => {
    if (
      MATERIAL_CALCULATOR_TYPES.includes(calculatorType) ||
      calculatorType === "ImplantTorqueGuide"
    ) {
      return <MaterialComponentSummary summary={componentSummary} />;
    }

    if (
      calculatorType === "ScanRequirements" ||
      calculatorType === "BondingEtching" ||
      calculatorType === "IsolationTechniques" ||
      calculatorType === "ToothPreparation" ||
      calculatorType === "PhysicalImpression"
    ) {
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
