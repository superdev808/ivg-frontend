import { use, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	selectFlow,
	setHistory,
	setSelectedProcess,
	setCurrentOptions,
	reset,
	restart,
} from "@/redux/features/flowSlice";
import {} from "@/redux/features/flowSlice";

import { Flow } from "@/types/flow";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
export default function GuideContainer() {
	const containerRef = useRef<any>(null);
	const {
		selectedFlow,
		selectedFlowData,
		selectedStart,
		currentOptions,
		history,
	} = useSelector(selectFlow);

	const dispatch = useDispatch();

	const [displayResponsive, setDisplayResponsive] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState("");
	useEffect(() => {
		dispatch(reset());
	}, []);
	const selectCurrentQuestion = ({ option }: any) => {

		if (selectedFlowData) {
			const _selectedOption = { ...option };
			_selectedOption.options = currentOptions;

			const _selectedProcess = selectedFlowData.find(
				(el: { id: string }) => el.id == option.target
			);
			dispatch(setSelectedProcess(_selectedProcess));

			const _currentOptions = selectedFlowData.filter(
				(el: { source: string }) => el.source == option.target
			);
			dispatch(setCurrentOptions(_currentOptions));

			let _newHistory = [...history];

			if (selectedStart.id !== option.target) {
				_newHistory.push(_selectedOption);
			}

			_newHistory.push(_selectedProcess);

			dispatch(setHistory([..._newHistory]));
		}
		scrollToBottom();
	};
	const scrollToBottom = () => {
		containerRef.current.scrollTop = containerRef.current.scrollHeight;
	};

	useEffect(() => {
		scrollToBottom();
	}, [history]);
	useEffect(() => {
		if (selectedStart) {
			selectCurrentQuestion({ option: { target: selectedStart?.id } });
		}
	}, [selectedFlowData]);

	const onVideoDialogHide = () => {
		setSelectedVideo("");
		setDisplayResponsive(false);
	};
	const onVideoDialogShow = (videoLink: string) => {
		setDisplayResponsive(true);
		setSelectedVideo(videoLink);
	};
	const resetFlow = () => {
		dispatch(restart());
	};

	const reverseHistory = (process: any) => {
		const currentHistory = history;
		const newHistory = [];

		for (let i = 0; i < currentHistory.length; i++) {
			newHistory.push(currentHistory[i])
			if(currentHistory[i].id === process.id){
				if (process.start) {
					selectCurrentQuestion({ option: { target: process?.id } });
				} else {
					selectCurrentQuestion({ option: currentHistory[i-1] });
				}
				dispatch(setHistory([...newHistory]));
				break;
		}
		
		}
	
		
	};
	return (
		<>
			<Card className="guide-container">
				<div className="flex justify-content-end">
					<Button
						className="p-button-rounded p-button-outlined text-center p-button-danger p-button-sm mb-2"
						onClick={resetFlow}
					>
						Reset
					</Button>
				</div>
				<div ref={containerRef} className="guide-body">
					{(history || []).map((el: any) => {
						return !el.target ? (
							<div
								key={el.id}
								className={"flex w-full  justify-content-center mb-2"}
							>
								<button 
								onClick={() => reverseHistory(el)}
								className="p-button  w-full p-button-outlined text-center text-blue-700 ">
									{el.text_1}
									<br />
									{el.text_2}
								</button>
							
							</div>
						) : (
							<div
								key={el.id}
								className="flex justify-content-center   flex-wrap"
							>
								{(el.options || []).map((option: any) => {
									return (
										<span
											key={el.id + "_" + option.id + "_option"}
											className={
												"text-center m-4 border-1 bg-white p-2 border-round " +
												(el.id === option.id
													? " text-blue-500"
													: "text-gray-500")
											}
										>
											{option.text_1}
										</span>
									);
								})}
							</div>
						);
					})}
					<div className="flex justify-content-center  flex-wrap">
						{(currentOptions || []).map((el: any) => {
							return (
								<Button
									key={el.id}
									className="p-button text-center m-4"
									onClick={() => selectCurrentQuestion({ option: el })}
									label={el.text_1}
								></Button>
							);
						})}
					</div>
				</div>
			</Card>
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
			</Dialog>
		</>
	);
}
