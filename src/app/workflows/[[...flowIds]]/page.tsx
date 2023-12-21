'use client';
import { useEffect, useState } from 'react';
import WorkflowsComponent from '@/components/workflow';
import { useAppSelector } from '@/redux/hooks';
import WorkflowProduct from '../product';

export default function WorkflowSelectionMenuPage({ params }: { params: { flowIds: string[] } }) {
	const { flowIds } = params;
	const { authenticated } = useAppSelector((state) => state.auth);

	return authenticated ? <WorkflowsComponent flowIds={flowIds} /> : <WorkflowProduct />;
}
