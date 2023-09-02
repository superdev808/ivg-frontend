'use client';
import React from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Button } from 'primereact/button';
import { Flow } from '@/components/flow/editor/Editor';
import EditorSideBar from '@/components/flow/editor/EditorSideBar';
import EditorHeader from '@/components/flow/editor/EditorHeader';
export default function ExplorePage() {
	return (
		<>
			<Splitter style={{ height: '100%' }}>
				<SplitterPanel
					className="overflow-y-auto"
					size={21}
					minSize={5}>
					<EditorSideBar />
				</SplitterPanel>
				<SplitterPanel
					className="flex flex-column "
					size={79}>
					<div>
						<EditorHeader />
					</div>
					<div style={{ height: '100%', width: '100%' }}>
						<Flow />
					</div>
				</SplitterPanel>
			</Splitter>
		</>
	);
}
