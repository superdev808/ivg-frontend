import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import TeethSelector from "../TeethSelector";
import PDFExport from "./PdfExport";
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
import Item from "@/components/calculator/AllOnX/Item";

export interface InputDetail {
  id?: string;
  question: string;
  answer: string;
}

export interface Site {
  name: string;
  key: number;
}

const PdfContent: React.FC<any> = ({
  responseOrder,
  selectedSites,
  sitesData,
}) => {
  //const pdfRef = useRef(null);
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

    setComponentSummary(items);
  }, [sitesData, responseOrder]);

  interface FormFieldProps {
    label: string;
    style?: CSSProperties;
    labelStyle?: CSSProperties;
  }
  
  const FormField: FC<FormFieldProps> = ({ label, style, labelStyle }) => (
    <div style={{ marginBottom: "0.5rem", display: "flex", flexDirection: "row", ...style }}>
      <label style={{ fontSize: "16px", marginRight: "0.5rem", minWidth: "120px", marginBottom: 0, ...labelStyle }}>{label}:</label>
      <div style={{ border: "none", borderBottom: "1px solid #000", flex: 1 }}></div>
    </div>
  );
  const dynamicContent = (
    <>
      {/* <div style={{ padding: "20px" }}> */}
        <div style={{ backgroundColor: "#023932", padding: "0.8rem 0" }}>
          <Image
            src="/images/logo/Ivory-Guide-Horizontal-Logo-White.png"
            alt="Logo"
            width={"210"}
            height={"35"}
            className="relative"
          />
        </div>

        <div style={{ display: "grid", padding: "1rem" }}>
          <div style={{ marginLeft: "20rem" }}>
            <FormField label="Name" />
            <FormField label="Address" />
            <FormField label="City, State, Zip" />
            <FormField label="Phone" />
            <FormField label="Email" />
            <FormField label="Date" />
          </div>
          <div style={{ marginTop: "2rem", marginRight: "20rem" }}>
            <FormField label="Recipient Name"/>
            <FormField label="Address" />
            <FormField label="City, State, Zip" />
          </div>
        </div>

        <div style={{ display: "grid", padding: "1rem" }}>
          <div style={{ width: "33.3%" }}>
            <FormField label="Dear" labelStyle={{minWidth: "50px"}} />
          </div>
          <TeethSelector
              selectedSites={selectedSites}
              onSiteChange={() => {}}
            />
          <p>
            Thank you for referring patient
              <input
                type="text"
                style={{
                  border: "none",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
              />
            and using our services.
          </p>

          {selectedSites.map((site: Site) => {
            const questionnaire: InputDetail[] =
              sitesData[site.name]?.inputDetails || [];
            return (
              <React.Fragment key={site.key}>
                <h3>{site.name}</h3>
                {questionnaire.map((data: InputDetail, index: number) => {
                  return (
                    <>
                      {data.answer && (
                        <div
                          className={`flex ${
                            index === 0 && "border-top-1"
                          } border-bottom-1 surface-border`}
                          key={`${site.key}-${index}`}
                        >
                          <span className="flex-1 border-left-1 border-right-1 surface-border p-2">
                            {data.question}
                          </span>
                          <span className="flex-1 border-right-1 surface-border p-2">
                            {data.answer}
                          </span>
                        </div>
                      )}
                    </>
                  );
                })}
              </React.Fragment>
            );
          })}

          <label style={{ paddingTop: "0.5rem" }}>Implant Placed:</label>
          <label style={{ paddingTop: "0.5rem" }}>Selected Items:</label>
        </div>
      {/* </div> */}

      {/* <div style={{ padding: "20px" }}> */}
        <div style={{ display: "grid", padding: "1rem" }}>
          <>
            {componentSummary.map((data: ItemData, i: number) => (
              <Item
                key={`${data.label}-${i}`}
                label={data.label}
                info={data.info}
                quantityVisibilityState={QUANTITY_VISIBILITY_STATE.SHOW}
                isFirst={i === 0}
              />
            ))}
          </>

          <p style={{ paddingTop: "0.5rem" }}>
            Notes: There was bone reduction performed in this case. No MUA’s
            were placed. Other:
          </p>
          <p style={{ paddingTop: "0.5rem" }}>
            Please do not hesitate to reach out to our office with further
            questions. Our contact information is at the top of this form.
          </p>
          <label style={{ paddingTop: "0.5rem" }}>
            Sincerely,
            <input
              type="text"
              style={{
                border: "none",
                borderBottom: "1px solid #000",
                outline: "none",
              }}
            />
          </label>
        </div>
      {/* </div> */}
    </>
  );
  return <PDFExport pdfContent={dynamicContent} />;
};

export default PdfContent;
