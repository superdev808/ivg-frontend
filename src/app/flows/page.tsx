'use client';
import React, { useState, useEffect } from 'react';
import { FlowDataService } from '@/services/flowDataService';
import { Flow } from '@/components/flow';
import useArrayFilter from '@/hooks/useSearchBarFilter';

// import FlowMenu from '@/components/flow/Menu';

export default function FlowsPage() {
	const [prompts, setPrompts] = useState<any>([]);
	const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
	const [selectedFlowData, setSelectedFlowData] = useState<any>([]);
	const [menuClose, setMenuClose] = useState<boolean>(true);

	const [flowData, setFlowData] = useState<any>([]);

	const { filteredArray, filterValue, searchValue, handleInputChange } = useArrayFilter(prompts, []);
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

	const toggleMenu = () => {
		setMenuClose(!menuClose);
	};
	const handleSelectPrompt = (id: string) => {
		const data = flowData.filter((el: { flow_id: string }) => el.flow_id == id);

		setSelectedFlowData(data);
		setSelectedPrompt(id);
	};
	return (
		<>
			<div className="flow-container flex justify-content-between pt-4">
				{/* <FlowMenu></FlowMenu> */}
				<Flow></Flow>
			</div>
		</>
	);
}
