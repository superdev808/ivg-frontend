import { TabPanel, TabView } from "primereact/tabview";
import { Site, SiteData, InputDetails } from "../constants";
import React from "react";

const InputDetails = ({
  selectedSites,
  sitesData,
}: {
  selectedSites: Site[];
  sitesData: SiteData;
}) => {
  return (
    <TabView>
      {selectedSites.map((site: Site) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <p className="m-0">{site.name} input questions here</p>
          </TabPanel>
        );
      })}
      <TabPanel header="Summary">
        <p className="m-0">Input Summary here</p>
        {
          selectedSites.map((site: Site) => {
            const questionnaire: InputDetails[] = sitesData[site.name]?.inputDetails || [];
            return (
              <React.Fragment key={site.key}>
                <h3>{site.name}</h3>
                {questionnaire.map((data: InputDetails) => {
                  return (
                    <div className="flex my-2" key={data.id}>
                      <span className="flex-1">{data.question}</span>
                      <span className="flex-1">
                        {data.answer}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })
        }
      </TabPanel>
    </TabView>
  );
};

export default InputDetails;
