"use client";

import React from "react";

import { ContactComponent } from "@/components/public/contact/ContactForm";
import { ContactInfoSection } from "@/components/public/contact/ContactInfoSection";

export default function ContactPage() {
  return (
    <>
      <ContactInfoSection />
      <ContactComponent />
    </>
  );
}
