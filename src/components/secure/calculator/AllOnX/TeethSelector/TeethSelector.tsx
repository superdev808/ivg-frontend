import React from "react";
import { Tooth } from "./Tooth/Tooth";
import styles from "./TeethSelector.module.scss";
import { LOWER_SITES, Site, UPPER_SITES } from "../constants";

interface TeethSelectorProps {
  selectedSites: Site[];
  onSiteChange: (teeth: number) => void;
  showLabel: boolean
}

/**
 * Name : TeethSelector.
 * Desc : The `TeethSelector` component is a React component that renders a teeth selector interface, allowing
 * users to select sites where implants will be placed.
 * @param {array} selectedSites
 * @param {func} onSiteChange
 * @param {boolean} showLabel
 */
const TeethSelector: React.FC<TeethSelectorProps> = ({ selectedSites, onSiteChange, showLabel = true}: TeethSelectorProps) => {
  const selectedSitesKeys: number[] = selectedSites.map(
    (site: Site) => site.key
  );

  return (
    <div className={styles.teethSelector}>
      { showLabel && <h3>Select the sites where implants will be placed:</h3>}
      <div className={`${styles.containerFlex} sm:flex-row`}>
        <div className={styles.columnFlex}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="200"
          >
            {/* upper teeth */}
            {UPPER_SITES.map((item: Site) => {
              return (
                <React.Fragment key={item.key}>
                  <Tooth
                    name={`tooth${item.key}`}
                    value={item.key}
                    isSelected={selectedSitesKeys.includes(item.key)}
                    onClickHandler={onSiteChange}
                  />
                </React.Fragment>
              );
            })}
          </svg>
        </div>

        <div className={`${styles.columnFlex} ${styles.bottomTeeth}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="200"
          >
            {/* lower teeth */}

            {LOWER_SITES.map((item: Site) => {
              return (
                <React.Fragment key={item.key}>
                  <Tooth
                    name={`tooth${item.key}`}
                    value={item.key}
                    isSelected={selectedSitesKeys.includes(item.key)}
                    onClickHandler={onSiteChange}
                  />
                </React.Fragment>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeethSelector;
