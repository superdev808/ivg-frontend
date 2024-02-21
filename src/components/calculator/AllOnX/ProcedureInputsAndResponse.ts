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
      text: "Implant Length [Drill Kits and Drill Sequences]",
      calculator: "DrillKitAndSequence",
    },
    {
      name: "Drill Kit Type",
      text: "Drill Kit Type",
      calculator: "DrillKitAndSequence",
    },
    {
      name: "Drill Sequence Option",
      text: "Drill Sequence Option",
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
      text: "Implant Length [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "Authentic or Generic",
      text: "Authentic or Generic [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "Driver Length",
      text: "Driver Length [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "One Piece or Torque Attachment",
      text: "One Piece or Torque Attachment [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "Driver Size",
      text: "Driver Size [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "Abutment Angulation",
      text: "Abutment Angulation [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestroativeDirectToImplant",
    },
    {
      name: "Machine or Manual",
      text: "Machine or Manual [Drivers (Restorative, Direct to Implant)]",
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
      text: "Implant Length [Implants]",
      calculator: "Implants",
    },
    {
      name: "Implant Form",
      text: "Implant Form [Implants]",
      calculator: "Implants",
    },
    {
      name: "Mount Option",
      text: "Mount Option",
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
      text: "Authentic or Generic [Scanbodies (Single Unit)]",
      calculator: "Scanbodies",
    },
    {
      name: "Scanbody Length",
      text: "Scanbody Length",
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
      name: "Implant Form",
      text: "Implant Form [Scanbody Drivers (Direct to Implant)]",
      calculator: "ScanbodyDriversDirectToImplants",
      isCommon: true,
    },
    {
      name: "Design",
      text: "Design [Scanbody Drivers (Direct to Implant)]",
      calculator: "ScanbodyDriversDirectToImplants",
      isCommon: true,
    },
    {
      name: "Driver Length",
      text: "Driver Length [Scanbody Drivers (Direct to Implant)]",
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
      text: "Open or Closed Tray [Impression Copings (Direct to Implant)]",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Angulation",
      text: "Angulation [Impression Copings (Direct to Implant)]",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Impression Coping Diameter",
      text: "Impression Coping Diameter",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Impression Coping Design",
      text: "Impression Coping Design",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Impression Coping Length",
      text: "Impression Coping Length [Impression Copings (Direct to Implant)]",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Cementable Area",
      text: "Cementable Area [Impression Copings (Direct to Implant)]",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Engaging or Non-Engaging",
      text: "Engaging or Non-Engaging [Impression Copings (Direct to Implant)]",
      calculator: "ImpressingCopingsDirectToImplants",
    },
    {
      name: "Emergence Profile",
      text: "Emergence Profile [Impression Copings (Direct to Implant)]",
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
      text: "Engaging or Non Engaging [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Abutment Angulation",
      text: "Abutment Angulation [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Connection Type",
      text: "Connection Type [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Cementable Area",
      text: "Cementable Area [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Hexed or Non-Hexed",
      text: "Hexed or Non-Hexed [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Temporary Copings (Direct to Implant)]",
      calculator: "TemporaryCopingsDirectToImplants",
    },
    {
      name: "Restoration Type",
      text: "Restoration Type [Temporary Copings (Direct to Implant)]",
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
      text: "Engaging or Non-Engaging [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Connection Type",
      text: "Connection Type [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Angulation",
      text: "Angulation [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Cementable Area",
      text: "Cementable Area [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Material",
      text: "Material [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Ti Bases (Direct to Implant)]",
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
      text: "Authentic or Generic [Scanbodies (Mult-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Scanbodies (Mult-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Scanbodies (Mult-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Scanbodies (Mult-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Angulation",
      text: "Angulation [Scanbodies (Mult-Unit Abutments)]",
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
      name: "Implant Form",
      text: "Implant Form [Scanbody Drivers (MUAs)]",
      calculator: "ScanbodyDriversMUAs",
    },
    {
      name: "Design",
      text: "Design [Scanbody Drivers (MUAs)]",
      calculator: "ScanbodyDriversMUAs",
    },
    {
      name: "Driver Length",
      text: "Driver Length [Scanbody Drivers (MUAs)]",
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
      text: "Open or Closed Tray [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Impression Coping Length",
      text: "Impression Coping Length [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Angulation",
      text: "Angulation [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Fixation",
      text: "Fixation [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Hexed or Non-Hexed",
      text: "Hexed or Non-Hexed [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Engaging or Non-Engaging",
      text: "Engaging or Non-Engaging [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Cementable Area",
      text: "Cementable Area [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Impression Copings (Multi-Unit Abutments)]",
      calculator: "ImpressingCopingsMUAs",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Impression Copings (Multi-Unit Abutments)]",
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
      text: "Abutment Diameter [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Angulation",
      text: "Angulation [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Restoration Type",
      text: "Restoration Type [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Material",
      text: "Material [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Length",
      text: "Length [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Diameter",
      text: "Diameter [Temporary Copings (Multi-Unit Abutments)]",
      calculator: "TemporaryCopingsMUAs",
    },
    {
      name: "Hexed or Non-Hexed",
      text: "Hexed or Non-Hexed [Temporary Copings (Multi-Unit Abutments)]",
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
      text: "Engaging or Non-Engaging [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "MUA Type",
      text: "MUA Type [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Connection",
      text: "Connection [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Angulation",
      text: "Angulation [Ti Bases (Multi-Unit Abutments)]",
      calculator: "TiBasesMUAs",
    },
    {
      name: "Material",
      text: "Material [Ti Bases (Multi-Unit Abutments)]",
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
      text: "Abutment Angulation [Multi-Unit Abutments]",
      calculator: "MUAs",
    },
    {
      name: "Connection Type",
      text: "Connection Type [Multi-Unit Abutments]",
      calculator: "MUAs",
    },
    {
      name: "Abutment Engaging Type",
      text: "Abutment Engaging Type",
      calculator: "MUAs",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Multi-Unit Abutments]",
      calculator: "MUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Multi-Unit Abutments]",
      calculator: "MUAs",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Multi-Unit Abutments]",
      calculator: "MUAs",
    },
    {
      name: "Implant or Abutment Level",
      text: "Implant or Abutment Level",
      calculator: "MUAs",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Multi-Unit Abutments]",
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
      text: "Machine or Manual [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "Driver Length",
      text: "Driver Length [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "Design",
      text: "Design [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "MUA Type",
      text: "MUA Type [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "Abutment Angulation",
      text: "Abutment Angulation [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "Diameter",
      text: "Diameter [Drivers (Restorative, on Multi-Unit Abutments)]",
      calculator: "RestorativeMultiUnitAbutments",
    },
    {
      name: "One Piece or Torque Attachment",
      text: "One Piece or Torque Attachment [Drivers (Restorative, on Multi-Unit Abutments)]",
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
      text: "Authentic or Generic [Implant Analogs]",
      calculator: "ImplantAnalogs",
    },
    {
      name: "Digital or Lab Analog",
      text: "Digital or Lab Analog",
      calculator: "ImplantAnalogs",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Implant Analogs]",
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
      text: "Authentic or Generic [Implant Screws]",
      calculator: "ImplantScrews",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Implant Screws]",
      calculator: "ImplantScrews",
    },
    {
      name: "Design",
      text: "Design [Implant Screws]",
      calculator: "ImplantScrews",
    },
    {
      name: "Restoration Connection Type",
      text: "Restoration Connection Type",
      calculator: "ImplantScrews",
    },
    {
      name: "Restoration Type",
      text: "Restoration Type [Implant Screws]",
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
      text: "Abutment Angulation [Implant Screws]",
      calculator: "ImplantScrews",
    },
    {
      name: "Open or Closed Tray",
      text: "Open or Closed Tray [Implant Screws]",
      calculator: "ImplantScrews",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Implant Screws]",
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
      text: "Authentic or Generic [Healing Abutments]",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Healing Abutments]",
      calculator: "HealingAbutments",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Healing Abutments]",
      calculator: "HealingAbutments",
    },
    {
      name: "Emergence Profile",
      text: "Emergence Profile [Healing Abutments]",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Material",
      text: "Abutment Material",
      calculator: "HealingAbutments",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Healing Abutments]",
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
      text: "Material [Stock Abutments]",
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
      text: "Restoration Type [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Hexed or Non-Hexed",
      text: "Hexed or Non-Hexed [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Angulation",
      text: "Angulation [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Collar Height",
      text: "Collar Height [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Stock Abutments]",
      calculator: "StockAbutments",
    },
    {
      name: "Emergence Profile",
      text: "Emergence Profile [Stock Abutments]",
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
