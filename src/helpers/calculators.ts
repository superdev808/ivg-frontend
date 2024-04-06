import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import get from "lodash/get";
import trim from "lodash/trim";
import union from "lodash/union";
import uniqBy from "lodash/uniqBy";

import {
  CALCULATOR_NAME_COLLECTION_MAPPINGS,
  CALCULATOR_COLLECTIONS,
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MATERIAL_CALCULATOR_NAMES,
  MUA_OPTIONS,
  PROCEDURE_INPUTS_AND_RESPONSE,
  QUANTITY_MULTIPLES_LIST,
} from "@/constants/calculators";
import {
  CalculatorInfoMap,
  CollectionsIO,
  InputAndResponse,
  InputDetail,
  InputOutputValues,
  ItemData,
  ItemInsights,
  KeyValuePair,
  PROCEDURE,
  Patient,
  SiteData,
} from "@/types/calculators";

export const isValidUrl = (urlString = "") => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return Boolean(urlPattern.test(urlString.trim()));
};

const getRestorativeCollections = (
  additionalInputs: KeyValuePair
): string[] => {
  // Restorative (Direct to Implant)
  if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
    DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_DIRECT_TO_IMPLANT;
  }
  // Restorative (On MUAs, MUAs Not Placed)
  if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
      DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value &&
    additionalInputs[MUA_OPTIONS[0].name] === MUA_OPTIONS[1].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED;
  }
  // Restorative (On MUAs, MUAs Placed)
  if (
    additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
      DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value &&
    additionalInputs[MUA_OPTIONS[0].name] === MUA_OPTIONS[0].value
  ) {
    return PROCEDURE_INPUTS_AND_RESPONSE.RESTORATIVE_ON_MUAS_MUAS_PLACED;
  }
  // No match found
  return [];
};

export const getProcedureCollections = (
  calcInfoMap: CalculatorInfoMap,
  procedure: PROCEDURE,
  additionalInputs: KeyValuePair,
  isCustom: boolean
) => {
  let collections: string[] = [];

  if (!isCustom) {
    switch (procedure) {
      case PROCEDURE.SURGERY:
        collections = PROCEDURE_INPUTS_AND_RESPONSE.SURGERY;
        break;

      case PROCEDURE.RESTORATIVE:
        collections = getRestorativeCollections(additionalInputs);
        break;

      case PROCEDURE.SURGERY_AND_RESTORATIVE:
        collections = union([
          ...PROCEDURE_INPUTS_AND_RESPONSE.SURGERY,
          ...getRestorativeCollections(additionalInputs),
        ]);
        break;

      default:
        break;
    }
  } else {
    collections = Object.keys(calcInfoMap);
  }

  return collections.sort();
};

export const getProcedureInputsAndResponse = (
  calcInfoMap: CalculatorInfoMap,
  selectedCollections: string[]
): InputAndResponse => {
  let inputs: InputOutputValues[] = [];
  let responseOrder: string[] = [];

  selectedCollections.map((selectedCollection: string) => {
    calcInfoMap[selectedCollection].input.map((input) => {
      const filteredInputs: InputOutputValues[] = inputs.filter(
        (item: InputOutputValues) =>
          item.colName && item.colName === input.colName
      );
      if (
        filteredInputs.length <= 0 ||
        (filteredInputs.length && !filteredInputs[0].isCommon)
      )
        inputs = [...inputs, input];
    });
    responseOrder.push(selectedCollection);
  });

  return { input: inputs, responseOrder };
};

