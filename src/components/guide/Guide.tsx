'use client';

import styles from './Guide.module.scss';

import GuideHeader from '@/components/guide/Header';
import GuideText from '@/components/guide/Text';
import GuideFlow from '@/components/guide/Flow';

import useSelectGuide from '@/hooks/useSelectGuide';

import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function GuideComponent() {
	useSelectGuide();
	return (
		<div className={styles.container}>
			<Splitter className="w-full border-0 overflow-hidden">
				<SplitterPanel size={25} minSize={20} className='h-full'>
					<GuideText />
				
				</SplitterPanel>
				<SplitterPanel
					className=""
					size={75}>
					<div className="flex flex-column h-full">
						<div className="px-6 py-4 bg-gray-100">
							<GuideHeader />
						</div>
						<div className='h-full'>
							<GuideFlow />
						</div>
					</div>
				</SplitterPanel>
			</Splitter>
		</div>
	);
}
