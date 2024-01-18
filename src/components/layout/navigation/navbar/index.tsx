import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

import { Divider } from 'primereact/divider';
import SearchBar from '@/components/ui/searchBar';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { NavLink } from '@/types/Layout';

let cx = classNames.bind(styles);

const Navbar = ({

	navLinks,
	rightNavLinks,
	secure
}: {
	navLinks: NavLink[];
	rightNavLinks: NavLink[];
	secure?: boolean;
}) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const pathName = usePathname();


	const onClick = (item:NavLink) => {
		if (item.onClick){

			item.onClick();
		}
		setShowSidebar(false)
		
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
		<div className="px-3 md:px-8 w-full  top-0 mt-1 mb-1">
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
				<div className="flex align-items-center">
					<div className={cx('navbarNav', 'hidden md:flex gap-x-6 ml-3')}>
						{rightNavLinks
							.filter((li) => li.secure === secure)
							.map((item) => {
					
								return (
									<div key={item.id + '_full'}>
										<Link href={item.link || '/'} onClick={()=>onClick(item)}>
											<p className={cx({ active: pathName.includes(item.link || 'unknown') })}>
												<i className={cx(item.icon, 'px-2')} /> {item.title}
											</p>
										</Link>
									</div>
								);
							})}
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
									onClick={() => onClick(item)}
									>
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
