import React from "react";
import { RadioButton } from "primereact/radiobutton";
import { AUTO_POPULATE_OPTIONS, RadioButtonOption } from "../../../constants";
import { Button } from "primereact/button";

interface AutoPopulatePromtParams {
  autoPopulate: string;
  showRefreshButton: boolean;
  onPopulateResponse: (value: string) => void;
}

/**
 * Name : AutoPopulatePromt.
 * Desc : Renders a set of radio buttons with options for auto-populating answers.
 * @param {string} autoPopulate
 * @param {bool} showRefreshButton
 * @param {func} onPopulateResponse
 */
const AutoPopulatePromt: React.FC<AutoPopulatePromtParams> = ({
  autoPopulate,
  showRefreshButton,
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
                onChange={(e) => onPopulateResponse(e.value)}
                checked={autoPopulate === option.value}
              />
              <label htmlFor={option.id} className="ml-2">
                {option.value}
              </label>
            </div>
          ))}
          {showRefreshButton && (
            <Button
              label="Refresh"
              size="small"
              onClick={() => onPopulateResponse(AUTO_POPULATE_OPTIONS[0].value)}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default AutoPopulatePromt;
