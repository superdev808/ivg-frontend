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
  answer: string;
}

export interface ItemInsights {
  id?: string;
  itemName?: string;
  itemNumber?: string;
  link?: string;
  quantity?: number;
  manufacturer?: string;
  manufacturerRecommendations?: string;
  torqueValue?: string;
  notes?: string;
  reasoning?: string;
  supportingArticle?: string;
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
  itemName: string;
  quantity: number;
}

export interface InputOutputValues {
  name: string;
  text: string;
  calculator: string;
  outputFrom?: string;
  isCommon?: boolean;
  displayCalculatorName?: string;
  description?: string;
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

export interface CollectionsIO {
  [key: string]: InputOutputValues[];
}

export interface ProcedureInputsAndResponse {
  [key: string]: CollectionsIO;
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

export interface CALCULATOR_GROUP_ITEM {
  label: string;
  description: string;
  subItems: Array<{
    label: string;
    text: string;
    description: string;
  }>;
}

export interface ANNOUNCEMENT_ITEM {
  _id: string;
  content: string;
  published_at: Date;
}

export interface Summary extends ItemInsights {
  description: string;
  brand: string;
}
