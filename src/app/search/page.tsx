'use client';

import { DemoComponent } from '@/components/demo';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
export default function DemoPage() {
	return (
		
			<div className="flex flex-column surface-0 text-700  align-items-center pt-8">
				<div className="text-900 font-bold text-5xl mb-3">How can we help you?</div>
				<div className="text-700 text-2xl mb-5">Search and Discover: Find Your Guide with Ease</div>
				<InputText className='my-4 w-5'></InputText>
				<Button
					label="Search"
					icon="pi pi-search"
					className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
				></Button>
			</div>
	
	);

	// 	<DemoComponent />;
}
