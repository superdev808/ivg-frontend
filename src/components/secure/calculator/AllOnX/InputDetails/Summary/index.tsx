import React, { useMemo } from "react";

import { SiteData, SiteDetail } from "../../constants";

import InputSummary from "./InputSummary";
import ComponentSummary from "./ComponentSummary";
import { getComponentSummary } from "../../helpers";

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
    return Object.keys(sitesData).reduce((acc, name) => {
      acc.push({ name, ...sitesData[name] });
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
