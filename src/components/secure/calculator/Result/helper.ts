import { Patient } from "@/types/PublicTypes";
import { ItemData } from "../AllOnX/constants";

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

const AVAILALBE_LABELS: Record<string, string[]> = {
  BoneReduction: [OUTPUT_LABELS.BUR_KIT, OUTPUT_LABELS.SURGICAL_BUR_KIT],
  ChairSidePickUp: [
    OUTPUT_LABELS.LUTING_AGENT,
    OUTPUT_LABELS.TEFLON_TAPE,
    OUTPUT_LABELS.MATERIAL_CLOSE_ACCESS_HOLE,
  ],
};

const getComponentDetails = (
  calculatorType: string,
  calculatorName: string,
  brand: string,
  itemInfo: Record<string, string>
) => {
  const details: ItemData[] = [];

  const item = {
    itemName: itemInfo["Item Name"],
    itemNumber: itemInfo["Item Number"],
    link: itemInfo["Link to Purchase"],
    manufacturer: "",
    quantity: 1,
    brand,
  };

  if (AVAILALBE_LABELS[calculatorType]) {
    AVAILALBE_LABELS[calculatorType].forEach((label: string) => {
      if (Object.keys(itemInfo).includes(label)) {
        details.push({
          label,
          info: [{ ...item, itemName: itemInfo[label] }],
        });
      }
    });
  } else if (calculatorType === "DrillKitAndSequence") {
    details.push({
      label: OUTPUT_LABELS.IMPLANT_DRILL_KIT,
      info: [
        {
          ...item,
          itemNumber: itemInfo["Drill Kit Item Number"],
          itemName: itemInfo["Drill Kit Name"],
          link: itemInfo["Drill Kit Link to Purchase"],
        },
      ],
    });
  } else if (
    calculatorType === "Scanbodies" ||
    calculatorType === "ScanbodyMUAs"
  ) {
    details.push({
      label: OUTPUT_LABELS.SCANBODIES,
      info: [
        {
          ...item,
          itemNumber: itemInfo["Scanbody Item Number"],
          manufacturer:
            itemInfo["Manufacturer"] || itemInfo["Manufacturer Name"],
        },
      ],
    });
  } else {
    details.push({
      label: calculatorName,
      info: [item],
    });
  }

  return details;
};

export const prepareExportProps = (
  calculatorType: string,
  calculatorName: string,
  patientInfo: Patient,
  quiz: Record<string, string>,
  itemInfo: Record<string, string>
) => {
  let brand = "";

  const inputDetails = Object.keys(quiz).reduce((acc, key) => {
    acc.push({ question: key, answer: quiz[key] });

    if (key === "Implant Brand") {
      brand = quiz[key];
    }

    return acc;
  }, [] as { question: string; answer: string }[]);

  const componentDetails = {
    [calculatorType]: getComponentDetails(
      calculatorType,
      calculatorName,
      brand,
      itemInfo
    ),
  };

  return {
    selectedSites: [{ name: "Site 1", key: 1 }],
    sitesData: {
      "Site 1": {
        inputDetails,
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
