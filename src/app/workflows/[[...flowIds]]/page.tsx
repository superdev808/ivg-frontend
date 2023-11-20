'use client';
import WorkflowsComponent from '@/components/workflow';
import { useAppSelector } from "@/redux/hooks";
import WorkflowProduct from '../product';

export default function WorkflowSelectionMenuPage({ params }: { params: { flowIds: string[] } }) {
	const {authenticated} = useAppSelector((state) => state.auth);
	const { flowIds } = params;
	return authenticated ? <WorkflowsComponent flowIds={flowIds} /> : <WorkflowProduct />
}
