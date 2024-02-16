import classNames from "classnames/bind";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import React, { useEffect, useState } from "react";

import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";
import { getCookie } from "@/helpers/cookie";
import { formatDate } from "@/helpers/util";
import { Patient } from "@/types/PublicTypes";

import {
  ComponentDetail,
  ignoreListForMultiples,
  ItemData,
  ItemInsights,
  SiteData,
  TotalQuantities,
} from "../../constants";
import TeethSelector from "../../TeethSelector";
import { TeethSelectorVariant } from "../../TeethSelector/TeethSelector";
import ComponentSummary, { Summary } from "../ComponentSummary";
import InputSummary from "../InputSummary";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface InputDetail {
  id?: string;
  answer: string;
}

export interface Site {
  name: string;
  key: number;
}

interface PdfContentProps {
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
  calculatorName: string;
  patientInfo?: Patient | null;
  showTeethSelection: boolean;
  totalQuantities: TotalQuantities[];
}

const PdfContent: React.FC<PdfContentProps> = ({
  responseOrder,
  selectedSites,
  sitesData,
  calculatorName,
  patientInfo,
  showTeethSelection,
  totalQuantities,
}) => {
  const [componentSummary, setComponentSummary] = useState<Summary[]>([]);

  useEffect(() => {
    let items: ItemData[] = [];

    Object.keys(sitesData).forEach((siteName: string) => {
      let data: SiteData = cloneDeep(sitesData);

      const componentDetail: ComponentDetail = cloneDeep(
        data[siteName].componentDetails
      );

      responseOrder.forEach((key: string) => {
        componentDetail[CALCULATOR_NAME_COLLECTION_MAPPINGS[key]]?.forEach(
          (response: ItemData) => {
            const indexOfItem: number = findIndex(items, (item: ItemData) => {
              return item.label === response.label;
            });

            if (indexOfItem > -1) {
              items[indexOfItem].info.forEach(
                (info: ItemInsights, i: number) => {
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
                    items[indexOfItem].info = uniqBy(
                      [...items[indexOfItem].info, ...response.info],
                      "itemName"
                    );
                  }
                }
              );
              // check and add new items which are not in the list
              if (items[indexOfItem].info.length != response.info.length) {
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
    });

    const summaryData: Summary[] = items.flatMap((category: ItemData) =>
      category.info.map((item: ItemInsights) => ({
        description: category.label,
        name: item.itemName,
        amount: item.quantity,
        link: item.link,
      }))
    );

    setComponentSummary(summaryData);
  }, [sitesData, responseOrder]);

  const currentDate = formatDate(patientInfo?.date);
  const currentDateTime = formatDate(patientInfo?.date);

  const name = getCookie("name");
  const email = getCookie("email");

  return (
    <>
      <div className={cx("bg-color", "px-0 py-3")} />
      <div className="flex mx-4 mt-3 mb-3 justify-content-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo/Ivory-Guide-PDF-Logo.png"
          alt="logo"
          width={360}
          height={63}
        />

        <div className="flex flex-column font-semibold">
          <div>{name}</div>
          {/* TODO: Need to add dynamic values when available */}
          {/* <div>User Address</div>
          <div className="mt-2">phone</div> */}
          <div>{email}</div>
        </div>
      </div>

      <div
        className={cx("separator", "flex pb-2 mx-4 justify-content-between")}
      >
        <div className="col-4 p-0">
          <div className={cx("break-all", "pb-2")}>{patientInfo?.name}</div>
          <div className={cx("break-all")}>{patientInfo?.address}</div>
        </div>

        <div>
          <div className="pb-2">
            <span>Date: </span>
            {currentDate}
          </div>

          <div>
            <span>Time: </span>
            {currentDateTime}
          </div>
        </div>
      </div>

      <div className="flex mx-4 my-1 justify-content-between">
        <div className="flex flex-column">
          <div className="py-2">
            Please see summary for{" "}
            <span className="font-semibold">{calculatorName}</span> calculator.
          </div>
        </div>

        {showTeethSelection && (
          <div className="mt-2 pr-5">
            <TeethSelector
              showLabel={false}
              selectedSites={selectedSites}
              onSiteChange={() => {}}
              variant={TeethSelectorVariant.SMALL}
            />
          </div>
        )}
      </div>

      <div className="px-4 py-1">
        <InputSummary selectedSites={selectedSites} sitesData={sitesData} />
      </div>

      <div className="px-4">
        <ComponentSummary
          summary={componentSummary}
          totalQuantities={totalQuantities}
        />

        <div className="flex flex-column pt-5 greet">
          <div>Thank You,</div>
          <div className="mt-5">{name}</div>
        </div>
      </div>
    </>
  );
};

export default PdfContent;
