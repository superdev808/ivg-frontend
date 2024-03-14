import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import get from "lodash/get";
import trim from "lodash/trim";
import union from "lodash/union";
import uniqBy from "lodash/uniqBy";

import {
  CALCULATORS,
  CALCULATOR_NAME_COLLECTION_MAPPINGS,
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  QUANTITY_MULTIPLES_LIST,
  MUA_OPTIONS,
  PROCEDURE_INPUTS_AND_RESPONSE,
} from "@/constants/calculators";
import { getCalculatorName } from "@/helpers/util";
import {
  CollectionsIO,
  InputAndResponse,
  InputDetail,
  InputOutputValues,
  ItemData,
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

const getRestorativeCollections = (additionalInputs: KeyValuePair) => {
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
  return {};
};

export const getProcedureCollections = (
  procedure: PROCEDURE,
  additionalInputs: KeyValuePair,
  isCustom: boolean
) => {
  let collections: string[] = [];

  if (!isCustom) {
    switch (procedure) {
      case PROCEDURE.SURGERY:
        collections = Object.keys(PROCEDURE_INPUTS_AND_RESPONSE.SURGERY);
        break;

      case PROCEDURE.RESTORATIVE:
        const response: CollectionsIO =
          getRestorativeCollections(additionalInputs);
        collections = Object.keys(response);
        break;

      case PROCEDURE.SURGERY_AND_RESTORATIVE:
        const surgeryCollections: CollectionsIO =
          PROCEDURE_INPUTS_AND_RESPONSE.SURGERY;
        const restorativeCollections: CollectionsIO =
          getRestorativeCollections(additionalInputs);
        collections = union([
          ...Object.keys(surgeryCollections),
          ...Object.keys(restorativeCollections),
        ]);
        break;

      default:
        break;
    }
  } else {
    collections = Object.keys(CALCULATORS);
  }

  return collections.sort();
};

const prepareInputsAndResponse = (
  selectedCollections: string[],
  collections: CollectionsIO
) => {
  let inputs: InputOutputValues[] = [];
  let responseOrder: string[] = [];

  selectedCollections.map((selectedCollection: string) => {
    let isDisplayNameAssigned: boolean = false;
    collections[selectedCollection]?.map((input: InputOutputValues) => {
      const filteredInputs: InputOutputValues[] = inputs.filter(
        (item: InputOutputValues) => item.name && item.name === input.name
      );
      if (
        filteredInputs.length <= 0 ||
        (filteredInputs.length && !filteredInputs[0].isCommon)
      ) {
        if (!isDisplayNameAssigned) {
          input = { ...input, displayCalculatorName: selectedCollection };
          isDisplayNameAssigned = true;
        }
        inputs = [...inputs, input];
      }
    });
    responseOrder.push(selectedCollection);
  });

  return { input: inputs, responseOrder };
};

export const getProcedureInputsAndResponse = (
  procedure: PROCEDURE,
  additionalInputs: KeyValuePair,
  selectedCollections: string[],
  isCustom: boolean
) => {
  if (!isCustom) {
    switch (procedure) {
      case PROCEDURE.SURGERY:
        const surgeryResults: InputAndResponse = prepareInputsAndResponse(
          selectedCollections,
          PROCEDURE_INPUTS_AND_RESPONSE.SURGERY
        );
        return surgeryResults;

      case PROCEDURE.RESTORATIVE:
        const collections: CollectionsIO =
          getRestorativeCollections(additionalInputs);
        const restorativeResults: InputAndResponse = prepareInputsAndResponse(
          selectedCollections,
          collections
        );
        return restorativeResults;

      case PROCEDURE.SURGERY_AND_RESTORATIVE:
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
  }

  const customResults: InputAndResponse = prepareInputsAndResponse(
    selectedCollections,
    CALCULATORS
  );

  return customResults;
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
  patientInfo: Patient,
  quiz: InputDetail[],
  items: ItemData[]
) => {
  const calculatorName = getCalculatorName(calculatorType);

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

export const parseItems = (
  item: Record<string, string>,
  calculatorType: string
): ItemData[] => {
  if (calculatorType === "BoneReduction") {
    return [
      {
        label: "Bur Kit Name (Bone Reduction)",
        info: [
          {
            itemName: trim(item["Bur Kit Name (Bone Reduction)"]),
            itemNumber: trim(item["Item Number"]),
            link: trim(item["Bur Kit (Bone Reduction) Link to Purchase"]),
            quantity: 1,
            notes: trim(item["Notes"]),
          },
        ],
      },
      {
        label: "Bur Kit (Denture Conversion) Name",
        info: [
          {
            itemName: trim(item["Bur Kit (Denture Conversion) Name"]),
            link: trim(item["Bur Kit (Denture Conversion) Link to Purchase"]),
            quantity: 1,
            notes: trim(item["Notes_1"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "ChairSidePickUp") {
    return [
      {
        label: "Luting Agent Name",
        info: [
          {
            itemName: trim(item["Luting Agent Name"]),
            link: trim(item["Luting Agent Link to Purchase"]),
            quantity: 1,
            notes: trim(item["Notes"]),
          },
        ],
      },
      {
        label: "Teflon Tape",
        info: [
          {
            itemName: trim(item["Teflon Tape"]),
            link: trim(item["Teflon Tape Link to Purchase"]),
            quantity: 1,
            notes: trim(item["Notes_1"]),
          },
        ],
      },
      {
        label: "Material to Close Screw Access Hole Name",
        info: [
          {
            itemName: trim(item["Material to Close Screw Access Hole Name"]),
            link: trim(
              item["Material to Close Screw Access Hole Link to Purchase"]
            ),
            quantity: 1,
            notes: trim(item["Notes_2"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "DrillKitAndSequence") {
    const res: ItemData[] = [
      {
        label: "Implant Drill Kit Name",
        info: [
          {
            itemName: trim(item["Drill Kit Name"]),
            itemNumber: trim(item["Drill Kit Item Number"]),
            link: trim(item["Drill Kit Link to Purchase"]),
            quantity: 1,
          },
        ],
      },
    ];

    const arr = ["(Extra Short)", "(Short)", "(Standard / Medium)", "(Long)"];

    for (let i = 1; i < 20; i++) {
      arr.forEach((size) => {
        const itemKey = `Drill ${i} ${size}`;
        const linkKey = `${itemKey} Link to Purchase`;
        const itemNumberKey = `${itemKey} Item Number`;
        const manfacturerKey = `${itemKey} Manufacturer Recommendations`;

        const link = trim(item[linkKey]) || "";
        const itemNumber = item[itemNumberKey] || "";
        const recommendations = trim(item[manfacturerKey]) || "";

        if (itemNumber) {
          res.push({
            label: itemKey,
            info: [
              {
                itemName: itemKey,
                itemNumber,
                link,
                manufacturerRecommendations: recommendations,
                quantity: 1,
              },
            ],
          });
        }
      });
    }

    return res;
  }

  if (
    [
      "RestorativeDirectToImplant",
      "RestorativeMultiUnitAbutments",
      "HealingAbutments",
      "Implants",
      "ImplantScrews",
      "ImplantAnalogs",
      "ImpressingCopingsDirectToImplants",
      "ImpressingCopingsMUAs",
      "MUAs",
      "ScanbodyDriversDirectToImplants",
      "ScanbodyDriversMUAs",
      "StockAbutments",
      "TemporaryCopingsDirectToImplants",
      "TemporaryCopingsMUAs",
      "TiBasesDirectToImplants",
      "TiBasesMUAs",
    ].includes(calculatorType)
  ) {
    return [
      {
        label: getCalculatorName(calculatorType),
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Item Number"]),
            link: trim(item["Link to Purchase"]),
            quantity: 1,
            notes: trim(item["Notes"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "Scanbodies") {
    return [
      {
        label: "Master Scanbody",
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Scanbody Item Number"]),
            link: trim(item["Link to Purchase"]),
            manufacturer: trim(item["Manufacturer"]),
            quantity: 1,
            notes: trim(item["Notes"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "ScanbodyMUAs") {
    return [
      {
        label: "Master Scanbody",
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Item Number"]),
            link: trim(item["Link to Purchase"]),
            manufacturer: trim(item["Manufacturer Name"]),
            quantity: 1,
            notes: trim(item["Notes"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "ImplantTorquesGuide") {
    return [
      {
        label: "Implant Torque Guide",
        info: [
          {
            torqueValue: trim(item["Torque Value"]),
            notes: trim(item["Notes"]),
          },
        ],
      },
    ];
  }

  return [];
};

export const getQuizByCalculator = (
  quiz: InputDetail[],
  calculatorName: string
) => {
  const allQuestions = (CALCULATORS[calculatorName] || []).map(
    (elem) => elem.name
  );

  const filteredQuiz = quiz.filter((quiz) =>
    allQuestions.includes(quiz.question)
  );
  return filteredQuiz.map((quiz) => ({
    ...quiz,
    question: (quiz.question || "").split("[")[0],
  }));
};
