import React from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { HeroSection } from '@/components/public/shared/HeroSection';

import classNames from 'classnames/bind';
import styles from '../page.module.scss';
import { CalculatorsHeroSection } from '@/components/public/calculators/CalculatorsHeroSection';
import { CalculatorsHowSection } from '@/components/public/calculators/CalculatorsHowSection';
import { CalculatorsAdvantageSection } from '@/components/public/calculators/CalculatorsAdvantageSection';
import FooterExtended from '@/components/layout/footer/FooterExtended';
import { CalculatorsCTASection } from '@/components/public/calculators/CalculatorsCTASection';
const cx = classNames.bind(styles);

const howItWorksItems = ['Restoration material selection', 'All-On-X implant guidance', 'Scanbody selection'];

export default function CalculatorProduct() {
	const heroSubtitle = (
		<>
			<u>Ivory Guide</u>&nbsp;Calculators provide quick answers to complicated everyday questions
		</>
	);
	return (
		<>
			<CalculatorsHeroSection/>			


			<CalculatorsHowSection/>

			<CalculatorsAdvantageSection/>
			<CalculatorsCTASection/>
			<FooterExtended/>
		</>
	);
}