export const getComponentSummary = (
  sitesData: SiteData,
  responseOrder: string[]
) => {
  const items: ItemData[] = [];

  const brand =
    find(
      get(Object.values(sitesData), "0.inputDetails"),
      (item: InputDetail) => item.question === "Implant Brand"
    )?.answer || "";

  Object.keys(sitesData).forEach((siteName) => {
    const componentDetail = cloneDeep(sitesData[siteName].componentDetails);

    responseOrder.forEach((calculatorName) => {
      if (MATERIAL_CALCULATOR_NAMES.includes(calculatorName)) {
        componentDetail[
          CALCULATOR_NAME_COLLECTION_MAPPINGS[calculatorName]
        ]?.forEach((response) => {
          items.push(response);
        });

        return;
      }

      componentDetail[
        CALCULATOR_NAME_COLLECTION_MAPPINGS[calculatorName]
      ]?.forEach((response) => {
        const itemIndex = findIndex(
          items,
          (item) => item.label === response.label
        );

        if (itemIndex > -1) {
          items[itemIndex].info.forEach((info, i) => {
            const indexOfInfo = response.info.findIndex(
              (res) => info.itemName === res.itemName && info.link === res.link
            );

            if (indexOfInfo > -1) {
              if (
                QUANTITY_MULTIPLES_LIST.includes(
                  response.label.toLowerCase()
                ) &&
                items[itemIndex].info[i].quantity
              ) {
                items[itemIndex].info[i].quantity =
                  (items[itemIndex].info[i].quantity as number) + 1;
              }
            } else {
              items[itemIndex].info = uniqBy(
                [...items[itemIndex].info, ...response.info],
                "itemName"
              );
            }
          });

          if (items[itemIndex].info.length !== response.info.length) {
            items[itemIndex].info = uniqBy(
              [...items[itemIndex].info, ...response.info],
              "itemName"
            );
          }
        } else {
          items.push(response);
        }
      });
    });
  });

  const summaryData = items.flatMap((category: ItemData) =>
    category.info.map((item) => ({
      description: category.label,
      ...item,
      brand,
    }))
  );

  return summaryData;
};

export const getResultName = (calculatorType: string, items: ItemData[]) => {
  let key = "Item Name";

  if (calculatorType === "BoneReduction") {
    key = "Bur Kit Name (Bone Reduction)";
  } else if (calculatorType === "ChairSidePickUp") {
    key = "Luting Agent Name";
  } else if (calculatorType === "DrillKitAndSequence") {
    key = "Drill Kit Name";
  }

  const item = find(items, { label: key });

  return get(item, ["info", 0, "itemName"]) || "";
};

export const prepareExportProps = (
  calculatorType: string,
  calculatorName: string,
  patientInfo: Patient,
  quiz: InputDetail[],
  items: ItemData[]
) => {
  const componentDetails = {
    [calculatorType]: items,
  };

  const sitesData = {
    "Site 1": {
      inputDetails: quiz,
      componentDetails,
    },
  };

  const componentSummary = getComponentSummary(sitesData, [calculatorName]);

  return {
    inputSummary: [{ name: "Site 1", inputDetails: quiz, componentDetails }],
    componentSummary,
    calculatorName,
    patientInfo,
    showTeethSelection: false,
    hideSite: true,
    totalQuantities: [],
  };
};

export const serializeColInfo = (colInfo: InputOutputValues) => {
  return `${colInfo.groupText || "EMPTY"}___${colInfo.colName}___${
    colInfo.groupId
  }`;
};

export const deserializeColInfo = (serializedColInfo: string) => {
  const [groupText, colName, groupId] = serializedColInfo.split("___");
  return {
    groupText: groupText == "EMPTY" ? "" : groupText,
    colName,
    groupId,
  };
};

export const parseItems = (
  item: Record<string, string>,
  outputCalcInfo: InputOutputValues[]
): ItemData[] => {
  const findColumnFromColIndex = (colIndex: string) =>
    outputCalcInfo.find((item) => item.colIndex == colIndex);

  let resultInfo: ItemData[] = [],
    i,
    j;
  let columnInfos = Object.keys(item)
    .map((colIndex) => findColumnFromColIndex(colIndex))
    .sort((left, right) => {
      let leftGroupId = left?.groupId || "",
        rightGroupId = right?.groupId || "";
      return leftGroupId == rightGroupId
        ? 0
        : leftGroupId < rightGroupId
        ? -1
        : 1;
    }) as InputOutputValues[];
  for (i = 0; i < columnInfos.length; i = j) {
    let newItem: ItemData = {
      label: columnInfos[i].groupName,
      info: [],
    };
    let newInfo: ItemInsights = { id: columnInfos[i].groupId, quantity: 1 };

    for (
      j = i;
      j < columnInfos.length &&
      columnInfos[i].groupId == columnInfos[j].groupId;
      ++j
    ) {
      let showText = serializeColInfo(columnInfos[j]);
      newInfo[showText] = item[columnInfos[j].colIndex];
    }
    newItem.info.push(newInfo);

    resultInfo.push(newItem);
  }
  return resultInfo;
};
