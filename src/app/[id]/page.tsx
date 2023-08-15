"use client";
import { Divider } from "primereact/divider";
import GuideContainer from "@/components/guide";
import SearchHeader from "@/components/guide/header";
import { Flow } from "@/components/flow";

import useSearchRouteListener from "@/hooks/useSearchRouteListener";

export default function GuidePage() {
	useSearchRouteListener();

	return (
		<>
			<SearchHeader />
			<div className="guide-page flex justify-content-between">
				<GuideContainer />
				<Flow mask={true} />
			</div>
		</>
	);
}
