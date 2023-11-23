'use client';
import { useEffect, useState } from 'react';
import WorkflowsComponent from '@/components/workflow';
import { useAppSelector } from '@/redux/hooks';
import WorkflowProduct from '../product';

export default function WorkflowSelectionMenuPage({ params }: { params: { flowIds: string[] } }) {
	const { flowIds } = params;
	const { authenticated, isLoading } = useAppSelector((state) => state.auth);


	const renderComponent = () => {
		if (!isLoading) {
			return authenticated ? <WorkflowsComponent flowIds={flowIds} /> : <WorkflowProduct />;
		} else {
			<div>loading...</div>;
		}
	};

	return <>{renderComponent()}</>;
}
