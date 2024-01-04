
import { ThreeColSection } from '../shared/ThreeColSection';



export const HomeHelpSection = () => {
	const helpItems = [
		{
			title: 'Practices',
			description:
				"Our technology can uplevel your practice's patient care while guiding you and your staff through complicated workflows, material selection, and issues that can arise while patients are in chair.",
			image: '/images/home/practices.svg',
		},
		{
			title: 'Laboratories',
			description:
				'Enable your Customer Service team to walk dentists and other customers through a variety of technical questions & workflows, allowing your technicans to spend more time on the floor and less time on the phone.',
			image: '/images/home/laboratories.svg',
		},
		{
			title: 'Schools',
			description:
				'Our vast database of information and advanced treatment planning tools provide future clinicians, assistants, and technicans with an additional resource to leverage while they are learning the fundamentals of dentistry.',
			image: '/images/home/schools.svg',
		},
	];

	return (
		<>  
            <ThreeColSection   items={helpItems} title="Who can we help?" />
		</>
	);
};
