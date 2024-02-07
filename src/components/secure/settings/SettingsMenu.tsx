'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import classNames from 'classnames/bind';
import { use, useEffect } from 'react';

const cx = classNames.bind(styles);


export interface SettingsMenuProps {
	active?: string;
	menuItems: {id:string,label:string, icon:string}[];
	onSelect?: (item) => void;
}

export default function SettingsMenu({active, menuItems, onSelect}:SettingsMenuProps = {menuItems:[]} as SettingsMenuProps) {


	return (
		<div className={cx('menu')}>
			<div className={cx('menu-title')}>
				<span>Settings</span>
			</div>
			<div className="flex flex-column">
				{menuItems.map((item, index) => {
					return (
						<div
							key={`${item.id}_${index}`}
							className={cx('menu-item',{'active': active === item.id})}
							onClick={() => onSelect && onSelect(item)}
							>
							<i className={cx('icon', `${item.icon}`, ' mr-2 text-gray-900')}></i>
							<span>{item.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
