import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import { procedures, Site, sitesData } from "./constants";
import InputDetails from "./InputDetails";
import ComponentDetails from "./ComponentDetails";
import TeethSelector from "./TeethSelector";

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
    <>
      <h3>What part of the All-on-X procedure can we help you with?</h3>
      <div className="card flex justify-content-center">
        <SelectButton
          value={procedure}
          onChange={(e) => setProcedure(e.value)}
          optionLabel="name"
          options={procedures}
        />
      </div>

      <div style={{ width: "100%" }}>
        <div
          className="card flex justify-content-center"
          style={{ marginTop: 25, marginBottom: 25 }}
        >
          <div className="flex flex-row gap-3">
            <TeethSelector
              selectedSites={selectedSites}
              onSiteChange={onSiteChange}
            />
            {/* {sites.map((site) => {
              return (
                <div key={site.key} className="flex align-items-center">
                  <Checkbox
                    inputId={site.key}
                    name="site"
                    value={site}
                    checked={selectedSites.some(
                      (item) => item.key === site.key
                    )}
                  />
                  <label htmlFor={site.key} className="ml-2">
                    {site.name}
                  </label>
                </div>
              );
            })} */}
          </div>
        </div>
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
      </div>
    </>
  );
};

export default AllOnXCalculator;
