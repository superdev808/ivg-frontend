import { HeroSection } from '../shared/HeroSection';

export const CalculatorsHeroSection = () => {
	const heroTitle = 'Calculators';
	const heroSubtitle = (
		<>
			Ivory Guide Calculators provide quick answers to complicated everyday questions
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				subtitle={heroSubtitle}
				cta="Request More Information"
				image={{src:'/images/common/elephant.svg'}}></HeroSection>
		</>
	);
};
