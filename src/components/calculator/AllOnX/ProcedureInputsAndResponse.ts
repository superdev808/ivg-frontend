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
        name: "Drill Kit Type",
        text: "Drill Kit Type",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Will you perform bone reduction?",
        text: "Will you perform bone reduction?",
        calculator: "BoneReduction",
        outputFrom: "DrillKitAndSequence",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
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
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "DrillKitAndSequence",
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
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDrivers",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
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
        name: "Implant Length",
        text: "Implant Length",
        calculator: "ImplantDrivers",
        outputFrom: "TiBases",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "ImplantDrivers",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "ImplantDrivers",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
        calculator: "ImplantDrivers",
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
    responseOrder: [
      "MasterScanbody_DirToImplant",
      "ScanbodyDrivers",
      "ImpressionCopings",
      "TemporaryCopings",
      "TiBases",
      "ImplantDrivers",
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant System",
        text: "Implant System",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "MUA Angle",
        text: "MUA Angle",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUA",
        outputFrom: "MasterMUAScanbody",
      },
      {
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDriversMUA",
      },
      {
        name: "Select Impression Copings",
        text: "Select Impression Copings",
        calculator: "ImpressionCopings",
        outputFrom: "ScanbodyDriversMUA",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TiBaseMUA",
        outputFrom: "ImpressionCopings",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "MUACalc",
        outputFrom: "TemporaryCopings",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "MUACalc",
        outputFrom: "TiBaseMUA",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "MUADriver",
      },
      {
        name: "Length",
        text: "Length",
        calculator: "MUADriver",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "MasterImplantDriver",
        outputFrom: "MUADriver",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "MasterImplantDriver",
      },
      {
        name: "",
        text: "",
        calculator: "MasterImplantDriver",
        outputFrom: "MasterImplantDriver",
      },
    ],
    responseOrder: [
      "MasterMUAScanbody",
      "ScanbodyDriverMUA",
      "ImpressionCopings",
      "TemporaryCopings",
      "TiBaseMUA",
      "MUACalc",
      "MUADriver",
      "MasterImplantDriver",
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant System",
        text: "Implant System",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "MUA Angle",
        text: "MUA Angle",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterMUAScanbody",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUA",
        outputFrom: "MasterMUAScanbody",
      },
      {
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDriversMUA",
      },
      {
        name: "Select Impression Copings",
        text: "Select Impression Copings",
        calculator: "ImpressionCopings",
        outputFrom: "ScanbodyDriversMUA",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TiBaseMUA",
        outputFrom: "ImpressionCopings",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "MasterImplantDriver",
        outputFrom: "TemporaryCopings",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterImplantDriver",
        outputFrom: "TiBaseMUA",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "MasterImplantDriver",
      },
      {
        name: "",
        text: "",
        calculator: "MasterImplantDriver",
        outputFrom: "MasterImplantDriver",
      },
    ],
    responseOrder: [
      "MasterMUAScanbody",
      "ScanbodyDriverMUA",
      "ImpressionCopings",
      "TemporaryCopings",
      "TiBaseMUA",
      "MasterImplantDriver",
    ],
  },
};
