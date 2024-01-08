import { TabPanel, TabView } from "primereact/tabview";
import {
  ComponentDetail,
  ItemData,
  ItemInsights,
  PROCEDURES,
  QUANTITY_VISIBILITY_STATE,
  Site,
  SiteData,
} from "../constants";
import React, { useEffect, useState } from "react";
import Item from "@/components/calculator/AllOnX/Item";
import { getResponseOrder } from "@/components/calculator/AllOnX/AllOnXUtills";

interface ComponentDetailProps {
  procedure: PROCEDURES;
  selectedSites: Site[];
  sitesData: SiteData;
}

/**
 * Name : ComponentDetails.
 * Desc : The `ComponentDetails` function is a React functional component that renders a TabView component
 * with multiple TabPanels based on the `selectedSites` prop, and a final TabPanel for the summary.
 * @param {object} procedure
 * @param {array} selectedSites
 * @param {object} sitesData
 */
const ComponentDetails: React.FC<ComponentDetailProps> = ({
  procedure,
  selectedSites,
  sitesData,
}: ComponentDetailProps) => {
  const [componentSummary, setComponentSummary] = useState<any[]>([]);

  useEffect(() => {
    console.log("prepare summary", sitesData);
    let total: ItemData[] = [];
    const responseOrder: string[] = getResponseOrder(procedure);
    Object.keys(sitesData).map((siteName: string) => {
      const componentDetail: ComponentDetail =
        sitesData[siteName].componentDetails;
      responseOrder.map((key: string) => {
        componentDetail[key]?.map((response: ItemData) => {
          response.info.map((info: ItemInsights) => {
            const res = {
              label: response.label,
              info,
            };
          });
          total.push(response);
        });
        //console.log("componentDetail[key]", componentDetail[key]);
      });
    });
    console.log("total", total);
    setComponentSummary(total);
  }, [sitesData]);

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
        {/* <p className="m-0">Component Summary here</p> */}
        <>
          {JSON.stringify(sitesData)}
          {componentSummary.map((data: ItemData, i: number) => (
            <Item
              key={`${data.label}-${i}`}
              label={data.label}
              info={data.info}
              quantityVisibilityState={QUANTITY_VISIBILITY_STATE.EDITABLE}
            />
          ))}
        </>
      </TabPanel>
    </TabView>
  );
};

export default ComponentDetails;
