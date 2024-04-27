import classNames from "classnames/bind";
import React, { useMemo } from "react";

import TeethSelector, {
  TeethSelectorVariant,
} from "@/components/shared/TeethSelector";
import { getCookie } from "@/helpers/cookie";
import { formatDate, formatTime } from "@/helpers/util";
import {
  ComponentSummary as ComponentSummaryType,
  InputSummary as InputSummaryType,
  Patient,
  TotalQuantities,
} from "@/types/calculators";

import ComponentSummary from "../ComponentSummary";
import InputSummary from "../InputSummary";

import styles from "./styles.module.scss";
import { LINEAR_WORKFLOWS } from "@/constants/calculators";

const cx = classNames.bind(styles);

export interface Site {
  name: string;
  key: number;
}

interface PDFContentProps {
  calculatorName: string;
  calculatorType: string;
  patientInfo?: Patient | null;
  showTeethSelection: boolean;
  totalQuantities: TotalQuantities[];
  hideSite?: boolean;
  inputSummary: InputSummaryType[];
  componentSummary: ComponentSummaryType[];
}

const PDFContent: React.FC<PDFContentProps> = ({
  calculatorName,
  calculatorType,
  patientInfo,
  showTeethSelection,
  totalQuantities,
  hideSite,
  inputSummary,
  componentSummary,
}) => {
  const currentDate = formatDate(patientInfo?.date);
  const currentTime = formatTime(patientInfo?.date);

  const selectedSites = useMemo(() => {
    return inputSummary.map((elem) => {
      const site = elem.site || "Site 0";
      const siteNumber = site.split(" ")[1];
      return { name: site, key: Number(siteNumber) };
    });
  }, [inputSummary]);

  const name = getCookie("name");
  const email = getCookie("email");

  return (
    <>
      <div className="bg-dark-green px-0 py-3" />
      <div className="flex mx-4 mt-3 mb-3 justify-content-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo/Ivory-Guide-Logo-Horizontal-DarkGreen.png"
          alt="logo"
          width="auto"
          height={63}
        />

        <div className="flex flex-column font-semibold">
          <div>{name}</div>
          <div>{email}</div>
        </div>
      </div>

      <div
        className={cx("separator", "flex pb-2 mx-4 justify-content-between")}
      >
        <div className="col-4 p-0">
          {patientInfo?.name && (
            <div className={cx("break-all", "pb-2")}>{patientInfo.name}</div>
          )}
          {patientInfo?.address && (
            <div className={cx("break-all")}>{patientInfo.address}</div>
          )}
        </div>

        <div>
          <div className="pb-2">
            <span>Date: </span>
            {currentDate}
          </div>

          <div>
            <span>Time: </span>
            {currentTime}
          </div>
        </div>
      </div>

      <div className="flex mx-4 my-1 justify-content-between">
        <div className="flex flex-column">
          <div className="py-2">
            Please see summary for{" "}
            <span className="font-semibold">{calculatorName}</span>{" "}
            {LINEAR_WORKFLOWS.includes(calculatorType)
              ? "workflow"
              : "calculator"}
            .
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

      <div className="px-4">
        <div className="py-2">
          <InputSummary
            calculatorType={calculatorType}
            inputSummary={inputSummary}
            hideSite={hideSite}
          />
        </div>

        {!LINEAR_WORKFLOWS.includes(calculatorType) && (
          <ComponentSummary
            calculatorType={calculatorType}
            summary={componentSummary}
            totalQuantities={totalQuantities}
          />
        )}

        <div className="flex flex-column pt-5 greet">
          <div>Thank You,</div>
          <div className="mt-5">{name}</div>
        </div>
      </div>
    </>
  );
};

export default PDFContent;
