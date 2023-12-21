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

export interface Answer {
  item: string;
  purchaseLink?: string;
  quantity?: number;
}

export interface Questionnaire {
  id: string;
  question: string;
  answer: Answer[];
}

export interface SiteData {
  [key: string]: Questionnaire[];
}

export const sitesData: SiteData = {
  "Site 1": [
    {
      id: "1",
      question: "Implant Brand",
      answer: [
        {
          item: "Nobel",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      question: "Implant Model",
      answer: [
        {
          item: "Active",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      question: "Implant Diameter",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "4",
      question: "Implant Platform",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "5",
      question: "Implant Length",
      answer: [
        {
          item: "10mm",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "6",
      question: "Implant Surface Treatment",
      answer: [
        {
          item: "TiUltra",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "7",
      question: "Select Drill Kit",
      answer: [
        {
          item: "Pilot Guided",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "8",
      question: "Will you perform bone reduction?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "9",
      question: "Select Driver",
      answer: [
        {
          item: "Machine",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "10",
      question: "Do you need to purchase materials for chairside pick-up?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "11",
      question: "Do you need to purchase an implant?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
  ],
  "Site 2": [
    {
      id: "1",
      question: "Implant Brand",
      answer: [
        {
          item: "Nobel",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      question: "Implant Model",
      answer: [
        {
          item: "Active",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      question: "Implant Diameter",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "4",
      question: "Implant Platform",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "5",
      question: "Implant Length",
      answer: [
        {
          item: "10mm",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "6",
      question: "Implant Surface Treatment",
      answer: [
        {
          item: "TiUltra",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "7",
      question: "Select Drill Kit",
      answer: [
        {
          item: "Pilot Guided",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "8",
      question: "Will you perform bone reduction?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "9",
      question: "Select Driver",
      answer: [
        {
          item: "Machine",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "10",
      question: "Do you need to purchase materials for chairside pick-up?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "11",
      question: "Do you need to purchase an implant?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
  ],
  "Site 3": [
    {
      id: "1",
      question: "Implant Brand",
      answer: [
        {
          item: "Nobel",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      question: "Implant Model",
      answer: [
        {
          item: "Active",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      question: "Implant Diameter",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "4",
      question: "Implant Platform",
      answer: [
        {
          item: "3.0",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "5",
      question: "Implant Length",
      answer: [
        {
          item: "10mm",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "6",
      question: "Implant Surface Treatment",
      answer: [
        {
          item: "TiUltra",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
    {
      id: "7",
      question: "Select Drill Kit",
      answer: [
        {
          item: "Pilot Guided",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "8",
      question: "Will you perform bone reduction?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "9",
      question: "Select Driver",
      answer: [
        {
          item: "Machine",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "10",
      question: "Do you need to purchase materials for chairside pick-up?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },

    {
      id: "11",
      question: "Do you need to purchase an implant?",
      answer: [
        {
          item: "Yes",
          purchaseLink: "",
          quantity: 1,
        },
      ],
    },
  ],
};
