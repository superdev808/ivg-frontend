import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import {
  AutoPopulateData,
  InputDetail,
  InputOutputValues,
  PROCEDURES,
  procedures,
  Site,
  SiteData,
} from "./constants";
import InputDetails from "./InputDetails";
import ComponentDetails from "./ComponentDetails";
import TeethSelector from "./TeethSelector";

/*
 * Name : AllOnXCalculator.
 * Desc : The code defines a functional component called `AllOnXCalculator` which is a           * calculator for the All-on-X dental procedure.
 */
const AllOnXCalculator: React.FC = () => {
  const [procedure, setProcedure] = useState<PROCEDURES>(PROCEDURES.SURGERY);
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);
  const [sitesData, setSitesData] = useState<SiteData>({});
  const [autoPopulateData, setAutoPopulateData] =
    useState<AutoPopulateData | null>(null);

  const handleProcedureChange = (e: SelectButtonChangeEvent) => {
    setProcedure(e.value);
    setSelectedSites([]);
    setSitesData({});
  };

  const handleSiteChange = (tooth: number): void => {
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

  const handleInputSelect = (site: Site, question: string, answer: string) => {
    let data: SiteData = { ...sitesData };
    const inputDetails: InputDetail[] = [...data[site.name].inputDetails];
    const indexOfQuestion: number = inputDetails.findIndex(
      (input) => input.question === question
    );
    if (indexOfQuestion > -1) {
      inputDetails[indexOfQuestion].answer = answer;
      inputDetails.splice(indexOfQuestion + 1);
    } else {
      inputDetails.push({ question, answer });
    }
    data = {
      ...data,
      [site.name]: {
        inputDetails,
        componentDetails: data[site.name].componentDetails,
      },
    };
    setSitesData(data);
  };

  const handleAutopopulate = (
    questions: InputOutputValues[],
    answerOptions: string[][],
    answers: string[]
  ) => {
    setAutoPopulateData({ questions, answerOptions, answers });
    let _sitesData: SiteData = sitesData;
    const data = { ...sitesData[selectedSites[0].name] };
    Object.keys(sitesData).map(
      (siteName: string) =>
        (_sitesData = {
          ..._sitesData,
          [siteName]: data,
        })
    );
    setSitesData(_sitesData);
  };

  return (
    <div className="flex justify-content-center mt-6">
      <div className="flex flex-column col-12 md:col-8 p-5 border-round bg-white shadow-1">
        <h3 className="mt-0 mb-3 text-center">
          What part of the All-on-X procedure can we help you with?
        </h3>
        <div className="mt-0 mb-5 text-center">
          <SelectButton
            unselectable={false}
            value={procedure}
            onChange={(e) => handleProcedureChange(e)}
            optionLabel="name"
            options={procedures}
          />
        </div>
        <div className="grid border-top-1 surface-border">
          <div className="flex flex-column col-12">
            <TeethSelector
              selectedSites={selectedSites}
              onSiteChange={handleSiteChange}
            />
            {selectedSites.length > 0 && (
              <div className="mt-3">
                <TabView renderActiveOnly={false}>
                  <TabPanel header="Input Details">
                    <InputDetails
                      procedure={procedure}
                      selectedSites={selectedSites}
                      sitesData={sitesData}
                      onInputSelect={handleInputSelect}
                      onAutopopulate={handleAutopopulate}
                      autoPopulateData={autoPopulateData}
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
      </div>
    </div>
  );
};

export default AllOnXCalculator;
