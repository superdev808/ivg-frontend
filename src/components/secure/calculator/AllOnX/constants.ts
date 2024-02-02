export enum PROCEDURES {
  SURGERY = "Surgery",
  RESTORATIVE = "Restorative",
  SURGERY_AND_RESTORATIVE = "SurgeryAndRestorative",
}
export interface Procedure {
  name: string;
  value: PROCEDURES;
}
export const procedures: Procedure[] = [
  { name: "Surgery", value: PROCEDURES.SURGERY },
  { name: "Restorative", value: PROCEDURES.RESTORATIVE },
  {
    name: "Surgery and Restorative",
    value: PROCEDURES.SURGERY_AND_RESTORATIVE,
  },
];

export interface Site {
  name: string;
  key: number;
}
const SITE_COUNT: number = 32;
// Create an array of Site objects representing different sites.
// The array is initialized with SITE_COUNT number of elements and then mapped to generate Site objects.
const SITES: Site[] = Array(SITE_COUNT)
  .fill(null)
  .map((v, i) => {
    return { name: `Site ${i + 1}`, key: i + 1 };
  });

// Create two subsets of sites: UPPER_SITES and LOWER_SITES.
// UPPER_SITES contains the first 16 sites, and LOWER_SITES contains the next 16 sites.
export const UPPER_SITES: Site[] = SITES.slice(0, 16);
export const LOWER_SITES: Site[] = SITES.slice(16, 32);

export interface InputDetail {
  id?: string;
  question: string;
  answer: string;
}

export interface ItemInsights {
  id?: string;
  itemName: string;
  itemNumber?: string;
  link: string;
  quantity?: number;
}
export interface ItemData {
  id?: string;
  label: string;
  info: ItemInsights[];
}
export interface ComponentDetail {
  [key: string]: ItemData[];
}

export interface SiteData {
  [key: string]: {
    inputDetails: InputDetail[];
    componentDetails: ComponentDetail;
  };
}

export interface KeyValuePair {
  [key: string]: string;
}

export interface InputOutputValues {
  name: string;
  text: string;
  calculator: string;
  outputFrom?: string;
  isCommon?: boolean;
}

export interface AutoPopulateData {
  site: Site;
  questions: InputOutputValues[];
  answerOptions: string[][];
  answers: string[];
}

export interface RadioButtonOption {
  id: string;
  name: string;
  value: string;
}

export enum QUANTITY_VISIBILITY_STATE {
  HIDE,
  SHOW,
  EDITABLE,
}

export const AUTO_POPULATE_OPTIONS: RadioButtonOption[] = [
  {
    id: "Autopopulate1",
    name: "autopopulate",
    value: "Yes",
  },
  {
    id: "Autopopulate2",
    name: "autopopulate",
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

export const ignoreListForMultiples: string[] = [
  "implant drill kit name",
  "drill sequence",
  "implant driver",
  "bur kit name (bone reduction)",
  "mua driver",
  "luting agent",
  "teflon tape",
  "material to close screw access hole",
];

export const TEXT_DENTAL_IMPLANT_PROCEDURE =
  "Are you restoring with multi-unit abutments (MUAs) or directly to the implant?";

export const TEXT_MUA_STATUS =
  "Are the multi-unit abutments already connected to the implants?";

export const BRAND_IMAGES = {
  "AB Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/AB+Dental.png",
  "Ace Southern":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Ace+Southern.jpeg",
  Adin: "",
  AlfaGate:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/AlfaGate.png",
  "Alpha Bio Tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alpha+Bio+Tec.png",
  "American Dental Implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/American+Dental+Implant.jpeg",
  Argon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Argon.jpeg",
  "Avia Biomed":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Avia+Biomed.png",
  "B&W Implant System":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/B%26W+Implant+System.jpeg",
  BHI: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/BHI.webp",
  Bicon:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Bicon.png",
  BioHorizons:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/BioHorizons.png",
  Biomedical: "",
  "Biotech Dental USA": "",
  "Blue Sky Bio":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Blue+Sky+Bio.png",
  Camlog:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Camlog.png",
  Cortex:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Cortex.jpeg",
  "Cowellmedi Co. LTD":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Cowellmedi+Co.+LTD.jpeg",
  DSI: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/DSI.jpeg",
  "DSP Biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/DSP+Biomedical.jpeg",
  "Dental-Pro":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Dental-Pro.png",
  Dentis:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Dentis.jpg",
  Dentium:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Dentium.png",
  "Dentsply Sirona":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Dentsply+Sirona.svg",
  "Dio Implant":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Dio+Implant.png",
  "Ditron Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Ditron+Dental.jpeg",
  Euroteknika:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Euroteknika.webp",
  "GDT Dental Implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/GDT+Dental+Implants.png",
  GMI: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/GMI.png",
  Glidewell:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Glidewell.png",
  "Hi-Tec":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Hi-Tec.jpeg",
  "Hiossen (Osstem)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Hiossen+(Osstem).png",
  "I Do Biotech":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/I+Do+Biotech.png",
  "IBS Implant (Innobiosurg)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/IBS+Implant+(Innobiosurg).png",
  "Implant Club":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Implant+Club.png",
  "Implant Direct":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Implant+Direct.png",
  "Implant Logistics":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Implant+Logistics.jpeg",
  "Implant Part": "",
  "Implant Vision": "",
  JDentalCare:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/JDentalCare.jpeg",
  "Keystone Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Keystone+Dental.jpeg",
  "Little Implant Company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Little+Implant+Company.jpeg",
  MIS: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/MIS.png",
  MegaGen:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/MegaGen.jpeg",
  NeoBiotech:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/NeoBiotech.png",
  Neodent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Neodent.jpeg",
  Neoss:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Neoss.jpeg",
  "Nobel Biocare":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Nobel+Biocare.png",
  "Noris Medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Noris+Medical.png",
  Nova: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Nova.png",
  "Oco Biomedical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Oco+Biomedical.png",
  OsseoDent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/OsseoDent.webp",
  Osstem:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Osstem.jpeg",
  "OsteoReady LLC":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/OsteoReady+LLC.jpeg",
  "Paragon Implant Company":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Paragon+Implant+Company.webp",
  "Park Dental Implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Park+Dental+Implants.png",
  Ritter:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Ritter.png",
  "S.I.N.":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/S.I.N..jpeg",
  "SGS Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/SGS+Dental.png",
  "SIS (Shinhung Implant System)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/SIS+(Shinhung+Implant+System).png",
  "Sewon Medix":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Sewon+Medix.jpeg",
  "Sigma Impants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Sigma+Impants.webp",
  "Southern Implants":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Southern+Implants.jpg",
  "Steri-Oss":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Steri-Oss.png",
  Sterngold:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Sterngold.png",
  Straumann:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Straumann.png",
  Surgikor:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Surgikor.jpeg",
  "Sweden & Martina":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Sweden+%26+Martina.png",
  "Swiss Medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Swiss+Medical.png",
  Sydent:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Sydent.jpeg",
  "TAG Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/TAG+Dental.png",
  "Tatum Surgical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Tatum+Surgical.jpeg",
  "Thommen Medical":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Thommen+Medical.jpeg",
  "Trinon Titanium":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Trinon+Titanium.jpg",
  Uris: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Uris.png",
  ZimVie:
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "ZimVie (Biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "ZimVie (Biomet)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "ZimVie (Calcitek)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "ZimVie (Zimmer)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "Zimmer Dental":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  "Zimmer Dental (Biomet 3i)":
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/ZimVie.png",
  msdi: "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/msdi.png",
};
