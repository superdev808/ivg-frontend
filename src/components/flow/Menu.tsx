// import { use, useEffect, useRef, useState } from "react";
// import { useGetFlowsQuery } from "@/redux/services/flowApi";
// import { reset, selectFlow } from "@/redux/features/flowSlice";
// import {
// 	setSelectedFlow,
// 	setSelectedStart,
// 	setSelectedFlowData,
// 	setSelectedProcess,
// } from "@/redux/features/flowSlice";
// import {} from "@/redux/features/flowSlice";
// import { useDispatch, useSelector } from "react-redux";

// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// export default function FlowMenu() {
// 	const { isLoading, isFetching, data: flows, error } = useGetFlowsQuery(null);
// 	const dispatch = useDispatch();

// 	const { selectedFlow } = useSelector(selectFlow);

// 	const [availableFlows, setAvailableFlows] = useState<any>([]);
// 	const [filterValue, setFilterValue] = useState<string>("");
// 	const [filteredFlows, setFilteredFlows] = useState<any>(flows);

// 	useEffect(() => {
// 		dispatch(reset());
// 	}, []);

// 	useEffect(() => {
// 		const _availableFlows = flows?.filter(
// 			(el: { node_type: Number }) => el.node_type === 0
// 		);
// 		setAvailableFlows(_availableFlows);
// 		setFilteredFlows(_availableFlows);
// 	}, [flows]);

// 	const handleOnChange = (event: any) => {
// 		setFilterValue(event.target.value);
// 	};

// 	const handleCompleteMethod = (event: any) => {
// 		setTimeout(() => {
// 			let _filteredArray: any;
// 			if (!event.query.trim().length) {
				
// 				_filteredArray = [...(availableFlows || [])];
// 			} else {
// 				_filteredArray = availableFlows?.filter((el: { text_1: string }) => {
// 					return el.text_1
// 						.toString()
// 						.toLowerCase()
// 						.includes(event.query.toLowerCase());
// 				});
// 			}

// 			setFilteredFlows(_filteredArray);
// 		}, 100);
// 	};
// 	const handleOnSelect = (event: any) => {
// 		const _selectedFlowData: any = flows?.filter(
// 			(el) => el.flow_id === event.id
// 		);
// 		const _selectedStart = _selectedFlowData.find((flow: any) => flow.start);
// 		dispatch(setSelectedProcess(_selectedStart));
// 		dispatch(setSelectedFlow(event));
// 		dispatch(setSelectedFlowData(_selectedFlowData));
// 		dispatch(setSelectedStart(_selectedStart));
// 	};

// 	return (
// 		<>
// 			<Card className="flow-menu-container ">
// 				<InputText
// 					className="w-full p-inputtext-sm mb-3"
// 					placeholder="Filter..."
// 					value={filterValue}
// 					onChange={(e) => {
// 						handleCompleteMethod({ query: e.target.value });
// 						handleOnChange(e);
// 					}}
// 				/>
// 				<div className="flow-menu-body">
// 					{(filteredFlows || []).map((item: { text_1: string; id: string }) => {
// 						return (
// 							<div
// 								className={
// 									"nav-link flex justify-content-between my-2 flow-menu-item" +
// 									(selectedFlow?.id === item.id ? " active" : "")
// 								}
// 								key={"parent-" + item.id}
// 								onClick={() => handleOnSelect(item)}
// 							>
// 								<div>{item.text_1}</div>

// 								<i className="pi pi-angle-right "></i>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</Card>
// 		</>
// 	);
// }
