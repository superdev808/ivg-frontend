import {
  KeyValuePair,
  PROCEDURE_COMBINATIONS,
  Procedure,
  PROCEDURE,
  ProcedureInputsAndResponse,
  RadioButtonOption,
  Site,
  CalculatorGroupItem,
  EXPLORE_DATA,
} from "@/types/calculators";

export const CALCULATOR_MAPPINGS: KeyValuePair = {
  ALL_ON_X_CALCULATOR: "All-on-X Ordering Guide",
  CUSTOM_COMBINATION: "Custom Combinations",
};

export const PROCEDURE_INPUTS_AND_RESPONSE: ProcedureInputsAndResponse = {
  [PROCEDURE_COMBINATIONS.SURGERY]: [
    "DrillKitsAndDrillSequences",
    "BoneReductionInstruments",
    "DriversRestorativeDirectToImplant",
    "ChairsidePickUpMaterials",
    "Implants",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_DIRECT_TO_IMPLANT]: [
    "ScanbodiesSingleUnit",
    "ScanbodyDriversDirectToImplant",
    "ImpressionCopingsDirectToImplant",
    "TemporaryCopingsDirectToImplant",
    "TiBasesDirectToImplant",
    "DriversRestorativeDirectToImplant",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED]: [
    "ScanbodiesMultiUnitAbutments",
    "ScanbodyDriversMUAs",
    "ImpressionCopingsMultiUnitAbutments",
    "TemporaryCopingsMultiUnitAbutments",
    "TiBasesMultiUnitAbutments",
    "MultiUnitAbutments",
    "DriversRestorativeOnMultiUnitAbutments",
    "DriversRestorativeDirectToImplant",
  ],
  [PROCEDURE_COMBINATIONS.RESTORATIVE_ON_MUAS_MUAS_PLACED]: [
    "ScanbodiesMultiUnitAbutments",
    "ScanbodyDriversMUAs",
    "ImpressionCopingsMultiUnitAbutments",
    "TemporaryCopingsMultiUnitAbutments",
    "TiBasesMultiUnitAbutments",
    "DriversRestorativeDirectToImplant",
  ],
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
      "DrillKitsAndDrillSequences",
      "DriversRestorativeDirectToImplant",
      "DriversRestorativeOnMultiUnitAbutments",
      "HealingAbutments",
      "Implants",
      "ImplantScrews",
      "ImplantTorqueGuide",
      "ImplantAnalogs",
      "ImpressionCopingsDirectToImplant",
      "ImpressionCopingsMultiUnitAbutments",
      "MultiUnitAbutments",
      "ScanbodiesSingleUnit",
      "ScanbodiesMultiUnitAbutments",
      "ScanbodyDriversDirectToImplant",
      "ScanbodyDriversMUAs",
      "StockAbutments",
      "TemporaryCopingsDirectToImplant",
      "TemporaryCopingsMultiUnitAbutments",
      "TiBasesDirectToImplant",
      "TiBasesMultiUnitAbutments",
      "BoneReductionInstruments",
      "ChairsidePickUpMaterials",
      "BondingEtching",
      "ScanRequirements",
      "PhysicalImpression",
      "IsolationTechniques",
      "ToothPreparation",
      "DentalSupplies",
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

export const INFORMATIONAL_CALCULATOR_TYPES = [
  "ImplantBorneBridge",
  "ImplantBorneCrown",
  "ToothBorneBridge",
  "ToothBorneCrown",
  "BondingEtching",
  "ScanRequirements",
  "PhysicalImpression",
  "IsolationTechniques",
  "ToothPreparation",
];

export const MATERIAL_CALCULATOR_TYPES = [
  "ImplantBorneBridge",
  "ImplantBorneCrown",
  "ToothBorneBridge",
  "ToothBorneCrown",
];

export const LINEAR_WORKFLOWS = [
  "ImplantBorneCrownIssues",
  "ToothBorneCrownIssues",
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
  BoneReductionInstruments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Meisinger+Drill+Kit+ALV18.png",
  ChairsidePickUpMaterials:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Chairside+Pickup+Lufting.png",
  Implants:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+BL++Implant+RC+D+4.1mm+EL+8mm+0214508.png",
  MultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/MultiUnitAbutment_custom_truabutment_final.png",
  HealingAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Healing+Abutment+D+4.5mm+H+3mm+2213.png",
  ImplantAnalogs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+IOS+Model+Implant+Replica+Conical+RP+38190.png",
  ImplantTorqueGuide:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  ImpressionCopingsMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Impression+Coping+Open+Tray+Multi-Unit+29089.png",
  ImpressionCopingsDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TemporaryCopingsDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TemporaryCopingsMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Temporary+Coping+Multi-Unit+29046.png",
  TiBasesMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+30d+MUA+Plus+Conical+RP+H+3.5mm+38895.png",
  CoverScrew:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+RN+Closure+Cap+D+3.5mm+H+0mm+048371S.png",
  ImplantScrews:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Straumann+NC+Variobase+Abutment+Screw+0252921.png",
  TiBasesDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Zimmer+TSV+BellaTek+Express+Abutment+D4.5mm+H+4.75mm+Hexed+TE451.png",
  DriversRestorativeDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  DriversRestorativeOnMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Neodent+CM+Implant+Driver+Torque+Wrench+Long+105074.png",
  ScanbodiesSingleUnit:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Scanbody+DTI+Generic.png",
  ScanbodiesMultiUnitAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Scanbody+MUA+Generic.png",
  ScanbodyDriversMUAs:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  ScanbodyDriversDirectToImplant:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Nobel+Elos+Accurate+Screwdriver+Manual+Mini+0.9+Hex.png",
  DrillKitsAndDrillSequences:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Drill+Kit+Generic.png",
  StockAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Stock+Abutment+Generic.png",
  ToothBorneBridge:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Bridge.png",
  ToothBorneCrown:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Crown.png",
  ImplantBorneBridge:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Bridge+Implant.png",
  ImplantBorneCrown:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/Crown+Implant.png",
  ScanRequirements:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/scan+requirements.png",
  BondingEtching:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/how+to+cement.png",
  IsolationTechniques:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/isolation+techniques.png",
  ToothPreparation:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/tooth+preparation.png",
  PhysicalImpression:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/physical+impressions.png",
  LocatorAbutments:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/locator+abutment.png",
  Default:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/products/No+Image+BW.jpg",
};

// Please be careful when adding new mappings to this array
// The app finds the first element matching the regexp so you should care the order.
export const CALCULATOR_OUTPUT_MAPPING: [string, RegExp, string][] = [
  // For "CALCULATOR_GENERIC_OUTPUT_MAPPING"
  ["itemName", /name/gi, ""],
  ["itemNumber", /number/gi, ""],
  ["manufacturer", /manufacturer/gi, ""],
  ["manufacturerRecommendations", /Manufacturer Recommendations/gi, ""],
  ["torqueValue", /Torque Value/gi, ""],
  ["notes", /Notes/gi, ""],

  ["reasoning", /reasoning/gi, ""],
  ["supportingArticle", /supporting article/gi, ""],
  ["link", /Click to purchase/gi, ""],
  ["link", /Link to purchase/gi, ""],

  // For "MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING"
  [
    "secondRecommendedSingleUnitAbutmentMaterial",
    /Second Recommended Single Unit Abutment Material/gi,
    "",
  ],
  [
    "secondRecommendedRestorationDesign",
    /Second Recommended Restoration Design/gi,
    "",
  ],
  [
    "secondRecommendedImplantBridgeMaterial",
    /Second Recommended Implant Bridge Material/gi,
    "",
  ],
  ["secondAbutmentMaterialChoice", /Second Abutment Material Choice/gi, ""],
  ["secondRestorationDesignChoice", /Second Restoration Design Choice/gi, ""],
  ["secondCrownMaterialChoice", /Second Crown Material Choice/gi, ""],
  ["secondMaterialChoice", /Second Material Choice/gi, ""],
  ["thirdMaterialChoice", /Third Material Choice/gi, ""],

  // For "MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING"
  [
    "recommendedSingleUnitAbutmentMaterial",
    /Recommended Single Unit Abutment Material/gi,
    "material",
  ],
  [
    "recommendedMUAMaterial",
    /Recommended Multi\-Unit Abutment \(MUA\) Material/gi,
    "material",
  ],
  [
    "recommendedRestorationDesign",
    /Recommended Restoration Design/gi,
    "material",
  ],
  [
    "recommendedImplantBridgeMaterial",
    /Recommended Implant Bridge Material/gi,
    "material",
  ],
  [
    "recommendedAbutmentMaterial",
    /Recommended Abutment Material/gi,
    "material",
  ],
  ["recommendedCrownMaterial", /Recommended Crown Material/gi, "material"],
  ["recommendedBridgeMaterial", /Recommended Bridge Material/gi, "material"],
];

export const EXPLORE_ALL_DATA: EXPLORE_DATA[] = [
  {
    id: "procedures",
    name: "Procedures",
    description:
      "Clinical recommendations and techniques to maximize the success of each case.",
    sections: [
      {
        name: "Calculators",
        items: [
          {
            name: "Choosing the right restoration materials",
            openByDefault: true,
            items: [
              {
                name: "Crowns",
                items: [
                  {
                    name: "Implant-Borne",
                    href: "/calculators/ImplantBorneCrown",
                  },
                  {
                    name: "Tooth-Borne",
                    href: "/calculators/ToothBorneCrown",
                  },
                ],
              },
              {
                name: "Bridges",
                items: [
                  {
                    name: "Implant-Borne",
                    href: "/calculators/ImplantBorneBridge",
                  },
                  {
                    name: "Tooth-Borne",
                    href: "/calculators/ToothBorneBridge",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Workflows",
        items: [
          {
            name: "Intraoral Scanning",
            items: [
              {
                name: "Scan Requirements",
                href: "/calculators/ScanRequirements",
              },
            ],
          },
          {
            name: "Chairside Procedures",
            openByDefault: true,
            items: [
              {
                name: "How to cement and bond",
                href: "/calculators/BondingEtching",
              },
              {
                name: "Isolation Techniques and Tips",
                href: "/calculators/IsolationTechniques",
              },
              {
                name: "Keys to Successful Tooth Preparation",
                href: "/calculators/ToothPreparation",
              },
              {
                name: "Best Practices for Taking Physical Impressions",
                href: "/calculators/PhysicalImpression",
              },
            ],
          },
          {
            name: "Troubleshooting Case Issues",
            openByDefault: true,
            items: [
              {
                name: "Crowns",
                items: [
                  // {
                  //   name: "Implant-Borne",
                  //   href: "/calculators/ImplantBorneCrownIssues",
                  // },
                  {
                    name: "Tooth-Borne",
                    href: "/calculators/ToothBorneCrownIssues",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "components",
    name: "Components",
    description:
      "Your guide to using compatible components for all of your procedures.",
    sections: [
      {
        name: "Calculators",
        items: [
          {
            name: "Restorations on Implants",
            openByDefault: true,
            items: [
              {
                name: "Scanbodies",
                items: [
                  {
                    name: "Single-Unit Implant (Implant Level)",
                    href: "/calculators/ScanbodiesSingleUnit",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/ScanbodiesMultiUnitAbutments",
                  },
                ],
              },
              {
                name: "Scanbody Drivers",
                items: [
                  {
                    name: "Single-Unit Implant (Implant Level)",
                    href: "/calculators/ScanbodyDriversDirectToImplant",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/ScanbodyDriversMUAs",
                  },
                ],
              },
              {
                name: "Implant Drivers",
                items: [
                  {
                    name: "Single-Unit Implant (Implant Level)",
                    href: "/calculators/DriversRestorativeDirectToImplant",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/DriversRestorativeOnMultiUnitAbutments",
                  },
                ],
              },
              {
                name: "Implant Screws",
                isHighlighted: true,
                href: "/calculators/ImplantScrews",
              },
              {
                name: "Implant Analogs",
                isHighlighted: true,
                href: "/calculators/ImplantAnalogs",
              },
              {
                name: "Impression Copings",
                items: [
                  {
                    name: "Single Unit Implant (Implant Level)",
                    href: "/calculators/ImpressionCopingsDirectToImplant",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/ImpressionCopingsMultiUnitAbutments",
                  },
                ],
              },
              {
                name: "Temporary Copings",
                items: [
                  {
                    name: "Single Unit Implant (Implant Level)",
                    href: "/calculators/TemporaryCopingsDirectToImplant",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/TemporaryCopingsMultiUnitAbutments",
                  },
                ],
              },
              {
                name: "Abutments",
                items: [
                  {
                    name: "Locator Abutments",
                    href: "/calculators/LocatorAbutments",
                  },
                  {
                    name: "Multi-Unit Abutments (Abutment Level)",
                    href: "/calculators/MultiUnitAbutments",
                  },
                  {
                    name: "Stock Abutments",
                    href: "/calculators/StockAbutments",
                  },
                  {
                    name: "Titanium (Ti) Bases",
                    items: [
                      {
                        name: "Single Unit Implant (Implant Level)",
                        href: "/calculators/TiBasesDirectToImplant",
                      },
                      {
                        name: "Multi-Unit Abutments (Abutment Level)",
                        href: "/calculators/TiBasesMultiUnitAbutments",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Implant Surgery",
            openByDefault: true,
            items: [
              {
                name: "All-on-X Ordering Guide",
                href: "/calculators/All-on-X Ordering Guide",
              },
              {
                name: "Choosing Compatible Drill Kits and Drills",
                href: "/calculators/DrillKitsAndDrillSequences",
              },
              {
                name: "Healing Abutments",
                href: "/calculators/HealingAbutments",
              },
              { name: "Implants", href: "/calculators/Implants" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "supplies",
    name: "Recommended Supplies",
    sections: [
      {
        name: "Calculators",
        items: [
          {
            name: "Restorations on Implants",
            openByDefault: true,
            items: [
              {
                name: "Materials",
                items: [
                  {
                    name: "Chairside Pick-Up",
                    href: "/calculators/ChairsidePickUpMaterials",
                  },
                ],
              },
            ],
          },
          {
            name: "Implant Surgery",
            openByDefault: true,
            items: [
              {
                name: "Instruments",
                items: [
                  {
                    name: "Bone Reduction Burs",
                    href: "/calculators/BoneReductionInstruments",
                  },
                  {
                    name: "Choosing Compatible Drill Kits and Drills",
                    href: "/calculators/DrillKitsAndDrillSequences",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Common Supplies",
        items: [
          { name: "Adhesives / Liners" },
          { name: "Anesthesia" },
          { name: "Bite Registration" },
          { name: "Bleaching" },
          { name: "Bonding and Cementing" },
          { name: "Bone Reduction" },
          { name: "Building up Impression Trays" },
          { name: "Casting" },
          { name: "Chairside Pick-Up" },
          { name: "Denture Fabrication" },
          { name: "Diagnosis" },
          { name: "Dissolving Agent" },
          { name: "Endodontics" },
          { name: "First Aid" },
        ],
      },
    ],
  },
  {
    id: "favorites",
    name: "Customize + Favorites",
    description:
      "Build your own combination of calculators for easy purchase, export, and sharing; or use one pre-built by the Ivory Guide clinical team.",
    sections: [
      {
        name: "Custom",
        items: [
          {
            name: "All-on-X Ordering Guide",
            isHighlighted: true,
            href: "/calculators/All-on-X Ordering Guide",
          },
          {
            name: "Custom",
            isHighlighted: true,
            href: "/calculators/Custom Combinations",
          },
        ],
      },
      { name: "Favorites" },
    ],
  },
];

export const POPUP_TEXTS = [
  "Reasoning",
  "Supporting Article",
  "Notes",
  "Recommendation",
];
export const SHOULD_DISPLAY_TEXT_ONLY = "ShouldDisplayTextOnly";
