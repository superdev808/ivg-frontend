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
      {
        name: "Engaging or Non Engaging",
        text: "Engaging or Non Engaging",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Restoration Material",
        text: "Restoration Material",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Temporary Coping Height",
        text: "Temporary Coping Height",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "",
        text: "",
        calculator: "TemporaryCopingsDirectToImplants",
        outputFrom: "TemporaryCopingsDirectToImplants",
      },
    ],
    "Ti Base": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Angulation",
        text: "Angulation",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "",
        text: "",
        calculator: "TiBasesDirectToImplants",
        outputFrom: "TiBasesDirectToImplants",
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
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {
    "Master MUA Scanbody": [
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
        name: "",
        text: "",
        calculator: "ScanbodyMUAs",
        outputFrom: "ScanbodyMUAs",
      },
    ],
    "MUA Scanbody Driver": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "",
        text: "",
        calculator: "ScanbodyDriversMUAs",
        outputFrom: "ScanbodyDriversMUAs",
      },
    ],
    "MUA Impression Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsMUAs",
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
        name: "",
        text: "",
        calculator: "ImpressingCopingsMUAs",
        outputFrom: "ImpressingCopingsMUAs",
      },
    ],
    "MUA Temporary Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
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
        name: "",
        text: "",
        calculator: "TemporaryCopingsMUAs",
        outputFrom: "TemporaryCopingsMUAs",
      },
    ],
    "Ti Base (MUA)": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "TiBasesMUAs",
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
        name: "",
        text: "",
        calculator: "TiBasesMUAs",
        outputFrom: "TiBasesMUAs",
      },
    ],
    MUA: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "MUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "MUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MUAs",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
        calculator: "MUAs",
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
        name: "",
        text: "",
        calculator: "MUAs",
        outputFrom: "MUAs",
      },
    ],
    "MUA Driver": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "",
        text: "",
        calculator: "RestorativeMultiUnitAbutments",
        outputFrom: "RestorativeMultiUnitAbutments",
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
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    "Master MUA Scanbody": [
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
        name: "",
        text: "",
        calculator: "ScanbodyMUAs",
        outputFrom: "ScanbodyMUAs",
      },
    ],
    "MUA Scanbody Driver": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "ScanbodyDriversMUAs",
      },
      {
        name: "",
        text: "",
        calculator: "ScanbodyDriversMUAs",
        outputFrom: "ScanbodyDriversMUAs",
      },
    ],
    "MUA Impression Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsMUAs",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsMUAs",
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
        name: "",
        text: "",
        calculator: "ImpressingCopingsMUAs",
        outputFrom: "ImpressingCopingsMUAs",
      },
    ],
    "MUA Temporary Copings": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
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
        name: "",
        text: "",
        calculator: "TemporaryCopingsMUAs",
        outputFrom: "TemporaryCopingsMUAs",
      },
    ],
    "Ti Base (MUA)": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
        calculator: "TiBasesMUAs",
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
        name: "",
        text: "",
        calculator: "TiBasesMUAs",
        outputFrom: "TiBasesMUAs",
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
  },
};
