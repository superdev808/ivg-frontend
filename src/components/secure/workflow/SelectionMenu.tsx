'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

import styles from './Workflow.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from 'primereact/utils';
import { MenuItem } from '@/types/Workflow';
import { Divider } from 'primereact/divider';

export default function WorkflowSelectionMenuComponent() {
	// Routing
	const router = useRouter();
	const { route } = useAppSelector((state) => state.route);

	// Data Management
	const { menuItems, menuQuestions } = useAppSelector((state) => state.workflows);

	// Local States
	const [itemMap, setItemMap] = useState<Map<number, MenuItem>>();
	const [primaryColumn, setPrimaryColumn] = useState<MenuItem[] | undefined>([]);
	const [secondaryColumn, setSecondaryColumn] = useState<MenuItem[] | undefined>([]);
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; id: string; hierarchy: string[] }[]>([]);
	// initiate data for menu
	useEffect(() => {
		if (menuItems.length == 0 || menuQuestions.length == 0) return;

		const data = nestData(menuItems) || [];
		let layerItems = data;

		// checks for ids in route and sets the selected item
		if (route) {
			let currentItem: MenuItem | null = null;
			// Loops through the route and finds the item in the nested data
			route.forEach((id: string) => {
				if (!currentItem) {
					currentItem = data.find((item) => Number(item.id) === Number(id)) || null;
				} else {
					const hierarchyItems = currentItem.hierarchyItems;
					layerItems = hierarchyItems || [];
					currentItem = hierarchyItems?.find((item) => Number(item.id) === Number(id)) || null;
				}
			});

			// If the currentItem is null, it means the route is invalid and we should redirect to the workflows page
			if (!currentItem) {
				router.push('/workflows', { scroll: false });
				return;
			}
			// Sets the selected item and the secondary column
			handlePrimarySelect(currentItem, 0);
		}
		// Sets the primary column
		setPrimaryColumn(layerItems);
	}, [menuItems, menuQuestions]);

	useEffect(() => {
		setBreadcrumbs([]);
		if (!selectedItem) return;
		const breadcrumb = getBreadCrumb();

		setBreadcrumbs(breadcrumb);
	}, [selectedItem]);

	// nest data for menu
	const nestData = (data: MenuItem[]) => {
		const map = new Map(data.map((item) => [item.id, { ...item, hierarchyItems: [] as MenuItem[] }]));
		setItemMap(map);
		const rootItems = data.filter((item) => item.hierarchy.length === 0).map((item) => map.get(item.id));
		data.forEach((item) => {
			if (item.hierarchy.length > 0) {
				const parentId = Number(item.hierarchy[item.hierarchy.length - 1]);
				const parentItem = map.get(parentId);
				if (parentItem) {
					parentItem.hierarchyItems?.push(map.get(item.id) as MenuItem);
				}
			}
		});

		return rootItems as MenuItem[];
	};

	const handlePrimarySelect = (item: MenuItem, index: number) => {
		setSecondaryColumn(item.hierarchyItems);
		setSelectedItem(item);
		pushRoute(item);
	};

	const handleSecondarySelect = (item: MenuItem, index: number) => {
		setPrimaryColumn(secondaryColumn);
		setSelectedItem(item);
		setSecondaryColumn(item.hierarchyItems);
		pushRoute(item);
	};
	const pushRoute = (item: MenuItem) => {	

		router.replace(`/workflows${item.hierarchy.length > 0 ? '/' + item.hierarchy.join('/') : ''}/${item.id.toString()}`)
	}

	const getBreadCrumb = () => {
		const breadcrumb = [];
		selectedItem?.hierarchy?.map((item) => {
			const itemData = itemMap?.get(Number(item));
			breadcrumb.push(itemData);
		});
		breadcrumb.push(selectedItem);

		return breadcrumb as any[];
	};
	return (
		<div className="flex w-full justify-content-center align-items-center ">
			<div className={classNames([styles.container, 'p-4'])}>
				<div className="flex flex-column align-items-center">
					<h2 className="m-0 mb-2">Workflows</h2>
					<div className="flex">
						{breadcrumbs.length > 0 ? (
							breadcrumbs.map((item, index) => {
								return (
									<div
										key={item.id}
										className="flex align-items-center">
										<i className={classNames([index !== 0 ? 'pi pi-chevron-right text-xs' : 'hidden'])}></i>
										<Link
											className="no-underline	"
											href={`/workflows${item.hierarchy.length > 0 ? '/' + item.hierarchy.join('/') : ''}/${item.id.toString()}`}>
											<h5 className="text-gray-700 m-2 hover:text-green-500">{item.label}</h5>
										</Link>
									</div>
								);
							})
						) : (
							<p></p>
						)}
					</div>

					<div className="px-8 w-full">
						<span className="p-input-icon-left w-full">
							<i className="pi pi-search" />
							<InputText
								className="p-inputtext-sm w-full"
								placeholder="Search..."
							/>
						</span>
					</div>
				</div>

				<Divider />
				<div className="flex h-full ">
					<div className={styles.column}>
						{primaryColumn &&
							primaryColumn.map((item, index) => (
								<Link
									key={item.id}
									className="no-underline	"
									href={`/workflows${item.hierarchy.length > 0 ? '/' + item.hierarchy.join('/') : ''}/${item.id.toString()}`}>
									<button
										key={item.id}
										onClick={() => handlePrimarySelect(item, index)}
										className={classNames([selectedItem?.id === item.id ? styles.selected : '', styles.button, , 'w-20rem'])}>
										{item.label}
									</button>
								</Link>
							))}
					</div>
					<Divider layout="vertical" />

					<div className={`${styles.column} ${secondaryColumn ? styles.active : ''}`}>
						{secondaryColumn &&
							secondaryColumn.map((item, index) => (
								<Link
									key={item.id}
									className="no-underline	"
									href={`/workflows${item.hierarchy.length > 0 ? '/' + item.hierarchy.join('/') : ''}/${item.id.toString()}`}>
									
								<button
									className={classNames([styles.button, 'w-20rem'])}
									key={item.id}
									onClick={() => handleSecondarySelect(item, index)}>
									{item.label}
								</button>
								</Link>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
