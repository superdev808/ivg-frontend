import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

import { Divider } from "primereact/divider";
import SearchBar from "@/components/searchBar";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

let cx = classNames.bind(styles);

const Navbar = ({
  toggle,
  isOpen,
  navLinks,
  rightNavLinks,
}: {
  toggle: () => void;
  isOpen: boolean;
  navLinks: { id: string; link: string; title: string, icon: string }[];
  rightNavLinks: { id: string; link: string; title: string, icon: string }[];
}) => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-3rem md:h-4rem px-3 md:px-6 w-full sticky top-0 mt-1 mb-1">
      <div className="flex items-center justify-content-between">
        <div className="flex align-items-center">
          <Logo />
          <div className={cx("navbarNav", "hidden md:flex gap-x-6 ml-3")}>
            {navLinks.map((item) => {
              return (
                <div key={item.id}>
                  <Link href={item.link}>
                    <p>{item.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex align-items-center">
          <div className={cx("navbarNav", "hidden md:flex gap-x-6 ml-3")}>
            {rightNavLinks.map((item) => {
              return (
                <div key={item.id}>
                  <Link href={item.link}>
                    <p><i className={cx(item.icon, "px-2")} /> {item.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>

		  <Button className="md:hidden h-2rem w-2rem" icon="pi pi-bars" onClick={() => setShowSidebar(true)} />
        </div>
      </div>
      <div className={pathname !== "/" ? " hidden" : ""}>
        <div
          className={
            " search-wrapper flex  justify-content-center align-items-center"
          }
        >
          <div className={" w-full md:w-5 "}>
            <div className="search-title flex justify-content-center ">
              <h1 className="text-dark text-color-secondary m-0">
                How can we help you?
              </h1>
            </div>
            <div className="flex  justify-content-center">
              <div className=" w-6 m-0 ">
                <Divider />
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
	  <Sidebar visible={showSidebar} position="right" onHide={() => setShowSidebar(false)} className={cx("navbarNav", "align-items-end")}>
          <div className={cx("navbarNav", "flex flex-column gap-x-3 align-items-start")}>
            {[...navLinks, ...rightNavLinks].map((item) => {
              return (
				<Link href={item.link} key={item.id}>
					<p><i className={cx(item.icon, "px-2")} /> {item.title}</p>
				</Link>
              );
            })}
          </div>
	  </Sidebar>
    </div>
  );
};

export default Navbar;
