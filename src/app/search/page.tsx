'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlowDataService } from '@/services/flowDataService';
import { useSearchParams } from 'next/navigation';
import { Divider } from 'primereact/divider';

import 'reactflow/dist/style.css';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import useArrayFilter from '@/hooks/useSearchBarFilter';

import { Flow } from '@/components/flow';
import SearchBar from '@/components/searchBar';
import Search from '@/components/search';

export default function SearchFlow() {
	const [selectedFlowData, setSelectedFlowData] = useState<any>([]);

	const [optionHistory, setOptionHistory] = useState<any>([]);
	const [currentQuestion, setCurrentQuestion] = useState<any>('');

	// const updateHistory = (data: any) => {
	// 	setOptionHistory(data);
	//   };

	//   const updateSelectedFlowData= (data: any) => {
	// 	setSelectedFlowData(data);
	//   };

	//   const updateCurrentQuestion= (data: any) => {
	// 	setCurrentQuestion(data);
	//   };

	const [prompts, setPrompts] = useState<any>([]);
	const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
	const [flowData, setFlowData] = useState<any>([]);

	const [currentOptions, setCurrentOptions] = useState<any>([]);

	const [menuClose, setMenuClose] = useState<boolean>(true);
	const [displayResponsive, setDisplayResponsive] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState('');

	const { filteredArray, filterValue, searchValue, handleInputChange } = useArrayFilter(prompts, [4, 114, 236]);
	const containerRef: any = useRef(null);
	const searchParams = useSearchParams();
	useEffect(() => {
		const flowDataService = new FlowDataService();

		flowDataService.getService().then((data) => {
			const _flowData = data.filter((el: any) => {
				return el.node_type !== 0;
			});
			setFlowData(_flowData);

			let _prompts = data.filter((el: any) => {
				return el.node_type == 0;
			});
			_prompts = _prompts.sort((a: { text_1: string }, b: { text_1: string }) => a.text_1.localeCompare(b.text_1));

			setPrompts(_prompts);
		});
	}, []);
	useEffect(() => {
		const _query = { code: searchParams.get('id'), name: searchParams.get('text_1') };

		if (_query.code && flowData.length > 0) {
			handleSelectPrompt({ value: _query });
		}
	}, [flowData]);

	useEffect(() => {
		containerRef.current.scrollTop = containerRef.current.scrollHeight;
	}, [containerRef]);

	const toggleMenu = () => {
		setMenuClose(!menuClose);
	};
	const handleSelectPrompt = (event: any) => {
		const _data = flowData.filter((el: { flow_id: string }) => el.flow_id == event.value.id);

		setSelectedFlowData(_data);
		setSelectedPrompt(event.value);

		const  _startQuestion = flowData.find((el:{start:boolean, flow_id:string})  => el.start === true && el.flow_id == event.value.id);
		
		selectCurrentQuestion( _startQuestion.id,_data );
	};

	const selectCurrentQuestion = useCallback((id:string, flowData=selectedFlowData , sourceOption?:string, reset=false  ) => {
		let _newHistory: any[] = [];
		if (!reset) {
			_newHistory = [...optionHistory];
		}
		if (sourceOption) {
			const _sourceOptionData = currentOptions.find((el: { id: string }) => el.id == sourceOption);
			console.log(_sourceOptionData)
			_newHistory.push(_sourceOptionData);
		}

		const _currentQuestion = flowData.find((el: { id: string }) => el.id == id);

		const _currentOptions = flowData.filter((el: { source: string }) => el.source == id);

		setCurrentQuestion(_currentQuestion);
		_newHistory.push(_currentQuestion);
		setCurrentOptions(_currentOptions);
		setOptionHistory([..._newHistory]);
		scrollToBottom();
	}, [currentOptions, optionHistory, selectedFlowData, setCurrentOptions, setCurrentQuestion, setOptionHistory]);

	const resetPrompt = () => {
		setCurrentOptions([]);
		const  _startQuestion = flowData.find((el:{start:boolean, flow_id:string})  => el.start === true && el.flow_id == selectedPrompt.id);

		selectCurrentQuestion(_startQuestion.id, selectedFlowData, '', true );
	};
	const clearPrompt = () => {
		setCurrentOptions([]);
		setSelectedPrompt(null);
		setSelectedFlowData(null);
		setOptionHistory([]);
	};
	const onVideoDialogHide = () => {
		setSelectedVideo('');
		setDisplayResponsive(false);
	};
	const onVideoDialogShow = (videoLink: string) => {
		setDisplayResponsive(true);
		setSelectedVideo(videoLink);
	};
	const scrollToBottom = () => {
		containerRef.current.scrollTop = containerRef.current.scrollHeight;
	};
	return (
		<>
			<div className="container">
				<Divider />
				<div className="flex h-full ">
					<div className={' bg-white search-menu overflow-y-auto overflow-x-hidden transition-duration-200 ' + (menuClose ? ' ' : 'close')}>
						<div
							ref={containerRef}
							className="flex flex-column h-full  bg-white border-round-xs border-500 w-11">
							{!selectedPrompt ? (
								<SearchBar
									onSelect={handleSelectPrompt}
									hideIcon={true}></SearchBar>
							) : (
								<div className="flex justify-content-between">
									<h3 className="text-blue-700">{selectedPrompt.text_1}</h3>
									<div className="align-self-center">
										<Button
											icon="pi pi-refresh"
											className="p-button-rounded p-button-outlined text-center mx-2 p-button-warning"
											onClick={resetPrompt}></Button>
										<Button
											icon="pi pi-times"
											className="p-button-rounded p-button-outlined text-center mr-2 p-button-danger"
											onClick={clearPrompt}></Button>
									</div>
								</div>
							)}
							<div className="mt-4">
								{(optionHistory || []).map((el: any) => {
									return (
										<div
											key={el.id}
											className={'flex w-full ' + (el?.target ? ' justify-content-end ' : 'bg-secondary')}>
											<div
												style={{ minWidth: '7rem' }}
												className={
													'border-round border-1 font-bold p-2 overflow-none white-space-normal ' +
													(el.target ? ' text-dark-primary  my-4  text-center text-blue-500' : ' text-blue-700 ')
												}>
												{el.text_1}

												{el.video ? (
													<p className="flex justify-content-center">
														<a
															className="border-round border-1 font-bold bg-blue-700 text-white p-2 no-underline cursor-pointer"
															onClick={() => onVideoDialogShow(el.video)}>
															Click here to watch{' '}
														</a>
													</p>
												) : (
													''
												)}
											</div>
										</div>
									);
								})}
								<div className="flex justify-content-center p-2 my-2 flex-wrap">
									{(currentOptions || []).map((el: any) => {
										return (
											<div
												key={el.id}
												className=" px-4 m-1">
												<Button
													key={el.id}
													className="p-button text-center"
													onClick={() => 
														selectCurrentQuestion( el.target, selectedFlowData, el.id, false)
													}
													label={el.text_1}></Button>
											</div>
										);
									})}
								</div>
							</div>
						</div>


						<Dialog
							visible={displayResponsive}
							onHide={() => onVideoDialogHide()}
							draggable={false}
							breakpoints={{ '960px': '75vw' }}
							style={{ width: '75vw' }}
							closeOnEscape={true}>
							<div style={{ position: 'relative', paddingBottom: '700px', height: 0 }}>
								<iframe
									src="https://www.loom.com/embed/2a585bbf5b5e498799360421ec409bed?sid=0b72e227-840a-4e9d-9cb3-242ae693aba3"
									frameBorder={'0'}
									allowFullScreen={true}
									style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe>
							</div>
							{/* <Player
					playsInline
					src={selectedVideo}
					>
						
					<BigPlayButton position={'center'} />
				</Player> */}
						</Dialog>
					</div>
					<Divider
							align="bottom"
							layout="vertical">
							<Button
								icon={'pi pi-angle-right transition-duration-200 ' + (menuClose ? '-rotate-180 ' : '')}
								className="p-button-rounded p-button-outlined "
								onClick={toggleMenu}
								aria-label="close"
							/>
						</Divider>
					{/* <Search updateSelectedFlowData={updateSelectedFlowData} updateHistory={updateHistory} optionHistory ={optionHistory } selectedFlowData={selectedFlowData} updateCurrentQuestion={updateCurrentQuestion}></Search> */}
					<div className="w-full">
						<Flow
							selectedFlowData={selectedFlowData}
							mask={true}
							selectedNode={currentQuestion}></Flow>
					</div>
					{/* <Flow options={selectedFlowData} history={optionHistory} mask={true} currentQuestion={currentQuestion}></Flow> */}
				</div>
			</div>
		</>
	);
}
