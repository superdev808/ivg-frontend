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
  calculatorName: string,
  itemName: string,
  purchaseLink: string,
  details: Record<string, string>
): Output[] => {
  if (calculatorName === "Bone Reduction Instruments") {
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

  if (calculatorName === "Chairside Pick-Up Materials") {
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

  if (calculatorName === "Drill Kits and Drill Sequences") {
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
    calculatorName === "Drivers (Restorative, Direct to Implant)" ||
    calculatorName === "Drivers (Restorative, on Multi-Unit Abutments)" ||
    calculatorName === "Healing Abutments" ||
    calculatorName === "Implants" ||
    calculatorName === "Implant Screws" ||
    calculatorName === "Implant Analogs" ||
    calculatorName === "Impression Copings (Direct to Implant)" ||
    calculatorName === "Impression Copings (Multi-Unit Abutments)" ||
    calculatorName === "Multi-Unit Abutments" ||
    calculatorName === "Scanbody Drivers (Direct to Implant)" ||
    calculatorName === "Scanbody Drivers (MUAs)" ||
    calculatorName === "Stock Abutments" ||
    calculatorName === "Temporary Copings (Direct to Implant)" ||
    calculatorName === "Temporary Copings (Multi-Unit Abutments)" ||
    calculatorName === "Ti Bases (Direct to Implant)" ||
    calculatorName === "Ti Bases (Multi-Unit Abutments)"
  ) {
    return [
      {
        name: itemName,
        link: purchaseLink,
        additionals: [{ name: "Item Number", value: details["Item Number"] }],
      },
    ];
  }

  if (calculatorName === "scanbody") {
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

  if (calculatorName === "Scanbodies (Mult-Unit Abutments)") {
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
