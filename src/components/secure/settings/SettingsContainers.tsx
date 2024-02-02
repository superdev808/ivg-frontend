'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import classNames from 'classnames/bind';
import SettingsMenu from './SettingsMenu';
import SettingsUserInfoForm from './SettingsUserInfoForm';
import { useState } from 'react';
import SettingsUserSecurityForm from './SettingsUserSecurityForm';
import SettingsUserOrgForm from './SettingsUserOrgForm';
const cx = classNames.bind(styles);

export default function SettingsContainers() {
	const menuItems = [
		{id:'profile', label: 'Profile', icon: 'pi pi-fw pi-user' },
		{id:'organization',  label: 'Organization', icon: 'pi pi-fw pi-globe' },
		{id:'password',  label: 'Password & Security', icon: 'pi pi-fw pi-lock' },
	];
	const [currentSetting, setCurrentSetting] = useState(menuItems[0].id);

	const onSelect = (item) => {
		
		setCurrentSetting(item.id);
	}

	return (
		<>
			<div
				id="container"
				className="nav-offset container flex justify-content-center overflow-auto">
				<div
					id="wrapper"
					className={cx('settings', 'wrapper grid m-0 my-4 p-0 justify-content-center ')}>
<SettingsUserInfoForm />

				</div>
			</div>
		</>
	);
}
