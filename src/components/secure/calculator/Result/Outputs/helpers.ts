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
        name: details["Bur Kit Name (Bone Reduction)"],
        link: details["Bur Kit (Bone Reduction) Link to Purchase"],
        additionals: [{ name: "Item Number", value: details["Item Number"] }],
      },
      {
        name: details["Bur Kit (Denture Conversion) Name"],
        link: details["Bur Kit (Denture Conversion) Link to Purchase"],
      },
    ];
  }

  if (calculatorType === "ChairSidePickUp") {
    return [
      {
        name: details["Luting Agent Name"],
        link: details["Luting Agent Link to Purchase"],
      },
      {
        name: details["Teflon Tape"],
        link: details["Teflon Tape Link to Purchase"],
      },
      {
        name: details["Material to Close Screw Access Hole Name"],
        link: details["Material to Close Screw Access Hole Link to Purchase"],
      },
    ];
  }

  if (calculatorType === "DrillKitAndSequence") {
    const res: Output[] = [
      {
        name: details["Drill Kit Name"],
        link: details["Drill Kit Link to Purchase"],
        additionals: [
          { name: "Item Number", value: details["Drill Kit Item Number"] },
        ],
      },
    ];

    const kitItemInfo: Record<string, Array<Record<string, string>>> = {};

    Object.keys(details).forEach((key) => {
      const regExp = new RegExp(/(Drill\s\d)\s\(.+\)\s(.+)/gm);
      const match = regExp.exec(key);

      if (!match) {
        return;
      }

      const drillName = match[1];
      const itemName = match[2] === "Name" ? drillName : match[2];

      if (!kitItemInfo[drillName]) {
        kitItemInfo[drillName] = [];
      }

      kitItemInfo[drillName].push({ name: itemName, value: details[key] });
    });

    values(kitItemInfo).forEach((itemInfo) => {
      const item: Record<string, string | Array<Record<string, string>>> = {};
      const link = itemInfo.find((elem) => elem.name === "Link to Purchase");

      if (link) {
        item["link"] = link.value;
      }

      const additionals = itemInfo.filter(
        (elem) => elem.name !== "Link to Purchase"
      );
      if (additionals.length > 0) {
        item["additionals"] = additionals;
      }

      res.push(item);
    });

    return res;
  }

  if (
    calculatorType === "RestroativeDirectToImplant" ||
    calculatorType === "RestorativeMultiUnitAbutments" ||
    calculatorType === "HealingAbutments" ||
    calculatorType === "Implants" ||
    calculatorType === "ImplantScrews" ||
    calculatorType === "ImplantAnalogs" ||
    calculatorType === "ImpressingCopingsDirectToImplants" ||
    calculatorType === "ImpressingCopingsMUAs" ||
    calculatorType === "MUAs" ||
    calculatorType === "ScanbodyDriversDirectToImplants" ||
    calculatorType === "ScanbodyDriversMUAs" ||
    calculatorType === "StockAbutments" ||
    calculatorType === "TemporaryCopingsDirectToImplants" ||
    calculatorType === "TemporaryCopingsMUAs" ||
    calculatorType === "TiBasesDirectToImplants" ||
    calculatorType === "TiBasesMUAs"
  ) {
    return [
      {
        name: itemName,
        link: purchaseLink,
        additionals: [{ name: "Item Number", value: details["Item Number"] }],
      },
    ];
  }

  if (calculatorType === "Scanbodies") {
    return [
      {
        name: itemName,
        link: purchaseLink,
        additionals: [
          { name: "Item Number", value: details["Scanbody Item Number"] },
          { name: "Manufacturer", value: details["Manufacturer"] },
        ],
      },
    ];
  }

  if (calculatorType === "ScanbodyMUAs") {
    return [
      {
        name: itemName,
        link: purchaseLink,
        additionals: [
          { name: "Item Number", value: details["Item Number"] },
          { name: "Manufacturer Name", value: details["Manufacturer Name"] },
        ],
      },
    ];
  }

  return [];
};
