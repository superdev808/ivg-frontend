import classNames from "classnames/bind";
import { Image } from "primereact/image";
import React from "react";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const ITEMS = [
  { name: "Save results", icon: "pi-bookmark" },
  { name: "Download to PDF", icon: "pi-download" },
  { name: "Email exports", icon: "pi-envelope" },
];

const Offering: React.FC = () => (
  <div className="flex flex-column align-items-center text-dark-green">
    <div className={cx("heading")}>Our Offering</div>

    <div className="flex flex-column md:flex-row line-height-2">
      <div
        className={cx(
          "offering-section",
          "flex flex-column align-items-center text-center gap-3"
        )}
      >
        <Image
          src="/images/calculators/calculators.png"
          alt="calculators"
          width="95"
        />
        <div className={cx("offering-section__title", "font-bold")}>
          Calculators
        </div>
        <div className={cx("offering-section__description")}>
          Explore our library of Calculators, ranging from compatible implant
          components to selecting the right restoration materials.
        </div>
      </div>

      <div
        className={cx(
          "offering-section",
          "flex flex-column align-items-center text-center gap-3"
        )}
      >
        <Image
          src="/images/calculators/workflows.png"
          alt="workflows"
          width="95"
        />
        <div className={cx("offering-section__title", "font-bold")}>
          Workflows
        </div>
        <div className={cx("offering-section__description")}>
          Receive simple, comprehensive instructions to successfully complete a
          variety of clinical procedures, including tooth preparation and
          troubleshooting case issues with your dental lab.
        </div>
      </div>
    </div>

    <div className="px-3 w-full mt-6">
      <div className="bg-dark-green text-light-brown flex justify-content-center align-items-center gap-3 md:gap-8 py-4 md:py-6 md:text-2xl text-center border-round">
        {ITEMS.map((item) => (
          <div
            key={item.name}
            className="flex flex-column align-items-center gap-2 md:gap-3"
          >
            <i className={cx("pi", item.icon, "offering-section__icon")} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Offering;
