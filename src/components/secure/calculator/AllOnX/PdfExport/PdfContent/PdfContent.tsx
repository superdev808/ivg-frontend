import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ComponentDetail,
  ItemData,
  ItemInsights,
  SiteData,
  ignoreListForMultiples,
} from "../../constants";
import { cloneDeep } from "lodash";
import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";
import _ from "lodash";
import styles from "./PdfContent.module.scss";
import classNames from "classnames/bind";
import { getCookie } from "@/helpers/cookie";
import TeethSelector from "../../TeethSelector";
import InputSummary from "../InputSummary/InputSummary";
import ComponentSummary, {
  summary,
} from "../ComponentSummary/ComponentSummary";
import { Patient } from "../PdfExport";
import { TeethSelectorVariant } from "../../TeethSelector/TeethSelector";
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
  date?: Date | undefined;
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
  isCustomReport: boolean | undefined;
  patientInfo?: Patient | null;
}

const PdfContent: React.FC<PdfContentProps> = ({
  date,
  responseOrder,
  selectedSites,
  sitesData,
  isCustomReport,
  patientInfo,
}) => {
  const [componentSummary, setComponentSummary] = useState<summary[]>([]);
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
    const summaryData: summary[] = items.flatMap((category: ItemData) => {
      return category.info.map((item: ItemInsights) => {
        return {
          description: category.label,
          name: item.itemName,
          amount: item.quantity,
          link: item.link,
        };
      });
    });
    setComponentSummary(summaryData);
  }, [sitesData, responseOrder]);

  const currentDate = patientInfo?.date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const currentDateTime = patientInfo?.date?.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const calculatorType = isCustomReport ? `Custom` : `All-On-X`;
  const name = getCookie("name");
  const email = getCookie("email");
  return (
    <>
      <div className={cx("bg-color", "px-0 py-3")}></div>
      <div className="flex mx-4 mt-3 mb-3 justify-content-between">
        <Image
          src="/images/logo/Ivory-Guide-PDF-Logo.png"
          alt="Logo"
          width={"360"}
          height={"63"}
          className="relative"
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
          Date:{currentDate} {currentDateTime}
        </div>
      </div>
      <div className="flex mx-4 my-1 justify-content-between">
        <div className="flex flex-column">
          <div className="py-2">
            Please see summary for{" "}
            <span className="font-semibold">{calculatorType}</span> calculator.
          </div>
        </div>
        <div className="mt-2 pr-5">
          <TeethSelector
            showLabel={false}
            selectedSites={selectedSites}
            onSiteChange={() => {}}
            variant={TeethSelectorVariant.SMALL}
          />
        </div>
      </div>

      <div className="px-3 py-1">
        <InputSummary selectedSites={selectedSites} sitesData={sitesData} />
      </div>

      <div className="p-3">
        <ComponentSummary summary={componentSummary} />

        <div className="flex flex-column pt-5 greet">
          <div>Thank You,</div>
          <div className="mt-5">{name}</div>
        </div>
      </div>
    </>
  );
};

export default PdfContent;
