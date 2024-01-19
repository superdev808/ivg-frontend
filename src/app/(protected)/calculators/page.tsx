"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import styles from "./page.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);



import SearchBox from "@/components/ui/searchbox";
import Loading from "@/components/layout/loading";

export default function CalculatorsPage() {


	return <Calculators />
	
}

export const Calculators = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<string>>([]);

  const groupItems = [
    {
      label: "Implant Component Selection",
      subItems: [
        { label: "BoneReduction", text: "Bone Reduction Instruments" },
        { label: "ChairSidePickUp", text: "Chairside Pick-Up Materials" },
        { label: "Cover Screws" },
        { label: "DrillKitAndSequence", text: "Drill Kits and Drill Sequences" },
        { label: "RestroativeDirectToImplant", text: "Drivers (Restorative, Direct to Implant)" },
        { label: "RestorativeMultiUnitAbutments", text: "Drivers (Restorative, on Multi-Unit Abutments)" },
        { label: "HealingAbutments", text: "Healing Abutments" },
		    { label: "Implants", text: "Implants" },
        { label: "ImplantScrews", text: "Implant Screws" },
        { label: "ImplantAnalogs", text: "Implant Analogs" },
        { label: "ImpressingCopingsDirectToImplants", text: "Impression Copings (Direct to Implant)" },
        { label: "ImpressingCopingsMUAs", text: "Impression Copings (Multi-Unit Abutments)" },
        { label: "MUAs", text: "Multi-Unit Abutments" },
        { label: "Scanbodies" },
        { label: "ScanbodyMUAs", text: "Scanbodies (Mult-Unit Abutments)" },
        { label: "ScanbodyDriversDirectToImplants", text: "Scanbody Drivers (Direct to Implant)" },
        { label: "ScanbodyDriversMUAs", text: "Scanbody Drivers (MUAs)" },
        { label: "StockAbutments", text: "Stock Abutments" },
        { label: "TemporaryCopingsDirectToImplants", text: "Temporary Copings (Direct to Implant)" },
        { label: "TemporaryCopingsMUAs", text: "Temporary Copings (Multi-Unit Abutments)" },
        { label: "TiBasesDirectToImplants", text: "Ti Bases (Direct to Implant)" },
        { label: "TiBasesMUAs", text: "Ti Bases (Multi-Unit Abutments)" },
      ],
    },
    {
      label: "All-on-X Implant Surgery",
      subItems: [{ label: "All-on-X Implant Surgery" }],
    },
    {
      label: "Product Material Selection",
      subItems: [{ label: "Crown Materials" }],
    },
  ];

  const calcLabels = groupItems.reduce(
    (accumulator: any, currentValue: any) => {
      return [
        ...accumulator,
        ...currentValue.subItems.map((item: any) => item.label),
      ];
    },
    []
  );

  const handleSearch = (str: string) => {
    setLoading(true);
    const regExp = new RegExp(str, "i");
    const newSearchResult: Array<string> = [];

    for (const modelName of calcLabels) {
      if (regExp.test(modelName)) {
        newSearchResult.push(modelName);
      }
    }

    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/search?text=${str}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;

        for (const item of data) {
          if (!newSearchResult.includes(item)) {
            newSearchResult.push(item);
          }
        }
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setSearchResult(newSearchResult);
        setLoading(false);
      });
  };

  return (
    <div className={" nav-offset flex-grow-1"}>
      <div className="wrapper my-8">
        <div className=" p-5 border-round bg-white shadow-1">
          <h2 className="mt-0 mb-5 text-center">Calculators</h2>
          <div className="mt-0 mb-4">
            <SearchBox handleSearch={handleSearch} loading={loading} />
          </div>
          {searchResult.length > 0 && (
            <div className="mb-4">
              {searchResult.map((searchLabel, index) => (
                <Button
                  className={cx("calculatorButton", "p-3 m-2")}
                  key={`searched-calc-${index}`}
                  label={searchLabel}
                  onClick={() => {
                    router.push("/calculators/" + searchLabel);
                  }}
                />
              ))}
            </div>
          )}
          <div className="grid border-top-1 surface-border">
            <div className="col-6 border-right-1 p-4 surface-border">
              {groupItems.map((groupItem, index) => (
                <Button
                  className={cx("calculatorButton", "p-4 mb-2", {
                    "calculatorButton--highlighted": index === selectedGroup,
                  })}
                  key={`groupItem-${index}`}
                  style={{ width: "100%" }}
                  label={groupItem.label}
                  onClick={() => {
                    setSelectedGroup(index);
                  }}
                />
              ))}
            </div>
            {selectedGroup >= 0 && (
              <div className={cx("col-6 p-4", "calculatorButtonSection")}>
                {groupItems[selectedGroup].subItems.map((calcItem, index) => (
                  <Button
                    className={cx("calculatorButton", "p-4 mb-2")}
                    key={`calcItem-${index}`}
                    style={{ width: "100%" }}
                    label={calcItem.text || calcItem.label}
                    onClick={() => {
                      router.push("/calculators/" + calcItem.label);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
