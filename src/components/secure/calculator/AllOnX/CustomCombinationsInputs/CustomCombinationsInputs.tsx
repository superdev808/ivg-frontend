import React from "react";
import { RadioButton } from "primereact/radiobutton";
import { RadioButtonOption, SITE_SPECIFIC_REPORT_OPTIONS } from "../constants";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface CustomCombinationsInputsParams {
  collections: string[];
  selectedCollections: string[];
  siteSpecificReport: string;
  onCollectionChange: (e: CheckboxChangeEvent) => void;
  onChangeSiteSpecificReport: (value: string) => void;
}

/**
 * Name : CustomCombinationsInputs.
 * Desc :  This component renders a form for selecting calculators and customizing a report.
 * @param {array} collections
 * @param {array} selectedCollections
 * @param {string} siteSpecificReport
 * @param {func} onCollectionChange
 * @param {func} onChangeSiteSpecificReport
 */
const CustomCombinationsInputs: React.FC<CustomCombinationsInputsParams> = ({
  collections,
  selectedCollections,
  onCollectionChange,
  siteSpecificReport,
  onChangeSiteSpecificReport,
}: CustomCombinationsInputsParams) => {
  return (
    <div className="border-top-1 surface-border mt-3 pb-4 pt-3">
      <div className="flex flex-column w-12 mb-3">
        <p>
          Select the calculators you would like to combine to create a custom
          report
        </p>
        <div className="flex flex-column gap-3">
          {collections.map((collection: string, index: number) => {
            return (
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
                <label htmlFor={collection} className="ml-2">
                  {collection}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-column w-12 mb-2">
        <p>Do you want to add make your custom report site specific?</p>
        <div className="flex flex-wrap gap-3">
          <>
            {SITE_SPECIFIC_REPORT_OPTIONS.map((option: RadioButtonOption) => (
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
          </>
        </div>
      </div>
    </div>
  );
};

export default CustomCombinationsInputs;
