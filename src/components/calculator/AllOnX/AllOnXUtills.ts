import {
  PROCEDURES,
  responseOrder,
} from "@/components/secure/calculator/AllOnX/constants";

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

export const getResponseOrder = (procedure: PROCEDURES) => {
  let order: string[] = [];
  switch (procedure) {
    case PROCEDURES.SURGERY:
      order = responseOrder;
      break;

    default:
      break;
  }
  return order;
};
