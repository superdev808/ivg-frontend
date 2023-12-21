'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import CalculatorProduct from './product';
import { useAppSelector } from '@/redux/hooks';
import SearchBar from '@/components/searchBar';
import { LABEL_ALL_ON_X_CALCULATOR } from './constants';

export default function CalculatorsPage() {
	const { authenticated } = useAppSelector((state) => state.auth);
	const router = useRouter();
	const [selectedGroup, setSelectedGroup] = useState<number>(-1);

	const groupItems = [
		{
			label: "Implant Component Selection",
			subItems: [
				{ label: "Scanbodies" },
				{ label: "Implant Screws" },
				{ label: "Implant Drivers" }
			]
		},
		{
			label: "All-on-X Implant Surgery",
			subItems: [
				{ label: "Surgery" },
				{ label: "Restorative" }
			]
		},
		{
			label: "Product Material Selection",
			subItems: [
				{ label: "Crown Materials" }
			]
		}
	];

	return authenticated ? (
		<div className={'flex justify-content-center mt-6'}>
			<div className="flex flex-column col-12 md:col-8 p-5 border-round bg-white shadow-1">
				<h2 className="mt-0 mb-5 text-center">Calculators</h2>
				<div className='mt-0 mb-4'>
					<SearchBar />
				</div>
				<div className="grid border-top-1 surface-border">
					<div className='col-6 border-right-1 p-4 surface-border'>
						{groupItems.map((groupItem, index) => (
							<Button
								className={cx('calculatorButton', 'p-4 mb-2', { 'calculatorButton--highlighted': index === selectedGroup })}
								key={`groupItem-${index}`}
								style={{ width: '100%' }}
								label={groupItem.label}
								onClick={() => {
									setSelectedGroup(index);
									// router.push('/calculators/' + tabItem.label);
								}}
							/>
						))}
					</div>
					{selectedGroup >= 0 && <div className='col-6 p-4'>
						{
							groupItems[selectedGroup].subItems.map((calcItem, index) => (
								<Button
									className={cx('calculatorButton', 'p-4 mb-2')}
									key={`calcItem-${index}`}
									style={{ width: '100%' }}
									label={calcItem.label}
									onClick={() => {
										router.push('/calculators/' + calcItem.label);
									}}
								/>
							))
						}
					</div>}
				</div>
			</div>
		</div>
	) : (
		<CalculatorProduct />
	);
}
