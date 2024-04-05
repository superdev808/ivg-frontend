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
  [PROCEDURE_COMBINATIONS.SURGERY]: {
    "Drill Kits and Drill Sequences":
      CALCULATOR_COLLECTIONS["Drill Kits and Drill Sequences"],
    "Bone Reduction Instruments":
      CALCULATOR_COLLECTIONS["Bone Reduction Instruments"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATOR_COLLECTIONS["Drivers (Restorative, Direct to Implant)"],
    "Chairside Pick-Up Materials":
      CALCULATOR_COLLECTIONS["Chairside Pick-Up Materials"],
    Implants: CALCULATOR_COLLECTIONS["Implants"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: {
    "Scanbodies (Single Unit)":
      CALCULATOR_COLLECTIONS["Scanbodies (Single Unit)"],
    "Scanbody Drivers (Direct to Implant)":
      CALCULATOR_COLLECTIONS["Scanbody Drivers (Direct to Implant)"],
    "Impression Copings (Direct to Implant)":
      CALCULATOR_COLLECTIONS["Impression Copings (Direct to Implant)"],
    "Temporary Copings (Direct to Implant)":
      CALCULATOR_COLLECTIONS["Temporary Copings (Direct to Implant)"],
    "Ti Bases (Direct to Implant)":
      CALCULATOR_COLLECTIONS["Ti Bases (Direct to Implant)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATOR_COLLECTIONS["Drivers (Restorative, Direct to Implant)"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: {
    "Scanbodies (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Scanbodies (Multi-Unit Abutments)"],
    "Scanbody Drivers (MUAs)":
      CALCULATOR_COLLECTIONS["Scanbody Drivers (MUAs)"],
    "Impression Copings (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Impression Copings (Multi-Unit Abutments)"],
    "Temporary Copings (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Temporary Copings (Multi-Unit Abutments)"],
    "Ti Bases (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Ti Bases (Multi-Unit Abutments)"],
    "Multi-Unit Abutments": CALCULATOR_COLLECTIONS["Multi-Unit Abutments"],
    "Drivers (Restorative, on Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Drivers (Restorative, on Multi-Unit Abutments)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATOR_COLLECTIONS["Drivers (Restorative, Direct to Implant)"],
  },
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: {
    "Scanbodies (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Scanbodies (Multi-Unit Abutments)"],
    "Scanbody Drivers (MUAs)":
      CALCULATOR_COLLECTIONS["Scanbody Drivers (MUAs)"],
    "Impression Copings (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Impression Copings (Multi-Unit Abutments)"],
    "Temporary Copings (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Temporary Copings (Multi-Unit Abutments)"],
    "Ti Bases (Multi-Unit Abutments)":
      CALCULATOR_COLLECTIONS["Ti Bases (Multi-Unit Abutments)"],
    "Drivers (Restorative, Direct to Implant)":
      CALCULATOR_COLLECTIONS["Drivers (Restorative, Direct to Implant)"],
  },
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
      {
        label: "DrillKitAndSequence",
        text: "Drill Kits and Drill Sequences",
        description:
          "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "RestorativeDirectToImplant",
        text: "Drivers (Restorative, Direct to Implant)",
        description:
          "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "RestorativeMultiUnitAbutments",
        text: "Drivers (Restorative, on Multi-Unit Abutments)",
        description:
          "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "HealingAbutments",
        text: "Healing Abutments",
        description:
          "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "Implants",
        text: "Implants",
        description:
          "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ImplantScrews",
        text: "Implant Screws",
        description:
          "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ImplantTorquesGuide",
        text: "Implant Torque Guide",
        description:
          "Find the right torque value for your desired component, product, or procedure.",
      },
      {
        label: "ImplantAnalogs",
        text: "Implant Analogs",
        description:
          "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ImpressingCopingsDirectToImplants",
        text: "Impression Copings (Direct to Implant)",
        description:
          "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ImpressingCopingsMUAs",
        text: "Impression Copings (Multi-Unit Abutments)",
        description:
          "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "MUAs",
        text: "Multi-Unit Abutments",
        description:
          "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "Scanbodies",
        text: "Scanbodies (Single Unit)",
        description:
          "This calculator displays scanbodies for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ScanbodyMUAs",
        text: "Scanbodies (Multi-Unit Abutments)",
        description:
          "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ScanbodyDriversDirectToImplants",
        text: "Scanbody Drivers (Direct to Implant)",
        description:
          "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "ScanbodyDriversMUAs",
        text: "Scanbody Drivers (MUAs)",
        description:
          "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "StockAbutments",
        text: "Stock Abutments",
        description:
          "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "TemporaryCopingsDirectToImplants",
        text: "Temporary Copings (Direct to Implant)",
        description:
          "This calculator displays temporary copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "TemporaryCopingsMUAs",
        text: "Temporary Copings (Multi-Unit Abutments)",
        description:
          "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "TiBasesDirectToImplants",
        text: "Ti Bases (Direct to Implant)",
        description:
          "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "TiBasesMUAs",
        text: "Ti Bases (Multi-Unit Abutments)",
        description:
          "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
      },
      {
        label: "BoneReduction",
        text: "Bone Reduction Instruments",
        description:
          "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
      },
      {
        label: "ChairSidePickUp",
        text: "Chairside Pick-Up Materials",
        description:
          "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
      },
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
      {
        label: "ToothBorneBridge",
        text: "Tooth-Borne Bridge",
        description: "",
      },
      {
        label: "ToothBorneCrown",
        text: "Tooth-Borne Crown",
        description: "",
      },
      {
        label: "ImplantBorneBridge",
        text: "Implant-Borne Bridge",
        description: "",
      },
      {
        label: "ImplantBorneCrown",
        text: "Implant-Borne Crown",
        description: "",
      },
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

