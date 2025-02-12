import {
  ORGANIZATION_ROLE,
  REFERRAL_SOURCE,
} from "@/components/auth/register/RegisterForms/constants";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  agree: boolean;
  organizationName: string;
  organizationRole: string;
  organizationRoleOther?: string;
  dentalPracticeRole?: string;
  organizationState: string;
  organizationNumber: string;
  referralSource: string;
  referralSourceOther?: string;
  logo?: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  logo?: string;
  organizationName: string;
  organizationRole: string;
  organizationRoleOther?: string;
  dentalPracticeRole?: string;
  organizationState: string;
  organizationNumber: string;
  referralSource: string;
  referralSourceOther?: string;
}

export interface CheckEmail {
  message: string;
  available: boolean;
}

export interface EditUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verified: boolean;
  active: boolean;
  organizationName: string;
  organizationRole: ORGANIZATION_ROLE;
  organizationState: string;
  verificationEmailSent: string;
  lastLoginDate: string;
  lastActivityDate: string;
  referralSource: REFERRAL_SOURCE;
}
