'use client';

import styles from './Workflow.module.scss';

import WorkflowHeader from './Header';
import WorkflowText from './Text';
import WorkflowFlow from './Flow';

import useSelectWorkflow from '@/hooks/useSelectWorkflow';

import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function WorkflowComponent() {
	useSelectWorkflow();
	return (
		<div className={styles.container}>
			<Splitter className="w-full border-0 overflow-hidden">
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
		</div>
	);
}
