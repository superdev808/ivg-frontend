import { TabPanel, TabView } from "primereact/tabview";
import { Site, SiteData, AllOnXItems, InputDetail, PROCEDURES } from "../constants";
import React from "react";
import Inputs from "./Inputs";

interface InputDetailsProps {
  procedure: PROCEDURES
  selectedSites: Site[];
  sitesData: SiteData;
  onInputSelect: (site: Site, question: string, answer: string) => void
}

const InputDetails: React.FC<InputDetailsProps> = ({
  procedure,
  selectedSites,
  sitesData,
  onInputSelect
}: InputDetailsProps) => {
  return (
    <TabView renderActiveOnly={false} scrollable>
      {selectedSites.map((site: Site) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <Inputs
              procedure={procedure}
              site={site}
              input={AllOnXItems[0].input}
              output={AllOnXItems[0].output}
              option="Scanbodies"
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
              {questionnaire.map((data: InputDetail) => {
                return (
                  <div className="flex my-2" key={data.id}>
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
