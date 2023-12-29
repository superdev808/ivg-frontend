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
const SITES: Site[] = Array(SITE_COUNT)
  .fill(null)
  .map((v, i) => {
    return { name: `Site ${i + 1}`, key: i + 1 };
  });
export const UPPER_SITES: Site[] = SITES.slice(0, 16);
export const LOWER_SITES: Site[] = SITES.slice(16, 32);

export interface InputDetail {
  id?: string;
  question: string;
  answer: string;
}

export interface Component {
  name: string;
  purchaseLink?: string;
  quantity?: number;
}

export interface ComponentDetail {
  label: string;
  component: Component[];
}

export interface SiteData {
  [key: string]: {
    inputDetails: InputDetail[];
    componentDetails?: ComponentDetail[];
  };
}

export interface InputOutputValues {
  name: string;
  text: string;
  calculator: string;
  outputFrom?: string;
}
export interface ProcedureRequest {
  type: PROCEDURES;
  input: InputOutputValues[];
  output: InputOutputValues[];
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
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Implant Model",
        text: "Implant Model",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Implant Diameter",
        text: "Implant Diameter",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Implant Platform",
        text: "Implant Platform",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Implant Length",
        text: "Implant Length",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Implant Surface Treatment",
        text: "Implant Surface Treatment",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Select Drill Kit",
        text: "Select Drill Kit",
        calculator: "Drill-Kit-and-Sequence-Calculator",
      },
      {
        name: "Will you perform bone reduction?",
        text: "Will you perform bone reduction?",
        calculator: "Bone-Reduction-Calculator",
        outputFrom: "Drill-Kit-and-Sequence-Calculator",
      },
    ],
    output: [],
  },
  [PROCEDURES.RESTORATIVE]: {
    type: PROCEDURES.RESTORATIVE,
    input: [],
    output: [],
  },
  [PROCEDURES.SURGERY_AND_RESTORATIVE]: {
    type: PROCEDURES.SURGERY_AND_RESTORATIVE,
    input: [],
    output: [],
  },
};
