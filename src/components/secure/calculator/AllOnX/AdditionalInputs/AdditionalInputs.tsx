import React from "react";
import { RadioButton } from "primereact/radiobutton";
import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MUA_OPTIONS,
  RadioButtonOption,
  KeyValuePair,
} from "../constants";

interface AdditionalInputsParams {
  additionalInputs: KeyValuePair;
  onInputChange: (value: string, target: string) => void;
}

/**
 * Name : AllOnXCalculator.
 * Desc : Renders additional inputs for a dental implant procedure.
 * @param {object} additionalInputs
 * @param {func} onInputChange
 */
const AdditionalInputs: React.FC<AdditionalInputsParams> = ({
  additionalInputs,
  onInputChange,
}: AdditionalInputsParams) => {
  return (
    <div className="border-top-1 surface-border mt-3 pb-4 pt-3">
      <div className="flex flex-column w-12 surface-border mb-2">
        <p>
          Are you restoring with multi-unit abutments (MUAs) or directly to the
          implant?
        </p>
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
          <p>Are the multi-unit abutments already connected to the implants?</p>
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
    </div>
  );
};

export default AdditionalInputs;
