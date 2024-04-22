import classNames from "classnames/bind";
import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Nav: React.FC = () => {
  const handleClickRelease = () => {
    const elem = document.getElementById("releases");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-column sm:flex-row align-items-center justify-content-center gap-2 md:gap-4 lg:gap-8 pt-4 pb-6 md:pb-8">
      <Link href="/explore-all">
        <Button
          label="Explore All"
          className={cx("nav-button", "bg-secondary px-0 md:text-xl")}
        />
      </Link>

      <Button
        label="New Releases"
        className={cx("nav-button", "bg-secondary px-0 md:text-xl")}
        onClick={handleClickRelease}
      />

      <Link href="/requests">
        <Button
          label="Submit Requests"
          className={cx("nav-button", "bg-secondary px-0 md:text-xl")}
        />
      </Link>
    </div>
  );
};

export default Nav;
