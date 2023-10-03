import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

import { Divider } from 'primereact/divider';
import SearchBar from '@/components/searchBar';
import { usePathname } from 'next/navigation';
const Navbar = ({ toggle, isOpen, navLinks }: { toggle: () => void; isOpen: boolean; navLinks: { id: string; link: string; title: string }[] }) => {
	const pathname = usePathname();

	return (
		<div className='h-6rem mx-6'>
			<div className="w-full pt-3  sticky top-0">
				<div className=" mx-auto  h-full">
					<div className="flex justify-content-between items-center h-full">
						<Logo />
						<div
							// type="button"
							className="inline-flex items-center md:hidden"
							onClick={toggle}>
							<div className={'hamburger-menu ' + (isOpen ? 'active' : '')}>
								<div className="bar-top"></div>
								<div className="bar-middle"></div>
								<div className="bar-bottom"></div>
							</div>
						</div>
							
						<div className=" navbar-nav hidden md:flex gap-x-6  ">
							<div className={(pathname === '/' ? '' : 'active') + ' search-bar-mini py-2'}>
							{/* <SearchBar /> */}
							</div>

							{navLinks.map((item) => {
								return (
									<div key={item.id}>
										<Link
											style={{ zIndex: 2000 }}
											href={item.link}>
											<p>{item.title}</p>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				{/* <Divider/> */}
				</div>
			</div>
			<div className={(pathname !== '/' ? ' hidden' : '') }>
				<div className={' search-wrapper flex  justify-content-center align-items-center'} >
					<div className={' w-full md:w-5 '}>
						<div className="search-title flex justify-content-center ">
							<h1 className="text-dark text-color-secondary m-0">How can we help you?</h1>
						</div>
						<div className="flex  justify-content-center">
							<div className=" w-6 m-0 ">
								<Divider/>
							</div>
						</div>
						<SearchBar />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
