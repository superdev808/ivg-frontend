import { TabPanel, TabView } from "primereact/tabview";
import {
  ComponentDetail,
  ItemData,
  ItemInsights,
  PROCEDURES,
  QUANTITY_VISIBILITY_STATE,
  Site,
  SiteData,
  ignoreListForMultiples,
} from "../constants";
import React, { useEffect, useState } from "react";
import Item from "@/components/calculator/AllOnX/Item";
import _, { cloneDeep } from "lodash";
import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";

interface ComponentDetailProps {
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
}

/**
 * Name : ComponentDetails.
 * Desc : The `ComponentDetails` function is a React functional component that renders a TabView component
 * with multiple TabPanels based on the `selectedSites` prop, and a final TabPanel for the summary.
 * @param {array} selectedSites
 * @param {object} sitesData
 * @param {array} responseOrder
 */
const ComponentDetails: React.FC<ComponentDetailProps> = ({
  selectedSites,
  sitesData,
  responseOrder,
}: ComponentDetailProps) => {
  const [componentSummary, setComponentSummary] = useState<ItemData[]>([]);

  useEffect(() => {
    let items: ItemData[] = [];
    Object.keys(sitesData).map((siteName: string) => {
      let data: SiteData = cloneDeep(sitesData);
      const componentDetail: ComponentDetail = cloneDeep(
        data[siteName].componentDetails
      );
      responseOrder.map((key: string) => {
        componentDetail[CALCULATOR_NAME_COLLECTION_MAPPINGS[key]]?.map(
          (response: ItemData) => {
            const indexOfItem: number = _.findIndex(items, (item: ItemData) => {
              return item.label === response.label;
            });
            if (indexOfItem > -1) {
              items[indexOfItem].info.map((info: ItemInsights, i: number) => {
                const indexOfInfo: number = response.info.findIndex(
                  (res: ItemInsights) => {
                    return (
                      info.itemName === res.itemName && info.link === res.link
                    );
                  }
                );
                if (indexOfInfo > -1) {
                  if (
                    !ignoreListForMultiples.includes(
                      response.label.toLowerCase()
                    ) &&
                    items[indexOfItem].info[i].quantity
                  ) {
                    items[indexOfItem].info[i].quantity =
                      (items[indexOfItem].info[i].quantity as number) + 1;
                  }
                } else {
                  items[indexOfItem].info = _.uniqBy(
                    [...items[indexOfItem].info, ...response.info],
                    "itemName"
                  );
                }
              });
              // check and add new items which are not in the list
              if (items[indexOfItem].info.length != response.info.length) {
                items[indexOfItem].info = _.uniqBy(
                  [...items[indexOfItem].info, ...response.info],
                  "itemName"
                );
              }
            } else {
              items.push(response);
            }
          }
        );
      });
    });

    setComponentSummary(items);
  }, [sitesData, responseOrder]);

  return (
    <TabView scrollable>
      {selectedSites.map((site: Site) => {
        return (
          <TabPanel key={site.name} header={site.name}>
            <React.Fragment key={site.key}>
              <>
                {sitesData[site.name] &&
                  Object.keys(sitesData[site.name]?.componentDetails).map(
                    (collection: string, collectionIndex: number) => {
                      const componentDetails: ItemData[] =
                        sitesData[site.name]?.componentDetails[collection] ||
                        [];
                      return componentDetails.map(
                        (data: ItemData, itemIndex: number) => {
                          const isFirst: boolean =
                            collectionIndex === 0 && itemIndex === 0;

                          return (
                            <Item
                              key={`${data.label}-${itemIndex}`}
                              label={data.label}
                              info={data.info}
                              quantityVisibilityState={
                                QUANTITY_VISIBILITY_STATE.SHOW
                              }
                              isFirst={isFirst}
                            />
                          );
                        }
                      );
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
              isFirst={i === 0}
            />
          ))}
        </>
      </TabPanel>
    </TabView>
  );
};

export default ComponentDetails;
