import { PROCEDURES } from "@/components/secure/calculator/AllOnX/constants";
import { PROCEDURE_INPUTS_AND_RESPONSE } from "./ProcedureInputsAndResponse";

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

export const getProcedureInputsAndResponse = (procedure: PROCEDURES) => {
  switch (procedure) {
    case PROCEDURES.SURGERY:
      return PROCEDURE_INPUTS_AND_RESPONSE.SURGERY;

    case PROCEDURES.RESTORATIVE:
      return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_DIRECT_TO_IMPLANT;

    default:
      return { input: [], responseOrder: [] };
  }
};
