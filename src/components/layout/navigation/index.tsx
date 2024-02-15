"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useDispatch } from "react-redux";

import { USER_ROLES } from "@/constants/users";
import { deleteCookie, getCookie } from "@/helpers/cookie";
import { getInitials } from "@/helpers/util";
import { useAppSelector } from "@/redux/hooks/hooks";
import { setAuth } from "@/redux/slices/auth/authSlice";
import { NavLink } from "@/types/Layout";

import styles from "./Navigation.module.scss";

import Navbar from "./navbar";

const cx = classNames.bind(styles);

export interface NavigationProps {
  authenticated?: boolean;
  transparentBg?: boolean;
}

const Navigation = ({ authenticated, transparentBg }: NavigationProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userName = getCookie("name");
  const userEmail = getCookie("email");

  const { role } = useAppSelector((state) => state.auth);

  const onSignOut = async () => {
    try {
      deleteCookie("appToken", "/");
      deleteCookie("email", "/");
      dispatch(setAuth(false));

      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const navLinks: NavLink[] = [
    { id: "product", title: "Product", link: "/product", visibility: "public" },

    // Protected Links
    {
      id: "calculators",
      title: "Calculators",
      link: "/calculators",
      visibility: "authenticated",
    },
    // {id: 'workflows',title: 'Workflows', link: '/workflows', icon: PrimeIcons.SITEMAP, auth: true},
  ];

  const rightNavLinks: NavLink[] = [
    {
      id: "contact",
      title: "Contact Us",
      link: "/contact",
      icon: PrimeIcons.PHONE,
      visibility: "public",
    },
    {
      id: "register",
      title: "Register",
      link: "/register",
      icon: PrimeIcons.USER,
      visibility: "unauthenticated",
    },
    {
      id: "login",
      title: "Login",
      link: "/login",
      icon: PrimeIcons.SIGN_IN,
      visibility: "unauthenticated",
    },

    // Protected Links
    {
      id: "help",
      title: "Help",
      link: "/help",
      icon: PrimeIcons.QUESTION_CIRCLE,
      visibility: "hidden",
    },
    {
      id: "settings",
      title: "Settings",
      link: "/settings",
      icon: PrimeIcons.USER,
      visibility: "hidden",
    },
    {
      id: "signout",
      title: "Sign Out",
      onClick: onSignOut,
      icon: PrimeIcons.SIGN_OUT,
      visibility: "hidden",
    },
  ];

  const avatar = (
    <Avatar
      label={getInitials(userName)}
      size="normal"
      className="bg-orange-100 font-bold text-700"
      shape="circle"
    />
  );

  const avatarLinks: MenuItem[] = [
    {
      template: () => (
        <div className="flex px-2">
          {avatar}

          <div className="flex flex-column align ml-3">
            <span className="font-bold">{userName}</span>
            <span className="text-sm">{userEmail}</span>
          </div>
        </div>
      ),
    },
    {
      separator: true,
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      url: "/settings",
    },
    {
      label: "Help",
      icon: "pi pi-question",
      url: "/help",
    },
    {
      label: "Administration",
      icon: "pi pi-cog",
      url: "/admin",
      visible: role === USER_ROLES.ADMIN,
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: onSignOut,
    },
  ];

  return (
    <div
      className={cx("z-2 w-full py-2 absolute top-1", {
        "nav-background": !transparentBg,
      })}
    >
      <Navbar
        navLinks={navLinks}
        rightNavLinks={rightNavLinks}
        avatarLinks={avatarLinks}
        avatar={avatar}
        authenticated={authenticated}
      />
    </div>
  );
};

export default Navigation;
