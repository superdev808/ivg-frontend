'use client';
import { useState, useRef} from "react";
import { redirect, usePathname } from 'next/navigation';

// STYLES
import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";
const cx = classNames.bind(styles);

import Navbar from "./navbar";

// HOOKS & HELPERS
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { deleteCookie } from "@/helpers/cookie";

import { PrimeIcons } from 'primereact/api';

//REDUX
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { NavLink } from "@/types/Layout";



export interface NavigationProps {
  secure?: boolean;
  transparentBg?: boolean;

}

const Navigation = ({secure, transparentBg}: NavigationProps ) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const onSignOut = async () => {
		try {
      deleteCookie('appToken', '/');
      deleteCookie('email', '/');
      dispatch(setAuth(false));

      redirect( '/login' );
		} catch (error: any) {
		
		}
	};

  

  const navLinks:NavLink[] = [
    
      {id:'product',title: 'Product', link: '/product'},
      {id:'about',title: 'About', link: '/about'},


    // Protected Links
    {id:'calculators',title: 'Calculators', link: '/calculators', secure: true},
      // {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP, auth: true},
  ]

  const rightNavLinks:NavLink[] = [
    // {id: 'register', title: 'Register', link: '/signup', icon: PrimeIcons.USER},
    {id: 'contact', title: 'Contact Us', link: '/contact', icon: PrimeIcons.PHONE},
    {id: 'login', title: 'Login', link: '/login', icon: PrimeIcons.SIGN_IN},

    // Protected Links
    {id: 'signout', title: 'Sign Out', onClick:onSignOut,  icon: PrimeIcons.SIGN_OUT, secure: true}
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
    <div ref={boxRef} className={cx(["z-2 w-full py-2 absolute top-1",{'nav-background': !transparentBg}])} >
      <Navbar navLinks={navLinks} rightNavLinks={rightNavLinks} secure={secure} />
    </div>
  );
};

export default Navigation;