import { TabPanel, TabView } from "primereact/tabview";
import {
  Site,
  SiteData,
  InputDetail,
  PROCEDURES,
  ALLONX_REQUEST_PARAMS,
  ProcedureRequest,
} from "../constants";
import React from "react";
import Questionnaire from "./Questionnaire";
import { LABEL_ALL_ON_X_CALCULATOR } from "@/app/calculators/constants";

interface InputDetailsProps {
  procedure: PROCEDURES;
  selectedSites: Site[];
  sitesData: SiteData;
  onInputSelect: (site: Site, question: string, answer: string) => void;
}

/**
 * Name : InputDetails.
 * Desc : The `InputDetails` component renders a tab view with multiple tabs, each containing a
 * `Questionnaire` component for a selected site, and a summary tab displaying the input details for
 * each selected site.
 * @param {object} procedure
 * @param {array} selectedSites
 * @param {object} sitesData
 * @param {func} onInputSelect
 */
const InputDetails: React.FC<InputDetailsProps> = ({
  procedure,
  selectedSites,
  sitesData,
  onInputSelect
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
              option={LABEL_ALL_ON_X_CALCULATOR}
              onInputSelect={onInputSelect}
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
