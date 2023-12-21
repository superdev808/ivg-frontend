import React from "react";
import { Tooth } from "./Tooth/Tooth";
import styles from "./TeethSelector.module.scss";
import { LOWER_SITES, Site, UPPER_SITES } from "../constants";

interface TeethSelectorProps {
  selectedSites: Site[];
  onSiteChange: (teeth: number) => void;
}

const TeethSelector = ({ selectedSites, onSiteChange }: TeethSelectorProps) => {
  return (
    <div className={styles.containerFlex}>
      <div className={styles.columnFlex}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="450"
          height="300"
        >
          {/* upper teeth */}
          {UPPER_SITES.map((item: Site) => {
            return (
              <React.Fragment key={item.key}>
                <Tooth
                  name={`tooth${item.key}`}
                  value={item.key}
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
          width="450"
          height="300"
        >
          {/* lower teeth */}

          {LOWER_SITES.map((item: Site) => {
            return (
              <React.Fragment key={item.key}>
                <Tooth
                  name={`tooth${item.key}`}
                  value={item.key}
                  onClickHandler={onSiteChange}
                />
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default TeethSelector;
