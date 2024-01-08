import { HeroSection } from '../shared/HeroSection';

export const WorkflowsHeroSection = () => {
	const heroTitle = 'Workflows';
	const heroSubtitle = (
		<>
			Ivory Guide workflows streamline patient care through step-by-step guidance and recommendations.
		</>
	);
	return (
		<>
			<HeroSection
				title={heroTitle}
				subtitle={heroSubtitle}
				cta="Request More Information"
				image={{src:'/images/workflows/product/workflow-product.svg', width: '75%', height: '75%'}}
				></HeroSection>
		</>
	);
};
