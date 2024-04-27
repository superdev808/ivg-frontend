export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  zip: string;
  role: string;
  message: string;
  token: string;
}

export interface RequestForm {
  featureType: string;
  productTypes: string;
  notes: string;
  discuss: string;
  token: string;
}
