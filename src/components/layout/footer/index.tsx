import classNames from "classnames/bind";
import Link from "next/link";
import React from "react";

import FooterExtended from "./FooterExtended";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const IS_DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE;

interface FooterProps {
  extendFooter?: boolean;
}

const Footer: React.FC<FooterProps> = ({ extendFooter }) => (
  <div className="relative overflow-hidde text-light-green line-height-2 px-3 md:px-8">
    {extendFooter && <FooterExtended />}

    <div
      className={cx(
        "relative flex flex-column gap-4 justify-content-between align-items-center py-5 text-center",
        { "xl:flex-row": IS_DEV_MODE, "md:flex-row": !IS_DEV_MODE }
      )}
    >
      <div className={cx("copyRight")}>
        © {new Date().getFullYear()} Ivory Guide, LLC and its subsidiaries.
        {"\n"}All rights reserved.
      </div>

      {IS_DEV_MODE && (
        <span
          className={cx(
            "centerSection",
            "text-dark-brown border-1 border-dark-brown border-round p-2 z-0"
          )}
        >
          This is a development build.
        </span>
      )}

      <div>
        <Link
          href="/agreement"
          className="font-bold text-light-green"
          target="_blank"
        >
          Terms of Use
        </Link>
        {" | "}
        <Link
          href="/privacy-policy"
          target="_blank"
          className="font-bold text-light-green"
        >
          Privacy Notice
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
