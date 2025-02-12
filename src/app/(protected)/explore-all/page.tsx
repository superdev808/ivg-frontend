"use client";

import classNames from "classnames/bind";
import uniq from "lodash/uniq";
import { NextPage } from "next";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useEffect, useMemo, useRef, useState } from "react";

import SearchBox from "@/components/ui/searchbox";
import {
  CALCULATOR_GROUP_ITEMS,
  EXPLORE_ALL_DATA,
} from "@/constants/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import {
  formatToExploreDataItems,
  updateExploreAllData,
} from "@/helpers/calculators";
import { useGetUserInfoQuery, usePutUpdateLastActvivityMutation } from "@/redux/hooks/apiHooks";
import { CalculatorGroupItem, EXPLORE_DATA } from "@/types/calculators";

import TabContent from "./tab-content";

import styles from "./page.module.scss";
import { OverlayPanel } from "primereact/overlaypanel";
import CustomScrollbar from "@/components/shared/CustomScrollbar";

const cx = classNames.bind(styles);

const CalculatorPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useGetUserInfoQuery({});
  const [putUpdateLastActvivity] = usePutUpdateLastActvivityMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const searchBoxRef = useRef(null);
  const overlayPanelRef = useRef(null);
  const emptyRef = useRef(null);
  const { calcInfoMap } = useCalculatorsInfo();
  const [exploreAllData, setExploreAllData] =
    useState<EXPLORE_DATA[]>(EXPLORE_ALL_DATA);

  const tabInUrl = searchParams.get("tab") || "";
  const userInfo = data?.data;

  useEffect(() => {
    const availableTabs = EXPLORE_ALL_DATA.map((elem) => elem.id);

    if (!tabInUrl || !availableTabs.includes(tabInUrl)) {
      router.replace("/explore-all");
      return;
    }

    const tabIndex = availableTabs.findIndex((elem) => elem === tabInUrl);
    if (tabIndex !== activeTab) {
      setActiveTab(tabIndex);
    }
  }, [router, tabInUrl]); // eslint-disable-line

  useEffect(() => { putUpdateLastActvivity({}); }, []);

  const calcItems = CALCULATOR_GROUP_ITEMS.reduce(
    (accumulator: string[], currentValue: CalculatorGroupItem) => [
      ...accumulator,
      ...currentValue.subItems,
    ],
    []
  ).filter((calcType) => calcType in calcInfoMap);

  const favoriteCalculators = useMemo(() => {
    if (!userInfo?.savedCalculators || userInfo.savedCalculators.length === 0) {
      return [];
    }

    return userInfo.savedCalculators
      .map((calc: string) => calcInfoMap[calc])
      .filter(Boolean)
      .map((calc: { type: string; label: string }) => ({
        name: calc.label,
        isHighlighted: true,
        href: `/calculators/${calc.type}`,
      }));
  }, [userInfo, calcInfoMap]);

  const handleSearch = (e: any, str: string = "") => {
    if (!str) {
      setSearchResult([]);
      (overlayPanelRef?.current as any).hide();
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
        (overlayPanelRef?.current as any)?.show(e, emptyRef.current);
        setLoading(false);

        if (searchBoxRef.current) {
          (searchBoxRef.current as any).focus();
        }
      });
  };

  useEffect(() => {
    const COMMON_SUPPLIES = "DentalSupplies",
      COMMON_SUPPLIES_TITLE = "Common Supplies";
    const inputKeys: string[] =
      calcInfoMap[COMMON_SUPPLIES]?.input.map((item) => item.colIndex) || [];
    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/materials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: COMMON_SUPPLIES,
        quiz: {},
        fields: inputKeys,
      }),
    })
      .then((response) => response.json())
      .then(({ data: { data } }) => {
        const commonSuppliesDataItems = formatToExploreDataItems(
          data as any[],
          inputKeys,
          `/calculators/${COMMON_SUPPLIES}?default=`
        );
        setExploreAllData((prevState) =>
          updateExploreAllData(
            prevState,
            COMMON_SUPPLIES_TITLE,
            commonSuppliesDataItems
          )
        );
      })
      .catch((err) => {
        console.log(`Common Supplies error occured`, err);
      });
  }, [calcInfoMap]);

  return (
    <div className="flex flex-column flex-1">
      <div className="bg-dark-green py-4 px-4">
        <div className={cx("content")}>
          <div className="text-beige text-center text-4xl">Explore All</div>

          <div className="mt-4 flex">
            <div style={{ width: '1px' }} ref={emptyRef}></div>
            <SearchBox
              handleSearch={handleSearch}
              loading={loading}
              inputRef={searchBoxRef}
            />
          </div>

          <OverlayPanel ref={overlayPanelRef} showCloseIcon>
            <div className={cx('searchPanelOverlay')}>
              <CustomScrollbar>
                <div className="flex flex-column">
                  {searchResult.map((searchedCalcType, index) => (
                    <Button
                      className={cx("calculatorButton", "p-3 text-left")}
                      label={
                        calcInfoMap[searchedCalcType].label || searchedCalcType
                      }
                      key={`searched-calc-${index}`}
                      onClick={() => {
                        router.push(`/calculators/${searchedCalcType}`);
                      }}
                    />
                  ))}
                </div>
              </CustomScrollbar>
            </div>
          </OverlayPanel>
        </div>
      </div>

      <TabView
        className="calculator-explore-tab-view flex flex-column flex-1"
        activeIndex={activeTab}
        onTabChange={({ index }) => setActiveTab(index)}
      >
        {exploreAllData.map((datum) => (
          <TabPanel
            key={datum.name}
            header={
              <>
                {datum.name === "Procedures" && (
                  <span className="calculator-beta-tag uppercase">Beta</span>
                )}
                {datum.name}
              </>
            }
          >
            <TabContent
              datum={datum}
              favoriteCalculators={favoriteCalculators}
            />
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default CalculatorPage;
