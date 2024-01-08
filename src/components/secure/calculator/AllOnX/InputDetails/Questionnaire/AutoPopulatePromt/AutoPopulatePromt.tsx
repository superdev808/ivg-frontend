import React from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { AUTO_POPULATE_OPTIONS, RadioButtonOption } from "../../../constants";

interface AutoPopulatePromtParams {
  autoPopulate: string;
  onPopulateResponse: (e: RadioButtonChangeEvent) => void;
}

/**
 * Name : AutoPopulatePromt.
 * Desc : Renders a set of radio buttons with options for auto-populating answers.
 * @param {string} autoPopulate
 * @param {func} onPopulateResponse
 */
const AutoPopulatePromt: React.FC<AutoPopulatePromtParams> = ({
  autoPopulate,
  onPopulateResponse,
}: AutoPopulatePromtParams) => {
  return (
    <div className="flex flex-column w-12">
      <p>Auto-populate these answers for all other sites?</p>
      <div className="flex flex-wrap gap-3">
        <>
          {AUTO_POPULATE_OPTIONS.map((option: RadioButtonOption) => (
            <div className="flex align-items-center" key={option.id}>
              <RadioButton
                inputId={option.id}
                name={option.name}
                value={option.value}
                onChange={(e) => onPopulateResponse(e)}
                checked={autoPopulate === option.value}
              />
              <label htmlFor={option.id} className="ml-2">
                {option.value}
              </label>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default AutoPopulatePromt;
