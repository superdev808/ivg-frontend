'use client';

import React, { useEffect } from 'react';
import styles from './page.module.scss';
import { Button } from 'primereact/button';
import { useGetCalculatorsQuery } from '@/redux/services/calculatorsApi';
import Link from 'next/link';
import { Skeleton } from 'primereact/skeleton';
import { TabView, TabPanel } from 'primereact/tabview';

export default function CalculatorsPage() {
	const { isLoading: calcLoading, isFetching: calcFetching, data: calc, error: calcError } = useGetCalculatorsQuery(null);
	const [selectedCalc, setSelectedCalc] = React.useState<any>(null);
	const [fitleredCalc, setFilteredCalc] = React.useState<any>([]);

	const tabItems = [
		{ label: 'Scan Body', value: 0 },
		{ label: 'Abutment Screw Driver', value: 1 },
		{ label: 'Abutment Screw', value: 2 },
	];

	useEffect(() => {
		calcByCategory(0);
		}, [calc]);

	const selectItem = (item) => {
		setSelectedCalc(item);
	};



	const calcByCategory = (category) => {
		if (!calc) return;
		
		const filtered = calc.filter((item) => item.category === category);
		setFilteredCalc(filtered);
		setSelectedCalc(null);

	}	;	


	const calcSelectionPanel = () => {
		return (
			<>
				{calc && fitleredCalc &&
					fitleredCalc.map((item, index) => {
						return (
							<div
								key={item.id}
								className={`${styles.calculatorList} flex flex-column ${selectedCalc?.id === item.id ? 'border-green-700 border-2' : ''}`}
								onClick={() => selectItem(item)}>
								{item.value}
								{/* <span
									className={'text-sm font-normal text-gray-500 '}
									key={item.id + '_subtitle'}>
									subtitle
								</span> */}
							</div>
						);
					})}
			</>
		);
	};

	const descriptionPanel = () => {
		return (
			<>
				{!selectedCalc && (
					<div className="flex flex-column justify-content-center h-full align-items-center border-left-1 pb-8 border-gray-300">
						<div>
							<img
								src="/images/select_calc.svg"
								width="250"
								alt=""
							/>
						</div>
						<div>
							<h4>Start by selecting a calculator</h4>
						</div>
					</div>
				)}
				{selectedCalc && (
					<div className=" flex flex-column border-left-1 p-0 border-gray-300 ">
						<div className="flex flex-column bg-gray-50 h-10rem flex align-items-center justify-content-center">
							<h2 className="text-gray-800 m-0 text-center">{selectedCalc && selectedCalc.value}</h2>
							<div className="w-5rem mt-4 divider-accent"></div>
							{/* <span className={'text-gray-500' + (selectedCalc ? ' flex' : ' hidden')}>subtitle</span> */}
						</div>
						<div className={'p-6 h-full ' + (selectedCalc ? ' flex' : ' hidden')}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse
							platea dictumst. Sed ullamcorper, nunc id pellentesque dilatator, nisl nisl pellentesque magna, non aliquet tortor erat eu augue.
							Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ut condimentum metus, in maximus neque.
							Etiam euismod, augue a dignissim ultrices, arcu est faucibus erat, a dignissim dui nisl a tortor.
						</div>
						<div className={'m-4 justify-content-end ' + (selectedCalc ? ' flex' : ' hidden')}>
							
								<Link
									className="no-underline text-white"
									href={String(selectedCalc?.id) || ''}>
									<Button className='justify-content-center'>Calculate</Button>
								</Link>
							
						</div>
					</div>
				)}
			</>
		);
	};

	const skeleton = () => {
		return (
			<>
				<div className="col-6 px-5 py-4">
					{Array.from({ length: 4 }).map((_, index) => {
						return (
							<Skeleton
								key={index}
								width="100%"
								height="6rem"
								className="mb-3"></Skeleton>
						);
					})}
				</div>
			</>
		);
	};

	return (
		<div className={'flex justify-content-center ' + styles.calculatorContainer}>
			<div className="flex flex-column w-8 p-5  border-round bg-white shadow-1">
				<div className="overflow-hidden">
					<h2 className="mt-0 text-700">Calculators</h2>
					<TabView panelContainerClassName="p-0" onTabChange={(e) => calcByCategory(e.index)}>
						{tabItems.map((el, idx) => {
							return (
								<TabPanel
									headerClassName="font-bold"
									key={idx}
									// header={el.label}
									headerTemplate={(options) => (
										<button
											type="button"
											onClick={options.onClick}
											className={options.className}>
											<strong>{el.label}</strong>
										</button>
									)}></TabPanel>
							);
						})}
					</TabView>
					<div className="flex h-full ">
						{!calcLoading ? (
							<>
								<div className="col-6 p-0 pr-5 pb-8 overflow-auto">{calcSelectionPanel()}</div>
							</>
						) : (
							<>{skeleton()}</>
						)}
						<div className="col-6  p-0">{descriptionPanel()}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
