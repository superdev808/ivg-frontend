import classNames from "classnames/bind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import React, { useState, useRef } from "react";
import "primeicons/primeicons.css";

import { NavLink } from "@/types/Layout";

import Logo from "./Logo";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface NavbarProps {
  navLinks: NavLink[];
  rightNavLinks: NavLink[];
  avatarLinks: MenuItem[];
  avatar: JSX.Element;
  authenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  navLinks,
  rightNavLinks,
  avatarLinks,
  avatar,
  authenticated,
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const pathName = usePathname();

  const avatarMenu = useRef<Menu>(null);

  const onClick = (item: NavLink) => {
    if (item.onClick) {
      item.onClick();
    }

    setShowSidebar(false);
  };

  const renderHambuger = () => (
    <div
      className={cx("hamburger", { open: showSidebar }, "md:hidden")}
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  );

  const navLinksFilter = (li: NavLink) =>
    li.visibility === "public" ||
    li.visibility === (authenticated ? "authenticated" : "unauthenticated");

  const sidebarLinksFilter = (li: NavLink) =>
    li.visibility === "public" ||
    ["authenticated", "authenticatedSidebar"].includes(li.visibility);

  return (
    <div
      className={cx("px-4 w-full top-0 mt-1 mb-1", {
        "xl:px-8": !authenticated,
      })}
    >
      <div className="flex items-center justify-content-between">
        <div className="flex align-items-center gap-3 lg:gap-6">
          <Logo />

          <div className={cx("navbarNav", "hidden gap-3 md:flex lg:gap-6")}>
            {navLinks.filter(navLinksFilter).map((item) => (
              <div key={`${item.id}_full`}>
                <Link href={item.link || ""}>
                  <p
                    className={cx({
                      active: pathName.includes(item.link || "unknown"),
                    })}
                  >
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex align-items-center">
          <div className={cx("navbarNav", "hidden gap-3 md:flex lg:gap-6")}>
            {rightNavLinks.filter(navLinksFilter).map((item) => (
              <div key={`${item.id}_full`} className={cx(item.className)}>
                <Link href={item.link || "/"} onClick={() => onClick(item)}>
                  <p
                    className={cx({
                      active: pathName.includes(item.link || "unknown"),
                    })}
                  >
                    <i className={cx(item.icon, "px-2")} />
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden md:flex">
            <Menu
              model={avatarLinks}
              popup
              ref={avatarMenu}
              popupAlignment="right"
              className="mt-2 w-full md:w-15rem"
            />
            {authenticated && (
              <div
                className={cx("avatar ml-4 cursor-pointer")}
                onClick={(event) => {
                  avatarMenu.current?.toggle(event);
                }}
              >
                {avatar}
              </div>
            )}
          </div>

          {renderHambuger()}
        </div>
      </div>

      <Sidebar
        visible={showSidebar}
        position="right"
        onHide={() => setShowSidebar(false)}
        className={cx("sidebar", "align-items-end")}
        pt={{
          closeIcon: {
            className: "text-white",
          },
        }}
      >
        <div
          className={cx("navbarNav", "flex flex-column align-items-start pl-4")}
        >
          {[...navLinks, ...rightNavLinks]
            .filter(sidebarLinksFilter)
            .map((item) => (
              <Link
                href={item.link || ""}
                key={item.id}
                onClick={() => onClick(item)}
              >
                <p>{item.title}</p>
              </Link>
            ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default Navbar;
