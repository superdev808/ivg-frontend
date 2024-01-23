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
        name: "Implant Driver Length",
        text: "Implant Driver Length",
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
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "MasterScanbody",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversDirectToImplants",
        outputFrom: "MasterScanbody",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsDirectToImplants",
        outputFrom: "ScanbodyDriversDirectToImplants",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TemporaryCopingsDirectToImplants",
        outputFrom: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TiBasesDirectToImplants",
        outputFrom: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "TiBasesDirectToImplants",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
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
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversMUAs",
        outputFrom: "ScanbodyMUAs",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsMUAs",
        outputFrom: "ScanbodyDriversMUAs",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
        outputFrom: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Material",
        text: "Material",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Length",
        text: "Length",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Diameter",
        text: "Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Hexed or Non Hexed",
        text: "Hexed or Non Hexed",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "TiBasesMUAs",
        outputFrom: "TemporaryCopingsMUAs",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
        calculator: "MUAs",
        outputFrom: "TiBasesMUAs",
      },
      {
        name: "Abutment Engaging Type",
        text: "Abutment Engaging Type",
        calculator: "MUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "MUAs",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
        calculator: "MUAs",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "MUAs",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "RestorativeMultiUnitAbutments",
        outputFrom: "MUAs",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
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
    responseOrder: [
      "ScanbodyMUAs",
      "ScanbodyDriversMUAs",
      "ImpressingCopingsMUAs",
      "TemporaryCopingsMUAs",
      "TiBasesMUAs",
      "MUAs",
      "RestorativeMultiUnitAbutments",
      "RestroativeDirectToImplant",
    ],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "ScanbodyMUAs",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversMUAs",
        outputFrom: "ScanbodyMUAs",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsMUAs",
        outputFrom: "ScanbodyDriversMUAs",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
        outputFrom: "ImpressingCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Material",
        text: "Material",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Length",
        text: "Length",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Diameter",
        text: "Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Hexed or Non Hexed",
        text: "Hexed or Non Hexed",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "TiBasesMUAs",
        outputFrom: "TemporaryCopingsMUAs",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "RestroativeDirectToImplant",
        outputFrom: "TiBasesMUAs",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Implant Driver Length",
        text: "Implant Driver Length",
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
    responseOrder: [
      "ScanbodyMUAs",
      "ScanbodyDriversMUAs",
      "ImpressingCopingsMUAs",
      "TemporaryCopingsMUAs",
      "TiBasesMUAs",
      "RestroativeDirectToImplant",
    ],
  },
};
