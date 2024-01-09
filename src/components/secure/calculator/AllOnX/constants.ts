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

export interface InputOutputValues {
  name: string;
  text: string;
  calculator: string;
  outputFrom?: string;
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

export interface ProcedureRequest {
  type: PROCEDURES;
  input: InputOutputValues[];
}
interface RequestParams {
  [key: string]: ProcedureRequest;
}
export const ALLONX_REQUEST_PARAMS: RequestParams = {
  [PROCEDURES.SURGERY]: {
    type: PROCEDURES.SURGERY,
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
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Select Drill Kit",
        text: "Select Drill Kit",
        calculator: "DrillKitAndSequence",
      },
      {
        name: "Will you perform bone reduction?",
        text: "Will you perform bone reduction?",
        calculator: "BoneReduction",
        outputFrom: "DrillKitAndSequence",
      },
      {
        name: "Authentic or Generic?",
        text: "Authentic or Generic?",
        calculator: "MasterImplantDriver",
        outputFrom: "BoneReduction",
      },
      {
        name: "Abutment Type",
        text: "Abutment Type",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Driver Length",
        text: "Driver Length",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Machine or Manual?",
        text: "Machine or Manual?",
        calculator: "MasterImplantDriver",
      },
      {
        name: "Do you need to purchase materials for chairside pick-up?",
        text: "Do you need to purchase materials for chairside pick-up?",
        calculator: "ChairSidePickUp",
        outputFrom: "MasterImplantDriver",
      },
      {
        name: "Do you need to purchase an implant?",
        text: "Do you need to purchase an implant?",
        calculator: "ImplantPurchase",
        outputFrom: "ChairSidePickUp",
      },
      {
        name: "",
        text: "",
        calculator: "ImplantPurchase",
        outputFrom: "ImplantPurchase",
      },
    ],
  },
  [PROCEDURES.RESTORATIVE]: {
    type: PROCEDURES.RESTORATIVE,
    input: [],
  },
  [PROCEDURES.SURGERY_AND_RESTORATIVE]: {
    type: PROCEDURES.SURGERY_AND_RESTORATIVE,
    input: [],
  },
};

//TODO: Will be replaced by a function call to handle other colletions as well.
export const responseOrder: string[] = [
  "DrillKitAndSequence",
  "BoneReduction",
  "MasterImplantDriver",
  "ChairSidePickUp",
  "ImplantPurchase",
];
