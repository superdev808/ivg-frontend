import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import React, { useMemo } from "react";

import Item from "@/components/calculator/AllOnX/Item";
import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";

import {
  ComponentDetail,
  ItemData,
  QUANTITY_VISIBILITY_STATE,
  ignoreListForMultiples,
} from "../constants";

interface ComponentDetailsProps {
  componentDetails: ComponentDetail;
  responseOrder: string[];
  onUpdateQuantity: (value: number, itemName: string) => void;
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({
  componentDetails,
  responseOrder,
  onUpdateQuantity,
}) => {
  const componentSummary = useMemo(() => {
    let items: ItemData[] = [];

    responseOrder.map((key) => {
      componentDetails[CALCULATOR_NAME_COLLECTION_MAPPINGS[key]]?.map(
        (response) => {
          const indexOfItem: number = findIndex(
            items,
            (item) => item.label === response.label
          );

          if (indexOfItem > -1) {
            items[indexOfItem].info.map((info, i) => {
              const indexOfInfo = response.info.findIndex(
                (res) =>
                  info.itemName === res.itemName && info.link === res.link
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
                items[indexOfItem].info = uniqBy(
                  [...items[indexOfItem].info, ...response.info],
                  "itemName"
                );
              }
            });
            // check and add new items which are not in the list
            if (items[indexOfItem].info.length !== response.info.length) {
              items[indexOfItem].info = uniqBy(
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

    return items;
  }, [componentDetails, responseOrder]);

  return (
    <div>
      {componentSummary.map((data, i) => (
        <Item
          key={`${data.label}-${i}`}
          label={data.label}
          info={data.info}
          quantityVisibilityState={QUANTITY_VISIBILITY_STATE.EDITABLE}
          isFirst={i === 0}
          onUpdateQuantity={(value: number, itemName: string) =>
            onUpdateQuantity(value, itemName)
          }
        />
      ))}
    </div>
  );
};

export default ComponentDetails;
