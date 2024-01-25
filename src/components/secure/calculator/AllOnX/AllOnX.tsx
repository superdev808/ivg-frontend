import React, { useEffect, useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { TabView, TabPanel } from "primereact/tabview";
import {
  AutoPopulateData,
  ComponentDetail,
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  InputDetail,
  InputOutputValues,
  ItemData,
  MUA_OPTIONS,
  PROCEDURES,
  procedures,
  Site,
  SiteData,
  KeyValuePair,
  SITE_SPECIFIC_REPORT_OPTIONS,
} from "./constants";
import InputDetails from "./InputDetails";
import ComponentDetails from "./ComponentDetails";
import TeethSelector from "./TeethSelector";
import { cloneDeep } from "lodash";
import {
  getProcedureCollections,
  getProcedureInputsAndResponse,
} from "@/components/calculator/AllOnX/AllOnXUtills";
import { InputAndResponse } from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";
import AdditionalInputs from "./AdditionalInputs";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import PDFExport from "./PdfExport/PdfExport";
import PdfContent from "./PdfExport/PdfContent";
import CustomCombinationsInputs from "./CustomCombinationsInputs";

interface AllOnXCalculatorProps {
  isCustom?: boolean;
}

/**
 * Name : AllOnXCalculator.
 * Desc : The code defines a functional component called `AllOnXCalculator` which is a           * calculator for the All-on-X dental procedure.
 * @param {boolean} isCustom
 */
const AllOnXCalculator: React.FC<AllOnXCalculatorProps> = ({
  isCustom,
}: AllOnXCalculatorProps) => {
  const [procedure, setProcedure] = useState<PROCEDURES>(PROCEDURES.SURGERY);
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);
  const [sitesData, setSitesData] = useState<SiteData>({});
  const [additionalInputs, setAdditionalInputs] = useState<KeyValuePair>({});
  const [autoPopulateData, setAutoPopulateData] =
    useState<AutoPopulateData | null>(null);
  const [procedureInputsAndResponse, setProcedureInputsAndResponse] =
    useState<InputAndResponse | null>(null);
  const [siteSpecificReport, setSiteSpecificReport] = useState<string>(
    SITE_SPECIFIC_REPORT_OPTIONS[0].value
  );
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  useEffect(() => {
    const _collections = getProcedureCollections(procedure, additionalInputs);
    setCollections(_collections);
    if (!isCustom) {
      setSelectedCollections(_collections);
    }
  }, [procedure, additionalInputs]);

  useEffect(() => {
    const procedureInputsAndResponse = getProcedureInputsAndResponse(
      procedure,
      additionalInputs,
      selectedCollections
    );
    setProcedureInputsAndResponse(procedureInputsAndResponse);
  }, [selectedCollections]);

  const handleProcedureChange = (e: SelectButtonChangeEvent) => {
    setProcedure(e.value);
    setSelectedSites([]);
    setSitesData({});
    if (
      e.value === PROCEDURES.RESTORATIVE ||
      e.value === PROCEDURES.SURGERY_AND_RESTORATIVE
    ) {
      handleAdditionalInputs(
        DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].value,
        DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name
      );
    }
  };

  const handleSiteChange = (tooth: number, isAnonymous?: boolean): void => {
    let _selectedSites: Site[] = isAnonymous ? [] : [...selectedSites];
    const isSelected: Site[] = _selectedSites.filter(
      (site: Site) => site.key === tooth
    );
    if (isSelected.length === 0) {
      const newSite: Site = isAnonymous
        ? { name: `Site Anonymous`, key: tooth }
        : { name: `Site ${tooth}`, key: tooth };
      _selectedSites.push(newSite);
      //Add new site data
      if (!isAnonymous) {
        const newSiteData = {
          [`Site ${tooth}`]: { inputDetails: [], componentDetails: {} },
        };
        setSitesData((prev) => {
          return { ...prev, ...newSiteData };
        });
        _selectedSites = _selectedSites.sort((a, b) => a.key - b.key);
      } else {
        const newSiteData = {
          [`Site Anonymous`]: { inputDetails: [], componentDetails: {} },
        };
        setSitesData(newSiteData);
      }
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

  const handleInputSelect = (
    site: Site,
    question: InputOutputValues,
    answer: string
  ) => {
    let data: SiteData = cloneDeep(sitesData);
    const inputDetails: InputDetail[] = cloneDeep(data[site.name].inputDetails);
    const indexOfQuestion: number = inputDetails.findIndex(
      (input) => input.question === question.text
    );
    if (indexOfQuestion > -1) {
      inputDetails[indexOfQuestion].answer = answer;
      inputDetails.splice(indexOfQuestion + 1);
    } else {
      inputDetails.push({
        question: question.text,
        answer,
      });
    }

    //remove next collection responses
    const responseOrder: string[] =
      procedureInputsAndResponse?.responseOrder || [];
    const componentDetails: ComponentDetail = cloneDeep(
      data[site.name].componentDetails
    );
    const indexOfCollection: number = responseOrder.indexOf(
      question.calculator
    );
    if (indexOfCollection !== -1) {
      const keysToRemove: string[] = responseOrder.slice(indexOfCollection);
      keysToRemove.map((col: string) => {
        delete componentDetails[col];
      });
    }

    const updatedData = {
      ...data,
      [site.name]: {
        inputDetails,
        componentDetails,
      },
    };
    setSitesData(updatedData);
  };

  const handleQuizResponse = (
    site: Site,
    response: ItemData[],
    collection: string
  ) => {
    let data: SiteData = cloneDeep(sitesData);
    let componentDetails: ComponentDetail = cloneDeep(
      data[site.name].componentDetails
    );
    componentDetails = { ...componentDetails, [collection]: response };
    const updatedData = {
      ...data,
      [site.name]: {
        inputDetails: data[site.name].inputDetails,
        componentDetails,
      },
    };
    setSitesData(updatedData);
  };

  const handleAutopopulate = (dataToPopulate: AutoPopulateData | null) => {
    setAutoPopulateData(dataToPopulate);
    if (dataToPopulate) {
      let _sitesData: SiteData = cloneDeep(sitesData);
      const key: string = dataToPopulate.site.name;
      const data = { ..._sitesData[key] };
      Object.keys(_sitesData).map((siteName: string) => {
        if (siteName !== key) {
          _sitesData[siteName] = data;
        }
      });
      setSitesData(_sitesData);
    }
  };

  const handleAdditionalInputs = (value: string, target: string) => {
    setAdditionalInputs((prev: KeyValuePair) => {
      let state = { ...prev };
      if (
        target === DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name &&
        value === DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].value
      ) {
        delete state[MUA_OPTIONS[0].name];
      }
      if (
        target === DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name &&
        value === DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value
      ) {
        state = { ...state, [MUA_OPTIONS[0].name]: MUA_OPTIONS[0].value };
      }
      return { ...state, [target]: value };
    });
    setSitesData((state) => {
      selectedSites?.map((site) => {
        if (state[site.name]) {
          state[site.name].componentDetails = {};
          state[site.name].inputDetails = [];
        }
      });
      return state;
    });
  };

  const handleSiteSpecificReport = (value: string) => {
    setSiteSpecificReport(value);
    if (value === SITE_SPECIFIC_REPORT_OPTIONS[1].value) {
      handleSiteChange(1, true);
    } else {
      setSelectedSites([]);
      setSitesData({});
    }
  };

  const handleCollectionChange = (e: CheckboxChangeEvent) => {
    let _selectedCollections: string[] = [...selectedCollections];

    if (e.checked) _selectedCollections.push(e.value);
    else
      _selectedCollections = _selectedCollections.filter(
        (collection) => collection !== e.value
      );

    setSelectedCollections(_selectedCollections);
  };

  return (
    <div className={" nav-offset flex-grow-1"}>
      <div className="wrapper my-8">
        <div className="flex flex-column p-5 border-round bg-white shadow-1">
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

          {(procedure === PROCEDURES.RESTORATIVE ||
            procedure === PROCEDURES.SURGERY_AND_RESTORATIVE) && (
            <AdditionalInputs
              additionalInputs={additionalInputs}
              onInputChange={handleAdditionalInputs}
            />
          )}

          {isCustom && (
            <CustomCombinationsInputs
              collections={collections}
              selectedCollections={selectedCollections}
              onCollectionChange={handleCollectionChange}
              siteSpecificReport={siteSpecificReport}
              onChangeSiteSpecificReport={handleSiteSpecificReport}
            />
          )}

          <div className="grid border-top-1 surface-border">
            <div className="flex flex-column col-12">
              {(!isCustom ||
                (isCustom &&
                  siteSpecificReport ===
                    SITE_SPECIFIC_REPORT_OPTIONS[0].value)) && (
                <TeethSelector
                  selectedSites={selectedSites}
                  onSiteChange={handleSiteChange}
                />
              )}

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
                        procedureInputs={
                          procedureInputsAndResponse?.input || []
                        }
                        additionalInputs={additionalInputs}
                        onQuizResponse={handleQuizResponse}
                      />
                    </TabPanel>
                    <TabPanel header="Component Details">
                      <ComponentDetails
                        selectedSites={selectedSites}
                        sitesData={sitesData}
                        responseOrder={
                          procedureInputsAndResponse?.responseOrder || []
                        }
                      />
                    </TabPanel>
                  </TabView>
                  {/* <PDFExport /> */}
                  <PdfContent selectedSites={selectedSites} sitesData={sitesData} responseOrder={
                          procedureInputsAndResponse?.responseOrder || []
                        }/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOnXCalculator;
