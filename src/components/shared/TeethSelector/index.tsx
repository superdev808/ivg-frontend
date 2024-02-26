import classNames from "classnames/bind";
import noop from "lodash/noop";
import React from "react";

import { LOWER_SITES, UPPER_SITES } from "@/constants/calculators";

import { Site } from "@/types/calculators";

import Tooth from "./Tooth";
import styles from "./TeethSelector.module.scss";

const cx = classNames.bind(styles);

export enum TeethSelectorVariant {
  SMALL,
  DEFAULT,
}

interface TeethSelectorProps {
  selectedSites: Site[];
  onSiteChange?: (teeth: number) => void;
  showLabel?: boolean;
  showVertical?: boolean;
  variant?: TeethSelectorVariant;
}

const TeethSelector: React.FC<TeethSelectorProps> = ({
  selectedSites,
  onSiteChange = noop,
  showLabel = true,
  showVertical = false,
  variant = TeethSelectorVariant.DEFAULT,
}) => {
  const selectedSitesKeys = selectedSites.map((site) => site.key);

  return (
    <div
      className={cx("teethSelector", "flex flex-column align-items-center", {
        smTeethSelector: variant === TeethSelectorVariant.SMALL,
      })}
    >
      {showLabel && <h3>Select the sites where implants will be placed:</h3>}
      <div
        className={cx(
          "containerFlex",
          "flex flex-column align-items-center justify-content-center overflow-hidden",
          {
            "sm:flex-row": !showVertical,
          }
        )}
      >
        <div
          className={cx(
            "columnFlex",
            "flex align-items-center justify-content-center vertical-align-middle"
          )}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={variant === TeethSelectorVariant.SMALL ? "180" : "300"}
            height={variant === TeethSelectorVariant.SMALL ? "120" : "200"}
          >
            {/* upper teeth */}
            {UPPER_SITES.map((item) => (
              <Tooth
                key={item.key}
                name={`tooth${item.key}`}
                value={item.key}
                isSelected={selectedSitesKeys.includes(item.key)}
                onClickHandler={onSiteChange}
              />
            ))}
          </svg>
        </div>

        <div
          className={cx(
            "columnFlex",
            "bottomTeeth",
            "flex align-items-center justify-content-center vertical-align-middle relative"
          )}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={variant === TeethSelectorVariant.SMALL ? "180" : "300"}
            height={variant === TeethSelectorVariant.SMALL ? "120" : "200"}
          >
            {/* lower teeth */}

            {LOWER_SITES.map((item) => (
              <Tooth
                key={item.key}
                name={`tooth${item.key}`}
                value={item.key}
                isSelected={selectedSitesKeys.includes(item.key)}
                onClickHandler={onSiteChange}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeethSelector;
