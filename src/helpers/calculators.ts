import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import get from "lodash/get";
import union from "lodash/union";
import uniqBy from "lodash/uniqBy";

import {
  CALCULATOR_OUTPUT_MAPPING,
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  MATERIAL_CALCULATOR_TYPES,
  MUA_OPTIONS,
  POPUP_TEXTS,
  PROCEDURE_INPUTS_AND_RESPONSE,
  QUANTITY_MULTIPLES_LIST,
} from "@/constants/calculators";
import {
  ANSWER_TYPE,
  CalculatorInfoMap,
  EXPLORE_DATA,
  EXPLORE_DATA_ITEM,
  EXPLORE_DATA_SECTION,
  InputAndResponse,
  InputDetail,
  InputOutputValues,
  ItemData,
  ItemInsights,
  KeyValuePair,
  PROCEDURE,
  Patient,
  SiteData,
  Summary,
} from "@/types/calculators";
import _, { uniq } from "lodash";

export const isValidUrl = (urlString = "") => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
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
    collections = Object.keys(calcInfoMap).filter(
      (collection) => calcInfoMap[collection].isCustom
    );
  }

  return collections.sort();
};

export const getProcedureInputsAndResponse = (
  calcInfoMap: CalculatorInfoMap,
  selectedCollections: string[]
): InputAndResponse => {
  let selectedInputs = selectedCollections
    .map((selectedCollection: string) => [
      ...calcInfoMap[selectedCollection].input,
      {
        calculatorType: selectedCollection,
        colName: "",
        colText: "",
        colIndex: "",
        groupId: "",
        groupName: "",
        groupText: "",
        isCommon: false,
      },
    ])
    .flat();
  let resultInputs: InputOutputValues[] = [];
  let colNameCountMap: Record<string, number> = {};

  selectedInputs.forEach((input) => {
    if (input.colName == "") return;
    let prevValue = colNameCountMap[input.colName] || 0;
    colNameCountMap[input.colName] = (input.isCommon ? 0 : prevValue) + 1;
  });

  selectedInputs.forEach((input) => {
    if (input.colName == "") {
      resultInputs.push(input);
      return;
    }
    let newInput = { ...input };
    if (colNameCountMap[input.colName] > 1) {
      newInput.colName = `${input.colName} [${input.calculatorType}]`;
      resultInputs.push(newInput);
    } else if (colNameCountMap[input.colName] == 1) {
      resultInputs.push(newInput);
      colNameCountMap[input.colName] = 0;
    }
  });
  return { input: resultInputs, responseOrder: [...selectedCollections] };
};

export const getComponentSummary = (
  sitesData: SiteData,
  responseOrder: string[]
): Summary[] => {
  const items: ItemData[] = [];

  const inputs = get(Object.values(sitesData), "0.inputDetails");

  const brand =
    find(inputs, (item: InputDetail) => item.questionText === "Implant Brand")
      ?.answer || "";

  const manufacturer =
    find(inputs, (item: InputDetail) => item.questionText === "Manufacturer")
      ?.answer || "";

  Object.keys(sitesData).forEach((siteName) => {
    const componentDetail = cloneDeep(sitesData[siteName].componentDetails);

    responseOrder.forEach((calculatorType) => {
      componentDetail[calculatorType]?.forEach((response) => {
        response.info.forEach((info, index) => {
          const newInfo: ItemInsights = Object.assign(
            {
              id: info.id,
              quantity: info.quantity,
            },
            brand && { brand },
            manufacturer && { manufacturer }
          );

          Object.keys(info).forEach((key) => {
            const { colName, groupText } = deserializeColInfo(key);

            let i = 0;
            for (i = 0; i < CALCULATOR_OUTPUT_MAPPING.length; ++i)
              if (
                CALCULATOR_OUTPUT_MAPPING[i][1].test(groupText) ||
                CALCULATOR_OUTPUT_MAPPING[i][1].test(colName)
              ) {
                const outputKey =
                  CALCULATOR_OUTPUT_MAPPING[i][2] ||
                  CALCULATOR_OUTPUT_MAPPING[i][0];
                newInfo[outputKey] = info[key];

                break;
              }

            if (
              i === CALCULATOR_OUTPUT_MAPPING.length &&
              !["id", "quantity"].includes(key)
            ) {
              newInfo["itemName"] = info[key];
            }
          });

          response.info[index] = newInfo;
        });
      });
    });

    responseOrder.forEach((calculatorType) => {
      if (MATERIAL_CALCULATOR_TYPES.includes(calculatorType)) {
        componentDetail[calculatorType]?.forEach((response) => {
          items.push(response);
        });

        return;
      }

      componentDetail[calculatorType]?.forEach((response) => {
        const itemIndex = findIndex(items, (item) => item.id === response.id);

        if (itemIndex > -1) {
          items[itemIndex].info.forEach((info, i) => {
            const indexOfInfo = response.info.findIndex(
              (res) => info.id === res.id && info.link === res.link
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
                "id"
              );
            }
          });

          if (items[itemIndex].info.length !== response.info.length) {
            items[itemIndex].info = uniqBy(
              [...items[itemIndex].info, ...response.info],
              "id"
            );
          }
        } else {
          items.push(response);
        }
      });
    });
  });

  const summaryData = items.flatMap(
    (category: ItemData) => category.info as Summary[]
  );

  return summaryData;
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

  const componentSummary = getComponentSummary(sitesData, [calculatorType]);

  return {
    inputSummary: [{ name: "Site 1", inputDetails: quiz, componentDetails }],
    componentSummary,
    calculatorType,
    calculatorName,
    patientInfo,
    showTeethSelection: false,
    hideSite: true,
    totalQuantities: [],
  };
};

