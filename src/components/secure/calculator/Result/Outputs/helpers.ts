import trim from "lodash/trim";
import values from "lodash/values";

type Output = {
  name?: string;
  link?: string;
  additionals?: Array<{
    name: string;
    value: string;
  }>;
};

export const getOutputs = (
  calculatorType: string,
  itemName: string,
  purchaseLink: string,
  details: Record<string, string>
): Output[] => {
  if (calculatorType === "BoneReduction") {
    return [
      {
        name: trim(details["Bur Kit Name (Bone Reduction)"]),
        link: trim(details["Bur Kit (Bone Reduction) Link to Purchase"]),
        additionals: [
          { name: "Item Number", value: trim(details["Item Number"]) },
        ],
      },
      {
        name: trim(details["Bur Kit (Denture Conversion) Name"]),
        link: trim(details["Bur Kit (Denture Conversion) Link to Purchase"]),
      },
    ];
  }

  if (calculatorType === "ChairSidePickUp") {
    return [
      {
        name: trim(details["Luting Agent Name"]),
        link: trim(details["Luting Agent Link to Purchase"]),
      },
      {
        name: trim(details["Teflon Tape"]),
        link: trim(details["Teflon Tape Link to Purchase"]),
      },
      {
        name: trim(details["Material to Close Screw Access Hole Name"]),
        link: trim(
          details["Material to Close Screw Access Hole Link to Purchase"]
        ),
      },
    ];
  }

  if (calculatorType === "DrillKitAndSequence") {
    const res: Output[] = [
      {
        name: trim(details["Drill Kit Name"]),
        link: trim(details["Drill Kit Link to Purchase"]),
        additionals: [
          {
            name: "Item Number",
            value: trim(details["Drill Kit Item Number"]),
          },
        ],
      },
    ];

    // const convertedDrillsArray = [];

    const arr = ["(Extra Short)", "(Short)", "(Standard / Medium)", "(Long)"];

    for (let i = 1; i < 20; i++) {
      arr.forEach((size) => {
        const itemKey = `Drill ${i} ${size}`;
        const linkKey = `${itemKey} Link to Purchase`;
        const itemNumberKey = `${itemKey} Item Number`;
        const manfacturerKey = `${itemKey} Manufacturer Recommendations`;

        const link = trim(details[linkKey]) || "";
        const itemNumber = details[itemNumberKey] || "";
        const recommendations = trim(details[manfacturerKey]) || "";

        const additionals = [];

        if (itemNumber) {
          additionals.push({ name: "Item Number", value: itemNumber });
        }

        if (recommendations) {
          additionals.push({
            name: "Manufacturer Recommendations",
            value: recommendations,
          });
        }

        if (itemNumber) {
          res.push({
            name: itemKey,
            link,
            additionals,
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
        name: trim(itemName),
        link: trim(purchaseLink),
        additionals: [
          { name: "Item Number", value: trim(details["Item Number"]) },
        ],
      },
    ];
  }

  if (calculatorType === "Scanbodies") {
    return [
      {
        name: trim(itemName),
        link: trim(purchaseLink),
        additionals: [
          { name: "Item Number", value: trim(details["Scanbody Item Number"]) },
          { name: "Manufacturer", value: trim(details["Manufacturer"]) },
        ],
      },
    ];
  }

  if (calculatorType === "ScanbodyMUAs") {
    return [
      {
        name: trim(itemName),
        link: trim(purchaseLink),
        additionals: [
          { name: "Item Number", value: trim(details["Item Number"]) },
          {
            name: "Manufacturer Name",
            value: trim(details["Manufacturer Name"]),
          },
        ],
      },
    ];
  }

  return [];
};

export const getItemName = (
  calculatorType: string,
  details: Record<string, string>
) => {
  let name;

  if (calculatorType === "BoneReduction") {
    name = details["Bur Kit Name (Bone Reduction)"];
  } else if (calculatorType === "ChairSidePickUp") {
    name = details["Luting Agent Name"];
  } else if (calculatorType === "DrillKitAndSequence") {
    name = details["Drill Kit Name"];
  }

  return trim(name || details["Item Name"]);
};
