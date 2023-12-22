import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import { procedures, Site, sitesData } from "./constants";
import InputDetails from "./InputDetails";
import ComponentDetails from "./ComponentDetails";
import TeethSelector from "./TeethSelector";
import styles from "./AllOnX.module.scss";

const AllOnXCalculator: React.FC = () => {
  const [procedure, setProcedure] = useState<number>(1);
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);

  const onSiteChange = (tooth: number): void => {
    let _selectedSites: Site[] = [...selectedSites];
    const isSelected: Site[] = _selectedSites.filter(
      (site: Site) => site.key === tooth
    );
    if (isSelected.length === 0) {
      const newSite: Site = { name: `Site ${tooth}`, key: tooth };
      _selectedSites.push(newSite);
      _selectedSites = _selectedSites.sort((a, b) => a.key - b.key);
    } else {
      _selectedSites = _selectedSites.filter(
        (site: Site) => site.key !== tooth
      );
    }
    setSelectedSites(_selectedSites);
  };

  return (
    <div className={styles.allOnXCalculator}>
      <div className={styles.procedureSelection}>
        <h3>What part of the All-on-X procedure can we help you with?</h3>
        <SelectButton
          value={procedure}
          onChange={(e) => setProcedure(e.value)}
          optionLabel="name"
          options={procedures}
        />
      </div>
      <div className={styles.detailsContainer}>
        {selectedSites.length > 0 && (
          <div className="card">
            <TabView>
              <TabPanel header="Input Details">
                <InputDetails
                  selectedSites={selectedSites}
                  sitesData={sitesData}
                />
              </TabPanel>
              <TabPanel header="Component Details">
                <ComponentDetails selectedSites={selectedSites} />
              </TabPanel>
            </TabView>
          </div>
        )}
        <div className={styles.teethSelectorWrapper}>
          <TeethSelector
            selectedSites={selectedSites}
            onSiteChange={onSiteChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllOnXCalculator;
