import { InputOutputValues } from "@/components/secure/calculator/AllOnX/constants";

export enum PROCEDURE_COMBINATIONS {
  SURGERY = "SURGERY",
  RESTORATIVE_DIRECT_TO_IMPLANT = "RESTORATIVE_DIRECT_TO_IMPLANT",
  RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED = "RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED",
  RESTORATIVE_ON_MUAS_MUAS_PLACED = "RESTORATIVE_ON_MUAS_MUAS_PLACED",
}

export interface InputAndResponse {
  input: InputOutputValues[];
  responseOrder: string[];
}

export type ProcedureInputsAndResponse = {
  [key in PROCEDURE_COMBINATIONS]: InputAndResponse;
};

export const PROCEDURE_INPUTS_AND_RESPONSE: ProcedureInputsAndResponse = {
  [PROCEDURE_COMBINATIONS.SURGERY]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Select Drill Kit",
        text: "Select Drill Kit",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Will you perform bone reduction?",
        text: "Will you perform bone reduction?",
        calculator: "BoneReduction",
        outputFrom: "DrillKitAndSequence",
      },
      {
        name: "Authentic or Generic?",
        text: "Authentic or Generic?",
        calculator: "MasterImplantDriver",
        outputFrom: "BoneReduction",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Machine or Manual?",
        text: "Machine or Manual?",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Do you need to purchase materials for chairside pick-up?",
        text: "Do you need to purchase materials for chairside pick-up?",
        calculator: "ChairSidePickUp",
        outputFrom: "MasterImplantDriver",
      },
      {
        name: "Do you need to purchase an implant?",
        text: "Do you need to purchase an implant?",
        calculator: "ImplantPurchase",
        outputFrom: "ChairSidePickUp",
      },
      {
        name: "",
        text: "",
        calculator: "ImplantPurchase",
        outputFrom: "ImplantPurchase",
      },
    ],
    responseOrder: [
      "DrillKitAndSequence",
      "BoneReduction",
      "MasterImplantDriver",
      "ChairSidePickUp",
      "ImplantPurchase",
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "MasterScanbody_DirToImplant",
      },
      {
        name: "Implant System",
        text: "Implant System",
        calculator: "MasterScanbody_DirToImplant",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MasterScanbody_DirToImplant",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MasterScanbody_DirToImplant",
      },
      {
        name: "Authentic or Generic?",
        text: "Authentic or Generic?",
        calculator: "MasterScanbody_DirToImplant",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDrivers",
        outputFrom: "MasterScanbody_DirToImplant",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDrivers",
      },
      {
        name: "Select Impression Copings",
        text: "Select Impression Copings",
        calculator: "ImpressionCopings",
        outputFrom: "ScanbodyDrivers",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TemporaryCopings",
        outputFrom: "ImpressionCopings",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TiBases",
        outputFrom: "TemporaryCopings",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "ImplantDrivers",
        outputFrom: "TiBases",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "ImplantDrivers",
      },
      {
        name: "",
        text: "",
        calculator: "ImplantDrivers",
        outputFrom: "ImplantDrivers",
      },
    ],
    responseOrder: [],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {
    input: [],
    responseOrder: [],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    input: [],
    responseOrder: [],
  },
};
