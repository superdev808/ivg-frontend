export enum ORGANIZATION_TYPE {
  COMPANY = "company",
  SCHOOL = "school",
}

export interface OrganizationType {
  label: string;
  value: ORGANIZATION_TYPE;
}

export const organizationType: OrganizationType[] = [
  { label: "Company", value: ORGANIZATION_TYPE.COMPANY },
  { label: "School", value: ORGANIZATION_TYPE.SCHOOL },
];

export enum ORGANIZATION_ROLE {
  DENTAL_PRACTICE = "dental_practice",
  DENTAL_LABORATORY = "dental_laboratory",
  DENTAL_SCHOOL = "dental_school",
  DENTAL_STUDENT = "dental_student",
  DENTAL_SUPPLIER = "dental_supplier",
  OTHER = "other",
}

export interface OrganizationRole {
  label: string;
  value: ORGANIZATION_ROLE;
}

export const organizationRole: OrganizationRole[] = [
  { label: "Dental Practice", value: ORGANIZATION_ROLE.DENTAL_PRACTICE },
  { label: "Dental Laboratory", value: ORGANIZATION_ROLE.DENTAL_LABORATORY },
  { label: "Dental School", value: ORGANIZATION_ROLE.DENTAL_SCHOOL },
  { label: "Dental Student", value: ORGANIZATION_ROLE.DENTAL_STUDENT },
  { label: "Dental Supplier", value: ORGANIZATION_ROLE.DENTAL_SUPPLIER},
  { label: "Other", value: ORGANIZATION_ROLE.OTHER },
];

export const organizationRoleMap = organizationRole.reduce<
  Record<ORGANIZATION_ROLE, string>
>((acc, { label, value }) => {
  acc[value] = label;
  return acc;
}, {} as Record<ORGANIZATION_ROLE, string>);

export enum DENTAIL_PRACTICE_ROLE {
  GENERAL_DENTIST = "general_dentist",
  PEDIATRIC_DENTIST = "pediatric_dentist",
  ORTHODONTIST = "orthodontist",
  PERIODONTIST = "Periodontist",
  ENDODONTIST = "endodontist",
  ORAL_SURGEON = "oral_surgeon",
  PROSTHODONTIST = "prosthodontist",
}

export interface DentalPracticeRole {
  label: string;
  value: DENTAIL_PRACTICE_ROLE;
}
export const dentalPracticeRole: DentalPracticeRole[] = [
  { label: "General Dentist", value: DENTAIL_PRACTICE_ROLE.GENERAL_DENTIST },
  {
    label: "Pediatric Dentist",
    value: DENTAIL_PRACTICE_ROLE.PEDIATRIC_DENTIST,
  },
  { label: "Orthodontist", value: DENTAIL_PRACTICE_ROLE.ORTHODONTIST },
  { label: "Periodontist", value: DENTAIL_PRACTICE_ROLE.PERIODONTIST },
  { label: "Endodontist", value: DENTAIL_PRACTICE_ROLE.ENDODONTIST },
  { label: "Oral Surgeon", value: DENTAIL_PRACTICE_ROLE.ORAL_SURGEON },
  { label: "Prosthodontist", value: DENTAIL_PRACTICE_ROLE.PROSTHODONTIST },
];

export enum REFERRAL_SOURCE {
  GOOGLE = "google",
  COLLEAGUE = "colleague",
  SOCIAL_MEDIA = "social_media",
  OTHER = "ref_other",
}

export interface ReferralSource {
  label: string;
  value: REFERRAL_SOURCE;
}
export const referralSource: ReferralSource[] = [
  { label: "Google", value: REFERRAL_SOURCE.GOOGLE },
  { label: "Colleague", value: REFERRAL_SOURCE.COLLEAGUE },
  { label: "Social Media", value: REFERRAL_SOURCE.SOCIAL_MEDIA },
  { label: "Other", value: REFERRAL_SOURCE.OTHER },
];

export const referralSourceMap = referralSource.reduce<
  Record<REFERRAL_SOURCE, string>
>((acc, { label, value }) => {
  acc[value] = label;
  return acc;
}, {} as Record<REFERRAL_SOURCE, string>);

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  organizationName: string;
  organizationRole: string;
  organizationLocation: string;
  organizationNumber: string;
  referralSource: string;
}
export const registerForm: RegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  organizationName: "",
  organizationRole: "",
  organizationLocation: "",
  organizationNumber: "",
  referralSource: "",
};

export const states = [
  { name: "Alabama", value: "AL" },
  { name: "Alaska", value: "AK" },
  { name: "Arizona", value: "AZ" },
  { name: "Arkansas", value: "AR" },
  { name: "California", value: "CA" },
  { name: "Colorado", value: "CO" },
  { name: "Connecticut", value: "CT" },
  { name: "Delaware", value: "DE" },
  { name: "Florida", value: "FL" },
  { name: "Georgia", value: "GA" },
  { name: "Hawaii", value: "HI" },
  { name: "Idaho", value: "ID" },
  { name: "Illinois", value: "IL" },
  { name: "Indiana", value: "IN" },
  { name: "Iowa", value: "IA" },
  { name: "Kansas", value: "KS" },
  { name: "Kentucky", value: "KY" },
  { name: "Louisiana", value: "LA" },
  { name: "Maine", value: "ME" },
  { name: "Maryland", value: "MD" },
  { name: "Massachusetts", value: "MA" },
  { name: "Michigan", value: "MI" },
  { name: "Minnesota", value: "MN" },
  { name: "Mississippi", value: "MS" },
  { name: "Missouri", value: "MO" },
  { name: "Montana", value: "MT" },
  { name: "Nebraska", value: "NE" },
  { name: "Nevada", value: "NV" },
  { name: "New Hampshire", value: "NH" },
  { name: "New Jersey", value: "NJ" },
  { name: "New Mexico", value: "NM" },
  { name: "New York", value: "NY" },
  { name: "North Carolina", value: "NC" },
  { name: "North Dakota", value: "ND" },
  { name: "Ohio", value: "OH" },
  { name: "Oklahoma", value: "OK" },
  { name: "Oregon", value: "OR" },
  { name: "Pennsylvania", value: "PA" },
  { name: "Rhode Island", value: "RI" },
  { name: "South Carolina", value: "SC" },
  { name: "South Dakota", value: "SD" },
  { name: "Tennessee", value: "TN" },
  { name: "Texas", value: "TX" },
  { name: "Utah", value: "UT" },
  { name: "Vermont", value: "VT" },
  { name: "Virginia", value: "VA" },
  { name: "Washington", value: "WA" },
  { name: "West Virginia", value: "WV" },
  { name: "Wisconsin", value: "WI" },
  { name: "Wyoming", value: "WY" },
  { name: "Outside United States", value:"N/A"},
];
