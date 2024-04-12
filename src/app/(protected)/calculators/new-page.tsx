"use client";

import uniq from "lodash/uniq";
import { useRouter } from "next/navigation";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useRef, useState } from "react";

import SearchBox from "@/components/ui/searchbox";
import {
  CALCULATOR_GROUP_ITEMS,
  EXPLORE_ALL_DATA,
} from "@/constants/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { CalculatorGroupItem } from "@/types/calculators";
import TabContent from "./tab-content";

const NewCalculatorPage: React.FC = () => {
  const router = useRouter();

  const [selectedGroup, setSelectedGroup] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const searchBoxRef = useRef(null);
  const { calcInfoMap } = useCalculatorsInfo();

  const calcItems = CALCULATOR_GROUP_ITEMS.reduce(
    (accumulator: string[], currentValue: CalculatorGroupItem) => [
      ...accumulator,
      ...currentValue.subItems,
    ],
    []
  ).filter((calcType) => calcType in calcInfoMap);

  const handleSearch = (str = "") => {
    if (!str) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    str = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regExp = new RegExp(str, "ig");
    let newCalcTypes: string[] = calcItems.filter(
      (calcType) =>
        regExp.test(calcType) || regExp.test(calcInfoMap[calcType].label)
    );

    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/search?text=${str}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;

        newCalcTypes = uniq([...newCalcTypes, ...data]);
      })
      .catch((ex) => {
        console.log("Error Happening: ", ex.message);
      })
      .finally(() => {
        setSearchResult(newCalcTypes);
        setLoading(false);

        if (searchBoxRef.current) {
          (searchBoxRef.current as any).focus();
        }
      });
  };

  return (
    <div className="flex flex-column">
      <div className="bg-dark-green py-4 px-4">
        <div className="text-beige text-center text-4xl">Explore All</div>

        <div className="mt-4">
          <SearchBox
            handleSearch={handleSearch}
            loading={loading}
            inputRef={searchBoxRef}
          />
        </div>
      </div>

      <TabView className="calculator-explore-tab-view">
        {EXPLORE_ALL_DATA.map((datum) => (
          <TabPanel key={datum.name} header={datum.name}>
            <TabContent datum={datum} />
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default NewCalculatorPage;
