import Link from "next/link";
import React from "react";

import FooterExtended from "./FooterExtended";

const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

interface FooterProps {
  extendFooter?: boolean;
}

const Footer: React.FC<FooterProps> = ({ extendFooter }) => (
  <div className="relative overflow-hidden">
    <div className="radial-gradient z-0" />
    {extendFooter && <FooterExtended />}
    <div className="flex px-3 md:px-8">
      <div className="grid bg-tranparent m-0 h-5rem w-full">
        <div className="col-12 md:col-5 flex flex-column align-items-start">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Ivory Guide, LLC and its subsidiaries.
            All rights reserved.
          </p>
        </div>
        <div className="col-12 md:col-2 flex flex-column text-center">
          <p className="text-center">
            {devMode && (
              <span className="text-red-700 border-1 border-red-700 border-round p-2 bg-red-100 z-0">
                This is a development build.
              </span>
            )}
          </p>
        </div>

        <div className="col-12 md:col-5 flex flex-column align-items-end">
          <p className="text-center md:text-right">
            <Link
              href="/agreement"
              className="text-600 font-bold"
              target="_blank"
              style={{ textDecorationColor: "var(--gray-600)" }}
            >
              Terms of Use
            </Link>
            {" | "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-600 font-bold"
              style={{ textDecorationColor: "var(--gray-600)" }}
            >
              Privacy Notice
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
