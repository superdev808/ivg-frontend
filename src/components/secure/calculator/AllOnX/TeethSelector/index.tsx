import React from "react";

import { LOWER_SITES, Site, UPPER_SITES } from "../constants";

import Tooth from "./Tooth";
import styles from "./TeethSelector.module.scss";

export enum TeethSelectorVariant {
  SMALL,
  DEFAULT,
}

interface TeethSelectorProps {
  selectedSites: Site[];
  onSiteChange: (teeth: number) => void;
  showLabel: boolean;
  variant?: TeethSelectorVariant;
}

/**
 * Name : TeethSelector.
 * Desc : The `TeethSelector` component is a React component that renders a teeth selector interface, allowing
 * users to select sites where implants will be placed.
 * @param {array} selectedSites
 * @param {func} onSiteChange
 * @param {boolean} showLabel
 * @param {string} variant
 */
const TeethSelector: React.FC<TeethSelectorProps> = ({
  selectedSites,
  onSiteChange,
  showLabel = true,
  variant = TeethSelectorVariant.DEFAULT,
}) => {
  const selectedSitesKeys = selectedSites.map((site: Site) => site.key);

  return (
    <div
      className={`${styles.teethSelector} ${
        variant === TeethSelectorVariant.SMALL && styles.smTeethSelector
      }`}
    >
      {showLabel && <h3>Select the sites where implants will be placed:</h3>}
      <div className={`${styles.containerFlex} sm:flex-row`}>
        <div className={styles.columnFlex}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={`${variant === TeethSelectorVariant.SMALL ? 180 : 300}`}
            height={`${variant === TeethSelectorVariant.SMALL ? 120 : 200}`}
          >
            {/* upper teeth */}
            {UPPER_SITES.map((item: Site) => (
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

        <div className={`${styles.columnFlex} ${styles.bottomTeeth}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={`${variant === TeethSelectorVariant.SMALL ? 180 : 300}`}
            height={`${variant === TeethSelectorVariant.SMALL ? 120 : 200}`}
          >
            {/* lower teeth */}

            {LOWER_SITES.map((item: Site) => (
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
