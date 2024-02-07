'use client';
import { useState, useRef, use, useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';

// STYLES
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
const cx = classNames.bind(styles);

import Navbar from './navbar';

// HOOKS & HELPERS
import useOutsideClick from '@/hooks/useOutsideClick';
import useCheckMobileScreen from '@/hooks/useCheckMobileScreen';
import { deleteCookie, getCookie } from '@/helpers/cookie';

import { PrimeIcons } from 'primereact/api';

//REDUX
import { useAppSelector } from '@/redux/hooks/hooks';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/auth/authSlice';
import { useRouter } from 'next/navigation';
import { NavLink } from '@/types/Layout';
import { MenuItem } from 'primereact/menuitem';
import { getInitials } from '@/helpers/util';
import { Avatar } from 'primereact/avatar';
import { USER_ROLES } from '@/constants/users';
import { getUserRole } from '@/helpers/getUserRole';

export interface NavigationProps {
	secure?: boolean;
	transparentBg?: boolean;
}

const Navigation = ({ secure, transparentBg }: NavigationProps) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const userName = getCookie('name');
	const userEmail = getCookie('email');

	const { role } = useAppSelector((state) => state.auth);

	// toggle sidebar
	const [isOpen, setIsOpen] = useState(false);
	const boxRef = useRef(null);

	useEffect(() => {
		if (role === USER_ROLES.ADMIN) {
			avatarLinks.splice(3, 0, {
				label: 'Administaration',
				icon: 'pi pi-cog',
				url: '/admin',
			});
		}
	}, [role]); // eslint-disable-line react-hooks/exhaustive-deps

	const onSignOut = async () => {
		try {
			deleteCookie('appToken', '/');
			deleteCookie('email', '/');
			dispatch(setAuth(false));

			router.push('/login');
		} catch (error: any) {
			console.log(error);
		}
	};

	const navLinks: NavLink[] = [
		{ id: 'product', title: 'Product', link: '/product' },
		{ id: 'about', title: 'About', link: '/about' },

		// Protected Links
		{ id: 'calculators', title: 'Calculators', link: '/calculators', secure: true },
		// {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP, auth: true},
	];

	const rightNavLinks: NavLink[] = [
		{ id: 'contact', title: 'Contact Us', link: '/contact', icon: PrimeIcons.PHONE },
		{ id: 'register', title: 'Register', link: '/register', icon: PrimeIcons.USER },
		{ id: 'login', title: 'Login', link: '/login', icon: PrimeIcons.SIGN_IN },

		// Protected Links
		{ id: 'help', title: 'Help', link: '/help', icon: PrimeIcons.QUESTION_CIRCLE, secure: true },
		{ id: 'settings', title: 'Settings', link: '/settings', icon: PrimeIcons.USER, secure: true },
		{ id: 'signout', title: 'Sign Out', onClick: onSignOut, icon: PrimeIcons.SIGN_OUT, secure: true },
	];

	const avatar = (
		<Avatar
			label={getInitials(userName)}
			size="normal"
			className="bg-orange-100 font-bold text-700"
			shape="circle"
		/>
	);

	let avatarLinks: MenuItem[] = [
		{
			template: (item, options) => {
				return (
					<div className="flex px-2">
						{avatar}

						<div className="flex flex-column align ml-3">
							<span className="font-bold">{userName}</span>
							<span className="text-sm">{userEmail}</span>
						</div>
					</div>
				);
			},
		},

		{
			separator: true,
		},

		{
			label: 'Settings',
			icon: 'pi pi-cog',
			url: '/settings',
		},
		{
			label: 'Help',
			icon: 'pi pi-question',
			url: '/help',
		},
		{
			separator: true,
		},

		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			command: onSignOut,
		},
	];

	const closeMenu: () => void = () => {
		setIsOpen(false);
	};

	useOutsideClick(boxRef, closeMenu);
	useCheckMobileScreen(closeMenu);

	return (
		<div
			ref={boxRef}
			className={cx(['z-2 w-full py-2 absolute top-1', { 'nav-background': !transparentBg }])}>
			<Navbar
				navLinks={navLinks}
				rightNavLinks={rightNavLinks}
				avatarLinks={avatarLinks}
				avatar={avatar}
				secure={secure}
			/>
		</div>
	);
};

export default Navigation;
