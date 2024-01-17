'use client';

// Sections
import { HomeContentSection } from '@/components/public/home/HomeContentSection';
import { HomeHeroSection } from '@/components/public/home/HomeHeroSection';


// Footer
import FooterExtended from '@/components/layout/footer/FooterExtended';


export default function Index() {

	return (
		<>
			{/* Hero */}
			<HomeHeroSection/>

			{/* Content*/}
			<HomeContentSection />



		</>
	);
}
