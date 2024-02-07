'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';
import AdminMenu from './AdminMenu';
import AdminUserManagement from './AdminUserManagement';

const cx = classNames.bind(styles);

export interface MenuItem {
	id: string;
	label: string;
	icon: string;
}

export default function AdminContainers() {
	const menuItems: MenuItem[] = [
		{ id: 'userManagement', label: 'User Management', icon: 'pi pi-fw pi-users' },
		{ id: 'auditLog', label: 'Audit Log', icon: 'pi pi-fw pi-users' },
	];
	const [currentSetting, setCurrentSetting] = useState(menuItems[0].id);

	const onSelect = (item: MenuItem) => {
		setCurrentSetting(item.id);
	};

	return (
		<>
			<div
				id="container"
				className="nav-offset flex flex-column justify-content-center flex-grow-1">
				<div
					id="wrapper"
					className={cx('grid m-0 flex-grow-1 p-4')}>
					<div className={cx('col-3 p-2 bg-white border-right-1')}>
						<AdminMenu
							active={currentSetting}
							menuItems={menuItems}
							onSelect={onSelect}
						/>
					</div>
					<div className="col ml-6 bg-white border-round-xl">
						{currentSetting === menuItems[0].id && <AdminUserManagement />}
						{currentSetting === menuItems[1].id && <div className="grid flex-grow-1">audit log</div>}
					</div>
				</div>
			</div>
		</>
	);
}
