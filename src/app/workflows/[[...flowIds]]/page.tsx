'use client';
import { use, useEffect, useState } from 'react';
import WorkflowsComponent from '@/components/workflow';
import { useAppSelector } from '@/redux/hooks';
import WorkflowProduct from '../product';
import { setRoute } from '@/redux/slices/shared/routeSlice';
import { useAppDispatch } from '@/redux/hooks';
export default function WorkflowPage({ params }: { params: { flowIds: string[] } }) {
	const dispatch = useAppDispatch();
	const { flowIds } = params;

	useEffect(() => {dispatch(setRoute(flowIds))}, [flowIds]);
	

	const { authenticated, isLoading } = useAppSelector((state) => state.auth);


	const renderComponent = () => {
		if (!isLoading) {
			return authenticated ? <WorkflowsComponent /> : <WorkflowProduct />;
		} else {
			<div>loading...</div>;
		}
	};

	return <>{renderComponent()}</>;

}
