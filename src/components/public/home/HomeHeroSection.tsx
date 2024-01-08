import { HeroSection } from '../shared/HeroSection';

export const HomeHeroSection = () => {
	const heroTitle = (
		<>
			High Quality Patient<br></br>Care At Your Fingertips.
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				cta="Request More Information"
				image={{src:"/images/home/landing-anaytics.png",offset:true}}
				></HeroSection>
		</>
	);
};
