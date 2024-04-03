import classNames from "classnames/bind";
import Link from "next/link";
import { Button } from "primereact/button";

import { socialButtons } from "@/helpers/util";

import Logo from "../../../../public/images/logo/Ivory-Guide-Logo-Stack.svg";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const FooterExtended: React.FC = () => (
  <div className="relative flex flex-column md:flex-row gap-4 justify-content-between align-items-center py-5 border-bottom-1 border-light-green">
    <Logo style={{ width: 200, height: 100 }} />

    <div className={cx("centerSection", "flex justify-content-center gap-3")}>
      {socialButtons.map((button) => (
        <Link key={button.ariaLabel} href={button.link} target="_blank">
          <Button
            pt={{
              icon: { className: cx("socialButton") },
            }}
            text
            icon={button.icon}
            aria-label={button.ariaLabel}
          />
        </Link>
      ))}
    </div>

    <Link href="/contact">
      <Button
        outlined
        style={{
          borderColor: "var(--light-green)",
          color: "var(--light-green)",
        }}
        className="px-5 py-3"
      >
        Contact Us
      </Button>
    </Link>
  </div>
);

export default FooterExtended;
