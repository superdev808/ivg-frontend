import { TabPanel, TabView } from "primereact/tabview";
import React from "react";

import { CALCULATOR_MAPPINGS } from "@/constants/calculators";
import {
  Site,
  SiteData,
  AutoPopulateData,
  InputOutputValues,
  ItemData,
  TotalQuantities,
} from "@/types/calculators";

import Questionnaire from "./Questionnaire";
import Summary from "./Summary";

interface InputDetailsProps {
  selectedSites: Site[];
  sitesData: SiteData;
  autoPopulateData: AutoPopulateData | null;
  procedureInputs: InputOutputValues[];
  responseOrder: string[];
  isCustom: boolean;
  showTeethSelection: boolean;
  totalQuantities: TotalQuantities[];
  onInputSelect: (
    site: Site,
    question: InputOutputValues,
    answer: string
  ) => void;
  onAutopopulate: (dataToPopulate: AutoPopulateData | null) => void;
  onQuizResponse: (
    site: Site,
    response: ItemData[],
    collection: string
  ) => void;
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const InputDetails: React.FC<InputDetailsProps> = ({
  selectedSites,
  sitesData,
  autoPopulateData,
  procedureInputs,
  responseOrder,
  totalQuantities,
  isCustom,
  showTeethSelection,
  onInputSelect,
  onAutopopulate,
  onQuizResponse,
  onUpdateQuantity,
}) => {
  return (
    <div className="relative">
      <TabView renderActiveOnly={false} scrollable>
        {selectedSites.map((site, index) => (
          <TabPanel key={site.name} header={site.name}>
            <Questionnaire
              site={site}
              input={procedureInputs}
              option={CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR}
              showAutopopulatePrompt={selectedSites.length > 1 && index === 0}
              autoPopulateData={autoPopulateData}
              sitesData={sitesData}
              responseOrder={responseOrder}
              onInputSelect={onInputSelect}
              onAutopopulate={onAutopopulate}
              onQuizResponse={onQuizResponse}
              onUpdateQuantity={onUpdateQuantity}
            />
          </TabPanel>
        ))}

        <TabPanel header="Summary">
          <Summary
            sitesData={sitesData}
            isCustom={isCustom}
            showTeethSelection={showTeethSelection}
            responseOrder={responseOrder}
            totalQuantities={totalQuantities}
            onUpdateQuantity={onUpdateQuantity}
          />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default InputDetails;
