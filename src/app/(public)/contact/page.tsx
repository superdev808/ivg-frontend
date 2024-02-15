"use client";

import React from "react";

import { ContactCTASection } from "@/components/public/contact/ContactCTASection";
import { ContactComponent } from "@/components/public/contact/ContactForm";
import { ContactInfoSection } from "@/components/public/contact/ContactInfoSection";

export default function ContactPage() {
  return (
    <>
      <ContactInfoSection />
      <ContactComponent />
      <ContactCTASection />
    </>
  );
}
