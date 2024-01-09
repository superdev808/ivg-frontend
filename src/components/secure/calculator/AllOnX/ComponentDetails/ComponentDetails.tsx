import { TabPanel, TabView } from "primereact/tabview";
import {
  ComponentDetail,
  ItemData,
  PROCEDURES,
  QUANTITY_VISIBILITY_STATE,
  Site,
  SiteData,
  ignoreListForMultiples,
} from "../constants";
import React, { useEffect, useState } from "react";
import Item from "@/components/calculator/AllOnX/Item";
import { getResponseOrder } from "@/components/calculator/AllOnX/AllOnXUtills";
import _, { cloneDeep } from "lodash";

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
    let items: ItemData[] = [];
    const responseOrder: string[] = getResponseOrder(procedure);
    Object.keys(sitesData).map((siteName: string) => {
      let data: SiteData = cloneDeep(sitesData);
      const componentDetail: ComponentDetail = cloneDeep(
        data[siteName].componentDetails
      );
      responseOrder.map((key: string) => {
        componentDetail[key]?.map((response: ItemData) => {
          const indexOfItem: number = _.findIndex(items, (item: ItemData) => {
            return (
              item.label == response.label &&
              item.info?.every(
                (infoItem, index) =>
                  infoItem?.itemName == response.info[index]?.itemName
              )
            );
          });
          if (indexOfItem > -1) {
            items[indexOfItem].info.map((_, i) => {
              if (
                !ignoreListForMultiples.includes(
                  response.label.toLocaleLowerCase()
                ) &&
                items[indexOfItem].info[i].quantity
              ) {
                items[indexOfItem].info[i].quantity =
                  (items[indexOfItem].info[i].quantity as number) + 1;
              }
            });
          } else {
            items.push(response);
          }
        });
      });
    });

    setComponentSummary(items);
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
        <>
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
