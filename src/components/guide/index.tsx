'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

import styles from './Guide.module.scss';

import { Edge, Node } from '@/types/Guide';

import useLoadGuidesData from '@/hooks/useLoadGuidesData';
import { selectGuides } from '@/redux/features/guidesSlice';

let selectionItems = [
	{ id: 0, value: 'Trios', source: 0, target: 1 },
	{ id: 1, value: 'Medit', source: 0, target: 2 },
	{ id: 2, value: 'Primescan', source: 0, target: 3 },
];

let questionItems: Node[] = [{ id: 0, guideId: 2, value: 'What intraoral scanner are you using?', start: true, type: 0 }];
export default function GuidesComponent() {
	const { guidesData, nodesData, edgesData } = useSelector(selectGuides);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentQuestion, setCurrentQuestion] = useState<Node>();
	const [currentSelectionItems, setCurrentSelectionItems] = useState<Edge[]>([]);
	const [selectedItem, setSelectedItem] = useState<Edge | null>(null);

	useLoadGuidesData();

	useEffect(() => {
		if (!guidesData.length < 0 || !nodesData.length < 0 || !edgesData.length < 0) return;

		const { flowSeletionItems, flowQuestionItems } = scannersToEdge(guidesData);
		selectionItems = [...selectionItems, ...flowSeletionItems];
		questionItems = [...questionItems, ...flowQuestionItems];

		const initialQuestion = questionItems.find((item) => item.start);

		if (!initialQuestion || !nodesData) return;

		selectItems(initialQuestion.id);

		setIsLoading(false);
	}, [guidesData, nodesData, edgesData]);

	const selectItems = (sourceId?: number) => {
		const sourceItem = questionItems.find((item) => item.id === sourceId);
		setSelectedItem(null);
		setCurrentQuestion(sourceItem);
		const filtered = selectionItems.filter((item: Edge) => item && item.source === sourceId);

		setCurrentSelectionItems(filtered);
	};

	const selectionPanel = () => {
		if (isLoading) {
			return selectionPanelSkeleton();
		}

		return (
			<>
				<h4>{currentQuestion && currentQuestion.value}</h4>
				{currentSelectionItems.map((item: Edge, index: number) => {
					return (
						<div
							key={item && item.id}
							className={`${styles.guidesSelection} flex flex-column ${
								item && selectedItem && selectedItem.id === item.id ? 'border-green-700 border-2' : ''
							}`}
							onClick={() => setSelectedItem(item)}>
							{item && item.value}
						</div>
					);
				})}
			</>
		);
	};
	const selectionPanelSkeleton = () => {
		return (
			<div>
				<Skeleton
					width="100%"
					height="2rem"
					className="my-3"></Skeleton>
				{Array.from({ length: 4 }).map((_, index) => {
					return (
						<Skeleton
							key={index}
							width="100%"
							height="6rem"
							className="my-3"></Skeleton>
					);
				})}
			</div>
		);
	};
	const descriptionPanel = () => {
		if (!selectedItem) {
			return (
				<>
					<div>
						<img
							src="/images/select_calc.svg"
							width="250"
							alt=""
						/>
					</div>
					<div>
						<h4>Please make a selection</h4>
					</div>
				</>
			);
		}
		return (
			<>
				<div className="flex flex-column align-items-center justify-content-center w-full py-6  bg-gray-200">
					<h2 className="text-gray-800 m-0 text-center">{selectedItem && selectedItem.value}</h2>
					<div className="w-5rem mt-4 divider-accent"></div>
					{/* <span className={'text-gray-500' + (selectedCalc ? ' flex' : ' hidden')}>subtitle</span> */}
				</div>
				<div className={'flex flex-grow-1 p-6 '}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse
					platea dictumst. Sed ullamcorper, nunc id pellentesque dilatator, nisl nisl pellentesque magna, non aliquet tortor erat eu augue. Vestibulum
					ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ut condimentum metus, in maximus neque. Etiam euismod,
					augue a dignissim ultrices, arcu est faucibus erat, a dignissim dui nisl a tortor.
				</div>
				<div className={'flex w-full justify-content-end p-4'}>
					{currentQuestion && currentQuestion.term ? (
						<Link
							className="no-underline text-white"
							href={String(selectedItem?.target)}>
							<Button className="justify-content-center">View</Button>
						</Link>
					) : (
						<Button
							className="justify-content-center"
							onClick={() => selectedItem && selectItems(selectedItem.target)}>
							Next
						</Button>
					)}
				</div>
			</>
		);
	};

	const scannersToEdge = (scanners: Edge[]) => {
		const flowSeletionItems = [];
		const flowQuestionItems = [];

		for (let i = 0; i < selectionItems.length; i++) {
			flowQuestionItems.push({
				id: i+ 1,
				guideId: i+ 1,
				value: 'What product are you scanning for?',
				term: true,
				type: 0,
			});
		}

		for (let i = 0; i < scanners.length; i++) {
			flowSeletionItems.push({
				id: i,
				guideId: scanners[i].id,
				value: scanners[i].value,
				source: scanners[i].source + 1,
				target: scanners[i].id,
			});
		}

		return { flowSeletionItems, flowQuestionItems };
	};

	return (
		<div className={styles.guidesContainer}>
			<div className="flex flex-column overflow-hidden w-8 mt-4 pb-8 border-round bg-white shadow-1">
				{/* <div className="overflow-hidden"> */}
				<h2 className="m-5 text-700 ">Workflows</h2>
				<div className="flex h-full border-top-1 border-gray-300">
					<div className="col-6  px-5 py-2  overflow-auto">{selectionPanel()}</div>
					{/* <div className="flex  h-full align-items-center border-left-1  border-gray-300"> */}

					<div className="col-6 flex flex-column justify-content-center align-items-center p-0 border-left-1 border-gray-300">
						{descriptionPanel()}
					</div>
				</div>
				{/* </div> */}
			</div>
		</div>
	);
}
