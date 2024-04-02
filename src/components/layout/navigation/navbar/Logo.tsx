"use client";

import Link from "next/link";

import { useAppSelector } from "@/redux/hooks/hooks";

import LogoIcon from "../../../../../public/images/logo/Ivory-Guide-Logo-Horizontal.svg";
import LogoLightIcon from "../../../../../public/images/logo/Ivory-Guide-Logo-Horizontal-Light.svg";

interface LogoProps {
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ light }) => {
  const { authenticated } = useAppSelector((state) => state.auth);

  const LogoComponent = light ? LogoLightIcon : LogoIcon;

  return (
    <Link href={authenticated ? "/home" : "/"}>
      <LogoComponent style={{ width: 210, height: 35 }} />
    </Link>
  );
};

export default Logo;
