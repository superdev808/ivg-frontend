'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import classNames from 'classnames/bind';
import SettingsUserInfoForm from './SettingsUserInfoForm';
const cx = classNames.bind(styles);

export default function SettingsContainers() {
	const menuItems = [
		{ id: 'profile', label: 'Profile', icon: 'pi pi-fw pi-user' },
		{ id: 'organization', label: 'Organization', icon: 'pi pi-fw pi-globe' },
		{ id: 'password', label: 'Password & Security', icon: 'pi pi-fw pi-lock' },
	];

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
