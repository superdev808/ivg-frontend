import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  InputOutputValues,
  MUA_OPTIONS,
  PROCEDURES,
  KeyValuePair,
} from "@/components/secure/calculator/AllOnX/constants";
import {
  CollectionsIO,
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

const getRestorativeCollections = (additionalInputs: KeyValuePair) => {
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
    return {};
  }
};

export const getProcedureCollections = (
  procedure: PROCEDURES,
  additionalInputs: KeyValuePair
) => {
  switch (procedure) {
    case PROCEDURES.SURGERY:
      return Object.keys(PROCEDURE_INPUTS_AND_RESPONSE.SURGERY);

    case PROCEDURES.RESTORATIVE:
      const response: CollectionsIO =
        getRestorativeCollections(additionalInputs);
      return Object.keys(response);

    case PROCEDURES.SURGERY_AND_RESTORATIVE:
      const surgeryCollections: CollectionsIO =
        PROCEDURE_INPUTS_AND_RESPONSE.SURGERY;
      const restorativeCollections: CollectionsIO =
        getRestorativeCollections(additionalInputs);
      return _.union([
        ...Object.keys(surgeryCollections),
        ...Object.keys(restorativeCollections),
      ]);

    default:
      return [];
  }
};

const prepareInputsAndResponse = (
  selectedCollections: string[],
  collections: CollectionsIO
) => {
  let inputs: InputOutputValues[] = [];
  let responseOrder: string[] = [];
  selectedCollections.map((selectedCollection: string) => {
    collections[selectedCollection]?.map((input: InputOutputValues) => {
      const filteredInputs: InputOutputValues[] = inputs.filter(
        (item: InputOutputValues) => item.name && item.name === input.name
      );
      if (
        filteredInputs.length <= 0 ||
        (filteredInputs.length && !filteredInputs[0].isCommon)
      ) {
        inputs = [...inputs, input];
      }
    });
    responseOrder.push(selectedCollection);
  });
  return { input: inputs, responseOrder };
};

export const getProcedureInputsAndResponse = (
  procedure: PROCEDURES,
  additionalInputs: KeyValuePair,
  selectedCollections: string[]
) => {
  switch (procedure) {
    case PROCEDURES.SURGERY:
      const surgeryResults: InputAndResponse = prepareInputsAndResponse(
        selectedCollections,
        PROCEDURE_INPUTS_AND_RESPONSE.SURGERY
      );
      return surgeryResults;

    case PROCEDURES.RESTORATIVE:
      const collections: CollectionsIO =
        getRestorativeCollections(additionalInputs);
      const restorativeResults: InputAndResponse = prepareInputsAndResponse(
        selectedCollections,
        collections
      );
      return restorativeResults;

    case PROCEDURES.SURGERY_AND_RESTORATIVE:
      const restorativeCollections: CollectionsIO =
        getRestorativeCollections(additionalInputs);
      const combineCollections: CollectionsIO = {
        ...PROCEDURE_INPUTS_AND_RESPONSE.SURGERY,
        ...restorativeCollections,
      };
      const combineProcedureResults: InputAndResponse =
        prepareInputsAndResponse(selectedCollections, combineCollections);
      return combineProcedureResults;

    default:
      return { input: [], responseOrder: [] };
  }
};
