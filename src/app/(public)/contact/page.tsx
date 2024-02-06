'use client';

import React from 'react';
import { ContactComponent } from '@/components/public/contact/ContactForm';
import { ContactHeroSection } from '@/components/public/contact/ContactHeroSection';
import { ContactInfoSection } from '@/components/public/contact/ContactInfoSection';
import { ContactCTASection } from '@/components/public/contact/ContactCTASection';


export default function ContactPage() {
	return (
		<>
				<ContactHeroSection />
				<ContactInfoSection />
				<ContactComponent />
				<ContactCTASection />
		</>
	);
}
