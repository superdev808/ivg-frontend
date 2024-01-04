import { HeroSection } from '../shared/HeroSection';

export const ContactHeroSection = () => {
	const heroTitle = 'Contact Us';

	return (
		<>
			<HeroSection
				title={heroTitle}
				cta="Request a Demo"

				image={{src:'/images/common/elephant.svg'}}
				></HeroSection>
		</>
	);
};
