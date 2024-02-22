"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React, { useState } from "react";

import SearchBox from "@/components/ui/searchbox";

import { CALCULATOR_MAPPINGS } from "./constants";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function CalculatorsPage() {
  return <Calculators />;
}

export const Calculators = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<string>>([]);

  const groupItems = [
    {
      label: "Implant Component Selection",
      description:
        "These calculators enable quick identification and procurement of a range of Impression Components, Abutments, CAD / CAM Restorations, and Prosthetic and Surgical Instruments to meet all your implant needs.",
      subItems: [
        {
          label: "BoneReduction",
          text: "Bone Reduction Instruments",
          description:
            "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
        },
        {
          label: "ChairSidePickUp",
          text: "Chairside Pick-Up Materials",
          description:
            "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
        },
        {
          label: "DrillKitAndSequence",
          text: "Drill Kits and Drill Sequences",
          description:
            "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "RestroativeDirectToImplant",
          text: "Drivers (Restorative, Direct to Implant)",
          description:
            "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "RestorativeMultiUnitAbutments",
          text: "Drivers (Restorative, on Multi-Unit Abutments)",
          description:
            "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "HealingAbutments",
          text: "Healing Abutments",
          description:
            "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "Implants",
          text: "Implants",
          description:
            "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ImplantScrews",
          text: "Implant Screws",
          description:
            "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ImplantAnalogs",
          text: "Implant Analogs",
          description:
            "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ImpressingCopingsDirectToImplants",
          text: "Impression Copings (Direct to Implant)",
          description:
            "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ImpressingCopingsMUAs",
          text: "Impression Copings (Multi-Unit Abutments)",
          description:
            "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "MUAs",
          text: "Multi-Unit Abutments",
          description:
            "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "Scanbodies",
          text: "Scanbodies (Single Unit)",
          description:
            "This calculator displays scanbodies for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ScanbodyMUAs",
          text: "Scanbodies (Mult-Unit Abutments)",
          description:
            "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ScanbodyDriversDirectToImplants",
          text: "Scanbody Drivers (Direct to Implant)",
          description:
            "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "ScanbodyDriversMUAs",
          text: "Scanbody Drivers (MUAs)",
          description:
            "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "StockAbutments",
          text: "Stock Abutments",
          description:
            "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "TemporaryCopingsDirectToImplants",
          text: "Temporary Copings (Direct to Implant)",
          description:
            "This calculator displays temporary copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "TemporaryCopingsMUAs",
          text: "Temporary Copings (Multi-Unit Abutments)",
          description:
            "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "TiBasesDirectToImplants",
          text: "Ti Bases (Direct to Implant)",
          description:
            "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
        },
        {
          label: "TiBasesMUAs",
          text: "Ti Bases (Multi-Unit Abutments)",
          description:
            "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
        },
      ],
    },
    {
      label: "All-on-X Ordering Guide",
      description:
        "This customized calculator enables quick identification and procurement of a variety of components, instruments, and materials to help you place or restore implants.",
      subItems: [
        {
          label: "All-on-X Ordering Guide",
          text: "All-on-X Ordering Guide",
          description: "",
        },
      ],
    },
    {
      label: "Custom Combinations",
      description:
        "This tool enables you to combine multiple Implant Component to identify and procure products, and easily share which components were used with colleagues or patients.",
      subItems: [],
    },
  ];

  const calcItems = groupItems.reduce((accumulator: any, currentValue: any) => {
    const newValue = { ...accumulator };
    currentValue.subItems.forEach((item: any) => {
      newValue[item.label] = item.text;
    });
    return newValue;
  }, {});

  const handleSearch = (str: string) => {
    setLoading(true);

    const regExp = new RegExp(str, "i");
    const newCalcItemLabels: string[] = [];

    for (const modelName of Object.keys(calcItems)) {
      if (regExp.test(modelName)) {
        newCalcItemLabels.push(modelName);
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
          if (!newCalcItemLabels.includes(item)) {
            newCalcItemLabels.push(item);
          }
        }
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setSearchResult(newCalcItemLabels);
        setLoading(false);
      });
  };

  return (
    <div className="nav-offset flex-grow-1">
      <div className="px-4 my-8">
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
                  label={calcItems[searchLabel] || searchLabel}
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
                  className={cx(
                    "calculatorButton",
                    "p-4 mb-2 flex flex-column w-full",
                    {
                      "calculatorButton--highlighted": index === selectedGroup,
                    }
                  )}
                  key={`groupItem-${index}`}
                  onClick={() => {
                    groupItem.label === CALCULATOR_MAPPINGS.CUSTOM_COMBINATION
                      ? router.push(`/calculators/${groupItem.label}`)
                      : setSelectedGroup(index);
                  }}
                >
                  <h3 className="m-0">{groupItem.label}</h3>
                  <p>{groupItem.description}</p>
                </Button>
              ))}
            </div>

            {selectedGroup >= 0 && (
              <div className={cx("col-6 p-4", "calculatorButtonSection")}>
                {groupItems[selectedGroup].subItems.map((calcItem, index) => (
                  <Button
                    className={cx(
                      "calculatorButton",
                      "p-4 mb-2 w-full flex flex-column"
                    )}
                    key={`calcItem-${index}`}
                    onClick={() => {
                      router.push(`/calculators/${calcItem.label}`);
                    }}
                  >
                    <h4 className="m-0">{calcItem.text || calcItem.label}</h4>
                    {calcItem.description && (
                      <p className="mb-0 mt-2">{calcItem.description}</p>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
