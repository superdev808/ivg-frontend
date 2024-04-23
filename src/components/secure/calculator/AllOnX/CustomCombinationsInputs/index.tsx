import classNames from "classnames/bind";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import React from "react";

import { SITE_SPECIFIC_REPORT_OPTIONS } from "@/constants/calculators";

import styles from "./styles.module.scss";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

const cx = classNames.bind(styles);

interface CustomCombinationsInputsParams {
  collections: string[];
  selectedCollections: string[];
  siteSpecificReport: string;
  onCollectionChange: (e: CheckboxChangeEvent) => void;
  onChangeSiteSpecificReport: (value: string) => void;
}

const CustomCombinationsInputs: React.FC<CustomCombinationsInputsParams> = ({
  collections,
  selectedCollections,
  siteSpecificReport,
  onCollectionChange,
  onChangeSiteSpecificReport,
}) => {
  const { calcInfoMap } = useCalculatorsInfo();
  return (
  <div className="pb-4">
    <div className="flex flex-column w-12 mb-3">
      <h2 className="mt-0 mb-3 text-center">Custom Combinations</h2>

      <p>
        Select the calculators you would like to combine to create a custom
        report
      </p>

      <div className={cx("collectionsWrapper", "mt-3")}>
        {collections.map((collection, index) => (
          <div
            key={`${collection}-${index}`}
            className="flex align-items-center"
          >
            <Checkbox
              inputId={`${collection}-${index}`}
              name="collection"
              value={collection}
              onChange={onCollectionChange}
              checked={selectedCollections.includes(collection)}
            />
            <label htmlFor={`${collection}-${index}`} className="ml-2">
              {calcInfoMap[collection].label}
            </label>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-column w-12 mb-2">
      <p>Do you want to make your custom report site specific?</p>

      <div className="flex flex-wrap gap-3">
        {SITE_SPECIFIC_REPORT_OPTIONS.map((option) => (
          <div className="flex align-items-center" key={option.id}>
            <RadioButton
              inputId={option.id}
              name={option.name}
              value={option.value}
              onChange={(e) => onChangeSiteSpecificReport(e.value)}
              checked={siteSpecificReport === option.value}
            />
            <label htmlFor={option.id} className="ml-2">
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
)};

export default CustomCombinationsInputs;
