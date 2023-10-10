import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectGuide } from '@/redux/features/guideSlice';
import { Button } from 'primereact/button';

import styles from '@/components/Guide/Guide.module.scss';

import { nestNodesEdges } from '@/helpers/nestNodesEdges';
import { Edge } from '@/types/Guide';

import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
const GuideText = () => {
	const containerRef = useRef<any>(null);
	const { selectedGuide, guideNodeData, guideEdgeData } = useSelector(selectGuide);

	const [nestedNodes, setNestedNodes] = useState<any>();
	const [currentPathIds, setCurrentPathIds] = useState<[number | null, number][]>([]);
	const [pathElements, setPathElements] = useState<JSX.Element[]>([]);

	const resetToNode = (nodeId: number) => {
		const newPathIds = [];
		for (const ids of currentPathIds) {
			newPathIds.push(ids);
			if (ids[1] === nodeId) {
				break;
			}
		}

		setCurrentPathIds(newPathIds as [number | null, number][]);
	};
	const confirmReset = (event, nodeId) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Are you sure you want to change your response?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				resetToNode(nodeId);
			},
		});
	};
	useEffect(() => {
		if (selectedGuide && guideNodeData && guideEdgeData) {
			const nestedNodes = JSON.parse(JSON.stringify(guideNodeData));
			const nodes = nestNodesEdges(nestedNodes, guideEdgeData);
			if (!nodes) return;

			setCurrentPathIds([...currentPathIds, [null, nodes.id]]);
			setNestedNodes(nodes);
		}
	}, [selectedGuide, guideNodeData, guideEdgeData]);

	useEffect(() => {
		const elements: JSX.Element[] = [];
		if (nestedNodes) {
			let currentNodeLayer = { ...nestedNodes };

			currentPathIds.forEach((ids: [null | number, number], idx: number) => {
				if (idx !== 0) {
					currentNodeLayer = currentNodeLayer?.children.find((node: any) => node.id === ids[1]);
				}

				currentNodeLayer &&
					elements.push(
						<div key={idx}>
							<div className={'flex flex-column bg-gray-50  border-blue-700 border-2 border-round mb-4'}>
								<div className="w-full text-right pb-2">
									<Button
										className="m-2"
										icon="pi pi-refresh "
										rounded
										text
										severity="warning"
										aria-label="Change response"
										style={{ width: '10px', height: '10px' }}
										onClick={(event) => confirmReset(event, ids[1])}
									/>
								</div>
								<div className="px-4 pb-4">
									<strong>{currentNodeLayer.value}</strong>

									{currentNodeLayer.images &&
										currentNodeLayer.images.map((image: string) => {
											return (
												<p key={image.replace(' ', '_')}>
													<img
														src={
															'https://ivoryguide.s3.us-west-1.amazonaws.com/images/guides/' + currentNodeLayer.guideId + '/' + image + '.png' ||
															'/images/no-image.png'
														}
														alt=""
														width={'100%'}
													/>
												</p>
											);
										})}

									{currentNodeLayer.texts &&
										currentNodeLayer.texts.map((text: string) => {
											return <p key={text.replace(' ', '_')}>{text}</p>;
										})}
								</div>
							</div>
							<div className="flex flex-wrap justify-content-center mb-4">
								{currentNodeLayer.edges &&
									currentNodeLayer.edges.map((edge: Edge) => {
										return (
											<Button
												className={`mx-2 mb-2 ${
													currentPathIds.length !== idx + 1
														? currentPathIds[idx + 1][0] === edge.id
															? 'pointer-events-none focus:bg-primary'
															: 'pointer-events-none  bg-gray-300 text-gray-500'
														: 'bg-white text-blue-700 border-blue-700 border-1 hover:text-white hover:bg-blue-700'
												}`}
												onClick={() => selectPath(edge.id)}
												key={'edge_' + edge.source + edge.target}>
												{edge.value}
											</Button>
										);
									})}
								{!currentNodeLayer.edges && <h4 className="w-full text-center text-blue-700">Please contact lab if you have further questions.</h4>}
							</div>
						</div>
					);
			});

			setPathElements(elements);
		}
	}, [currentPathIds]);

	const selectPath = (edgeId: number) => {
		const selectedEdge = guideEdgeData.find((edge: Edge) => edge.id === edgeId);
		setCurrentPathIds([...currentPathIds, [edgeId, selectedEdge.target]]);
	};

	const scrollToBottom = () => {
		if (containerRef.current) {
			const lastElement = containerRef.current.lastChild;
			if (lastElement) {
				lastElement.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	useEffect(() => {
		if (!containerRef.current) return;
		scrollToBottom();
	}, [pathElements]);

	return (
		<div
			ref={containerRef}
			className="px-6 py-4 h-full overflow-auto">
			{pathElements}
			<ConfirmPopup />
		</div>
	);
};

export default GuideText;
