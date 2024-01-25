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

export interface CollectionsIO {
  [key: string]: InputOutputValues[];
}

export interface ProcedureInputsAndResponse {
  [key: string]: CollectionsIO;
}
export const PROCEDURE_INPUTS_AND_RESPONSE: ProcedureInputsAndResponse = {
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
        calculator: "Scanbodies",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "Scanbodies",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "Scanbodies",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "Scanbodies",
        isCommon: true,
      },
      {
        name: "Authentic or Generic",
        text: "Scanbody Authentic or Generic",
        calculator: "Scanbodies",
      },
      {
        name: "",
        text: "",
        calculator: "Scanbodies",
        outputFrom: "Scanbodies",
      },
    ],
    "Scanbody Driver": [
      {
        name: "Implant Brand",
        text: "Implant Brand",
        calculator: "ScanbodyDriversDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversDirectToImplants",
        isCommon: true,
      },
      {
        name: "Driver Length",
        text: "Scanbody Driver Length",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Angulation",
        text: "Impressing Copings Angulation",
        calculator: "ImpressingCopingsDirectToImplants",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Impressing Copings Engaging or Non-Engaging",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsDirectToImplants",
        isCommon: true,
      },
      {
        name: "Engaging or Non Engaging",
        text: "Temporary Copings Engaging or Non Engaging",
        calculator: "TemporaryCopingsDirectToImplants",
      },
      {
        name: "Abutment Angulation",
        text: "Temporary Copings Abutment Angulation",
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
        text: "Temporary Copings Collar Height",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesDirectToImplants",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesDirectToImplants",
        isCommon: true,
      },
      {
        name: "Engaging or Non-Engaging",
        text: "TiBases Engaging or Non-Engaging",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
        calculator: "TiBasesDirectToImplants",
      },
      {
        name: "Angulation",
        text: "TiBases Angulation",
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
        text: "TiBases Collar Height",
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
        text: "Implant Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Driver Length",
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
        text: "Implant Abutment Angulation",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Authentic or Generic",
        text: "Scanbody MUAs Authentic or Generic",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Driver Length",
        text: "Scanbody Drivers MUAs Driver Length",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
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
        text: "Impressing Copings MUAs Abutment Type",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Abutment Diameter",
        text: "Temporary Copings MUAs Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Temporary Copings MUAs Abutment Type",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesMUAs",
        isCommon: true,
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
        text: "TiBases MUAs Abutment Diameter",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Height",
        text: "TiBases MUAs Abutment Height",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Collar Height",
        text: "TiBases MUAs Collar Height",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "MUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "MUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "MUAs",
        isCommon: true,
      },
      {
        name: "Abutment Angulation",
        text: "MUAs Abutment Angulation",
        calculator: "MUAs",
      },
      {
        name: "Abutment Engaging Type",
        text: "Abutment Engaging Type",
        calculator: "MUAs",
      },
      {
        name: "Abutment Diameter",
        text: "MUAs Abutment Diameter",
        calculator: "MUAs",
      },
      {
        name: "Abutment Height",
        text: "MUAs Abutment Height",
        calculator: "MUAs",
      },
      {
        name: "Collar Height",
        text: "MUAs Collar Height",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "RestorativeMultiUnitAbutments",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "RestorativeMultiUnitAbutments",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "RestorativeMultiUnitAbutments",
        isCommon: true,
      },
      {
        name: "Machine or Manual",
        text: "Restorative MUAs Machine or Manual",
        calculator: "RestorativeMultiUnitAbutments",
      },
      {
        name: "Driver Length",
        text: "Restorative MUAs Driver Length",
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
        text: "Implant Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Driver Length",
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
        text: "Implant Abutment Angulation",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Machine or Manual",
        text: "Implant Machine or Manual",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyMUAs",
        isCommon: true,
      },
      {
        name: "Authentic or Generic",
        text: "Scanbody MUAs Authentic or Generic",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ScanbodyDriversMUAs",
        isCommon: true,
      },
      {
        name: "Driver Length",
        text: "Scanbody Drivers MUAs Driver Length",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "ImpressingCopingsMUAs",
        isCommon: true,
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
        text: "Impressing Copings MUAs Abutment Type",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TemporaryCopingsMUAs",
        isCommon: true,
      },
      {
        name: "Abutment Diameter",
        text: "Temporary Copings MUAs Abutment Diameter",
        calculator: "TemporaryCopingsMUAs",
      },
      {
        name: "Abutment Type",
        text: "Temporary Copings MUAs Abutment Type",
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
        isCommon: true,
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "TiBasesMUAs",
        isCommon: true,
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "TiBasesMUAs",
        isCommon: true,
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "TiBasesMUAs",
        isCommon: true,
      },
      {
        name: "Engaging or Non-Engaging",
        text: "TiBases MUAs Engaging or Non-Engaging",
        calculator: "TiBasesMUAs",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
        calculator: "TiBasesMUAs",
      },
      {
        name: "Abutment Diameter",
        text: "TiBases MUAs Abutment Diameter",
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
        text: "Implant Authentic or Generic",
        calculator: "RestroativeDirectToImplant",
      },
      {
        name: "Driver Length",
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
  },
};

export const CALCULATOR_NAME_COLLECTION_MAPPINGS: { [key: string]: string } = {
  "Drill Kits / Sequences": "DrillKitAndSequence",
  "Bone Reduction Instruments": "BoneReduction",
  "Implant Drivers": "RestroativeDirectToImplant",
  "Chairside Pick-Up Materials": "ChairSidePickUp",
  "Implants for Purchase": "Implants",
  "Master Scanbody": "Scanbodies",
  "Scanbody Driver": "ScanbodyDriversDirectToImplants",
  "Impression Copings": "ImpressingCopingsDirectToImplants",
  "Temporary Copings": "TemporaryCopingsDirectToImplants",
  "Ti Base": "TiBasesDirectToImplants",
  "Master MUA Scanbody": "ScanbodyMUAs",
  "MUA Scanbody Driver": "ScanbodyDriversMUAs",
  "MUA Impression Copings": "ImpressingCopingsMUAs",
  "MUA Temporary Copings": "TemporaryCopingsMUAs",
  "Ti Base (MUA)": "TiBasesMUAs",
  MUA: "MUAs",
  "MUA Driver": "RestorativeMultiUnitAbutments",
};
