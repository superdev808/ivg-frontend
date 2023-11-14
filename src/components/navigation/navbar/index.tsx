import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

import { Divider } from 'primereact/divider';
import SearchBar from '@/components/searchBar';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

let cx = classNames.bind(styles);

const Navbar = ({
	toggle,
	isOpen,
	navLinks,
	rightNavLinks,
}: {
	toggle: () => void;
	isOpen: boolean;
	navLinks: { id: string; link: string; title: string; icon: string; auth: boolean; onClick?: any }[];
	rightNavLinks: { id: string; link?: string; title: string; icon: string; onClick?: any; auth: boolean }[];
}) => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (<div className="px-3 md:px-6 w-full  top-0 mt-1 mb-1">
			<div className="flex items-center justify-content-between">
				<div className="flex align-items-center">
					<Logo />
					<div className={cx('navbarNav', 'hidden md:flex gap-x-6 ml-3')}>
						{navLinks
							.filter((li) => li.auth)
							.map((item) => {
								return (
									<div key={item.id + '_full'}>
										<Link href={item.link}>
											<p>{item.title}</p>
										</Link>
									</div>
								);
							})}
					</div>
				</div>
				<div className="flex align-items-center">
					<div className={cx('navbarNav', 'hidden md:flex gap-x-6 ml-3')}>
						{rightNavLinks
							.filter((li) => li.auth)
							.map((item) => {
								if (item.onClick) {
									return (
										<div
											onClick={() => item.onClick()}
											key={item.id + '_full'}
											className="text-white cursor-pointer hover:text-primary">
											<p>
												<i className={cx(item.icon, 'px-2 ')} /> {item.title}
											</p>
										</div>
									);
								}
								return (
									<div key={item.id + '_full'}>
										<Link href={item.link || '/'}>
											<p>
												<i className={cx(item.icon, 'px-2')} /> {item.title}
											</p>
										</Link>
									</div>
								);
							})}
					</div>

					<Button
						className="md:hidden h-2rem w-2rem"
						icon="pi pi-bars"
						onClick={() => setShowSidebar(true)}
					/>
				</div>
			</div>
			<Sidebar
				visible={showSidebar}
				position="right"
				onHide={() => setShowSidebar(false)}
				className={cx('navbarNav', 'align-items-end')}>
				<div className={cx('navbarNav', 'flex flex-column gap-x-3 align-items-start')}>
					{[...navLinks, ...rightNavLinks]
						.filter((li) => li.auth)
						.map((item, index) => {
							if (item.onClick) {
								return (
									<div
										onClick={() => item.onClick()}
										key={item.id}
										className="text-white cursor-pointer hover:text-primary">
										<p>
											<i className={cx(item.icon, 'px-2 ')} /> {item.title}
										</p>
									</div>
								);
							}
							return (
								<Link
									href={item.link || ''}
									key={item.id}>
									<p>
										<i className={cx(item.icon, 'px-2')} /> {item.title}
									</p>
								</Link>
							);
						})}
				</div>
			</Sidebar>
		</div>);
};

export default Navbar;
