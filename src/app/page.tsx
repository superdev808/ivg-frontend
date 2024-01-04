'use client';

// Sections
import { HomePlatformSection } from '@/components/public/home/HomePlatformSection';
import { HomeFeaturesSection } from '@/components/public/home/HomeFeaturesSection';
import { HomeHeroSection } from '@/components/public/home/HomeHeroSection';
import { HomeHelpSection } from '@/components/public/home/HomeHelpSection';
import { HomeCTASection } from '@/components/public/home/HomeCTASection';

// Footer
import FooterExtended from '@/components/layout/footer/FooterExtended';

export default function Index() {

	return (
		<>
			{/* Hero */}
			<HomeHeroSection/>

			{/* Our Platform */}
			<HomePlatformSection />

			{/* Features */}
			<HomeFeaturesSection />

			{/* Who can we help? */}
			<HomeHelpSection />

			{/* Call To Action */}
			<HomeCTASection />

			{/* Footer */}
			<FooterExtended />
		</>
	);
}
