import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MUA_OPTIONS,
  PROCEDURES,
} from "@/components/secure/calculator/AllOnX/constants";
import { PROCEDURE_INPUTS_AND_RESPONSE } from "./ProcedureInputsAndResponse";
import _ from "lodash";

export const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const getRestorativeInputsAndResponse = (additionalInputs: {
  [key: string]: string;
}) => {
  // Restorative (Direct to Implant)
  if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
    DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_DIRECT_TO_IMPLANT;
  }
  // Restorative (On MUAs, MUAs Not Placed)
  else if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
      DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value &&
    additionalInputs[MUA_OPTIONS[0].name] === MUA_OPTIONS[1].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED;
  }
  // Restorative (On MUAs, MUAs Placed)
  else if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
      DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value &&
    additionalInputs[MUA_OPTIONS[0].name] === MUA_OPTIONS[0].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_ON_MUAS_MUAS_PLACED;
  }
  // No match found
  else {
    return {
      input: [],
      responseOrder: [],
    };
  }
};

export const getProcedureInputsAndResponse = (
  procedure: PROCEDURES,
  additionalInputs: {
    [key: string]: string;
  }
) => {
  switch (procedure) {
    case PROCEDURES.SURGERY:
      return PROCEDURE_INPUTS_AND_RESPONSE.SURGERY;

    case PROCEDURES.RESTORATIVE:
      const response = getRestorativeInputsAndResponse(additionalInputs);
      return response;

    case PROCEDURES.SURGERY_AND_RESTORATIVE:
      const resorativeInputs =
        getRestorativeInputsAndResponse(additionalInputs);
      const combineInputs = {
        input: _.uniqBy(
          [
            ...PROCEDURE_INPUTS_AND_RESPONSE.SURGERY.input,
            ...resorativeInputs.input,
          ],
          "name"
        ),
        responseOrder: _.uniqBy(
          [
            ...PROCEDURE_INPUTS_AND_RESPONSE.SURGERY.responseOrder,
            ...resorativeInputs.responseOrder,
          ],
          "name"
        ),
      };
      return combineInputs;

    default:
      return { input: [], responseOrder: [] };
  }
};
