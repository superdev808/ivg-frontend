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
  light?: boolean;
}

const Navigation = ({ authenticated, light }: NavigationProps) => {
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
    { id: "about", title: "About", link: "/about", visibility: "public" },

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
      id: "settings",
      title: "Settings",
      link: "/settings",
      icon: PrimeIcons.USER,
      visibility: "authenticatedSidebar",
    },
    {
      id: "saved-results",
      title: "Saved Results",
      link: "/saved-results",
      icon: PrimeIcons.USER,
      visibility: "authenticatedSidebar",
    },
    {
      id: "help",
      title: "Help",
      link: "/help",
      icon: PrimeIcons.QUESTION_CIRCLE,
      visibility: "authenticatedSidebar",
    },
    {
      id: "signout",
      title: "Sign Out",
      onClick: onSignOut,
      icon: PrimeIcons.SIGN_OUT,
      visibility: "authenticatedSidebar",
    },
  ];

  const avatar = (
    <Avatar
      label={getInitials(userName)}
      size="normal"
      className="bg-light-brown font-bold text-dark-green"
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
      label: "Saved Results",
      icon: "pi pi-save",
      url: "/settings/saved-results",
    },
    {
      label: "Administration",
      icon: "pi pi-cog",
      url: "/admin",
      visible: role === USER_ROLES.ADMIN,
    },
    {
      label: "Help",
      icon: "pi pi-question",
      url: "/help",
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
      className={cx("z-2 w-full py-2", {
        "nav-light": light,
        "nav-dark": !light,
      })}
    >
      <Navbar
        navLinks={navLinks}
        rightNavLinks={rightNavLinks}
        avatarLinks={avatarLinks}
        avatar={avatar}
        authenticated={authenticated}
        light={light}
      />
    </div>
  );
};

export default Navigation;
