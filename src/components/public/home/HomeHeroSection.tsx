import { HeroSection } from '../shared/HeroSection';

export const HomeHeroSection = () => {
	const heroTitle = (
		<>
			High Quality Patient Care At Your Fingertips.
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				cta="Join for FREE"
				image={{src:"/images/home/landing-anaytics.png"}}
				></HeroSection>
		</>
	);
};
