import React, { useEffect, useState } from "react";
import TeethSelector from "../TeethSelector";
import Image from "next/image";
import {
  ComponentDetail,
  ItemData,
  ItemInsights,
  QUANTITY_VISIBILITY_STATE,
  SiteData,
  ignoreListForMultiples,
} from "../constants";
import { cloneDeep } from "lodash";
import { CALCULATOR_NAME_COLLECTION_MAPPINGS } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";
import _ from "lodash";
import InputSummary from "./InputSummary/InputSummary";
import styles from "./InputSummary/InputSummary.module.scss";
import classNames from "classnames/bind";
import { getCookie } from "@/helpers/cookie";
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
  time: Date | undefined;
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
}

const PdfContent: React.FC<PdfContentProps> = ({
  time,
  responseOrder,
  selectedSites,
  sitesData,
}) => {
  const [componentSummary, setComponentSummary] = useState<any[]>([]);
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
    const summaryData = items.flatMap((category: ItemData) => {
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

  const currentDate = time?.toLocaleDateString();
  const currentDateTime = time?.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const calculatorType = `All-On-X`;
  const name = getCookie("name");
  const email = getCookie("email");
  return (
    <>
      <div style={{ backgroundColor: "#023932", padding: "1rem 0" }}></div>
      <div className="flex ml-4 mr-4 mt-3 mb-3 justify-content-between">
        <Image
          src="/images/logo/Ivory-Guide-PDF-Logo.png"
          alt="Logo"
          width={"360"}
          height={"63"}
          className="relative"
        />
        <div className="flex flex-column font-semibold">
          <div>{name}</div>
          {/* <div>User Address</div>
          <div className="mt-2">phone</div> */}
          <div>{email}</div>
        </div>
      </div>

      <div className="flex ml-4 mr-4 justify-content-between">
        <div>
          <div>Patient Name</div>
          <div>Patient Address</div>
        </div>
        <div>Date: {currentDate}</div>
      </div>

      <div
        style={{ borderTop: "2px solid #023932" }}
        className="flex mx-4 my-2 justify-content-between"
      >
        <div className="flex flex-column py-2">
          <div className="absolute pt-2 pb-2">
            Please see summary for{" "}
            <span className="font-semibold">{calculatorType}</span> calculator.
            <p className="my-2">
              exported on{" "}
              <span className="font-semibold">
                {currentDate} {currentDateTime}
              </span>
              .
            </p>
          </div>
        </div>
        <div className="mt-7">
          <TeethSelector
            showLabel={false}
            selectedSites={selectedSites}
            onSiteChange={() => {}}
          />
        </div>
      </div>

      <div style={{ display: "grid", padding: "1rem" }}>
        <InputSummary selectedSites={selectedSites} sitesData={sitesData} />
      </div>

      <div style={{ display: "grid", padding: "1rem" }}>
        {componentSummary && componentSummary.length ? (
          <table className={cx("striped-table")}>
            <thead>
              <tr>
                <h3 className="my-0 pb-1">Summary:</h3>
              </tr>
              <tr>
                {["Description", "Name", "Amount"].map(
                  (columnName: string, index: number) => (
                    <th key={index}>{columnName}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {componentSummary.map((data: any, summaryidx: number) => (
                <tr
                  key={`${data.description}-${summaryidx}`}
                  className={cx(summaryidx % 2 === 0 ? "even" : "odd")}
                >
                  <td>{data.description}</td>
                  <td>
                    <a href={data.link} target="_blank">
                      {data.name}
                    </a>
                  </td>
                  <td>{data.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <div className="flex flex-column mt-5">
          <div>Thank You,</div>
          <div className="mt-5">{name}</div>
        </div>
      </div>
    </>
  );
};

export default PdfContent;
