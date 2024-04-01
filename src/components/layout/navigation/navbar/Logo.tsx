"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hooks/hooks";

import LogoIcon from "../../../../../public/images/logo/Ivory-Guide-Logo-Horizontal.svg";

import LogoLightIcon from "../../../../../public/images/logo/Ivory-Guide-Logo-Horizontal-Light.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Logo = ({ light }: { light?: boolean }) => {
  const { authenticated } = useAppSelector((state) => state.auth);
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  const LogoComponent = light ? LogoLightIcon : LogoIcon;

  return (
    <Link href={authenticated ? "/home" : "/"}>
      <LogoComponent style={{ width: 210, height: 35 }} />
    </Link>
  );
};

export default Logo;
