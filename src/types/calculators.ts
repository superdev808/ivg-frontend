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
  itemName: string;
  itemNumber?: string;
  link?: string;
  quantity?: number;
  manufacturer?: string;
  manufacturerRecommendations?: string;
}
export interface ItemData {
  id?: string;
  label: string;
  info: ItemInsights[];
}
export interface ComponentDetail {
  [key: string]: ItemData[];
}

export interface SiteDetail {
  site?: string;
  inputDetails: InputDetail[];
  componentDetails: ComponentDetail;
}

export interface SiteData {
  [key: string]: SiteDetail;
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
