'use client';
import { use, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

import styles from './Workflow.module.scss';
import { useAppSelector } from '@/redux/hooks';

type MenuItem = {
	id: number;
	value: string;
	hierarchy: string[];
	description?: string;
};
export default function WorkflowSelectionMenuComponent({flowIds}: {flowIds:string[]}) {
	const router = useRouter();
	// const { currentItems, currentQuestion, breadcrumbs, isLoading } = useWorkflowSelections(params.flowIds);

    const {  menuItems, menuQuestions } = useAppSelector((state) => state.workflows);
    const {selectedId} = useAppSelector((state) => state.workflowSelection);
	
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [highlightedItem, setHighlightedItem] = useState<any>(null);
	const [currentItems, setCurrentItems] = useState<MenuItem[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState<MenuItem | null>(null);
	const [breadcrumbs, setBreadcrumbs] = useState<{value:string, path:string}[]>([]);


	function filterCurrentSelections(ids: string[]) {
		return menuItems.filter((item) => String(item.hierarchy) == String(ids));
	}
	function filterCurrentQuestions(ids: string[]) {
		return menuQuestions.filter((item) => String(item.hierarchy) == String(ids));
	}

	useEffect(() => {
        if (menuItems.length == 0 || menuQuestions.length == 0) return
		let mappedBreadcrumbs:{value:string, path:string}[] = [];
		if (flowIds) {
			mappedBreadcrumbs = flowIds.map((id, index) => {
				const items = menuItems.filter((item) => String(item.id) == String(id));
                let item = items[0]
                if (index !== 0 ){
                    item = items.find((item) => String(item.hierarchy) == String(flowIds.slice(0, -1)));
                }
				return item ? { value: item.value, path: '/workflows/' + item.hierarchy.join('/') } : { value: '', path: '' };
	
			});

		}
		let currentItems = filterCurrentSelections(flowIds);
		let currentQuestion = filterCurrentQuestions(flowIds);
		if (currentItems.length == 0) {
			currentItems = filterCurrentSelections([] as string[]);
			currentQuestion = filterCurrentQuestions([] as string[]);
            router.push('/workflows', { scroll: false });
			
		}
	
		setBreadcrumbs(mappedBreadcrumbs);
		setCurrentQuestion(currentQuestion[0]);
		setCurrentItems(currentItems);
		setIsLoading(false);
	}, [menuItems, menuQuestions]);


    

	const selectionPanel = () => {
		if (isLoading) {
			return selectionPanelSkeleton();
		}
		return (
			<>
				{currentItems &&
					currentItems.map((item) => {
						return (
							<div
								key={item.id}
								className={`${styles.selectionItem} flex flex-column ${
									item && highlightedItem && highlightedItem.id === item.id ? 'border-green-700 border-2' : ''
								}`}
								onClick={() => setHighlightedItem(item)}>
								{item.value}
							</div>
						);
					})}
			</>
		);
	};

	const selectionPanelSkeleton = () => {
		return (
			<div>
				{Array.from({ length: 6 }).map((_, index) => {
					return (
						<Skeleton
							key={index}
							width="100%"
							height="5rem"
							className="my-3"></Skeleton>
					);
				})}
			</div>
		);
	};

	const descriptionPanel = () => {
		if (!highlightedItem) {
			return (
				<>
					<div>
						<img
							src="/images/select_calc.svg"
							width="250"
							alt=""
						/>
					</div>
					<div>
						<h4>Please make a selection</h4>
					</div>
				</>
			);
		}
		return (
			<>
				<div className="flex flex-column align-items-center justify-content-center w-full py-6  bg-gray-200">
					<h2 className="text-gray-800 m-0 text-center">{highlightedItem && highlightedItem.value}</h2>
					<div className="w-5rem mt-4 divider-accent"></div>
				</div>
				<div className={'flex flex-grow-1 p-6 '}>{highlightedItem && highlightedItem.description}</div>
				<div className="flex w-full justify-content-end p-6">
					<Link href={'/workflows/' + (flowIds ?  flowIds.join('/') + '/' : '') + highlightedItem.id}>
						<Button className="justify-content-center">Next</Button>
					</Link>
				</div>
			</>
		);
	};
	return (
		<div
			className={'flex lg:h-full justify-content-center align-items-center  lg:py-5'}
			style={{ minHeight: '50rem' }}>
			<div className="flex flex-column w-full xl:w-7 h-full  shadow-1 bg-white">
				<div className="flex flex-column mx-5 my-0">
					<div className="flex align-items-center mt-4">
                    {isLoading ? (
						<Skeleton
                        width="25%"
                        height="1.5rem"
                        className="my-2"></Skeleton>
						) : (
							
                            <>
						<h4 className="text-green-700 m-2">Workflows</h4>
						{breadcrumbs &&
							breadcrumbs.map((item) => {
                                return (
                                    <div
										key={item.path}
										className="flex align-items-center">
										<i className="pi pi-chevron-right text-xs"></i>
										<Link
											className="no-underline	"
											href={item.path}>
											<h4 className="text-green-700 m-2 hover:text-green-500">{item.value}</h4>
										</Link>
									</div>
								);
							})}
                                </>
                            
                            )}
					</div>
					<div className="flex justify-content-center">
						{isLoading ? (
						<Skeleton
                        width="60%"
                        height="2rem"
                        className="my-3"></Skeleton>
						) : (
							<h2 className="">{currentQuestion && currentQuestion.value}</h2>
						)}
					</div>
				</div>
				<div className="flex flex-column lg:flex-row h-full border-top-1 border-gray-300 lg:overflow-hidden ">
					<div className="col-12 flex-order-1 lg:flex-order-0 lg:col-6 flex flex-column  px-5 py-2 border-right-1 border-gray-300 overflow-auto">
						{selectionPanel()}
					</div>
					<div className="col-12 flex-order-0 lg:flex-order-1 lg:col-6 flex flex-column justify-content-center align-items-center p-0">
						{descriptionPanel()}
					</div>
				</div>
			</div>
		</div>
	);
}
