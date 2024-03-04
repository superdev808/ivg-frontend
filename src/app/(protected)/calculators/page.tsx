"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React, { useState, useRef } from "react";

import SearchBox from "@/components/ui/searchbox";
import {
  CALCULATOR_MAPPINGS,
  CALCULATOR_GROUP_ITEMS,
} from "@/constants/calculators";
import { event as gaEvent } from "@/lib/gtag";
import { CALCULATOR_GROUP_ITEM } from "@/types/calculators";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export const Calculators = () => {
  const router = useRouter();

  const [selectedGroup, setSelectedGroup] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const searchBoxRef = useRef(null);

  const calcItems = CALCULATOR_GROUP_ITEMS.reduce(
    (accumulator: any, currentValue: any) => {
      const newValue = { ...accumulator };
      currentValue.subItems.forEach((item: any) => {
        newValue[item.label] = item.text;
      });

      return newValue;
    },
    {}
  );

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

        if (searchBoxRef.current) {
          (searchBoxRef.current as any).focus();
        }
      });
  };

  const handleClickCalculatorGroup = (
    groupItem: CALCULATOR_GROUP_ITEM,
    index: number
  ) => {
    gaEvent({
      action: groupItem.label,
      category: "Button",
      label: `Calculator ${groupItem.label}`,
    });

    if (Object.values(CALCULATOR_MAPPINGS).includes(groupItem.label)) {
      router.push(`/calculators/${groupItem.label}`);
    } else {
      setSelectedGroup(index);
    }
  };

  return (
    <div className="nav-offset flex-grow-1">
      <div className="px-4 my-8">
        <div className="p-5 border-round bg-white shadow-1">
          <h2 className="mt-0 mb-5 text-center">Calculators</h2>

          <div className="mt-0 mb-4">
            <SearchBox
              handleSearch={handleSearch}
              loading={loading}
              inputRef={searchBoxRef}
            />
          </div>

          {searchResult.length > 0 && (
            <div className="mb-4">
              {searchResult.map((searchLabel, index) => (
                <Button
                  className={cx("calculatorButton", "p-3 m-2")}
                  key={`searched-calc-${index}`}
                  label={calcItems[searchLabel] || searchLabel}
                  onClick={() => {
                    router.push(`/calculators/${searchLabel}`);
                  }}
                />
              ))}
            </div>
          )}

          <div className="grid border-top-1 surface-border">
            <div className="col-6 border-right-1 p-4 surface-border flex flex-column gap-2">
              {CALCULATOR_GROUP_ITEMS.map((groupItem, index) => (
                <Button
                  className={cx(
                    "calculatorButton",
                    "p-4 flex flex-column w-full",
                    {
                      "calculatorButton--highlighted": index === selectedGroup,
                    }
                  )}
                  key={`groupItem-${index}`}
                  onClick={() => handleClickCalculatorGroup(groupItem, index)}
                >
                  <h3 className="m-0">{groupItem.label}</h3>
                  <p>{groupItem.description}</p>
                </Button>
              ))}
            </div>

            {selectedGroup >= 0 && (
              <div className={cx("col-6 p-4", "calculatorButtonSection")}>
                <div className="flex flex-column gap-2">
                  {CALCULATOR_GROUP_ITEMS[selectedGroup].subItems.map(
                    (calcItem, index) => (
                      <Button
                        className={cx(
                          "calculatorButton",
                          "p-4 w-full flex flex-column"
                        )}
                        key={`calcItem-${index}`}
                        onClick={() => {
                          router.push(`/calculators/${calcItem.label}`);
                        }}
                      >
                        <h4 className="m-0">
                          {calcItem.text || calcItem.label}
                        </h4>
                        {calcItem.description && (
                          <p className="mb-0 mt-2">{calcItem.description}</p>
                        )}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CalculatorsPage() {
  return <Calculators />;
}
