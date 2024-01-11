import React from "react";
import { RadioButton } from "primereact/radiobutton";
import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MUA_OPTIONS,
  RadioButtonOption,
} from "../constants";

interface AdditionalInputsParams {
  additionalInputs: {
    [key: string]: string;
  };
  onInputChange: (value: string, target: string) => void;
}

const AdditionalInputs: React.FC<AdditionalInputsParams> = ({
  additionalInputs,
  onInputChange,
}: AdditionalInputsParams) => {
  return (
    <>
      <div className="flex flex-column w-12 border-top-1 surface-border">
        <p>Are you restoring direct to implant or on MUAs?</p>
        <div className="flex flex-wrap gap-3">
          <>
            {DENTAL_IMPLANT_PROCEDURE_OPTIONS.map(
              (option: RadioButtonOption) => (
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
              )
            )}
          </>
        </div>
      </div>
      {additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
        DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value && (
        <div className="flex flex-column w-12">
          <p>Are the abutments already placed?</p>
          <div className="flex flex-wrap gap-3">
            <>
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
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalInputs;
