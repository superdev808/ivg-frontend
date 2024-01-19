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
        calculator: "RestroativeDirectToImplant",
        outputFrom: "BoneReduction",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "One Piece or Torque Attachment",
        text: "One Piece or Torque Attachment",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Driver Size",
        text: "Driver Size",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Do you need to purchase materials for chairside pick-up?",
        text: "Do you need to purchase materials for chairside pick-up?",
        calculator: "ChairSidePickUp",
        outputFrom: "RestroativeDirectToImplant",
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "Implants",
        outputFrom: "ChairSidePickUp",
      },
      {
        name: "Do you need to purchase an implant?",
        text: "Do you need to purchase an implant?",
        calculator: "Implants",
      },
      {
        name: "",
        text: "",
        calculator: "Implants",
        outputFrom: "Implants",
      },
    ],
    responseOrder: [
      "DrillKitAndSequence",
      "BoneReduction",
      "RestroativeDirectToImplant",
      "ChairSidePickUp",
      "Implants",
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "MasterScanbody",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "MasterScanbody",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MasterScanbody",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MasterScanbody",
      },
      {
        name: "Authentic or Generic?",
        text: "Authentic or Generic?",
        calculator: "MasterScanbody",
      },
      {
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDriver",
        outputFrom: "MasterScanbody",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressionCoping",
        outputFrom: "ScanbodyDriver",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TemporaryCoping",
        outputFrom: "ImpressionCoping",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TIBase",
        outputFrom: "TemporaryCoping",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "MasterImplantDriver",
        outputFrom: "TIBase",
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
      "MasterScanbody",
      "ScanbodyDriver",
      "ImpressionCoping",
      "TemporaryCoping",
      "TIBase",
      "MasterImplantDriver",
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
        name: "Implant Model",
        text: "Implant Model",
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
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDriversMUA",
        outputFrom: "MasterMUAScanbody",
      },
      {
        name: "Select Impression Copings",
        text: "Select Impression Copings",
        calculator: "ImpressionCoping",
        outputFrom: "ScanbodyDriversMUA",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TiBaseMUA",
        outputFrom: "ImpressionCoping",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "MUACalc",
        outputFrom: "TemporaryCoping",
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
      "ImpressionCoping",
      "TemporaryCoping",
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
        name: "Implant Model",
        text: "Implant Model",
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
        name: "Scanbody Driver Length",
        text: "Scanbody Driver Length",
        calculator: "ScanbodyDriversMUA",
        outputFrom: "MasterMUAScanbody",
      },
      {
        name: "Select Impression Copings",
        text: "Select Impression Copings",
        calculator: "ImpressionCoping",
        outputFrom: "ScanbodyDriversMUA",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TiBaseMUA",
        outputFrom: "ImpressionCoping",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "MasterImplantDriver",
        outputFrom: "TemporaryCoping",
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
      "ImpressionCoping",
      "TemporaryCoping",
      "TiBaseMUA",
      "MasterImplantDriver",
    ],
  },
};
