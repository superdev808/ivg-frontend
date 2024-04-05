import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React, { useMemo } from "react";

import TeethSelector, {
  TeethSelectorVariant,
} from "@/components/shared/TeethSelector";
import { CALCULATOR_IMAGES } from "@/constants/calculators";
import {
  SingleSavedResult as SingleSavedResultType,
  MultiSavedResult as MultiSavedResultType,
} from "@/types/calculators";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

const LOGO_URL = "/images/logo/Ivory-Guide-Logo-Horizontal-Dark.svg";

/**
 * Single saved result
 */
interface SingleSavedResultProps {
  savedResult: SingleSavedResultType;
}

export const SingleSavedResult: React.FC<SingleSavedResultProps> = ({
  savedResult,
}) => {
  const router = useRouter();

  const { name, calculatorType } = savedResult;

  const itemImage = CALCULATOR_IMAGES[calculatorType] || LOGO_URL;
  const { calcInfoMap } = useCalculatorsInfo();

  const handleGoToCalculator = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    router.push(`/calculators/${calculatorType}`);
  };

  return (
    <>
      <div className="flex-shrink-0">
        <Image src={itemImage} alt={name} width="100" />
      </div>

      <div className="flex-1 flex flex-column gap-2">
        <div>
          <span className="font-bold">Title:</span>{" "}
          <Button
            link
            label={name}
            className="ml-1 px-0 py-0 w-fit border-noround text-dark-green"
          />
        </div>
        <Button
          link
          label={calcInfoMap[calculatorType].label}
          className="px-0 py-0 w-fit border-noround text-dark-green"
          onClick={handleGoToCalculator}
        />
      </div>
    </>
  );
};

/**
 * Multi saved result
 */
interface MultiSavedResultProps {
  savedResult: MultiSavedResultType;
}

export const MultiSavedResult: React.FC<MultiSavedResultProps> = ({
  savedResult,
}) => {
  const router = useRouter();

  const { name, inputSummary, type } = savedResult;

  const selectedSites = useMemo(() => {
    if (
      !Array.isArray(inputSummary) ||
      (inputSummary.length === 1 && inputSummary[0].site === "General Details")
    ) {
      return [];
    }

    return inputSummary.map((elem) => {
      const site = elem.site || "Site 0";
      const siteNumber = site.split(" ")[1];
      return { name: site, key: Number(siteNumber) };
    });
  }, [inputSummary]);

  const handleGoToCalculator = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();

    if (type === "all-on-x") {
      router.push("/calculators/All-on-X Ordering Guide");
    } else if (type === "combined") {
      router.push("/calculators/Custom Combinations");
    }
  };

  return (
    <>
      <div className="flex-shrink-0">
        {selectedSites.length !== 0 ? (
          <TeethSelector
            selectedSites={selectedSites}
            showLabel={false}
            variant={TeethSelectorVariant.SMALL}
            showVertical
          />
        ) : (
          <Image src={LOGO_URL} alt={name} width="100" />
        )}
      </div>

      <div className="flex-1 flex flex-column gap-2">
        <div>
          <span className="font-bold">Title:</span>{" "}
          <Button
            link
            label={name}
            className="ml-1 px-0 py-0 w-fit border-noround text-dark-green"
          />
        </div>
        <Button
          link
          label={
            savedResult.type === "all-on-x"
              ? "All-on-X Ordering Guide"
              : "Custom Combinations"
          }
          className="px-0 py-0 w-fit border-noround text-dark-green"
          onClick={handleGoToCalculator}
        />
      </div>
    </>
  );
};
