import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Logo from './Logo';

import { Divider } from 'primereact/divider';
import SearchBar from '@/components/ui/searchBar';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import 'primeicons/primeicons.css';
import { Sidebar } from 'primereact/sidebar';
import { NavLink } from '@/types/Layout';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

let cx = classNames.bind(styles);

const Navbar = ({
	navLinks,
	rightNavLinks,
	avatarLinks,
	avatar,
	secure,
}: {
	navLinks: NavLink[];
	rightNavLinks: NavLink[];
	avatarLinks: MenuItem[];
	avatar: JSX.Element;
	secure?: boolean;
}) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const pathName = usePathname();

	const avatarMenu = useRef<Menu>(null);

	const onClick = (item: NavLink) => {
		if (item.onClick) {
			item.onClick();
		}
		setShowSidebar(false);
	};
	const renderHambuger = () => {
		return (
			<div
				className={cx('hamburger', { open: showSidebar }, 'md:hidden')}
				onClick={() => setShowSidebar(!showSidebar)}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	};

	return (
		<div className={cx({ 'md:px-8': !secure }, 'px-4  w-full  top-0 mt-1 mb-1')}>
			<div className="flex items-center justify-content-between">
				<div className="flex align-items-center">
					<Logo />
					<div className={cx('navbarNav', 'hidden md:flex gap-x-6 ml-3')}>
						{navLinks
							.filter((li) => li.secure === secure)
							.map((item) => {
								return (
									<div key={item.id + '_full'}>
										<Link href={item.link || ''}>
											<p className={cx({ active: pathName.includes(item.link || 'unknown') })}>{item.title}</p>
										</Link>
									</div>
								);
							})}
					</div>
				</div>
				<div className="flex align-items-center ">
					<div className={cx('navbarNav', 'hidden md:flex gap-x-6 ml-3')}>
						{rightNavLinks
							.filter((li) => (li.secure === secure && secure === undefined) || secure === false)
							.map((item) => {
								return (
									<div
										key={item.id + '_full'}
										className={cx(item.className)}>
										<Link
											href={item.link || '/'}
											onClick={() => onClick(item)}>
											<p className={cx({ active: pathName.includes(item.link || 'unknown') })}>
												<i className={cx(item.icon, 'px-2')} />
												{item.title}
											</p>
										</Link>
									</div>
								);
							})}
					</div>
					<div className="hidden md:flex ">
						<Menu
							model={avatarLinks}
							popup
							ref={avatarMenu}
							id="popup_menu_right"
							popupAlignment="right"
							className="mt-2 w-full md:w-15rem"
						/>
						{secure && (
							<div
								className={cx('avatar')}
								onClick={(event) => {
									avatarMenu.current?.toggle(event);
								}}>
								{avatar}
							</div>
						)}
					</div>

					{renderHambuger()}
				</div>
			</div>
			<Sidebar
				visible={showSidebar}
				position="right"
				onHide={() => setShowSidebar(false)}
				className={cx('sidebar', 'align-items-end')}>
				<div className={cx('navbarNav', ' flex flex-column gap-x-3 align-items-start')}>
					{[...navLinks, ...rightNavLinks]
						.filter((li) => li.secure === secure)
						.map((item, index) => {
							return (
								<Link
									href={item.link || ''}
									key={item.id}
									onClick={() => onClick(item)}>
									<p>
										{/* <i className={cx(item.icon, 'px-2')} /> */}
										{item.title}
									</p>
								</Link>
							);
						})}
				</div>
			</Sidebar>
		</div>
	);
};

export default Navbar;
