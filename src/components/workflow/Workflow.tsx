'use client';

import styles from './Workflow.module.scss';

import WorkflowHeader from './Header';
import WorkflowText from './Text';
import WorkflowFlow from './Flow';

import useWorkflowSelected from '@/hooks/useWorkflowSelected';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useAppSelector } from '@/redux/hooks';
import { selectWorkflowSelection } from '@/redux/features/workflowSelectionSlice';

export default function WorkflowComponent() {
	useWorkflowSelected();


	return (
		<>
			<Splitter className="w-full h-full border-0 overflow-hidden">
				<SplitterPanel size={35} minSize={20} className='h-full'>
					<WorkflowText />
				
				</SplitterPanel>
				<SplitterPanel
					className=""
					size={65}>
					<div className="flex flex-column h-full">
						<div className="px-6 py-4 bg-gray-100">
							<WorkflowHeader />
						</div>
						<div className='h-full'>
							<WorkflowFlow />
						</div>
					</div>
				</SplitterPanel>
			</Splitter>
		</>
	);
}
