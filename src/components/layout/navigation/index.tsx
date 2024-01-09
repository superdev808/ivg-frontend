'use client';
import { useState, useRef, useEffect} from "react";
import Navbar from "./navbar";
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { PrimeIcons } from 'primereact/api';
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";

import { usePathname } from 'next/navigation';
import { useAppSelector } from "@/redux/hooks";
import { deleteCookie } from "@/helpers/cookie";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

const Navigation = () => {
  const {authenticated} = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const onSignOut = async () => {
		try {
      deleteCookie('appToken', '/');
      deleteCookie('email', '/');
      dispatch({ type: 'auth/setAuth', payload: { authenticated: false } });

      // router.push( '/login' );
			window.location.href = "/";
		} catch (error: any) {
		
		}
	};

  

  const navLinks = [
      {id:'calculators',title: 'Calculators', link: '/calculators', icon: PrimeIcons.QRCODE, auth: true},
      // {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP, auth: true},
  ]

  const rightNavLinks = [
    // {id: 'register', title: 'Register', link: '/signup', icon: PrimeIcons.USER},
    {id: 'contact', title: 'Contact Us', link: '/contact', icon: PrimeIcons.PHONE, auth: true},
    {id: 'login', title: 'Login', link: '/login', icon: PrimeIcons.SIGN_IN,auth: !authenticated},
    {id: 'signout', title: 'Sign Out', onClick:onSignOut,  icon: PrimeIcons.SIGN_OUT, auth: authenticated}
  ]


  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu: () => void = () => {
    setIsOpen(false);
  };


  useOutsideClick(boxRef, closeMenu);
  useCheckMobileScreen(closeMenu);

  const transparentNavBar = useAppSelector((state) => state.ui.transparentNavBar);

  return (
    <div ref={boxRef} className={cx(["z-2 w-full py-2 absolute top-1",{'nav-background': !transparentNavBar}])} >
      <Navbar isOpen={isOpen} toggle={toggle} navLinks={navLinks} rightNavLinks={rightNavLinks} />
    </div>
  );
};

export default Navigation;