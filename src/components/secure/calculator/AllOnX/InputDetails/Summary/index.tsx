import React, { useMemo } from "react";

import PDFExport from "@/components/shared/PDFExport";
import { getComponentSummary } from "@/helpers/calculators";
import {
  Site,
  SiteData,
  InputSummary as InputSummaryType,
  TotalQuantities,
} from "@/types/calculators";

import InputSummary from "./InputSummary";
import ComponentSummary from "./ComponentSummary";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

interface SummaryProps {
  sitesData: SiteData;
  isCustom: boolean;
  showTeethSelection: boolean;
  responseOrder: string[];
  totalQuantities: TotalQuantities[];
  onUpdateQuantity: (quantity: number, groupId: string) => void;
}

const Summary: React.FC<SummaryProps> = ({
  sitesData,
  isCustom,
  showTeethSelection,
  responseOrder,
  totalQuantities,
  onUpdateQuantity,
}) => {
  const { calcInfoMap } = useCalculatorsInfo();
  const inputSummary = useMemo(() => {
    return Object.keys(sitesData).reduce((acc, site) => {
      acc.push({ site, ...sitesData[site] });
      return acc;
    }, [] as InputSummaryType[]);
  }, [sitesData]);

  const componentSummary = useMemo(() => {
    return getComponentSummary(calcInfoMap, sitesData, responseOrder);
  }, [calcInfoMap, sitesData, responseOrder]);

  return (
    <div className="flex flex-column gap-4">
      <PDFExport
        isCustom={isCustom}
        showTeethSelection={showTeethSelection}
        totalQuantities={totalQuantities}
        inputSummary={inputSummary}
        componentSummary={componentSummary}
      />
      <InputSummary summary={inputSummary} />
      <ComponentSummary
        summary={componentSummary}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
};

export default Summary;
