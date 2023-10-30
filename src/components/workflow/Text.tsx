import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/components/workflow/Workflow.module.scss';

import { Button } from 'primereact/button';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';

import { Edge, PathIds } from '@/types/Workflow';
import { setSelectedPathIds } from '@/redux/features/workflowSelectionSlice';
import { selectWorkflowSelection } from '@/redux/features/workflowSelectionSlice';

const WorkflowText = () => {
	const containerRef = useRef<any>(null);
	const dispatch = useDispatch();

	const { selectedNodeData,selectedEdgeData, selectedPathIds } = useSelector(selectWorkflowSelection);
	const [pathElements, setPathElements] = useState<JSX.Element[]>([]);

	const resetToNode = (nodeId: number) => {
		const newPathIds:PathIds[] = [];
		for (const ids of selectedPathIds) {
			newPathIds.push(ids);
			if (ids[1] === nodeId) {
				break;
			}
		}

		dispatch(setSelectedPathIds(newPathIds));
	};
	const confirmReset = (event: any, nodeId: number) => {
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
		const elements: JSX.Element[] = [];
		if (selectedPathIds.length > 0) {
			selectedPathIds.forEach((ids: [null | number, number], idx: number) => {
				const currrentNode = selectedNodeData.find((node: any) => node.id === ids[1]);

				const currrentEdges = selectedEdgeData.filter((edge: any) => edge.source === ids[1]);
		
				currrentNode &&
					elements.push(
						<div key={idx}>
							<div className={'flex flex-column bg-gray-50  border-green-700 border-2 border-round mb-4'}>
								<div className="w-full text-right pb-2">
									<Button
										className="m-2"
										icon="pi pi-refresh "
										rounded
										
										label='Reset'
										severity="warning"
										aria-label="Change response"
										style={{ }}
										onClick={(event) => confirmReset(event, ids[1])}
									/>
								</div>
								<div className="px-4 pb-4">
									<strong>{currrentNode.data.value}</strong>

									{currrentNode.data.images &&
										currrentNode.data.images.map((image: string) => {
											return (
												<p style={{width:'100%',justifyContent:'center',display:'flex'}} key={image.replace(' ', '_')}>
													<img
														src={
															'https://ivoryguide.s3.us-west-1.amazonaws.com/images/workflows/' + currrentNode.data.flowId + '/' + image + '.png' ||
															'/images/no-image.png'
														}
														alt=""
														style={{height: "150px"}}
													/>
												</p>
											);
										})}

									{currrentNode.data.texts &&
										currrentNode.data.texts.map((text: string) => {
											return <p key={text.replace(' ', '_')}>{text}</p>;
										})}
								</div>
							</div>
							<div className="flex flex-wrap justify-content-center mb-4">
								{currrentEdges &&
									currrentEdges.map((edge: Edge) => {
										return (
											<Button
												className={`w-full border-1 max-w-25rem justify-content-center mx-2 mb-2 ${
													selectedPathIds.length !== idx + 1
														? selectedPathIds[idx + 1][0] === edge.id
															? 'pointer-events-none focus:bg-primary'
															: 'pointer-events-none  bg-gray-300 text-gray-500'
														: 'bg-white text-green-700 border-green-700 border-1 hover:text-white hover:bg-green-700'
												}`}
												style={{border:'1px solid var(--primary-color)'}}
												onClick={() => selectPath(edge.id)}
												key={'edge_' + edge.source + edge.target}>
												{edge.data.value}
											</Button>
										);
									})}
								{!currrentEdges && <h4 className="w-full text-center text-green-700">Please contact lab if you have further questions.</h4>}
							</div>
						</div>
					);
			});

			setPathElements(elements);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPathIds]);

	const selectPath = (edgeId: number) => {
		const selectedEdge = selectedEdgeData.find((edge: Edge) => edge.id === edgeId);
		dispatch(setSelectedPathIds([...selectedPathIds, [edgeId, selectedEdge.target]]));
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

export default WorkflowText;
