import { TabPanel, TabView } from "primereact/tabview";
import React from "react";

import { CALCULATOR_MAPPINGS } from "@/app/(protected)/calculators/constants";

import {
  Site,
  SiteData,
  InputDetail,
  AutoPopulateData,
  InputOutputValues,
  ItemData,
} from "../constants";
import Questionnaire from "./Questionnaire";

interface InputDetailsProps {
  selectedSites: Site[];
  sitesData: SiteData;
  autoPopulateData: AutoPopulateData | null;
  procedureInputs: InputOutputValues[];
  responseOrder: string[];
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
  onInputSelect,
  onAutopopulate,
  onQuizResponse,
  onUpdateQuantity,
}) => (
  <div className="relative">
    <TabView renderActiveOnly={false} scrollable>
      {selectedSites.map((site: Site, index: number) => (
        <TabPanel key={site.name} header={site.name}>
          <Questionnaire
            site={site}
            input={procedureInputs}
            option={CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR}
            onInputSelect={onInputSelect}
            showAutopopulatePrompt={selectedSites.length > 1 && index === 0}
            onAutopopulate={onAutopopulate}
            autoPopulateData={autoPopulateData}
            onQuizResponse={onQuizResponse}
            sitesData={sitesData}
            responseOrder={responseOrder}
            onUpdateQuantity={onUpdateQuantity}
          />
        </TabPanel>
      ))}

      <TabPanel header="Summary">
        {selectedSites.map((site) => {
          const questionnaire: InputDetail[] =
            sitesData[site.name]?.inputDetails || [];

          return (
            <React.Fragment key={site.key}>
              <h3>{site.name}</h3>
              {questionnaire.map((data, index) => (
                <React.Fragment key={`${site.key}-${index}`}>
                  {data.answer && (
                    <div
                      className={`flex ${
                        index === 0 && "border-top-1"
                      } border-bottom-1 surface-border`}
                    >
                      <span className="flex-1 border-left-1 border-right-1 surface-border p-2">
                        {data.question}
                      </span>
                      <span className="flex-1 border-right-1 surface-border p-2">
                        {data.answer}
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}
      </TabPanel>
    </TabView>
  </div>
);

export default InputDetails;
