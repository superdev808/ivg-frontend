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

export const CALCULATORS: CollectionsIO = {
  "Drill Kits and Drill Sequences": [
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
      text: "Drill Kit Implant Length",
      calculator: "DrillKitAndSequence",
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
  "Drivers (Restorative, Direct to Implant)": [
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
      text: "Drivers Implant Length",
      calculator: "RestroativeDirectToImplant",
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
  Implants: [
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
  "Scanbodies (Single Unit)": [
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
  "Scanbody Drivers (Direct to Implant)": [
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
  "Impression Copings (Direct to Implant)": [
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
  "Temporary Copings (Direct to Implant)": [
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
  "Ti Bases (Direct to Implant)": [
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
  "Scanbodies (Mult-Unit Abutments)": [
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
  "Scanbody Drivers (MUAs)": [
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
  "Impression Copings (Multi-Unit Abutments)": [
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
  "Temporary Copings (Multi-Unit Abutments)": [
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
  "Ti Bases (Multi-Unit Abutments)": [
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
  "Multi-Unit Abutments": [
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
  "Drivers (Restorative, on Multi-Unit Abutments)": [
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
  "Implant Analogs": [
    {
      name: "Implant Brand",
      text: "Implant Brand",
      calculator: "ImplantAnalogs",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "ImplantAnalogs",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "ImplantAnalogs",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "ImplantAnalogs",
      isCommon: true,
    },
    {
      name: "Authentic or Generic",
      text: "Implant Analogs Authentic or Generic",
      calculator: "ImplantAnalogs",
    },
    {
      name: "Digital or Lab Analog",
      text: "Digital or Lab Analog",
      calculator: "ImplantAnalogs",
    },
    {
      name: "Abutment Height",
      text: "Implant Analogs Abutment Height",
      calculator: "ImplantAnalogs",
    },
    {
      name: "",
      text: "",
      calculator: "ImplantAnalogs",
      outputFrom: "ImplantAnalogs",
    },
  ],
  "Implant Screws": [
    {
      name: "Implant Brand",
      text: "Implant Brand",
      calculator: "ImplantScrews",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "ImplantScrews",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "ImplantScrews",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "ImplantScrews",
      isCommon: true,
    },
    {
      name: "Authentic or Generic",
      text: "Implant Screws Authentic or Generic",
      calculator: "ImplantScrews",
    },
    {
      name: "Abutment Type",
      text: "Implant Screws Abutment Type",
      calculator: "ImplantScrews",
    },
    {
      name: "Design",
      text: "Implant Screws Design",
      calculator: "ImplantScrews",
    },
    {
      name: "Restoration Connection Type",
      text: "Restoration Connection Type",
      calculator: "ImplantScrews",
    },
    {
      name: "Restoration Type",
      text: "Restoration Type",
      calculator: "ImplantScrews",
    },
    {
      name: "Anterior or Posterior",
      text: "Anterior or Posterior",
      calculator: "ImplantScrews",
    },
    {
      name: "Screw Length",
      text: "Screw Length",
      calculator: "ImplantScrews",
    },
    {
      name: "Screw Material",
      text: "Screw Material",
      calculator: "ImplantScrews",
    },
    {
      name: "Abutment Angulation",
      text: "Implant Screws Abutment Angulation",
      calculator: "ImplantScrews",
    },
    {
      name: "Open or Closed Tray",
      text: "Implant Screws Open or Closed Tray",
      calculator: "ImplantScrews",
    },
    {
      name: "Collar Height",
      text: "Implant Screws Collar Height",
      calculator: "ImplantScrews",
    },
    {
      name: "Type of Head",
      text: "Type of Head",
      calculator: "ImplantScrews",
    },
    {
      name: "",
      text: "",
      calculator: "ImplantScrews",
      outputFrom: "ImplantScrews",
    },
  ],
  "Healing Abutments": [
    {
      name: "Implant Brand",
      text: "Implant Brand",
      calculator: "HealingAbutments",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "HealingAbutments",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "HealingAbutments",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "HealingAbutments",
      isCommon: true,
    },
    {
      name: "Authentic or Generic",
      text: "Healing Abutments Authentic or Generic",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Height",
      text: "Healing Abutments Abutment Height",
      calculator: "HealingAbutments",
    },
    {
      name: "Collar Height",
      text: "Healing Abutments Collar Height",
      calculator: "HealingAbutments",
    },
    {
      name: "Emergence Profile",
      text: "Emergence Profile",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Material",
      text: "Abutment Material",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Diameter",
      text: "Healing Abutments Abutment Diameter",
      calculator: "HealingAbutments",
    },
    {
      name: "",
      text: "",
      calculator: "HealingAbutments",
      outputFrom: "HealingAbutments",
    },
  ],
  "Stock Abutments": [
    {
      name: "Implant Brand",
      text: "Implant Brand",
      calculator: "StockAbutments",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "StockAbutments",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "StockAbutments",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "StockAbutments",
      isCommon: true,
    },
    {
      name: "Material",
      text: "Stock Abutments Material",
      calculator: "StockAbutments",
    },
    {
      name: "Impression Type",
      text: "Impression Type",
      calculator: "StockAbutments",
    },
    {
      name: "Fixation",
      text: "Fixation",
      calculator: "StockAbutments",
    },
    {
      name: "Restoration Type",
      text: "Stock Abutments Restoration Type",
      calculator: "StockAbutments",
    },
    {
      name: "Hexed or Non-Hexed",
      text: "Stock Abutments Hexed or Non-Hexed",
      calculator: "StockAbutments",
    },
    {
      name: "Angulation",
      text: "Stock Abutments Angulation",
      calculator: "StockAbutments",
    },
    {
      name: "Abutment Diameter",
      text: "Stock Abutments Abutment Diameter",
      calculator: "StockAbutments",
    },
    {
      name: "Collar Height",
      text: "Stock Abutments Collar Height",
      calculator: "StockAbutments",
    },
    {
      name: "Abutment Height",
      text: "Stock Abutments Abutment Height",
      calculator: "StockAbutments",
    },
    {
      name: "Emergence Profile",
      text: "Stock Abutments Emergence Profile",
      calculator: "StockAbutments",
    },
    {
      name: "",
      text: "",
      calculator: "StockAbutments",
      outputFrom: "StockAbutments",
    },
  ],
};

export const PROCEDURE_INPUTS_AND_RESPONSE: ProcedureInputsAndResponse = {
  [PROCEDURE_COMBINATIONS.SURGERY]: {
    "Drill Kits and Drill Sequences":
      CALCULATORS["Drill Kits and Drill Sequences"],
    "Bone Reduction Instruments": CALCULATORS["Bone Reduction Instruments"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATORS["Drivers (Restorative, Direct to Implant)"],
    "Chairside Pick-Up Materials": CALCULATORS["Chairside Pick-Up Materials"],
    Implants: CALCULATORS["Implants"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: {
    "Scanbodies (Single Unit)": CALCULATORS["Scanbodies (Single Unit)"],
    "Scanbody Drivers (Direct to Implant)":
      CALCULATORS["Scanbody Drivers (Direct to Implant)"],
    "Impression Copings (Direct to Implant)":
      CALCULATORS["Impression Copings (Direct to Implant)"],
    "Temporary Copings (Direct to Implant)":
      CALCULATORS["Temporary Copings (Direct to Implant)"],
    "Ti Bases (Direct to Implant)": CALCULATORS["Ti Bases (Direct to Implant)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATORS["Drivers (Restorative, Direct to Implant)"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {
    "Scanbodies (Mult-Unit Abutments)":
      CALCULATORS["Scanbodies (Mult-Unit Abutments)"],
    "Scanbody Drivers (MUAs)": CALCULATORS["Scanbody Drivers (MUAs)"],
    "Impression Copings (Multi-Unit Abutments)":
      CALCULATORS["Impression Copings (Multi-Unit Abutments)"],
    "Temporary Copings (Multi-Unit Abutments)":
      CALCULATORS["Temporary Copings (Multi-Unit Abutments)"],
    "Ti Bases (Multi-Unit Abutments)":
      CALCULATORS["Ti Bases (Multi-Unit Abutments)"],
    "Multi-Unit Abutments": CALCULATORS["Multi-Unit Abutments"],
    "Drivers (Restorative, on Multi-Unit Abutments)":
      CALCULATORS["Drivers (Restorative, on Multi-Unit Abutments)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATORS["Drivers (Restorative, Direct to Implant)"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    "Scanbodies (Mult-Unit Abutments)":
      CALCULATORS["Scanbodies (Mult-Unit Abutments)"],
    "Scanbody Drivers (MUAs)": CALCULATORS["Scanbody Drivers (MUAs)"],
    "Impression Copings (Multi-Unit Abutments)":
      CALCULATORS["Impression Copings (Multi-Unit Abutments)"],
    "Temporary Copings (Multi-Unit Abutments)":
      CALCULATORS["Temporary Copings (Multi-Unit Abutments)"],
    "Ti Bases (Multi-Unit Abutments)":
      CALCULATORS["Ti Bases (Multi-Unit Abutments)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATORS["Drivers (Restorative, Direct to Implant)"],
  },
};

export const CALCULATOR_NAME_COLLECTION_MAPPINGS: { [key: string]: string } = {
  "Drill Kits and Drill Sequences": "DrillKitAndSequence",
  "Bone Reduction Instruments": "BoneReduction",
  "Drivers (Restorative, Direct to Implant)": "RestroativeDirectToImplant",
  "Chairside Pick-Up Materials": "ChairSidePickUp",
  Implants: "Implants",
  "Scanbodies (Single Unit)": "Scanbodies",
  "Scanbody Drivers (Direct to Implant)": "ScanbodyDriversDirectToImplants",
  "Impression Copings (Direct to Implant)": "ImpressingCopingsDirectToImplants",
  "Temporary Copings (Direct to Implant)": "TemporaryCopingsDirectToImplants",
  "Ti Bases (Direct to Implant)": "TiBasesDirectToImplants",
  "Scanbodies (Mult-Unit Abutments)": "ScanbodyMUAs",
  "Scanbody Drivers (MUAs)": "ScanbodyDriversMUAs",
  "Impression Copings (Multi-Unit Abutments)": "ImpressingCopingsMUAs",
  "Temporary Copings (Multi-Unit Abutments)": "TemporaryCopingsMUAs",
  "Ti Bases (Multi-Unit Abutments)": "TiBasesMUAs",
  "Multi-Unit Abutments": "MUAs",
  "Drivers (Restorative, on Multi-Unit Abutments)":
    "RestorativeMultiUnitAbutments",
  "Implant Analogs": "ImplantAnalogs",
  "Implant Screws": "ImplantScrews",
  "Healing Abutments": "HealingAbutments",
  "Stock Abutments": "StockAbutments",
};
