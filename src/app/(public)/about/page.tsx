'use client';

import React from 'react';
import { AboutContentSection } from '@/components/public/about/AboutContentSection';
import { AboutHeroSection } from '@/components/public/about/AboutHeroSection';

export default function AboutPage() {
	return (
		<>
			<AboutHeroSection />
			<AboutContentSection />
		</>
	);
}
