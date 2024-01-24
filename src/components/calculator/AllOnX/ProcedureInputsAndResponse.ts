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

export const PROCEDURE_INPUTS_AND_RESPONSE: any = {
  [PROCEDURE_COMBINATIONS.SURGERY]: {
    "Drill Kits / Sequences": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "DrillKitAndSequence",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "DrillKitAndSequence",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "DrillKitAndSequence",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "DrillKitAndSequence",
        isCommon: true,
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "DrillKitAndSequence",
        isCommon: true,
      },
      {
        name: "Drill Kit Type",
        text: "Drill Kit Type",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "",
        text: "",
        calculator: "DrillKitAndSequence",
        outputFrom: "DrillKitAndSequence",
      },
    ],
    "Bone Reduction Instruments": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "BoneReduction",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "BoneReduction",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "BoneReduction",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "BoneReduction",
        isCommon: true,
      },
      {
        name: "Will you perform bone reduction?",
        text: "Will you perform bone reduction?",
        calculator: "BoneReduction",
      },
      {
        name: "",
        text: "",
        calculator: "BoneReduction",
        outputFrom: "BoneReduction",
      },
    ],
    "Implant Drivers": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "RestroativeDirectToImplant",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "RestroativeDirectToImplant",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "RestroativeDirectToImplant",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "RestroativeDirectToImplant",
        isCommon: true,
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "RestroativeDirectToImplant",
        isCommon: true,
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
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
        name: "",
        text: "",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "RestroativeDirectToImplant",
      },
    ],
    "Chairside Pick-Up Materials": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ChairSidePickUp",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ChairSidePickUp",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ChairSidePickUp",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ChairSidePickUp",
        isCommon: true,
      },
      {
        name: "Do you need to purchase materials for chairside pick-up?",
        text: "Do you need to purchase materials for chairside pick-up?",
        calculator: "ChairSidePickUp",
      },
      {
        name: "",
        text: "",
        calculator: "ChairSidePickUp",
        outputFrom: "ChairSidePickUp",
      },
    ],
    "Implants for Purchase": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "Implants",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "Implants",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "Implants",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "Implants",
        isCommon: true,
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "Implants",
        isCommon: true,
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "Implants",
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
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: {
    "Master Scanbody": [
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
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterScanbody",
      },
      {
        name: "",
        text: "",
        calculator: "MasterScanbody",
        outputFrom: "MasterScanbody",
      },
    ],
    "Scanbody Driver": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "",
        text: "",
        calculator: "ScanbodyDriversDirectToImplants",
        outputFrom: "ScanbodyDriversDirectToImplants",
      },
    ],
    "Impression Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "",
        text: "",
        calculator: "ImpressingCopingsDirectToImplants",
        outputFrom: "ImpressingCopingsDirectToImplants",
      },
    ],
    "Temporary Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsDirectToImplants",
      },
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {},
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
        calculator: "RestroativeDirectToImplant",
        outputFrom: "TemporaryCoping",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "TiBaseMUA",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "",
        text: "",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "RestroativeDirectToImplant",
      },
    ],
    responseOrder: [
      "MasterMUAScanbody",
      "ScanbodyDriverMUA",
      "ImpressionCoping",
      "TemporaryCoping",
      "TiBaseMUA",
      "RestroativeDirectToImplant",
    ],
  },
};
