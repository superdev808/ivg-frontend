import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import { PROCEDURES, procedures, Site, SiteData } from "./constants";
import InputDetails from "./InputDetails";
import ComponentDetails from "./ComponentDetails";
import TeethSelector from "./TeethSelector";
import styles from "./AllOnX.module.scss";

const AllOnXCalculator: React.FC = () => {
  const [procedure, setProcedure] = useState<PROCEDURES>(PROCEDURES.SURGERY);
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);
  const [sitesData, setSitesData] = useState<SiteData>({});

  const onSiteChange = (tooth: number): void => {
    let _selectedSites: Site[] = [...selectedSites];
    const isSelected: Site[] = _selectedSites.filter(
      (site: Site) => site.key === tooth
    );
    if (isSelected.length === 0) {
      const newSite: Site = { name: `Site ${tooth}`, key: tooth };
      _selectedSites.push(newSite);

      //Add new site data
      const newSiteData = {
        [`Site ${tooth}`]: { inputDetails: [], componentDetails: [] },
      };
      setSitesData((prev) => {
        return { ...prev, ...newSiteData };
      });

      _selectedSites = _selectedSites.sort((a, b) => a.key - b.key);
    } else {
      _selectedSites = _selectedSites.filter(
        (site: Site) => site.key !== tooth
      );

      // remove site data
      let _sitesData = { ...sitesData };
      delete _sitesData[`Site ${tooth}`];
      setSitesData(_sitesData);
    }
    setSelectedSites(_selectedSites);
  };

  const onInputSelect = (site: Site, question: string, answer: string) => {
    let data: SiteData = { ...sitesData };
    const {inputDetails} = data[site.name];
    const indexOfQuestion: number = inputDetails.findIndex(
      (input) => input.question === question
    );
    if (indexOfQuestion > -1) {
      inputDetails[indexOfQuestion].answer = answer;
      inputDetails.splice(indexOfQuestion + 1);
    } else {
      inputDetails.push({ question, answer });
    }
    data = {...data, [site.name]:{inputDetails}}
    setSitesData(data);
  };

  return (
    <div className={styles.allOnXCalculator}>
      <div className={styles.procedureSelection}>
        <h3>What part of the All-on-X procedure can we help you with?</h3>
        <SelectButton
          unselectable={false}
          value={procedure}
          onChange={(e) => setProcedure(e.value)}
          optionLabel="name"
          options={procedures}
        />
      </div>
      <div className={`${styles.detailsContainer}`}>
        <div>
          <TeethSelector
            selectedSites={selectedSites}
            onSiteChange={onSiteChange}
          />
        </div>
        {selectedSites.length > 0 && (
          <div className="card">
            <TabView renderActiveOnly={false}>
              <TabPanel header="Input Details">
                <InputDetails
                  procedure={procedure}
                  selectedSites={selectedSites}
                  sitesData={sitesData}
                  onInputSelect={onInputSelect}
                />
              </TabPanel>
              <TabPanel header="Component Details">
                <ComponentDetails
                  selectedSites={selectedSites}
                  sitesData={sitesData}
                />
              </TabPanel>
            </TabView>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOnXCalculator;
