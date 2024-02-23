import React, { useMemo } from "react";

import { getComponentSummary } from "@/helpers/calculators";
import { SiteData, SiteDetail } from "@/types/calculators";

import InputSummary from "./InputSummary";
import ComponentSummary from "./ComponentSummary";

interface SummaryProps {
  sitesData: SiteData;
  responseOrder: string[];
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const Summary: React.FC<SummaryProps> = ({
  sitesData,
  responseOrder,
  onUpdateQuantity,
}) => {
  const inputSummary = useMemo(() => {
    return Object.keys(sitesData).reduce((acc, site) => {
      acc.push({ site, ...sitesData[site] });
      return acc;
    }, [] as SiteDetail[]);
  }, [sitesData]);

  const componentSummary = useMemo(() => {
    return getComponentSummary(sitesData, responseOrder);
  }, [sitesData, responseOrder]);

  return (
    <div className="flex flex-column gap-4">
      <InputSummary summary={inputSummary} />
      <ComponentSummary
        summary={componentSummary}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
};

export default Summary;
