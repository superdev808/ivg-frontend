import { TabPanel, TabView } from "primereact/tabview";
import {
  Site,
  SiteData,
  InputDetail,
  PROCEDURES,
  ALLONX_REQUEST_PARAMS,
  ProcedureRequest,
  InputOutputValues,
} from "../constants";
import React from "react";
import Inputs from "./Inputs";
import { LABEL_ALL_ON_X_CALCULATOR } from "@/app/calculators/constants";

interface InputDetailsProps {
  procedure: PROCEDURES;
  selectedSites: Site[];
  sitesData: SiteData;
  onInputSelect: (site: Site, question: string, answer: string) => void;
  onAutopopulate: (questions: InputOutputValues[], answerOptions:string[][], answers:string[]) => void;
  autoPopulateData: any
}

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
            <Inputs
              procedure={procedure}
              site={site}
              input={requestParams.input}
              output={requestParams.output}
              option={LABEL_ALL_ON_X_CALCULATOR}
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
                  <div className="flex my-2" key={index}>
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
