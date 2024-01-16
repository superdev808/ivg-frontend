import { HeroSection } from '../shared/HeroSection';

export const ProductHeroSection = () => {
	const heroTitle = 'Instantaneous Access To Trustworthy Clinical Recommendations';
	const heroSubtitle = (
		<>
			Instantaneous Access to trustworthy clinical recommendations
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				// subtitle={heroSubtitle}
				cta="Request More Information"
				image={{src:'/images/common/elephant.svg'}}></HeroSection>
		</>
	);
};
