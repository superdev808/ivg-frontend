
import { useState, useRef } from "react";
import Navbar from "./navbar";
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { PrimeIcons } from 'primereact/api';
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Navigation = () => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);


  const navLinks = [
      {id:'calculators',title: 'Calculators', link: '/calculators', icon: PrimeIcons.QRCODE},
      {id: 'workflows',title: 'Workflows', link: '/guides', icon: PrimeIcons.SITEMAP},
  ]

  const rightNavLinks = [
    {id: 'register', title: 'Register', link: '/signup', icon: PrimeIcons.USER},
    {id: 'signin', title: 'Login', link: '/signin', icon: PrimeIcons.SIGN_IN}
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