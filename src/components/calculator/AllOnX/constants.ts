export interface Procedure {
  name: string;
  value: number;
}
export const procedures: Procedure[] = [
  { name: "Surgery", value: 1 },
  { name: "Restorative", value: 2 },
  { name: "Surgery and Restorative", value: 3 },
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
  id: string;
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

export const sitesData: SiteData = {
  "Site 1": {
    inputDetails: [
      {
        id: "1",
        question: "Implant Brand",
        answer: "Nobel",
      },
      {
        id: "2",
        question: "Implant Model",
        answer: "Active",
      },
      {
        id: "3",
        question: "Implant Diameter",
        answer: "3.0",
      },
      {
        id: "4",
        question: "Implant Platform",
        answer: "3.0",
      },
      {
        id: "5",
        question: "Implant Length",
        answer: "10mm",
      },
      {
        id: "6",
        question: "Implant Surface Treatment",
        answer: "TiUltra",
      },
      {
        id: "7",
        question: "Select Drill Kit",
        answer: "Pilot Guided",
      },
      {
        id: "8",
        question: "Will you perform bone reduction?",
        answer: "Yes",
      },
      {
        id: "9",
        question: "Select Driver",
        answer: "Machine",
      },
      {
        id: "10",
        question: "Do you need to purchase materials for chairside pick-up?",
        answer: "Yes",
      },
      {
        id: "11",
        question: "Do you need to purchase an implant?",
        answer: "Yes",
      },
    ],
  },
};
