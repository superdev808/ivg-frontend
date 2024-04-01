import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import Link from "next/link";

import { socialButtons } from "@/helpers/util";

import Logo from "../../../../public/images/logo/Ivory-Guide-Logo-Stack.svg";
import LogoLight from "../../../../public/images/logo/Ivory-Guide-Logo-Stack-Light.svg";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface FooterExtendedProps {
  light?: boolean;
}

const FooterExtended: React.FC<FooterExtendedProps> = ({ light }) => {
  const LogoComponent = light ? LogoLight : Logo;

  return (
    <div className="flex px-3 md:px-8">
      <div
        className={cx(
          "grid w-full justify-content-between align-content-center my-4 py-4 border-bottom-1",
          { "border-light-green": light }
        )}
      >
        <div className="col-12 md:col-4 flex justify-content-center md:justify-content-start">
          <LogoComponent style={{ width: 200, height: 100 }} />
        </div>
        <div className="col-12 md:col-4 flex justify-content-center md:justify-content-center align-self-center gap-3">
          {socialButtons.map((button, index) => (
            <Link key={button.ariaLabel} href={button.link} target="_blank">
              <Button
                key={index}
                pt={{
                  icon: { className: cx("socialButton", { light }) },
                }}
                text
                icon={button.icon}
                aria-label={button.ariaLabel}
              />
            </Link>
          ))}
        </div>
        <div className="col-12 md:col-4 flex justify-content-center md:justify-content-end align-self-center">
          <Link href="/contact">
            <Button
              outlined
              style={{
                borderColor: light
                  ? "var(--light-green)"
                  : "var(--primary-dark-color)",
                color: light
                  ? "var(--light-green)"
                  : "var(--primary-dark-color)",
              }}
              className={cx("px-5 py-3 border-secondary")}
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterExtended;
