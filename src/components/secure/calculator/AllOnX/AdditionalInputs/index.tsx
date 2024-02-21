import { RadioButton } from "primereact/radiobutton";
import React from "react";

import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MUA_OPTIONS,
  RadioButtonOption,
  KeyValuePair,
} from "../constants";

interface AdditionalInputsParams {
  textDentalImplantProcedure: string;
  textMUAStatus: string;
  showMUAOptions: boolean;
  additionalInputs: KeyValuePair;
  onInputChange: (value: string, target: string) => void;
}

const AdditionalInputs: React.FC<AdditionalInputsParams> = ({
  textDentalImplantProcedure,
  textMUAStatus,
  showMUAOptions,
  additionalInputs,
  onInputChange,
}) => (
  <div className="border-top-1 surface-border mt-3 pb-4 pt-3">
    <div className="flex flex-column w-12 surface-border mb-2">
      <p>{textDentalImplantProcedure}</p>
      <div className="flex flex-wrap gap-3">
        {DENTAL_IMPLANT_PROCEDURE_OPTIONS.map((option: RadioButtonOption) => (
          <div className="flex align-items-center" key={option.id}>
            <RadioButton
              inputId={option.id}
              name={option.name}
              value={option.value}
              onChange={(e) => onInputChange(e.value, option.name)}
              checked={additionalInputs[option.name] === option.value}
            />
            <label htmlFor={option.id} className="ml-2">
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>

    {showMUAOptions && (
      <div className="flex flex-column w-12">
        <p>{textMUAStatus}</p>
        <div className="flex flex-wrap gap-3">
          {MUA_OPTIONS.map((option: RadioButtonOption) => (
            <div className="flex align-items-center" key={option.id}>
              <RadioButton
                inputId={option.id}
                name={option.name}
                value={option.value}
                onChange={(e) => onInputChange(e.value, option.name)}
                checked={additionalInputs[option.name] === option.value}
              />
              <label htmlFor={option.id} className="ml-2">
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default AdditionalInputs;
