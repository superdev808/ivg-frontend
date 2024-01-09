"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../Navigation.module.scss"

const Logo = () => {
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

  return (
    <Link href="/calculators" style={{ display: showButton ? "none" : "block", textDecoration: "none", alignSelf: "center" }}>
      <Image
        src="/images/logo/Ivory-Guide-Horizontal-Logo-White.png"
        alt="Logo"
        // width={width < 1024 ? "180" : "320"}
        // height={width < 1024 ? "45" : "64"}
        width={"210"}
        height={"35"}
        className="relative"
      />
    </Link>
  );
};

export default Logo;