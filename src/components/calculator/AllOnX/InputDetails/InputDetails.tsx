import { TabPanel, TabView } from "primereact/tabview";
import {
  Site,
  SiteData,
  InputDetail,
  PROCEDURES,
  ALLONX_REQUEST_PARAMS,
  ProcedureRequest,
  AutoPopulateData,
} from "../constants";
import React from "react";
import Questionnaire from "./Questionnaire";
import { CALCULATOR_MAPPINGS } from "@/app/calculators/constants";

interface InputDetailsProps {
  procedure: PROCEDURES;
  selectedSites: Site[];
  sitesData: SiteData;
  autoPopulateData: AutoPopulateData | null
  onInputSelect: (site: Site, question: string, answer: string) => void;
  onAutopopulate: (dataToPopulate: AutoPopulateData | null) => void;  
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
 */
const InputDetails: React.FC<InputDetailsProps> = ({
  procedure,
  selectedSites,
  sitesData,
  onInputSelect,
  onAutopopulate,
  autoPopulateData
}: InputDetailsProps) => {
  const requestParams: ProcedureRequest = ALLONX_REQUEST_PARAMS[procedure];  

  return (
    <TabView renderActiveOnly={false} scrollable>
      {selectedSites.map((site: Site, index: number) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <Questionnaire
              site={site}
              input={requestParams.input}
              option={CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR}
              onInputSelect={onInputSelect}
              showAutopopulatePrompt={index === 0}
              onAutopopulate={onAutopopulate}
              autoPopulateData={autoPopulateData}
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
                  <div className="flex my-2" key={`${site.key}-${index}`}>
                    <span className="flex-1">{data.question}</span>
                    <span className="flex-1">{data.answer}</span>
                  </div>
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
