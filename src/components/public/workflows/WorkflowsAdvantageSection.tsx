
import { ThreeColSection } from '../shared/ColItemsSection';



export const WorkflowsAdvantageSection = () => {
	const advantageItems = [
		{
			title: 'Reduce Additional Appointments',
			description:
				"",
			image: '/images/calculators/product/compatibility.svg',
		},
		{
			title: 'Feel Confident With Every Procedure',
			description:
				'',
			image: '/images/calculators/product/suggestions.svg',
		},
		{
			title: 'Empower Customer Support Teams',
			description:
				'',
			image: '/images/calculators/product/procurement.svg',
		},
	];

	return (
		<>  
            <ThreeColSection reverse  items={advantageItems} title="Our Advantages" />
		</>
	);
};
