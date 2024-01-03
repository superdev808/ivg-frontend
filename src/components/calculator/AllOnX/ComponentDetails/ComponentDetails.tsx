import { TabPanel, TabView } from "primereact/tabview";
import { ComponentDetail, Site, SiteData } from "../constants";
import React from "react";
import { isValidUrl } from "../AllOnXUtills";

interface ComponentDetailProps {
  selectedSites: Site[];
  sitesData: SiteData;
}

/**
 * Name : ComponentDetails.
 * Desc : The `ComponentDetails` function is a React functional component that renders a TabView component
 * with multiple TabPanels based on the `selectedSites` prop, and a final TabPanel for the summary.
 * @param {array} selectedSites
 * @param {object} sitesData
 */
const ComponentDetails: React.FC<ComponentDetailProps> = ({
  selectedSites,
  sitesData,
}: ComponentDetailProps) => {
  return (
    <TabView scrollable>
      {selectedSites.map((site: Site) => {
        const componentDetails: ComponentDetail[] =
          sitesData[site.name]?.componentDetails || [];
        return (
          <TabPanel key={site.name} header={site.name}>
            <React.Fragment key={site.key}>
              {componentDetails.map((data: ComponentDetail, index: number) => {
                const { label, value, quantity } = data;
                return (
                  <div className="flex my-2" key={`${site.key}-${index}`}>
                    <span className="flex-1">{label}</span>
                    <span className="flex-1 text-left">
                      {isValidUrl(value as string) ? (
                        <a href={value as string}>{value}</a>
                      ) : (
                        value
                      )}
                    </span>
                    <span className="text-right pl-5">
                      {quantity && quantity}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          </TabPanel>
        );
      })}
      <TabPanel header="Summary">
        <p className="m-0">Component Summary here</p>
      </TabPanel>
    </TabView>
  );
};

export default ComponentDetails;
