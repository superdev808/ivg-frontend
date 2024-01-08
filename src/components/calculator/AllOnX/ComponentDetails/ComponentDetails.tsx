import { TabPanel, TabView } from "primereact/tabview";
import {
  ItemData,
  QUANTITY_VISIBILITY_STATE,
  Site,
  SiteData,
} from "../constants";
import React from "react";
import Item from "../Item";

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
        return (
          <TabPanel key={site.name} header={site.name}>
            <React.Fragment key={site.key}>
              <>
                {Object.keys(sitesData[site.name]?.componentDetails).map(
                  (collection: string) => {
                    const componentDetails: ItemData[] =
                      sitesData[site.name]?.componentDetails[collection] || [];
                    return componentDetails.map((data: ItemData, i: number) => (
                      <Item
                        key={`${data.label}-${i}`}
                        label={data.label}
                        info={data.info}
                        quantityVisibilityState={QUANTITY_VISIBILITY_STATE.SHOW}
                      />
                    ));
                  }
                )}
              </>
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
