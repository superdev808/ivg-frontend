import find from "lodash/find";
import get from "lodash/get";
import trim from "lodash/trim";

import { Patient } from "@/types/PublicTypes";

import { InputDetail } from "../AllOnX/constants";

export type ResultInfo = {
  itemName: string;
  itemNumber?: string;
  link?: string;
  quantity?: number;
  manufacturer?: string;
  manufacturerRecommendations?: string;
};

export type ResultItem = {
  label: string;
  info: ResultInfo[];
};

export type Output = {
  name?: string;
  link?: string;
  additionals?: Array<{
    name: string;
    value: string;
  }>;
};

export const getResultName = (calculatorType: string, items: ResultItem[]) => {
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

const OUTPUT_LABELS = {
  IMPLANT_DRILL_KIT: "Implant Drill Kit Name",
  DRILL_SEQUENCE: "Drill Sequence",
  BUR_KIT: "Bur Kit Name (Bone Reduction)",
  SURGICAL_BUR_KIT: "Bur Kit (Denture Conversion) Name",
  IMPLANT_DRIVER: "Master Implant Driver ",
  LUTING_AGENT: "Luting Agent",
  TEFLON_TAPE: "Teflon Tape",
  MATERIAL_CLOSE_ACCESS_HOLE: "Material to Close Screw Access Hole",
  IMPLANT: "Implant",
  SCANBODIES: "Master Scanbody",
};

export const prepareExportProps = (
  calculatorType: string,
  calculatorName: string,
  patientInfo: Patient,
  quiz: InputDetail[],
  items: ResultItem[]
) => {
  const brand =
    quiz.find(({ question }) => question === "Implant Brand")?.answer || "";

  const componentDetails = {
    [calculatorType]: items.map((item) => ({
      ...item,
      info: item.info.map((elem) => ({ ...elem, brand })),
    })),
  };

  return {
    selectedSites: [{ name: "Site 1", key: 1 }],
    sitesData: {
      "Site 1": {
        inputDetails: quiz,
        componentDetails,
      },
    },
    responseOrder: [calculatorName],
    calculatorName: calculatorName,
    patientInfo,
    showTeethSelection: false,
    hideSite: true,
    totalQuantities: [],
  };
};

export const parseItems = (
  item: Record<string, string>,
  calculatorType: string
): ResultItem[] => {
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
          },
        ],
      },
    ];
  }

  if (calculatorType === "DrillKitAndSequence") {
    const res: ResultItem[] = [
      {
        label: "Drill Kit Name",
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
      "RestroativeDirectToImplant",
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
        label: "Item Name",
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Item Number"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "Scanbodies") {
    return [
      {
        label: OUTPUT_LABELS.SCANBODIES,
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Scanbody Item Number"]),
            link: trim(item["Link to Purchase"]),
            manufacturer: trim(item["Manufacturer"]),
          },
        ],
      },
    ];
  }

  if (calculatorType === "ScanbodyMUAs") {
    return [
      {
        label: OUTPUT_LABELS.SCANBODIES,
        info: [
          {
            itemName: trim(item["Item Name"]),
            itemNumber: trim(item["Item Number"]),
            link: trim(item["Link to Purchase"]),
            manufacturer: trim(item["Manufacturer Name"]),
          },
        ],
      },
    ];
  }

  return [];
};
