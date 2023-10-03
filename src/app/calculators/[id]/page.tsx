"use client";

import CalculatorHeader from "@/components/calculator/header";
import CalculatorContainer from "@/components/calculator";
import styles from './page.module.scss';
import useGuideRouteListener from "@/hooks/useGuideRouteListener";

export default function CalculatorPage() {
	useGuideRouteListener();
	return (
		<div className={'flex justify-content-center ' + styles.calculatorContainer}>
		<div className="flex w-5 p-5 border-round bg-white flex-column">
		
			<CalculatorHeader />
		

			<CalculatorContainer />
		</div>
		</div>
	);
}
