export enum PROCEDURE {
  SURGERY = "Surgery",
  RESTORATIVE = "Restorative",
  SURGERY_AND_RESTORATIVE = "SurgeryAndRestorative",
}

export enum PROCEDURE_COMBINATIONS {
  SURGERY = "SURGERY",
  RESTORATIVE_DIRECT_TO_IMPLANT = "RESTORATIVE_DIRECT_TO_IMPLANT",
  RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED = "RESTORATIVE_ON_MUAS_MUAS_NOT_PLACED",
  RESTORATIVE_ON_MUAS_MUAS_PLACED = "RESTORATIVE_ON_MUAS_MUAS_PLACED",
}

export interface Procedure {
  name: string;
  value: PROCEDURE;
}

export interface InputDetail {
  id?: string;
  question: string;
  questionText: string;
  answer: string;
}

export type ItemInsights = {
  quantity: number;
  id: string;
  [key: string]: any;
};

export interface ItemData {
  id?: string;
  label: string;
  info: ItemInsights[];
}
export interface ComponentDetail {
  [key: string]: ItemData[];
}

export interface InputSummary {
  site?: string;
  inputDetails: InputDetail[];
  componentDetails: ComponentDetail;
}

export interface ComponentSummary extends ItemInsights {
  description: string;
  brand: string;
}

export interface SiteData {
  [key: string]: InputSummary;
}

export interface KeyValuePair {
  [key: string]: string;
}

export interface TotalQuantities {
  id: string;
  quantity: number;
}

export interface InputOutputValues {
  colIndex: string;
  colName: string;
  colText: string;
  groupId: string;
  groupName: string;
  groupText: string;
  isCommon: boolean;
  calculatorType: string;
}

export interface AutoPopulateData {
  site: Site;
  questions: InputOutputValues[];
  answerOptions: ANSWER_TYPE[][];
  answers: ANSWER_TYPE[];
}

export interface RadioButtonOption {
  id: string;
  name: string;
  value: string;
}

export interface Site {
  name: string;
  key: number;
}

export interface Patient {
  date?: Date | null;
  name: string;
  address: string;
  filename: string;
  actionType?: string;
  recipientsList: string;
}

export interface InputAndResponse {
  input: InputOutputValues[];
  responseOrder: string[];
}

export interface ProcedureInputsAndResponse {
  [key: string]: string[];
}

export interface SingleSavedResult {
  id: string;
  name: string;
  calculatorType: string;
  quiz: InputDetail[];
  items: ItemData[];
  date: string;
  type: "single";
}

export interface MultiSavedResult {
  id: string;
  name: string;
  inputSummary: InputSummary[];
  componentSummary: ComponentSummary[];
  date: string;
  type: "all-on-x" | "combined";
}

export interface CalculatorGroupItem {
  label: string;
  description: string;
  subItems: Array<string>;
}

export interface AnnouncementItem {
  _id: string;
  content: string;
  published_at: Date;
}

export interface Summary extends ItemInsights {
  description: string;
  brand: string;
  itemName?: string;
  itemNumber?: string;
  link?: string;
  manufacturer?: string;
  notes?: string;
  // for material calculators
  recommendedSingleUnitAbutmentMaterial?: string;
  recommendedMUAMaterial?: string;
  recommendedRestorationDesign?: string;
  recommendedImplantBridgeMaterial?: string;
  secondRecommendedSingleUnitAbutmentMaterial?: string;
  secondRecommendedRestorationDesign?: string;
  secondRecommendedImplantBridgeMaterial?: string;
  recommendedAbutmentMaterial?: string;
  recommendedCrownMaterial?: string;
  secondAbutmentMaterialChoice?: string;
  secondRestorationDesignChoice?: string;
  secondCrownMaterialChoice?: string;
  recommendedBridgeMaterial?: string;
  secondMaterialChoice?: string;
  thirdMaterialChoice?: string;
}

export interface CalculatorInfoMap {
  [key: string]: {
    type: string;
    label: string;
    description?: string;
    disabled?: boolean;
    isCustom?: boolean;
    isProduction?: boolean;
    input: InputOutputValues[];
    output: InputOutputValues[];
    outputType: string;
  };
}

export interface EXPLORE_DATA_ITEM {
  name: string;
  href?: string;
  isHighlighted?: true;
  openByDefault?: boolean;
  items?: EXPLORE_DATA_ITEM[];
}

export interface EXPLORE_DATA_SECTION {
  name: string;
  items?: EXPLORE_DATA_ITEM[];
}

export interface EXPLORE_DATA {
  id: string;
  name: string;
  description?: string;
  sections: EXPLORE_DATA_SECTION[];
}

export type ANSWER_TYPE = Record<string, string>;
export type QUESTION_AVAILABILITY = Record<string, boolean>;