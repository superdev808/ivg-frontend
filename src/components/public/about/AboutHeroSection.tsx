import { HeroSection } from '../shared/HeroSection';

export const AboutHeroSection = () => {
	const heroTitle = (
		<>
			About Us
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				cta="Request More Information"
				image={{src:'/images/common/elephant.svg'}}></HeroSection>
		</>
	);
};
