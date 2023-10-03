import { use, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectGuide, setCurrentPath } from '@/redux/features/guideSlice';
import { setCurrentNode, setCurrentEdges } from '@/redux/features/guideSlice';

import { Flow } from '@/types/flow';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';

const GuideContainer = () => {
	const containerRef = useRef<any>(null);
	const { selectedGuide, guideNodeData, guideEdgeData, currentNode, currentEdges, currentPath } = useSelector(selectGuide);

	const dispatch = useDispatch();

	// resets the guide when node data changes
	useEffect(() => {
		if (guideNodeData && selectedGuide) {
			const selectedNode = guideNodeData.find((el: any) => el.start);
			

			if (selectedNode) {
				setGuideNode(selectedNode);
			}
		}
	}, [selectedGuide, guideNodeData]);

	// const [displayResponsive, setDisplayResponsive] = useState(false);
	// const [selectedVideo, setSelectedVideo] = useState("");

	const setGuideNode = (currentNode: any) => {
		if (guideNodeData) {
			const currentEdges = guideEdgeData.filter((el: any) => el.source === currentNode?.id);
			dispatch(setCurrentNode(currentNode));
			dispatch(setCurrentEdges(currentEdges));

		}
	};

	const onSelectEdge = (edge: any) => {
		let newPath = [...currentPath];
		newPath.push([currentNode, currentEdges, edge.id]);
		
		dispatch(setCurrentPath([...newPath]));

		let selectedNode = {
			id: 0,
			guideId: selectedGuide?.id,
			value: 'Please contact lab for help',
		};
		if (edge.target) {
			selectedNode = guideNodeData.find((el: any) => el.id === edge.target);
		}

		if (selectedNode) {
			setGuideNode(selectedNode);
		}
	};
	const scrollToBottom = () => {
		containerRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentPath]);

	const jumpToNode = (node: any) => {
		let newPath = [...currentPath];
		for (let i = 0; i < newPath.length; i++) {
			if (node[0].id == newPath[i][0].id) {
				newPath = newPath.splice(0, i);
				dispatch(setCurrentPath([...newPath]));
				setGuideNode(node[0]);
				break;
			}
		}
	};
	const confirmJump = (event, node) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Are you sure you want to change your response?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				jumpToNode(node);
			},
		});
	};
	
	return (
		<>
			<div className=" mb-6">
				<div className="flex m-4 justify-content-end">
					
					<Button
						icon="pi pi-refresh "
						rounded
						outlined
						severity="danger"
						aria-label="Restart"
						label="Restart"
						onClick={(event) => confirmJump(event, currentPath[0])}
					/>
				</div>
				<div
					className="px-4  overflow-y-auto"
					style={{ height: 'calc(100vh - 12rem)' }}>
					{(currentPath || []).map((el: any) => {
						return (
							<div
								key={'path_' + el[0]?.id}
								className="flex flex-column  border-1 border-round border-blue-500 bg-gray-50 px-6 py-4 mb-4 relative" >
								<span>
									<h3 className="text-center">{el[0]?.value}</h3>
								</span>
								<div
									className="flex flex-wrap justify-content-center align-self-center"
									style={{ maxWidth: '500px' }}>
									{el[1]?.map((edge: any) => {
										return (
											<div
												key={edge.id}
												className="flex justify-content-center mb-2 "
												style={{ minWidth: '125px' }}>
												<button
													disabled={edge.id != el[2]}
													className={'p-button justify-content-center' + (edge.id == el[2] ? '' : '')}>
													{edge.value}
												</button>
											</div>
										);
									})}
								</div>
								<div className="flex  justify-content-end m-2 absolute top-0 right-0 text-xs">
								
									<Button
									className='mr-2'
										icon="pi pi-refresh "
										rounded
										text
										severity="warning"
										aria-label="Change response"
										style={{ width: '10px',height:'10px' }}
										onClick={(event) => confirmJump(event, el)}
									/>
								</div>
							</div>
						);
					})}

					<div
						ref={containerRef}
						className={!selectedGuide ? '':'flex flex-column  border-1 border-round border-blue-500 bg-blue-50 p-2 '}>
						<span>
							<h3 className="text-center">{currentNode?.value}</h3>
						</span>
						<div
							className="flex flex-wrap justify-content-center align-self-center"
							style={{ maxWidth: '500px' }}>
							{currentEdges?.map((el: any) => {
								return (
									<div
										key={el.id}
										className="flex align-items-center justify-content-center mb-2 "
										style={{ minWidth: '125px' }}>
										<button
											onClick={() => onSelectEdge(el)}
											className="p-button justify-content-center p-button-outlined bg-white  text-blue-700 ">
											{el.value}
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			{/*
			<Dialog
				visible={displayResponsive}
				onHide={() => onVideoDialogHide()}
				draggable={false}
				breakpoints={{ "960px": "75vw" }}
				style={{ width: "75vw" }}
				closeOnEscape={true}
			>
				<div
					style={{ position: "relative", paddingBottom: "700px", height: 0 }}
				>
					<iframe
						src={selectedVideo}
						frameBorder={"0"}
						allowFullScreen={true}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
						}}
					></iframe>
				</div>
			</Dialog> */}
			<ConfirmPopup />
		</>
	);
};

export default GuideContainer;
