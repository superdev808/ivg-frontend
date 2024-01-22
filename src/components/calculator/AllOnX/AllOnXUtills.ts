import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  InputOutputValues,
  MUA_OPTIONS,
  PROCEDURES,
} from "@/components/secure/calculator/AllOnX/constants";
import {
  InputAndResponse,
  PROCEDURE_INPUTS_AND_RESPONSE,
} from "./ProcedureInputsAndResponse";
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

export const getProcedureCollections = (procedure: PROCEDURES) => {
  switch (procedure) {
    case PROCEDURES.SURGERY:
      return Object.keys(PROCEDURE_INPUTS_AND_RESPONSE.SURGERY);
  }
  return [];
};

export const getProcedureInputsAndResponse = (
  procedure: PROCEDURES,
  additionalInputs: {
    [key: string]: string;
  },
  selectedCollections: string[]
) => {
  let inputs: any = [];
  let responseOrder: string[] = [];
  switch (procedure) {
    case PROCEDURES.SURGERY:
      selectedCollections.map((selectedCollection: string) => {
        PROCEDURE_INPUTS_AND_RESPONSE.SURGERY[selectedCollection].map(
          (input: InputOutputValues) => {
            const filteredInputs: [] = inputs.filter(
              (item: InputOutputValues) =>
                item.name === input.name &&
                item.calculator === input.calculator &&
                !input.isCommon
            );
            if (filteredInputs.length <= 0) {
              inputs = [...inputs, input];
            }
          }
        );
        responseOrder.push(selectedCollection);
      });
      // Object.keys(PROCEDURE_INPUTS_AND_RESPONSE.SURGERY).map((key: string) => {
      //   if (selectedCollections.includes(key)) {
      //     inputs = _.uniqBy(
      //       [...inputs, ...PROCEDURE_INPUTS_AND_RESPONSE.SURGERY[key]],
      //       "name"
      //     );
      //     responseOrder.push(key);
      //   }
      // });
      return { input: inputs, responseOrder };

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
