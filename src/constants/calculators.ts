import {
  CollectionsIO,
  KeyValuePair,
  PROCEDURE_COMBINATIONS,
  Procedure,
  PROCEDURE,
  ProcedureInputsAndResponse,
  RadioButtonOption,
  Site,
  CalculatorGroupItem,
} from "@/types/calculators";

export const CALCULATOR_MAPPINGS: KeyValuePair = {
  ALL_ON_X_CALCULATOR: "All-on-X Ordering Guide",
  CUSTOM_COMBINATION: "Custom Combinations",
};

export const CALCULATOR_COLLECTIONS: CollectionsIO = {
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
      calculator: "RestorativeDirectToImplant",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "RestorativeDirectToImplant",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "RestorativeDirectToImplant",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "RestorativeDirectToImplant",
      isCommon: true,
    },
    {
      name: "Implant Length",
      text: "Implant Length [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Authentic or Generic",
      text: "Authentic or Generic [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Driver Length",
      text: "Driver Length [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "One Piece or Torque Attachment",
      text: "One Piece or Torque Attachment [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Driver Size",
      text: "Driver Size [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Abutment Angulation",
      text: "Abutment Angulation [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "Machine or Manual",
      text: "Machine or Manual [Drivers (Restorative, Direct to Implant)]",
      calculator: "RestorativeDirectToImplant",
    },
    {
      name: "",
      text: "",
      calculator: "RestorativeDirectToImplant",
      outputFrom: "RestorativeDirectToImplant",
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
      name: "Hexed or Non-Hexed",
      text: "Hexed or Non-Hexed [Ti Bases (Direct to Implant)]",
      calculator: "TiBasesDirectToImplants",
    },
    {
      name: "",
      text: "",
      calculator: "TiBasesDirectToImplants",
      outputFrom: "TiBasesDirectToImplants",
    },
  ],
  "Scanbodies (Multi-Unit Abutments)": [
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
      text: "Authentic or Generic [Scanbodies (Multi-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Scanbodies (Multi-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Diameter",
      text: "Abutment Diameter [Scanbodies (Multi-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Height",
      text: "Abutment Height [Scanbodies (Multi-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Abutment Type",
      text: "Abutment Type [Scanbodies (Multi-Unit Abutments)]",
      calculator: "ScanbodyMUAs",
    },
    {
      name: "Angulation",
      text: "Angulation [Scanbodies (Multi-Unit Abutments)]",
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
  "Implant Torque Guide": [
    {
      name: "Implant Brand",
      text: "Implant Brand",
      calculator: "ImplantTorquesGuide",
      isCommon: true,
    },
    {
      name: "Implant Model",
      text: "Implant Model",
      calculator: "ImplantTorquesGuide",
      isCommon: true,
    },
    {
      name: "Implant Diameter",
      text: "Implant Diameter",
      calculator: "ImplantTorquesGuide",
      isCommon: true,
    },
    {
      name: "Implant Platform",
      text: "Implant Platform",
      calculator: "ImplantTorquesGuide",
      isCommon: true,
    },
    {
      name: "Product, Component, or Procedure",
      text: "Product, Component, or Procedure",
      calculator: "ImplantTorquesGuide",
    },
    {
      name: "",
      text: "",
      calculator: "ImplantTorquesGuide",
      outputFrom: "ImplantTorquesGuide",
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
      name: "Engaging",
      text: "Engaging [Stock Abutments]",
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
  "Implant-Borne Bridge": [
    {
      name: "Maxilla / Mandible",
      text: "Maxilla / Mandible [Implant-Borne Bridge]",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Region",
      text: "Region [Implant-Borne Bridge]",
      description:
        "The region of the bridge will determine the balance between of aesthetics and strength.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Number of Units",
      text: "Number of Units [Implant-Borne Bridge]",
      description:
        "The number of units within the bridge will impact the balance between of aesthetics and strength.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Are aesthetics a top priority?",
      text: "Are aesthetics a top priority? [Implant-Borne Bridge]",
      description:
        "Prioritizing natural looking teeth will require more aesthetic restoration materials.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Does the patient have a thin gingival biotype?",
      text: "Does the patient have a thin gingival biotype? [Implant-Borne Bridge]",
      description:
        "Thin gingival biotypes will show underlying abutment colors and require the additional support to prevent recession.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Are neighboring teeth translucent?",
      text: "Are neighboring teeth translucent? [Implant-Borne Bridge]",
      description:
        "Translucent neighboring teeth will require matching with more translucent materials.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Does the patient have a high occlusal load?",
      text: "Does the patient have a high occlusal load? [Implant-Borne Bridge]",
      description:
        "Patients with high occlusal loads will need high strength restoration materials.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Does this site have limited occlusal space?",
      text: "Does this site have limited occlusal space? [Implant-Borne Bridge]",
      description:
        "Patients with limited occlusal space will need restoration materials with minimal thickness.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Does the patient practice good oral hygiene?",
      text: "Does the patient practice good oral hygiene? [Implant-Borne Bridge]",
      description:
        "Bad oral hygiene requires hygienic materials to minimize peri-implantitis.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Is the implant angulated?",
      text: "Is the implant angulated? [Implant-Borne Bridge]",
      description: "Angulated implants may require custom abutments.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "Does the patient have allergies or sensitivities?",
      text: "Does the patient have allergies or sensitivities? [Implant-Borne Bridge]",
      description:
        "Patients with allergies or sensitives will requires biocompatible materials.",
      calculator: "ImplantBorneBridge",
    },
    {
      name: "",
      text: "",
      calculator: "ImplantBorneBridge",
      outputFrom: "ImplantBorneBridge",
    },
  ],
  "Implant-Borne Crown": [
    {
      name: "Maxilla / Mandible",
      text: "Maxilla / Mandible [Implant-Borne Crown]",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Tooth Category",
      text: "Tooth Category [Implant-Borne Crown]",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Are aesthetics a top priority?",
      text: "Are aesthetics a top priority? [Implant-Borne Crown]",
      description:
        "Prioritizing natural looking teeth will require more aesthetic restoration materials.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Does the patient have a thin gingival biotype?",
      text: "Does the patient have a thin gingival biotype? [Implant-Borne Crown]",
      description:
        "Thin gingival biotypes will show underlying abutment colors and require the additional support to prevent recession.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Are neighboring teeth translucent?",
      text: "Are neighboring teeth translucent? [Implant-Borne Crown]",
      description:
        "Translucent neighboring teeth will require matching with more translucent materials.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Does the patient have a high occlusal load?",
      text: "Does the patient have a high occlusal load? [Implant-Borne Crown]",
      description:
        "Patients with high occlusal loads will need high strength restoration materials.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Does this site have limited occlusal space?",
      text: "Does this site have limited occlusal space? [Implant-Borne Crown]",
      description:
        "Patients with limited occlusal space will need restoration materials with minimal thickness.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Does the patient practice good oral hygiene?",
      text: "Does the patient practice good oral hygiene? [Implant-Borne Crown]",
      description:
        "Bad oral hygiene requires hygienic materials to minimize peri-implantitis.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Is the implant angulated?",
      text: "Is the implant angulated? [Implant-Borne Crown]",
      description: "Angulated implants may require custom abutments.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "Does the patient have allergies or sensitivities?",
      text: "Does the patient have allergies or sensitivities? [Implant-Borne Crown]",
      description:
        "Patients with allergies or sensitives will requires biocompatible materials.",
      calculator: "ImplantBorneCrown",
    },
    {
      name: "",
      text: "",
      calculator: "ImplantBorneCrown",
      outputFrom: "ImplantBorneCrown",
    },
  ],
  "Tooth-Borne Bridge": [
    {
      name: "Maxilla / Mandible",
      text: "Maxilla / Mandible [Tooth-Borne Bridge]",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Region",
      text: "Region [Tooth-Borne Bridge]",
      description:
        "The region of the bridge will determine the balance between of aesthetics and strength.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Number of Units",
      text: "Number of Units [Tooth-Borne Bridge]",
      description:
        "The number of units within the bridge will impact the balance between of aesthetics and strength.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Are aesthetics a top priority?",
      text: "Are aesthetics a top priority? [Tooth-Borne Bridge]",
      description:
        "Prioritizing natural looking teeth will require more aesthetic restoration materials.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Does the preparation have retention and resistance form?",
      text: "Does the preparation have retention and resistance form? [Tooth-Borne Bridge]",
      description:
        "Preparations lacking these qualities are more likely to become uncemented.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Are neighboring teeth translucent?",
      text: "Are neighboring teeth translucent? [Tooth-Borne Bridge]",
      description:
        "Translucent neighboring teeth will require matching with more translucent materials.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Does the patient have a high occlusal load?",
      text: "Does the patient have a high occlusal load? [Tooth-Borne Bridge]",
      description:
        "Patients with high occlusal loads will need high strength restoration materials.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Does this site have limited occlusal space?",
      text: "Does this site have limited occlusal space? [Tooth-Borne Bridge]",
      description:
        "Patients with limited occlusal space will need restoration materials with minimal thickness.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "Is the stump shade light or dark?",
      text: "Is the stump shade light or dark? [Tooth-Borne Bridge]",
      description:
        "Darker teeth require masking through low translucency materials and / or opaque cements.",
      calculator: "ToothBorneBridge",
    },
    {
      name: "",
      text: "",
      calculator: "ToothBorneBridge",
      outputFrom: "ToothBorneBridge",
    },
  ],
  "Tooth-Borne Crown": [
    {
      name: "Maxilla / Mandible",
      text: "Maxilla / Mandible [Tooth-Borne Crown]",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Tooth Category",
      text: "Tooth Category [Tooth-Borne Crown]",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Are aesthetics a top priority?",
      text: "Are aesthetics a top priority? [Tooth-Borne Crown]",
      description:
        "Prioritizing natural looking teeth will require more aesthetic restoration materials.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Does the preparation have retention and resistance form?",
      text: "Does the preparation have retention and resistance form? [Tooth-Borne Crown]",
      description:
        "Preparations lacking these qualities are more likely to become uncemented.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Are neighboring teeth translucent?",
      text: "Are neighboring teeth translucent? [Tooth-Borne Crown]",
      description:
        "Translucent neighboring teeth will require matching with more translucent materials.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Does the patient have a high occlusal load?",
      text: "Does the patient have a high occlusal load? [Tooth-Borne Crown]",
      description:
        "Patients with high occlusal loads will need high strength restoration materials.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Does this site have limited occlusal space?",
      text: "Does this site have limited occlusal space? [Tooth-Borne Crown]",
      description:
        "Patients with limited occlusal space will need restoration materials with minimal thickness.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "Is the stump shade light or dark?",
      text: "Is the stump shade light or dark? [Tooth-Borne Crown]",
      description:
        "Darker teeth require masking through low translucency materials and / or opaque cements.",
      calculator: "ToothBorneCrown",
    },
    {
      name: "",
      text: "",
      calculator: "ToothBorneCrown",
      outputFrom: "ToothBorneCrown",
    },
  ],
};

export const PROCEDURE_INPUTS_AND_RESPONSE: ProcedureInputsAndResponse = {
  [PROCEDURE_COMBINATIONS.SURGERY]: [
    "DrillKitAndSequence",
    "BoneReduction",
    "RestorativeDirectToImplant",
    "ChairSidePickUp",
    "Implants",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: [
    "Scanbodies",
    "ScanbodyDriversDirectToImplants",
    "ImpressingCopingsDirectToImplants",
    "TemporaryCopingsDirectToImplants",
    "TiBasesDirectToImplants",
    "RestorativeDirectToImplant",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: [
    "ScanbodyMUAs",
    "ScanbodyDriversMUAs",
    "ImpressingCopingsMUAs",
    "TemporaryCopingsMUAs",
    "TiBasesMUAs",
    "MUAs",
    "RestorativeMultiUnitAbutments",
    "RestorativeDirectToImplant",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: [
    "ScanbodyMUAs",
    "ScanbodyDriversMUAs",
    "ImpressingCopingsMUAs",
    "TemporaryCopingsMUAs",
    "TiBasesMUAs",
    "RestorativeDirectToImplant",
  ],
};

export const CALCULATOR_NAME_COLLECTION_MAPPINGS: Record<string, string> = {
  "Drill Kits and Drill Sequences": "DrillKitAndSequence",
  "Bone Reduction Instruments": "BoneReduction",
  "Drivers (Restorative, Direct to Implant)": "RestorativeDirectToImplant",
  "Chairside Pick-Up Materials": "ChairSidePickUp",
  Implants: "Implants",
  "Scanbodies (Single Unit)": "Scanbodies",
  "Scanbody Drivers (Direct to Implant)": "ScanbodyDriversDirectToImplants",
  "Impression Copings (Direct to Implant)": "ImpressingCopingsDirectToImplants",
  "Temporary Copings (Direct to Implant)": "TemporaryCopingsDirectToImplants",
  "Ti Bases (Direct to Implant)": "TiBasesDirectToImplants",
  "Scanbodies (Multi-Unit Abutments)": "ScanbodyMUAs",
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
  "Tooth-Borne Bridge": "ToothBorneBridge",
  "Tooth-Borne Crown": "ToothBorneCrown",
  "Implant-Borne Bridge": "ImplantBorneBridge",
  "Implant-Borne Crown": "ImplantBorneCrown",
};

export const PROCEDURES: Procedure[] = [
  { name: "Surgery", value: PROCEDURE.SURGERY },
  { name: "Restorative", value: PROCEDURE.RESTORATIVE },
  {
    name: "Surgery and Restorative",
    value: PROCEDURE.SURGERY_AND_RESTORATIVE,
  },
];

const SITE_COUNT: number = 32;
// Create an array of Site objects representing different sites.
// The array is initialized with SITE_COUNT number of elements and then mapped to generate Site objects.
const SITES: Site[] = Array(SITE_COUNT)
  .fill(null)
  .map((_, i) => ({ name: `Site ${i + 1}`, key: i + 1 }));

// Create two subsets of sites: UPPER_SITES and LOWER_SITES.
// UPPER_SITES contains the first 16 sites, and LOWER_SITES contains the next 16 sites.
export const UPPER_SITES: Site[] = SITES.slice(0, 16);
export const LOWER_SITES: Site[] = SITES.slice(16, 32);

export const AUTO_POPULATE_OPTIONS: RadioButtonOption[] = [
  {
    id: "autoPopulateYes",
    name: "autoPopulate",
    value: "Yes",
  },
  {
    id: "autoPopulateNo",
    name: "autoPopulate",
    value: "No",
  },
];

export const DENTAL_IMPLANT_PROCEDURE_OPTIONS: RadioButtonOption[] = [
  {
    id: "DirectToImplant",
    name: "dentalImplantProcedure",
    value: "Direct to implant",
  },
  {
    id: "MUAs",
    name: "dentalImplantProcedure",
    value: "MUAs",
  },
];

export const MUA_OPTIONS: RadioButtonOption[] = [
  {
    id: "MUA1",
    name: "MUA",
    value: "Yes",
  },
  {
    id: "MUA2",
    name: "MUA",
    value: "No",
  },
];

export const SITE_SPECIFIC_REPORT_OPTIONS: RadioButtonOption[] = [
  {
    id: "customReportOption1",
    name: "customReportOption",
    value: "Yes",
  },
  {
    id: "customReportOption2",
    name: "customReportOption",
    value: "No",
  },
];

export const QUANTITY_MULTIPLES_LIST = ["implants"];

export const TEXT_DENTAL_IMPLANT_PROCEDURE =
  "Are you restoring with multi-unit abutments (MUAs) or directly to the implant?";

export const TEXT_MUA_STATUS =
  "Are the multi-unit abutments already connected to the implants?";

export const CALCULATOR_GROUP_ITEMS: CalculatorGroupItem[] = [
  {
    label: "Implant Component Selection",
    description:
      "These calculators enable quick identification and procurement of a range of Impression Components, Abutments, CAD / CAM Restorations, and Prosthetic and Surgical Instruments to meet all your implant needs.",
    subItems: [
      "DrillKitAndSequence",
      "RestorativeDirectToImplant",
      "RestorativeMultiUnitAbutments",
      "HealingAbutments",
      "Implants",
      "ImplantScrews",
      "ImplantTorquesGuide",
      "ImplantAnalogs",
      "ImpressingCopingsDirectToImplants",
      "ImpressingCopingsMUAs",
      "MUAs",
      "Scanbodies",
      "ScanbodyMUAs",
      "ScanbodyDriversDirectToImplants",
      "ScanbodyDriversMUAs",
      "StockAbutments",
      "TemporaryCopingsDirectToImplants",
      "TemporaryCopingsMUAs",
      "TiBasesDirectToImplants",
      "TiBasesMUAs",
      "BoneReduction",
      "ChairSidePickUp",
    ],
  },
  {
    label: "All-on-X Ordering Guide",
    description:
      "This customized calculator enables quick identification and procurement of a variety of components, instruments, and materials to help you place or restore implants.",
    subItems: [],
  },
  {
    label: "Custom Combinations",
    description:
      "This tool enables you to combine multiple Implant Component to identify and procure products, and easily share which components were used with colleagues or patients.",
    subItems: [],
  },
  {
    label: "Recommended Product Materials",
    description: "",
    subItems: [
      "ToothBorneBridge",
      "ToothBorneCrown",
      "ImplantBorneBridge",
      "ImplantBorneCrown",
    ],
  },
];

export const INFORMATIONAL_CALCULATOR_NAMES = [
  "Implant Torque Guide",
  "Implant-Borne Bridge",
  "Implant-Borne Crown",
  "Tooth-Borne Bridge",
  "Tooth-Borne Crown",
];

export const MATERIAL_CALCULATOR_NAMES = [
  "Implant-Borne Bridge",
  "Implant-Borne Crown",
  "Tooth-Borne Bridge",
  "Tooth-Borne Crown",
];

export const BRAND_IMAGES: Record<string, string> = {
  "ab dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/AB+Dental.png",
  "ace southern":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/acesouthern_logo.png",
  adin: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/adin.png",
  alfagate:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alfa_Gate_Logo-01.png",
  "alpha bio tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/alpha+bio+tec.png",
  "american dental implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/american+dental+implant+logo.png",
  argon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/argon+logo.png",
  "avia biomed":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/avialogo3-1-300x83.png",
  "b&w implant system":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/b%26w+implant+logo.jpeg",
  bhi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/BHI+logo.webp",
  bicon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/bicon.png",
  biohorizons:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/biohorizons.png",
  biomedical: "",
  "biotech dental usa": "",
  "blue sky bio":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/blue+sky+bio.png",
  camlog:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/camlog.png",
  cortex:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/cortex.png",
  "cowellmedi co. ltd":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/cowellmedi.jpeg",
  dsi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dsi.jpeg",
  "dsp biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dsp.png",
  "dental-pro":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentalpro.png",
  dentis:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentis-0f23fa.png",
  dentium:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentium.png",
  "dentsply sirona":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dentsply.svg",
  "dio implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/dio.png",
  "ditron dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ditron.png",
  euroteknika:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/euroteknika.png",
  "gdt dental implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/gdt.png",
  gmi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/gmi.png",
  glidewell:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/glidewell.png",
  "hi-tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/hitec.png",
  "hiossen (osstem)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/hiossen.png",
  "i do biotech":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/i+do+biotech.png",
  "ibs implant (innobiosurg)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ibs.png",
  "implant club":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/implant+club.png",
  "implant direct":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ImplantDirect-Logo.png",
  "implant logistics":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/implant+logistics.png",
  "implant part": "",
  "implant vision": "",
  jdentalcare:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/jdental.jpeg",
  "keystone dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/keystone_dental_inc_logo.png",
  "little implant company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/little+implant+co.png",
  mis: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/mis-implants-logo.png",
  megagen:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/megagen.png",
  neobiotech:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neo+biotech.png",
  neodent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neodent.png",
  neoss:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/neoss.png",
  "nobel biocare":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/nobel+biocare.png",
  "noris medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/noris.png",
  nova: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/nova.png",
  "oco biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/oco.png",
  osseodent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Osseodent-Logo-300-dpi.png",
  osstem:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/osstem.png",
  "osteoready llc":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/osteoready.png",
  "paragon implant company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/paragon-implant-logo-34.webp",
  "park dental implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/park+dental.png",
  ritter:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ritter.png",
  "s.i.n.":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/SIN.png",
  "sgs dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sgs.png",
  "sis (shinhung implant system)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sis.png",
  "sewon medix":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sewon+medix.jpeg",
  "sigma impants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sigma.png",
  "southern implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Southern_Implants_North_America_Logo.png",
  "steri-oss":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/steri-oss.png",
  sterngold:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sterngold.png",
  straumann:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Straumann.png",
  surgikor:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/surgikor.png",
  "sweden & martina":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sweden%26martina.png",
  "swiss medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/swiss+medical.png",
  sydent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/sydent.jpeg",
  "tag dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/tag+dental.png",
  "tatum surgical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/tatum.jpeg",
  "thommen medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/thommen.png",
  "trinon titanium":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/trinon.jpg",
  uris: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/uris.png",
  zimvie:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (biomet)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (calcitek)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimvie (zimmer)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimmer dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  "zimmer dental (biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/zimvie.png",
  msdi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/msdi.png",
};

export const CALCULATOR_IMAGES: Record<string, string> = {
  BoneReduction:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Meisinger+Drill+Kit+ALV18.png",
  ChairSidePickUp:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Chairside+Pickup+Lufting.png",
  Implants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+BL++Implant+RC+D+4.1mm+EL+8mm+0214508.png",
  MUAs: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/MultiUnitAbutment_custom_truabutment_final.png",
  HealingAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Healing+Abutment+D+4.5mm+H+3mm+2213.png",
  ImplantAnalogs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+IOS+Model+Implant+Replica+Conical+RP+38190.png",
  ImplantTorquesGuide:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  ImpressingCopingsMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Impression+Coping+Open+Tray+Multi-Unit+29089.png",
  ImpressingCopingsDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TemporaryCopingsDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TemporaryCopingsMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TiBasesMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+30d+MUA+Plus+Conical+RP+H+3.5mm+38895.png",
  CoverScrew:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+RN+Closure+Cap+D+3.5mm+H+0mm+048371S.png",
  ImplantScrews:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+NC+Variobase+Abutment+Screw+0252921.png",
  TiBasesDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Zimmer+TSV+BellaTek+Express+Abutment+D4.5mm+H+4.75mm+Hexed+TE451.png",
  RestorativeDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  RestorativeMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  Scanbodies:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Scanbody+DTI+Generic.png",
  ScanbodyMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Scanbody+MUA+Generic.png",
  ScanbodyDriversMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  ScanbodyDriversDirectToImplants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  DrillKitAndSequence:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Drill+Kit+Generic.png",
  StockAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Stock+Abutment+Generic.png",
  Default:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/No+Image+BW.jpg",
};