export const CALCULATOR_IO = [
  {
    type: "Scanbodies",
    label: "Scanbodies (Single Unit)",
    description:
      "Enter your implant information below to determine compatible authentic and generic scanbodies.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Scanbody Length",
        text: "Scanbody Length",
      },
    ],
    output: [
      {
        name: "Manufacturer",
        text: "Manufacturer",
      },
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Scanbody Item Number",
        text: "Scanbody Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  // {
  //   type: "Implant Drivers",
  //   label: "implant driver",
  //   placeholder: "Select Manufacturer",
  //   description:
  //     "This calculator will provide the correct implant driver for you to use based on the implant (manufacturer, system, size) that was placed.",
  //   value: 1,
  // },
  // {
  //   type: "Implant Screws",
  //   label: "implant screw",
  //   placeholder: "Select Implant Manufacturer",
  //   description:
  //     "This calculator will provide you with the correct implant screw to use based on the implant (manufacturer, system, size) that was placed.",
  //   value: 2,
  // },
  {
    type: "crownMaterials",
    label: "Crown Materials",
    description:
      "Enter your patient's information below to determine suggested materials for the restoration.",
    disabled: true,
    input: [
      {
        name: "Fixed / Removable",
        text: "Fixed / Removable",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Tooth Category",
        text: "Tooth Category",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the preparation have retention and resistance form?",
        text: "Does the preparation have retention and resistance form?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal clearance?",
        text: "Does this site have limited occlusal clearance?",
      },
      {
        name: "Is the stump shade light or dark?",
        text: "Is the stump shade light or dark?",
      },
    ],
    output: [
      {
        name: "TOP SUGGESTED MATERIAL",
        text: "TOP SUGGESTED MATERIAL",
      },
      {
        name: "SECONDARY OPTION",
        text: "SECONDARY OPTION",
      },
      {
        name: "THIRD OPTION",
        text: "THIRD OPTION",
      },
      {
        name: "NOTES",
        text: "NOTES",
      },
      {
        name: "SUPPORTING ARTICLES",
        text: "SUPPORTING ARTICLES",
      },
    ],
  },
  {
    type: "ChairSidePickUp",
    label: "Chairside Pick-Up Materials",
    description:
      "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
    ],
    output: [
      {
        name: "Luting Agent Name",
        text: "Luting Agent Name",
      },
      {
        name: "Luting Agent Link to Purchase",
        text: "Luting Agent Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
      {
        name: "Teflon Tape",
        text: "Teflon Tape",
      },
      {
        name: "Teflon Tape Link to Purchase",
        text: "Teflon Tape Link to Purchase",
      },
      {
        name: "Notes_1",
        text: "Notes_1",
      },
      {
        name: "Material to Close Screw Access Hole Name",
        text: "Material to Close Screw Access Hole Name",
      },
      {
        name: "Material to Close Screw Access Hole Link to Purchase",
        text: "Material to Close Screw Access Hole Link to Purchase",
      },
      {
        name: "Notes_2",
        text: "Notes_2",
      },
    ],
  },
  {
    type: "DrillKitAndSequence",
    label: "Drill Kits and Drill Sequences",
    description:
      "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Drill Kit Type",
        text: "Drill Kit Type",
      },
      {
        name: "Drill Sequence Option",
        text: "Drill Sequence Option",
      },
    ],
    output: [
      {
        name: "Drill Kit Name",
        text: "Drill Kit Name",
      },
      {
        name: "Drill Kit Item Number",
        text: "Drill Kit Item Number",
      },
      {
        name: "Drill Kit Link to Purchase",
        text: "Drill Kit Link to Purchase",
      },
      {
        name: "Drill 1 (Extra Short) Name",
        text: "Drill 1 (Extra Short) Name",
      },
      {
        name: "Drill 1 (Extra Short) Item Number",
        text: "Drill 1 (Extra Short) Item Number",
      },
      {
        name: "Drill 1 (Extra Short) Link to Purchase",
        text: "Drill 1 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 1 (Extra Short) Manufacturer Recommendations",
        text: "Drill 1 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Short) Name",
        text: "Drill 1 (Short) Name",
      },
      {
        name: "Drill 1 (Short) Item Number",
        text: "Drill 1 (Short) Item Number",
      },
      {
        name: "Drill 1 (Short) Link to Purchase",
        text: "Drill 1 (Short) Link to Purchase",
      },
      {
        name: "Drill 1 (Short) Manufacturer Recommendations",
        text: "Drill 1 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Standard / Medium) Name",
        text: "Drill 1 (Standard / Medium) Name",
      },
      {
        name: "Drill 1 (Standard / Medium) Item Number",
        text: "Drill 1 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 1 (Standard / Medium) Link to Purchase",
        text: "Drill 1 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 1 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 1 (Long) Name",
        text: "Drill 1 (Long) Name",
      },
      {
        name: "Drill 1 (Long) Item Number",
        text: "Drill 1 (Long) Item Number",
      },
      {
        name: "Drill 1 (Long) Link to Purchase",
        text: "Drill 1 (Long) Link to Purchase",
      },
      {
        name: "Drill 1 (Long) Manufacturer Recommendations",
        text: "Drill 1 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Extra Short) Name",
        text: "Drill 2 (Extra Short) Name",
      },
      {
        name: "Drill 2 (Extra Short) Item Number",
        text: "Drill 2 (Extra Short) Item Number",
      },
      {
        name: "Drill 2 (Extra Short) Link to Purchase",
        text: "Drill 2 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 2 (Extra Short) Manufacturer Recommendations",
        text: "Drill 2 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Short) Name",
        text: "Drill 2 (Short) Name",
      },
      {
        name: "Drill 2 (Short) Item Number",
        text: "Drill 2 (Short) Item Number",
      },
      {
        name: "Drill 2 (Short) Link to Purchase",
        text: "Drill 2 (Short) Link to Purchase",
      },
      {
        name: "Drill 2 (Short) Manufacturer Recommendations",
        text: "Drill 2 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Standard / Medium) Name",
        text: "Drill 2 (Standard / Medium) Name",
      },
      {
        name: "Drill 2 (Standard / Medium) Item Number",
        text: "Drill 2 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 2 (Standard / Medium) Link to Purchase",
        text: "Drill 2 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 2 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 2 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 2 (Long) Name",
        text: "Drill 2 (Long) Name",
      },
      {
        name: "Drill 2 (Long) Item Number",
        text: "Drill 2 (Long) Item Number",
      },
      {
        name: "Drill 2 (Long) Link to Purchase",
        text: "Drill 2 (Long) Link to Purchase",
      },
      {
        name: "Drill 2 (Long) Manufacturer Recommendations",
        text: "Drill 2 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Extra Short) Name",
        text: "Drill 3 (Extra Short) Name",
      },
      {
        name: "Drill 3 (Extra Short) Item Number",
        text: "Drill 3 (Extra Short) Item Number",
      },
      {
        name: "Drill 3 (Extra Short) Link to Purchase",
        text: "Drill 3 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 3 (Extra Short) Manufacturer Recommendations",
        text: "Drill 3 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Short) Name",
        text: "Drill 3 (Short) Name",
      },
      {
        name: "Drill 3 (Short) Item Number",
        text: "Drill 3 (Short) Item Number",
      },
      {
        name: "Drill 3 (Short) Link to Purchase",
        text: "Drill 3 (Short) Link to Purchase",
      },
      {
        name: "Drill 3 (Short) Manufacturer Recommendations",
        text: "Drill 3 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Standard / Medium) Name",
        text: "Drill 3 (Standard / Medium) Name",
      },
      {
        name: "Drill 3 (Standard / Medium) Item Number",
        text: "Drill 3 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 3 (Standard / Medium) Link to Purchase",
        text: "Drill 3 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 3 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 3 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 3 (Long) Name",
        text: "Drill 3 (Long) Name",
      },
      {
        name: "Drill 3 (Long) Name",
        text: "Drill 3 (Long) Name",
      },
      {
        name: "Drill 3 (Long) Item Number",
        text: "Drill 3 (Long) Item Number",
      },
      {
        name: "Drill 3 (Long) Link to Purchase",
        text: "Drill 3 (Long) Link to Purchase",
      },
      {
        name: "Drill 3 (Long) Manufacturer Recommendations",
        text: "Drill 3 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Extra Short) Name",
        text: "Drill 4 (Extra Short) Name",
      },
      {
        name: "Drill 4 (Extra Short) Item Number",
        text: "Drill 4 (Extra Short) Item Number",
      },
      {
        name: "Drill 4 (Extra Short) Link to Purchase",
        text: "Drill 4 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 4 (Extra Short) Manufacturer Recommendations",
        text: "Drill 4 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Short) Name",
        text: "Drill 4 (Short) Name",
      },
      {
        name: "Drill 4 (Short) Item Number",
        text: "Drill 4 (Short) Item Number",
      },
      {
        name: "Drill 4 (Short) Link to Purchase",
        text: "Drill 4 (Short) Link to Purchase",
      },
      {
        name: "Drill 4 (Short) Manufacturer Recommendations",
        text: "Drill 4 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Standard / Medium) Name",
        text: "Drill 4 (Standard / Medium) Name",
      },
      {
        name: "Drill 4 (Standard / Medium) Item Number",
        text: "Drill 4 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 4 (Standard / Medium) Link to Purchase",
        text: "Drill 4 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 4 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 4 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 4 (Long) Name",
        text: "Drill 4 (Long) Name",
      },
      {
        name: "Drill 4 (Long) Item Number",
        text: "Drill 4 (Long) Item Number",
      },
      {
        name: "Drill 4 (Long) Link to Purchase",
        text: "Drill 4 (Long) Link to Purchase",
      },
      {
        name: "Drill 4 (Long) Manufacturer Recommendations",
        text: "Drill 4 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Extra Short) Name",
        text: "Drill 5 (Extra Short) Name",
      },
      {
        name: "Drill 5 (Extra Short) Item Number",
        text: "Drill 5 (Extra Short) Item Number",
      },
      {
        name: "Drill 5 (Extra Short) Link to Purchase",
        text: "Drill 5 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 5 (Extra Short) Manufacturer Recommendations",
        text: "Drill 5 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Short) Name",
        text: "Drill 5 (Short) Name",
      },
      {
        name: "Drill 5 (Short) Item Number",
        text: "Drill 5 (Short) Item Number",
      },
      {
        name: "Drill 5 (Short) Link to Purchase",
        text: "Drill 5 (Short) Link to Purchase",
      },
      {
        name: "Drill 5 (Short) Manufacturer Recommendations",
        text: "Drill 5 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Standard / Medium) Name",
        text: "Drill 5 (Standard / Medium) Name",
      },
      {
        name: "Drill 5 (Standard / Medium) Item Number",
        text: "Drill 5 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 5 (Standard / Medium) Link to Purchase",
        text: "Drill 5 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 5 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 5 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 5 (Long) Name",
        text: "Drill 5 (Long) Name",
      },
      {
        name: "Drill 5 (Long) Item Number",
        text: "Drill 5 (Long) Item Number",
      },
      {
        name: "Drill 5 (Long) Link to Purchase",
        text: "Drill 5 (Long) Link to Purchase",
      },
      {
        name: "Drill 5 (Long) Manufacturer Recommendations",
        text: "Drill 5 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Extra Short) Name",
        text: "Drill 6 (Extra Short) Name",
      },
      {
        name: "Drill 6 (Extra Short) Item Number",
        text: "Drill 6 (Extra Short) Item Number",
      },
      {
        name: "Drill 6 (Extra Short) Link to Purchase",
        text: "Drill 6 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 6 (Extra Short) Manufacturer Recommendations",
        text: "Drill 6 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Short) Name",
        text: "Drill 6 (Short) Name",
      },
      {
        name: "Drill 6 (Short) Item Number",
        text: "Drill 6 (Short) Item Number",
      },
      {
        name: "Drill 6 (Short) Link to Purchase",
        text: "Drill 6 (Short) Link to Purchase",
      },
      {
        name: "Drill 6 (Short) Manufacturer Recommendations",
        text: "Drill 6 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Standard / Medium) Name",
        text: "Drill 6 (Standard / Medium) Name",
      },
      {
        name: "Drill 6 (Standard / Medium) Item Number",
        text: "Drill 6 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 6 (Standard / Medium) Link to Purchase",
        text: "Drill 6 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 6 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 6 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 6 (Long) Name",
        text: "Drill 6 (Long) Name",
      },
      {
        name: "Drill 6 (Long) Item Number",
        text: "Drill 6 (Long) Item Number",
      },
      {
        name: "Drill 6 (Long) Link to Purchase",
        text: "Drill 6 (Long) Link to Purchase",
      },
      {
        name: "Drill 6 (Long) Manufacturer Recommendations",
        text: "Drill 6 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Extra Short) Name",
        text: "Drill 7 (Extra Short) Name",
      },
      {
        name: "Drill 7 (Extra Short) Item Number",
        text: "Drill 7 (Extra Short) Item Number",
      },
      {
        name: "Drill 7 (Extra Short) Link to Purchase",
        text: "Drill 7 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 7 (Extra Short) Manufacturer Recommendations",
        text: "Drill 7 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Short) Name",
        text: "Drill 7 (Short) Name",
      },
      {
        name: "Drill 7 (Short) Item Number",
        text: "Drill 7 (Short) Item Number",
      },
      {
        name: "Drill 7 (Short) Link to Purchase",
        text: "Drill 7 (Short) Link to Purchase",
      },
      {
        name: "Drill 7 (Short) Manufacturer Recommendations",
        text: "Drill 7 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Standard / Medium) Name",
        text: "Drill 7 (Standard / Medium) Name",
      },
      {
        name: "Drill 7 (Standard / Medium) Item Number",
        text: "Drill 7 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 7 (Standard / Medium) Link to Purchase",
        text: "Drill 7 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 7 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 7 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 7 (Long) Name",
        text: "Drill 7 (Long) Name",
      },
      {
        name: "Drill 7 (Long) Item Number",
        text: "Drill 7 (Long) Item Number",
      },
      {
        name: "Drill 7 (Long) Link to Purchase",
        text: "Drill 7 (Long) Link to Purchase",
      },
      {
        name: "Drill 7 (Long) Manufacturer Recommendations",
        text: "Drill 7 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Extra Short) Name",
        text: "Drill 8 (Extra Short) Name",
      },
      {
        name: "Drill 8 (Extra Short) Item Number",
        text: "Drill 8 (Extra Short) Item Number",
      },
      {
        name: "Drill 8 (Extra Short) Link to Purchase",
        text: "Drill 8 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 8 (Extra Short) Manufacturer Recommendations",
        text: "Drill 8 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Short) Name",
        text: "Drill 8 (Short) Name",
      },
      {
        name: "Drill 8 (Short) Item Number",
        text: "Drill 8 (Short) Item Number",
      },
      {
        name: "Drill 8 (Short) Link to Purchase",
        text: "Drill 8 (Short) Link to Purchase",
      },
      {
        name: "Drill 8 (Short) Manufacturer Recommendations",
        text: "Drill 8 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Standard / Medium) Name",
        text: "Drill 8 (Standard / Medium) Name",
      },
      {
        name: "Drill 8 (Standard / Medium) Item Number",
        text: "Drill 8 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 8 (Standard / Medium) Link to Purchase",
        text: "Drill 8 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 8 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 8 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 8 (Long) Name",
        text: "Drill 8 (Long) Name",
      },
      {
        name: "Drill 8 (Long) Item Number",
        text: "Drill 8 (Long) Item Number",
      },
      {
        name: "Drill 8 (Long) Link to Purchase",
        text: "Drill 8 (Long) Link to Purchase",
      },
      {
        name: "Drill 8 (Long) Manufacturer Recommendations",
        text: "Drill 8 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Extra Short) Name",
        text: "Drill 9 (Extra Short) Name",
      },
      {
        name: "Drill 9 (Extra Short) Item Number",
        text: "Drill 9 (Extra Short) Item Number",
      },
      {
        name: "Drill 9 (Extra Short) Link to Purchase",
        text: "Drill 9 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 9 (Extra Short) Manufacturer Recommendations",
        text: "Drill 9 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Short) Name",
        text: "Drill 9 (Short) Name",
      },
      {
        name: "Drill 9 (Short) Item Number",
        text: "Drill 9 (Short) Item Number",
      },
      {
        name: "Drill 9 (Short) Link to Purchase",
        text: "Drill 9 (Short) Link to Purchase",
      },
      {
        name: "Drill 9 (Short) Manufacturer Recommendations",
        text: "Drill 9 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Standard / Medium) Name",
        text: "Drill 9 (Standard / Medium) Name",
      },
      {
        name: "Drill 9 (Standard / Medium) Item Number",
        text: "Drill 9 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 9 (Standard / Medium) Link to Purchase",
        text: "Drill 9 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 9 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 9 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 9 (Long) Name",
        text: "Drill 9 (Long) Name",
      },
      {
        name: "Drill 9 (Long) Item Number",
        text: "Drill 9 (Long) Item Number",
      },
      {
        name: "Drill 9 (Long) Link to Purchase",
        text: "Drill 9 (Long) Link to Purchase",
      },
      {
        name: "Drill 9 (Long) Manufacturer Recommendations",
        text: "Drill 9 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Extra Short) Name",
        text: "Drill 10 (Extra Short) Name",
      },
      {
        name: "Drill 10 (Extra Short) Item Number",
        text: "Drill 10 (Extra Short) Item Number",
      },
      {
        name: "Drill 10 (Extra Short) Link to Purchase",
        text: "Drill 10 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 10 (Extra Short) Manufacturer Recommendations",
        text: "Drill 10 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Short) Name",
        text: "Drill 10 (Short) Name",
      },
      {
        name: "Drill 10 (Short) Item Number",
        text: "Drill 10 (Short) Item Number",
      },
      {
        name: "Drill 10 (Short) Link to Purchase",
        text: "Drill 10 (Short) Link to Purchase",
      },
      {
        name: "Drill 10 (Short) Manufacturer Recommendations",
        text: "Drill 10 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Standard / Medium) Name",
        text: "Drill 10 (Standard / Medium) Name",
      },
      {
        name: "Drill 10 (Standard / Medium) Item Number",
        text: "Drill 10 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 10 (Standard / Medium) Link to Purchase",
        text: "Drill 10 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 10 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 10 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 10 (Long) Name",
        text: "Drill 10 (Long) Name",
      },
      {
        name: "Drill 10 (Long) Item Number",
        text: "Drill 10 (Long) Item Number",
      },
      {
        name: "Drill 10 (Long) Link to Purchase",
        text: "Drill 10 (Long) Link to Purchase",
      },
      {
        name: "Drill 10 (Long) Manufacturer Recommendations",
        text: "Drill 10 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Extra Short) Name",
        text: "Drill 11 (Extra Short) Name",
      },
      {
        name: "Drill 11 (Extra Short) Item Number",
        text: "Drill 11 (Extra Short) Item Number",
      },
      {
        name: "Drill 11 (Extra Short) Link to Purchase",
        text: "Drill 11 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 11 (Extra Short) Manufacturer Recommendations",
        text: "Drill 11 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Short) Name",
        text: "Drill 11 (Short) Name",
      },
      {
        name: "Drill 11 (Short) Item Number",
        text: "Drill 11 (Short) Item Number",
      },
      {
        name: "Drill 11 (Short) Link to Purchase",
        text: "Drill 11 (Short) Link to Purchase",
      },
      {
        name: "Drill 11 (Short) Manufacturer Recommendations",
        text: "Drill 11 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Standard / Medium) Name",
        text: "Drill 11 (Standard / Medium) Name",
      },
      {
        name: "Drill 11 (Standard / Medium) Item Number",
        text: "Drill 11 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 11 (Standard / Medium) Link to Purchase",
        text: "Drill 11 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 11 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 11 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 11 (Long) Name",
        text: "Drill 11 (Long) Name",
      },
      {
        name: "Drill 11 (Long) Item Number",
        text: "Drill 11 (Long) Item Number",
      },
      {
        name: "Drill 11 (Long) Link to Purchase",
        text: "Drill 11 (Long) Link to Purchase",
      },
      {
        name: "Drill 11 (Long) Manufacturer Recommendations",
        text: "Drill 11 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Extra Short) Name",
        text: "Drill 12 (Extra Short) Name",
      },
      {
        name: "Drill 12 (Extra Short) Item Number",
        text: "Drill 12 (Extra Short) Item Number",
      },
      {
        name: "Drill 12 (Extra Short) Link to Purchase",
        text: "Drill 12 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 12 (Extra Short) Manufacturer Recommendations",
        text: "Drill 12 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Short) Name",
        text: "Drill 12 (Short) Name",
      },
      {
        name: "Drill 12 (Short) Item Number",
        text: "Drill 12 (Short) Item Number",
      },
      {
        name: "Drill 12 (Short) Link to Purchase",
        text: "Drill 12 (Short) Link to Purchase",
      },
      {
        name: "Drill 12 (Short) Manufacturer Recommendations",
        text: "Drill 12 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Standard / Medium) Name",
        text: "Drill 12 (Standard / Medium) Name",
      },
      {
        name: "Drill 12 (Standard / Medium) Item Number",
        text: "Drill 12 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 12 (Standard / Medium) Link to Purchase",
        text: "Drill 12 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 12 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 12 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 12 (Long) Name",
        text: "Drill 12 (Long) Name",
      },
      {
        name: "Drill 12 (Long) Item Number",
        text: "Drill 12 (Long) Item Number",
      },
      {
        name: "Drill 12 (Long) Link to Purchase",
        text: "Drill 12 (Long) Link to Purchase",
      },
      {
        name: "Drill 12 (Long) Manufacturer Recommendations",
        text: "Drill 12 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 Name (Extra Short)",
        text: "Drill 13 Name (Extra Short)",
      },
      {
        name: "Drill 13 (Extra Short) Item Number",
        text: "Drill 13 (Extra Short) Item Number",
      },
      {
        name: "Drill 13 (Extra Short) Link to Purchase",
        text: "Drill 13 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 13 (Extra Short) Manufacturer Recommendations",
        text: "Drill 13 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Short) Name",
        text: "Drill 13 (Short) Name",
      },
      {
        name: "Drill 13 (Short) Item Number",
        text: "Drill 13 (Short) Item Number",
      },
      {
        name: "Drill 13 (Short) Link to Purchase",
        text: "Drill 13 (Short) Link to Purchase",
      },
      {
        name: "Drill 13 (Short) Manufacturer Recommendations",
        text: "Drill 13 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Standard / Medium) Name",
        text: "Drill 13 (Standard / Medium) Name",
      },
      {
        name: "Drill 13 (Standard / Medium) Item Number",
        text: "Drill 13 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 13 (Standard / Medium) Link to Purchase",
        text: "Drill 13 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 13 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 13 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 13 (Long) Name",
        text: "Drill 13 (Long) Name",
      },
      {
        name: "Drill 13 (Long) Item Number",
        text: "Drill 13 (Long) Item Number",
      },
      {
        name: "Drill 13 (Long) Link to Purchase",
        text: "Drill 13 (Long) Link to Purchase",
      },
      {
        name: "Drill 13 (Long) Manufacturer Recommendations",
        text: "Drill 13 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Extra Short) Name",
        text: "Drill 14 (Extra Short) Name",
      },
      {
        name: "Drill 14 (Extra Short) Item Number",
        text: "Drill 14 (Extra Short) Item Number",
      },
      {
        name: "Drill 14 (Extra Short) Link to Purchase",
        text: "Drill 14 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 14 (Extra Short) Manufacturer Recommendations",
        text: "Drill 14 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Short) Name",
        text: "Drill 14 (Short) Name",
      },
      {
        name: "Drill 14 (Short) Item Number",
        text: "Drill 14 (Short) Item Number",
      },
      {
        name: "Drill 14 (Short) Link to Purchase",
        text: "Drill 14 (Short) Link to Purchase",
      },
      {
        name: "Drill 14 (Short) Manufacturer Recommendations",
        text: "Drill 14 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Standard / Medium) Name",
        text: "Drill 14 (Standard / Medium) Name",
      },
      {
        name: "Drill 14 (Standard / Medium) Item Number",
        text: "Drill 14 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 14 (Standard / Medium) Link to Purchase",
        text: "Drill 14 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 14 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 14 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 14 (Long) Name",
        text: "Drill 14 (Long) Name",
      },
      {
        name: "Drill 14 (Long) Item Number",
        text: "Drill 14 (Long) Item Number",
      },
      {
        name: "Drill 14 (Long) Link to Purchase",
        text: "Drill 14 (Long) Link to Purchase",
      },
      {
        name: "Drill 14 (Long) Manufacturer Recommendations",
        text: "Drill 14 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Extra Short) Name",
        text: "Drill 15 (Extra Short) Name",
      },
      {
        name: "Drill 15 (Extra Short) Item Number",
        text: "Drill 15 (Extra Short) Item Number",
      },
      {
        name: "Drill 15 (Extra Short) Link to Purchase",
        text: "Drill 15 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 15 (Extra Short) Manufacturer Recommendations",
        text: "Drill 15 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Short) Name",
        text: "Drill 15 (Short) Name",
      },
      {
        name: "Drill 15 (Short) Item Number",
        text: "Drill 15 (Short) Item Number",
      },
      {
        name: "Drill 15 (Short) Link to Purchase",
        text: "Drill 15 (Short) Link to Purchase",
      },
      {
        name: "Drill 15 (Short) Manufacturer Recommendations",
        text: "Drill 15 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Standard / Medium) Name",
        text: "Drill 15 (Standard / Medium) Name",
      },
      {
        name: "Drill 15 (Standard / Medium) Item Number",
        text: "Drill 15 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 15 (Standard / Medium) Link to Purchase",
        text: "Drill 15 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 15 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 15 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 15 (Long) Name",
        text: "Drill 15 (Long) Name",
      },
      {
        name: "Drill 15 (Long) Item Number",
        text: "Drill 15 (Long) Item Number",
      },
      {
        name: "Drill 15 (Long) Link to Purchase",
        text: "Drill 15 (Long) Link to Purchase",
      },
      {
        name: "Drill 15 (Long) Manufacturer Recommendations",
        text: "Drill 15 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Extra Short) Name",
        text: "Drill 16 (Extra Short) Name",
      },
      {
        name: "Drill 16 (Extra Short) Item Number",
        text: "Drill 16 (Extra Short) Item Number",
      },
      {
        name: "Drill 16 (Extra Short) Link to Purchase",
        text: "Drill 16 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 16 (Extra Short) Manufacturer Recommendations",
        text: "Drill 16 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Short) Name",
        text: "Drill 16 (Short) Name",
      },
      {
        name: "Drill 16 (Short) Item Number",
        text: "Drill 16 (Short) Item Number",
      },
      {
        name: "Drill 16 (Short) Link to Purchase",
        text: "Drill 16 (Short) Link to Purchase",
      },
      {
        name: "Drill 16 (Short) Manufacturer Recommendations",
        text: "Drill 16 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Standard / Medium) Name",
        text: "Drill 16 (Standard / Medium) Name",
      },
      {
        name: "Drill 16 (Standard / Medium) Item Number",
        text: "Drill 16 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 16 (Standard / Medium) Link to Purchase",
        text: "Drill 16 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 16 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 16 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 16 (Long) Name",
        text: "Drill 16 (Long) Name",
      },
      {
        name: "Drill 16 (Long) Item Number",
        text: "Drill 16 (Long) Item Number",
      },
      {
        name: "Drill 16 (Long) Link to Purchase",
        text: "Drill 16 (Long) Link to Purchase",
      },
      {
        name: "Drill 16 (Long) Manufacturer Recommendations",
        text: "Drill 16 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Extra Short) Name",
        text: "Drill 17 (Extra Short) Name",
      },
      {
        name: "Drill 17 (Extra Short) Item Number",
        text: "Drill 17 (Extra Short) Item Number",
      },
      {
        name: "Drill 17 (Extra Short) Link to Purchase",
        text: "Drill 17 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 17 (Extra Short) Manufacturer Recommendations",
        text: "Drill 17 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Short) Name",
        text: "Drill 17 (Short) Name",
      },
      {
        name: "Drill 17 (Short) Item Number",
        text: "Drill 17 (Short) Item Number",
      },
      {
        name: "Drill 17 (Short) Link to Purchase",
        text: "Drill 17 (Short) Link to Purchase",
      },
      {
        name: "Drill 17 (Short) Manufacturer Recommendations",
        text: "Drill 17 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Standard / Medium) Name",
        text: "Drill 17 (Standard / Medium) Name",
      },
      {
        name: "Drill 17 (Standard / Medium) Item Number",
        text: "Drill 17 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 17 (Standard / Medium) Link to Purchase",
        text: "Drill 17 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 17 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 17 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 17 (Long) Name",
        text: "Drill 17 (Long) Name",
      },
      {
        name: "Drill 17 (Long) Item Number",
        text: "Drill 17 (Long) Item Number",
      },
      {
        name: "Drill 17 (Long) Link to Purchase",
        text: "Drill 17 (Long) Link to Purchase",
      },
      {
        name: "Drill 17 (Long) Manufacturer Recommendations",
        text: "Drill 17 (Long) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Extra Short) Name",
        text: "Drill 18 (Extra Short) Name",
      },
      {
        name: "Drill 18 (Extra Short) Item Number",
        text: "Drill 18 (Extra Short) Item Number",
      },
      {
        name: "Drill 18 (Extra Short) Link to Purchase",
        text: "Drill 18 (Extra Short) Link to Purchase",
      },
      {
        name: "Drill 18 (Extra Short) Manufacturer Recommendations",
        text: "Drill 18 (Extra Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Short) Name",
        text: "Drill 18 (Short) Name",
      },
      {
        name: "Drill 18 (Short) Item Number",
        text: "Drill 18 (Short) Item Number",
      },
      {
        name: "Drill 18 (Short) Link to Purchase",
        text: "Drill 18 (Short) Link to Purchase",
      },
      {
        name: "Drill 18 (Short) Manufacturer Recommendations",
        text: "Drill 18 (Short) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Standard / Medium) Name",
        text: "Drill 18 (Standard / Medium) Name",
      },
      {
        name: "Drill 18 (Standard / Medium) Item Number",
        text: "Drill 18 (Standard / Medium) Item Number",
      },
      {
        name: "Drill 18 (Standard / Medium) Link to Purchase",
        text: "Drill 18 (Standard / Medium) Link to Purchase",
      },
      {
        name: "Drill 18 (Standard / Medium) Manufacturer Recommendations",
        text: "Drill 18 (Standard / Medium) Manufacturer Recommendations",
      },
      {
        name: "Drill 18 (Long) Name",
        text: "Drill 18 (Long) Name",
      },
      {
        name: "Drill 18 (Long) Item Number",
        text: "Drill 18 (Long) Item Number",
      },
      {
        name: "Drill 18 (Long) Link to Purchase",
        text: "Drill 18 (Long) Link to Purchase",
      },
      {
        name: "Drill 18 (Long) Manufacturer Recommendations",
        text: "Drill 18 (Long) Manufacturer Recommendations",
      },
    ],
  },
  {
    type: "BoneReduction",
    label: "Bone Reduction Instruments",
    description:
      "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
    ],
    output: [
      {
        name: "Bur Kit Name (Bone Reduction)",
        text: "Bur Kit Name (Bone Reduction)",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Bur Kit (Bone Reduction) Link to Purchase",
        text: "Bur Kit (Bone Reduction) Link to Purchase",
      },
      {
        name: "Bur Kit (Denture Conversion) Name",
        text: "Bur Kit (Denture Conversion) Name",
      },
      {
        name: "Bur Kit (Denture Conversion) Link to Purchase",
        text: "Bur Kit (Denture Conversion) Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
      {
        name: "Notes_1",
        text: "Notes_1",
      },
    ],
  },
  {
    type: "RestorativeDirectToImplant",
    label: "Drivers (Restorative, Direct to Implant)",
    description:
      "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
      {
        name: "One Piece or Torque Attachment",
        text: "One Piece or Torque Attachment",
      },
      {
        name: "Driver Size",
        text: "Driver Size",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "RestorativeMultiUnitAbutments",
    label: "Drivers (Restorative, on Multi-Unit Abutments)",
    description:
      "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Machine or Manual",
        text: "Machine or Manual",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Diameter",
        text: "Diameter",
      },
      {
        name: "One Piece or Torque Attachment",
        text: "One Piece or Torque Attachment",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "HealingAbutments",
    label: "Healing Abutments",
    description:
      "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
      {
        name: "Abutment Material",
        text: "Abutment Material",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ImplantAnalogs",
    label: "Implant Analogs",
    description:
      "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Digital or Lab Analog",
        text: "Digital or Lab Analog",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ImplantScrews",
    label: "Implant Screws",
    description:
      "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Restoration Connection Type",
        text: "Restoration Connection Type",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Anterior or Posterior",
        text: "Anterior or Posterior",
      },
      {
        name: "Screw Length",
        text: "Screw Length",
      },
      {
        name: "Screw Material",
        text: "Screw Material",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Type of Head",
        text: "Type of Head",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "Implants",
    label: "Implants",
    description:
      "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Mount Option",
        text: "Mount Option",
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ImpressingCopingsDirectToImplants",
    label: "Impression Copings (Direct to Implant)",
    description:
      "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Impression Coping Diameter",
        text: "Impression Coping Diameter",
      },
      {
        name: "Impression Coping Design",
        text: "Impression Coping Design",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ImpressingCopingsMUAs",
    label: "Impression Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Open or Closed Tray",
        text: "Open or Closed Tray",
      },
      {
        name: "Impression Coping Length",
        text: "Impression Coping Length",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Fixation",
        text: "Fixation",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "MUAs",
    label: "Multi-Unit Abutments",
    description:
      "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Abutment Engaging Type",
        text: "Abutment Engaging Type",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Implant or Abutment Level",
        text: "Implant or Abutment Level",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ScanbodyMUAs",
    label: "Scanbodies (Multi-Unit Abutments)",
    description:
      "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Authentic or Generic",
        text: "Authentic or Generic",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
    ],
    output: [
      {
        name: "Manufacturer Name",
        text: "Manufacturer Name",
      },
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ScanbodyDriversDirectToImplants",
    label: "Scanbody Drivers (Direct to Implant)",
    description:
      "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ScanbodyDriversMUAs",
    label: "Scanbody Drivers (MUAs)",
    description:
      "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Implant Form",
        text: "Implant Form",
      },
      {
        name: "Design",
        text: "Design",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "StockAbutments",
    label: "Stock Abutments",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Impression Type",
        text: "Impression Type",
      },
      {
        name: "Fixation",
        text: "Fixation",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Emergence Profile",
        text: "Emergence Profile",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "TemporaryCopingsDirectToImplants",
    label: "Temporary Copings (Direct to Implant)",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Abutment Angulation",
        text: "Abutment Angulation",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Restoration Material",
        text: "Restoration Material",
      },
      {
        name: "Temporary Coping Height",
        text: "Temporary Coping Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "TemporaryCopingsMUAs",
    label: "Temporary Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Restoration Type",
        text: "Restoration Type",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Length",
        text: "Length",
      },
      {
        name: "Diameter",
        text: "Diameter",
      },
      {
        name: "Hexed or Non-Hexed",
        text: "Hexed or Non-Hexed",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "TiBasesDirectToImplants",
    label: "Ti Bases (Direct to Implant)",
    description:
      "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Connection Type",
        text: "Connection Type",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Cementable Area",
        text: "Cementable Area",
      },
      {
        name: "Material",
        text: "Material",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "TiBasesMUAs",
    label: "Ti Bases (Multi-Unit Abutments)",
    description:
      "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Engaging or Non-Engaging",
        text: "Engaging or Non-Engaging",
      },
      {
        name: "MUA Type",
        text: "MUA Type",
      },
      {
        name: "Connection",
        text: "Connection",
      },
      {
        name: "Abutment Diameter",
        text: "Abutment Diameter",
      },
      {
        name: "Abutment Height",
        text: "Abutment Height",
      },
      {
        name: "Collar Height",
        text: "Collar Height",
      },
      {
        name: "Angulation",
        text: "Angulation",
      },
      {
        name: "Material",
        text: "Material",
      },
    ],
    output: [
      {
        name: "Item Name",
        text: "Item Name",
      },
      {
        name: "Item Number",
        text: "Item Number",
      },
      {
        name: "Link to Purchase",
        text: "Link to Purchase",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ImplantTorquesGuide",
    label: "Implant Torque Guide",
    description: "",
    input: [
      {
        name: "Implant Brand",
        text: "Implant Brand",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
      },
      {
        name: "Product, Component, or Procedure",
        text: "Product, Component, or Procedure",
      },
    ],
    output: [
      {
        name: "Torque Value",
        text: "Torque Value",
      },
      {
        name: "Notes",
        text: "Notes",
      },
    ],
  },
  {
    type: "ToothBorneBridge",
    label: "Tooth-Borne Bridge",
    description: "",
    input: [
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Region",
        text: "Region",
      },
      {
        name: "Number of Units",
        text: "Number of Units",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the preparation have retention and resistance form?",
        text: "Does the preparation have retention and resistance form?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal space?",
        text: "Does this site have limited occlusal space?",
      },
      {
        name: "Is the stump shade light or dark?",
        text: "Is the stump shade light or dark?",
      },
    ],
    output: [
      {
        name: "Recommended Bridge Material",
        text: "Recommended Bridge Material",
      },
      {
        name: "Recommended Bridge Material Reasoning",
        text: "Recommended Bridge Material Reasoning",
      },
      {
        name: "Recommended Bridge Material Supporting Article",
        text: "Recommended Bridge Material Supporting Article",
      },
      {
        name: "Second Material Choice",
        text: "Second Material Choice",
      },
      {
        name: "Third Material Choice",
        text: "Third Material Choice",
      },
    ],
  },
  {
    type: "ToothBorneCrown",
    label: "Tooth-Borne Crown",
    description: "",
    input: [
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Tooth Category",
        text: "Tooth Category",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the preparation have retention and resistance form?",
        text: "Does the preparation have retention and resistance form?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal space?",
        text: "Does this site have limited occlusal space?",
      },
      {
        name: "Is the stump shade light or dark?",
        text: "Is the stump shade light or dark?",
      },
    ],
    output: [
      {
        name: "Recommended Crown Material",
        text: "Recommended Crown Material",
      },
      {
        name: "Recommended Crown Material Reasoning",
        text: "Recommended Crown Material Reasoning",
      },
      {
        name: "Recommended Crown Material Supporting Article",
        text: "Recommended Crown Material Supporting Article",
      },
      {
        name: "Second Material Choice",
        text: "Second Material Choice",
      },
      {
        name: "Third Material Choice",
        text: "Third Material Choice",
      },
    ],
  },
  {
    type: "ImplantBorneBridge",
    label: "Implant-Borne Bridge",
    description: "",
    input: [
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Region",
        text: "Region",
      },
      {
        name: "Number of Units",
        text: "Number of Units",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the patient have a thin gingival biotype?",
        text: "Does the patient have a thin gingival biotype?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal space?",
        text: "Does this site have limited occlusal space?",
      },
      {
        name: "Does the patient practice good oral hygiene?",
        text: "Does the patient practice good oral hygiene?",
      },
      {
        name: "Is the implant angulated?",
        text: "Is the implant angulated?",
      },
      {
        name: "Does the patient have allergies or sensitivities?",
        text: "Does the patient have allergies or sensitivities?",
      },
    ],
    output: [
      {
        name: "Recommended Single Unit Abutment Material",
        text: "Recommended Single Unit Abutment Material",
      },
      {
        name: "Recommended Single Unit Abutment Reasoning",
        text: "Recommended Single Unit Abutment Reasoning",
      },
      {
        name: "Recommended Single Unit Abutment Supporting Article",
        text: "Recommended Single Unit Abutment Supporting Article",
      },
      {
        name: "Recommended Multi-Unit Abutment (MUA) Material",
        text: "Recommended Multi-Unit Abutment (MUA) Material",
      },
      {
        name: "Recommended Multi-Unit Abutment (MUA) Material Reasoning",
        text: "Recommended Multi-Unit Abutment (MUA) Material Reasoning",
      },
      {
        name: "Recommended Multi-Unit Abutment (MUA) Material Supporting Article",
        text: "Recommended Multi-Unit Abutment (MUA) Material Supporting Article",
      },
      {
        name: "Recommended Restoration Design",
        text: "Recommended Restoration Design",
      },
      {
        name: "Recommended Restoration Design Reasoning",
        text: "Recommended Restoration Design Reasoning",
      },
      {
        name: "Recommended Restoration Design Supporting Article",
        text: "Recommended Restoration Design Supporting Article",
      },
      {
        name: "Recommended Implant Bridge Material",
        text: "Recommended Implant Bridge Material",
      },
      {
        name: "Recommended Implant Bridge Material Reasoning",
        text: "Recommended Implant Bridge Material Reasoning",
      },
      {
        name: "Recommended Implant Bridge Material Supporting Article",
        text: "Recommended Implant Bridge Material Supporting Article",
      },
      {
        name: "Second Recommended Single Unit Abutment Material",
        text: "Second Recommended Single Unit Abutment Material",
      },
      {
        name: "Second Recommended Restoration Design",
        text: "Second Recommended Restoration Design",
      },
      {
        name: "Second Recommended Implant Bridge Material",
        text: "Second Recommended Implant Bridge Material",
      },
    ],
  },
  {
    type: "ImplantBorneCrown",
    label: "Implant-Borne Crown",
    description: "",
    input: [
      {
        name: "Maxilla / Mandible",
        text: "Maxilla / Mandible",
      },
      {
        name: "Tooth Category",
        text: "Tooth Category",
      },
      {
        name: "Are aesthetics a top priority?",
        text: "Are aesthetics a top priority?",
      },
      {
        name: "Does the patient have a thin gingival biotype?",
        text: "Does the patient have a thin gingival biotype?",
      },
      {
        name: "Are neighboring teeth translucent?",
        text: "Are neighboring teeth translucent?",
      },
      {
        name: "Does the patient have a high occlusal load?",
        text: "Does the patient have a high occlusal load?",
      },
      {
        name: "Does this site have limited occlusal space?",
        text: "Does this site have limited occlusal space?",
      },
      {
        name: "Does the patient practice good oral hygiene?",
        text: "Does the patient practice good oral hygiene?",
      },
      {
        name: "Is the implant angulated?",
        text: "Is the implant angulated?",
      },
      {
        name: "Does the patient have allergies or sensitivities?",
        text: "Does the patient have allergies or sensitivities?",
      },
    ],
    output: [
      {
        name: "Recommended Abutment Material",
        text: "Recommended Abutment Material",
      },
      {
        name: "Recommended Abutment Material Reasoning",
        text: "Recommended Abutment Material Reasoning",
      },
      {
        name: "Recommended Abutment Material Supporting Article",
        text: "Recommended Abutment Material Supporting Article",
      },
      {
        name: "Recommended Restoration Design",
        text: "Recommended Restoration Design",
      },
      {
        name: "Recommended Restoration Design Reasoning",
        text: "Recommended Restoration Design Reasoning",
      },
      {
        name: "Recommended Restoration Design Supporting Article",
        text: "Recommended Restoration Design Supporting Article",
      },
      {
        name: "Recommended Crown Material",
        text: "Recommended Crown Material",
      },
      {
        name: "Recommended Crown Material Reasoning",
        text: "Recommended Crown Material Reasoning",
      },
      {
        name: "Recommended Crown Material Supporting Article",
        text: "Recommended Crown Material Supporting Article",
      },
      {
        name: "Second Abutment Material Choice",
        text: "Second Abutment Material Choice",
      },
      {
        name: "Second Restoration Design Choice",
        text: "Second Restoration Design Choice",
      },
      {
        name: "Second Crown Material Choice",
        text: "Second Crown Material Choice",
      },
    ],
  },
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

export const CALCULATORS = CALCULATOR_IO.filter((calc) => !calc.disabled).map(
  (calc) => ({
    id: calc.type,
    label: calc.label,
  })
);

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
