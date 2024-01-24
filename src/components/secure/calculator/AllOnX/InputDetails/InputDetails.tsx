import { TabPanel, TabView } from "primereact/tabview";
import {
  Site,
  SiteData,
  InputDetail,
  PROCEDURES,
  AutoPopulateData,
  InputOutputValues,
  ItemData,
  KeyValuePair,
} from "../constants";
import React from "react";
import Questionnaire from "./Questionnaire";
import { CALCULATOR_MAPPINGS } from "@/app/(protected)/calculators/constants";

interface InputDetailsProps {
  procedure: PROCEDURES;
  selectedSites: Site[];
  sitesData: SiteData;
  autoPopulateData: AutoPopulateData | null;
  procedureInputs: InputOutputValues[];
  additionalInputs: KeyValuePair;
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
}

/**
 * Name : InputDetails.
 * Desc : The `InputDetails` component renders a tab view with multiple tabs, each containing a
 * `Questionnaire` component for a selected site, and a summary tab displaying the input details
 * for each selected site.
 * @param {object} procedure
 * @param {array} selectedSites
 * @param {object} sitesData
 * @param {object} autoPopulateData
 * @param {func} onInputSelect
 * @param {func} onAutopopulate
 * @param {func} onQuizResponse
 * @param {array} procedureInputs
 * @param {object} additionalInputs
 */
const InputDetails: React.FC<InputDetailsProps> = ({
  procedure,
  selectedSites,
  sitesData,
  onInputSelect,
  onAutopopulate,
  autoPopulateData,
  procedureInputs,
  onQuizResponse,
  additionalInputs,
}: InputDetailsProps) => {
  return (
    <TabView renderActiveOnly={false} scrollable>
      {selectedSites.map((site: Site, index: number) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <Questionnaire
              site={site}
              input={procedureInputs}
              option={CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR}
              onInputSelect={onInputSelect}
              showAutopopulatePrompt={index === 0}
              onAutopopulate={onAutopopulate}
              autoPopulateData={autoPopulateData}
              onQuizResponse={onQuizResponse}
              sitesData={sitesData}
              additionalInputs={additionalInputs}
            />
          </TabPanel>
        );
      })}
      <TabPanel header="Summary">
        {selectedSites.map((site: Site) => {
          const questionnaire: InputDetail[] =
            sitesData[site.name]?.inputDetails || [];
          return (
            <React.Fragment key={site.key}>
              <h3>{site.name}</h3>
              {questionnaire.map((data: InputDetail, index: number) => {
                return (
                  <>
                    {true && (
                      <div
                        className={`flex ${
                          index === 0 && "border-top-1"
                        } border-bottom-1 surface-border`}
                        key={`${site.key}-${index}`}
                      >
                        <span className="flex-1 border-left-1 border-right-1 surface-border p-2">
                          {data.question}
                        </span>
                        <span className="flex-1 border-right-1 surface-border p-2">
                          {data.answer}
                        </span>
                      </div>
                    )}
                  </>
                );
              })}
            </React.Fragment>
          );
        })}
      </TabPanel>
    </TabView>
  );
};

export default InputDetails;
