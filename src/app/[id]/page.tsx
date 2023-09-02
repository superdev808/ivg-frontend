"use client";
import { Divider } from "primereact/divider";
import GuideContainer from "@/components/guide";
import GuideHeader from "@/components/guide/header";
import { Flow } from "@/components/flow";

import { Splitter,SplitterPanel } from "primereact/splitter";
import useGuideRouteListener from "@/hooks/useGuideRouteListener";
import LayoutFlow from "@/components/guide/flow";

export default function GuidePage() {
	useGuideRouteListener();
	return (
		<>
		<Splitter style={{ height: '100%' }}>
				<SplitterPanel
					
					size={25}
					minSize={5}>
				<GuideContainer />
				</SplitterPanel>
				<SplitterPanel
					className="flex flex-column "
					size={75}>
					<div className="bg-gray-50">
						<GuideHeader />
					</div>
					<div style={{ height: '100%', width: '100%' }}>
						<LayoutFlow />
					</div>
				</SplitterPanel>
			</Splitter>
		</>
	);
}
