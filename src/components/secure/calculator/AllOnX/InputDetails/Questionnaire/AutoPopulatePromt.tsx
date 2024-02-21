import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import React from "react";

import { AUTO_POPULATE_OPTIONS, RadioButtonOption } from "../../constants";

interface AutoPopulatePromtParams {
  autoPopulate: string;
  showRefreshButton: boolean;
  onPopulateResponse: (value: string) => void;
}

const AutoPopulatePromt: React.FC<AutoPopulatePromtParams> = ({
  autoPopulate,
  showRefreshButton,
  onPopulateResponse,
}) => (
  <div className="flex flex-column w-12">
    <p>Auto-populate these answers for all other sites?</p>
    <div className="flex flex-wrap gap-3">
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
    </div>
  </div>
);

export default AutoPopulatePromt;
