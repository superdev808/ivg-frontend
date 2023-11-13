'use client';
import { useState, useRef, useEffect} from "react";
import Navbar from "./navbar";
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { PrimeIcons } from 'primereact/api';
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";

import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/redux/hooks";
const cx = classNames.bind(styles);

const Navigation = () => {
  const {authenticated,session} = useAppSelector((state) => state.auth);
  const router = useRouter()

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const onSignOut = async () => {
		try {
		
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
      const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
	
      // router.push( '/login' );
			window.location.reload();
		} catch (error: any) {
		
		}
	};

  
  
  const navLinks = [
      {id:'calculators',title: 'Calculators', link: '/calculators', icon: PrimeIcons.QRCODE, auth: authenticated},
      {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP, auth: authenticated},
  ]

  const rightNavLinks = [
    // {id: 'register', title: 'Register', link: '/signup', icon: PrimeIcons.USER},
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

  return (
    <div ref={boxRef} className={cx("absolute z-2 w-full py-2", "nav-header")}>
      <Navbar isOpen={isOpen} toggle={toggle} navLinks={navLinks} rightNavLinks={rightNavLinks} />
    </div>
  );
};

export default Navigation;