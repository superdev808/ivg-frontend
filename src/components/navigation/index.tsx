'use client';
import { useState, useRef } from "react";
import Navbar from "./navbar";
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { PrimeIcons } from 'primereact/api';
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const cx = classNames.bind(styles);

const Navigation = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  const navLinks = [
      {id:'calculators',title: 'Calculators', link: '/calculators', icon: PrimeIcons.QRCODE},
      {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP},
  ]

  const rightNavLinks = [
    // {id: 'register', title: 'Register', link: '/signup', icon: PrimeIcons.USER},
    {id: 'login', title: 'Login', link: '/login', icon: PrimeIcons.SIGN_IN},
    {id: 'signout', title: 'Sign Out', onClick:handleSignOut(),  icon: PrimeIcons.SIGN_OUT}
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
    <div ref={boxRef} className={cx("absolute z-2 w-full", "nav-header")}>
      <Navbar isOpen={isOpen} toggle={toggle} navLinks={navLinks} rightNavLinks={rightNavLinks} />
    </div>
  );
};

export default Navigation;