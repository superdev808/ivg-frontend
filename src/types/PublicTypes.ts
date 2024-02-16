export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  zip: string;
  role: string;
  message: string;
  token: string;
}

export interface Patient {
  date?: Date | null;
  name: string;
  address: string;
  filename: string;
  actionType?: string;
  recipientsList: string;
}
