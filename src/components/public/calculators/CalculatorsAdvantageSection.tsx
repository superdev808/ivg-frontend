
import { ThreeColSection } from '../shared/ThreeColSection';



export const CalculatorsAdvantageSection = () => {
	const advantageItems = [
		{
			title: 'Confirm Component Compatibility',
			description:
				"",
			image: '/images/calculators/product/compatibility.svg',
		},
		{
			title: 'Immediate Clinical Suggestions',
			description:
				'',
			image: '/images/calculators/product/suggestions.svg',
		},
		{
			title: 'On-Demand Procurement',
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
