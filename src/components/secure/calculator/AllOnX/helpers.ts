import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";

import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";

import {
  ignoreListForMultiples,
  InputDetail,
  ItemData,
  SiteData,
} from "./constants";

export const getComponentSummary = (
  sitesData: SiteData,
  responseOrder: string[]
) => {
  const items: ItemData[] = [];

  const brand =
    find(
      get(Object.values(sitesData), "0.inputDetails"),
      (item: InputDetail) => item.question === "Implant Brand"
    )?.answer || "";

  Object.keys(sitesData).forEach((siteName) => {
    const componentDetail = cloneDeep(sitesData[siteName].componentDetails);

    responseOrder.forEach((calculatorName) => {
      componentDetail[
        CALCULATOR_NAME_COLLECTION_MAPPINGS[calculatorName]
      ]?.forEach((response) => {
        const itemIndex = findIndex(
          items,
          (item) => item.label === response.label
        );

        if (itemIndex > -1) {
          items[itemIndex].info.forEach((info, i) => {
            const indexOfInfo = response.info.findIndex(
              (res) => info.itemName === res.itemName && info.link === res.link
            );

            if (indexOfInfo > -1) {
              if (
                !ignoreListForMultiples.includes(
                  response.label.toLowerCase()
                ) &&
                items[itemIndex].info[i].quantity
              ) {
                items[itemIndex].info[i].quantity =
                  (items[itemIndex].info[i].quantity as number) + 1;
              }
            } else {
              items[itemIndex].info = uniqBy(
                [...items[itemIndex].info, ...response.info],
                "itemName"
              );
            }
          });

          if (items[itemIndex].info.length !== response.info.length) {
            items[itemIndex].info = uniqBy(
              [...items[itemIndex].info, ...response.info],
              "itemName"
            );
          }
        } else {
          items.push(response);
        }
      });
    });
  });

  const summaryData = items.flatMap((category: ItemData) =>
    category.info.map((item) => ({
      description: category.label,
      ...item,
      brand,
    }))
  );

  return summaryData;
};