export const serializeColInfo = (
  colInfo: Pick<
    InputOutputValues,
    | "colName"
    | "groupText"
    | "groupId"
    | "calculatorType"
    | "groupName"
    | "colIndex"
  >
) => {
  return `${colInfo.groupText || "EMPTY"}___${colInfo.colIndex}___${
    colInfo.colName
  }___${colInfo.groupId}___${colInfo.groupName}___${colInfo.calculatorType}`;
};

export const deserializeColInfo = (serializedColInfo: string) => {
  const [groupText, colIndex, colName, groupId, groupName, calculatorType] =
    serializedColInfo.split("___");
  return {
    groupText: groupText == "EMPTY" ? "" : groupText,
    colIndex: parseInt(colIndex),
    colName,
    groupId,
    calculatorType,
    groupName,
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
      // let leftGroupId = left?.groupId || "",
      //   rightGroupId = right?.groupId || "";
      // return leftGroupId == rightGroupId
      //   ? 0
      //   : leftGroupId < rightGroupId
      //   ? -1
      //   : 1;
      // We asuume that the same groupping columns would be placed nearby each other
      return parseInt(left?.colIndex || "0") - parseInt(right?.colIndex || "0");
    }) as InputOutputValues[];
  for (i = 0; i < columnInfos.length; i = j) {
    let newItem: ItemData = {
      id: `${columnInfos[i].groupId} (${columnInfos[i].calculatorType})`,
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
      if (item[columnInfos[j].colIndex])
        newInfo[showText] = item[columnInfos[j].colIndex];
    }
    if (Object.keys(newInfo).length > 2) {
      newItem.info.push(newInfo);
      resultInfo.push(newItem);
    }
  }
  return resultInfo;
};

export const formatToExploreDataItems = (
  response: any[],
  keys: string[],
  prefix: string
): EXPLORE_DATA_ITEM[] => {
  const [firstKey, ...restKeys] = keys;
  return uniq(response.map((item) => item[firstKey]))
    .sort()
    .map((firstValue: string) => {
      let result: EXPLORE_DATA_ITEM = {
        name: firstValue,
      };
      if (restKeys.length == 0) {
        result.href = `${prefix}${encodeURIComponent(firstValue)}`;
        return result;
      }
      let inspectedItems = response.filter(
        (item) => item[firstKey] === firstValue
      );
      result.items = formatToExploreDataItems(
        inspectedItems,
        restKeys,
        `${prefix}${encodeURIComponent(firstValue)},`
      );
      return result;
    });
};

export const updateExploreAllData = (
  allData: EXPLORE_DATA[],
  itemName: string,
  data: EXPLORE_DATA_ITEM[]
) => {
  let finalData = _.cloneDeep(allData);
  for (let i = 0; i < finalData.length; ++i) {
    for (let j = 0; j < finalData[i].sections.length; ++j)
      if (finalData[i].sections[j].name == itemName)
        finalData[i].sections[j].items = data;
  }
  return finalData;
};

const getExploreDataItems = (
  data: EXPLORE_DATA_ITEM | EXPLORE_DATA_SECTION
): EXPLORE_DATA_ITEM[] => {
  return [
    data,
    ...(data.items ? _.flatMap(data.items, getExploreDataItems) : []),
  ];
};

export const hasChildrenCalculator = (
  item: EXPLORE_DATA_ITEM | EXPLORE_DATA_SECTION,
  calcInfoMap: CalculatorInfoMap
) => {
  if (!Array.isArray(item.items)) return false;
  const IS_DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE;
  if (IS_DEV_MODE) return item.items.length > 0;
  else {
    return (
      getExploreDataItems(item).filter(
        (calculatorItem) =>
          !Array.isArray(calculatorItem.items) &&
          Object.keys(calcInfoMap).filter(
            (calcType) =>
              new RegExp(`^/calculators/${calcType}(\\?.+)?$`).test(
                calculatorItem.href || ""
              ) && calcInfoMap[calcType].isProduction === true
          ).length > 0
      ).length > 0
    );
  }
};

export const isPopup = (key: string) => {
  if (key == "id" || key == "quantity" || key == "link") return null;
  const { groupText } = deserializeColInfo(key);
  return POPUP_TEXTS.filter((popupText) => groupText.startsWith(popupText))
    .length > 0;
};

export const isEmptyAnswer = (answer: ANSWER_TYPE) => Object.values(answer).filter(answer => answer).length == 0;