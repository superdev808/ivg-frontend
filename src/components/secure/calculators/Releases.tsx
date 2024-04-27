import classNames from "classnames/bind";
import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";

import Slide from "./Slide";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const ITEMS = [
  {
    title: "Taking Physical Impressions",
    description:
      "A successful restoration starts with a perfect impression. Receive research-backed, step-by-step instructions from Ivory Guide to set yourself up for success.",
    image: "/images/calculators/physical-impressions.png",
    link: "/calculators/PhysicalImpression",
  },
  {
    title: "Research-backed Supplies and Materials",
    description:
      "Browse and order products from our list of all the most commonly used items your office needs, vetted by industry experts.",
    image: "/images/calculators/supplies.png",
    link: "/explore-all/?tab=supplies",
  },
];

const Releases: React.FC = () => (
  <div id="releases" className="flex flex-column align-items-center pt-6">
    <div className={cx("heading")}>New Releases</div>
    <div className="bg-light-brown w-full">
      {ITEMS.map((item, idx) => (
        <Slide key={item.title} item={item} showInfoOnLeft={idx % 2 === 0} />
      ))}

      <Slide
        showInfoOnLeft
        content={
          <Link href="/explore-all" className="absolute">
            <Button className="bg-secondary py-2 md:text-xl">
              Explore all Calculators and Workflows
            </Button>
          </Link>
        }
      />
    </div>
  </div>
);

export default Releases;
