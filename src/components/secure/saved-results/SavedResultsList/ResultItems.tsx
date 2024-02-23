import cx from "classnames";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React, { useMemo } from "react";

import { formatDate, getCalculatorName, productImages } from "@/helpers/util";
import {
  ComponentSummary,
  InputSummary,
  SingleSavedResult as SingleSavedResultType,
  MultiSavedResult as MultiSavedResultType,
} from "@/types/calculators";
import TeethSelector, {
  TeethSelectorVariant,
} from "@/components/shared/TeethSelector";

/**
 * Single saved result
 */
interface SingleSavedResultProps {
  savedResult: SingleSavedResultType;
  isLoading: boolean;
  onDelete: () => void;
}

export const SingleSavedResult: React.FC<SingleSavedResultProps> = ({
  savedResult,
  isLoading,
  onDelete,
}) => {
  const router = useRouter();

  const { id, name, calculatorType, date } = savedResult;

  const itemImage = productImages[calculatorType] || productImages["Default"];

  const handleGoToDetailPage = (resultId: string) => {
    if (isLoading) {
      return;
    }

    router.push(`/settings/saved-results/detail/?id=${resultId}`);
  };

  const handleGoToCalculator = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    router.push(`/calculators/${calculatorType}`);
  };

  const handleDelete = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={cx(
        `border-2 border-gray-400 px-2 py-3 text-center
      flex flex-column gap-4 align-items-center
      md:text-left md:px-3 md:py-5 md:flex-row`,
        { "cursor-pointer": !isLoading, "cursor-wait": isLoading }
      )}
      onClick={() => handleGoToDetailPage(id)}
    >
      <div className="flex-shrink-0">
        <Image src={itemImage} alt={name} width="100" />
      </div>

      <div className="flex-1 flex flex-column gap-2">
        <div className="font-bold">Title:</div>
        <Button
          link
          label={getCalculatorName(calculatorType)}
          className="px-0 py-0 w-fit border-noround"
          onClick={handleGoToCalculator}
        />
        <div>{name}</div>
      </div>

      <div className="flex-shrink-0">
        <div className="font-bold">Saved Date:</div>
        <div>{formatDate(date)}</div>
      </div>

      <div className="flex-shrink-0">
        <Button
          icon="pi pi-trash"
          disabled={isLoading}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

/**
 * Multi saved result
 */
interface MultiSavedResultProps {
  savedResult: MultiSavedResultType;
  isLoading: boolean;
  onDelete: () => void;
}

export const MultiSavedResult: React.FC<MultiSavedResultProps> = ({
  savedResult,
  isLoading,
  onDelete,
}) => {
  const router = useRouter();

  const { id, name, date, inputSummary, type } = savedResult;

  const selectedSites = useMemo(() => {
    if (
      inputSummary.length === 1 &&
      inputSummary[0].site === "General Details"
    ) {
      return [];
    }

    return inputSummary.map((elem) => {
      const site = elem.site || "Site 0";
      const siteNumber = site.split(" ")[1];
      return { name: site, key: Number(siteNumber) };
    });
  }, [inputSummary]);

  const handleGoToDetailPage = (resultId: string) => {
    if (isLoading) {
      return;
    }

    router.push(`/settings/saved-results/detail/?id=${resultId}`);
  };

  const handleGoToCalculator = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();

    if (type === "all-on-x") {
      router.push("/calculators/All-on-X Ordering Guide");
    } else if (type === "combined") {
      router.push("/calculators/Custom Combinations");
    }
  };

  const handleDelete = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={cx(
        `border-2 border-gray-400 px-2 py-3 text-center
      flex flex-column gap-4 align-items-center
      md:text-left md:px-3 md:py-5 md:flex-row`,
        { "cursor-pointer": !isLoading, "cursor-wait": isLoading }
      )}
      onClick={() => handleGoToDetailPage(id)}
    >
      {selectedSites.length !== 0 && (
        <div className="flex-shrink-0">
          <TeethSelector
            selectedSites={selectedSites}
            showLabel={false}
            variant={TeethSelectorVariant.SMALL}
          />
        </div>
      )}

      <div className="flex-1 flex flex-column gap-2">
        <div className="font-bold">Title:</div>
        <Button
          link
          label={
            savedResult.type === "all-on-x"
              ? "All-on-X Ordering Guide"
              : "Custom Combinations"
          }
          className="px-0 py-0 w-fit border-noround"
          onClick={handleGoToCalculator}
        />
        <div>{name}</div>
      </div>

      <div className="flex-shrink-0">
        <div className="font-bold">Saved Date:</div>
        <div>{formatDate(date)}</div>
      </div>

      <div className="flex-shrink-0">
        <Button
          icon="pi pi-trash"
          disabled={isLoading}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
