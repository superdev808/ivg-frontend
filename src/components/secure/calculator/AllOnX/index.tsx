import cloneDeep from "lodash/cloneDeep";
import has from "lodash/has";
import isEqual from "lodash/isEqual";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import React, { useEffect, useState } from "react";

import {
  getProcedureCollections,
  getProcedureInputsAndResponse,
} from "@/components/calculator/AllOnX/AllOnXUtills";
import {
  CALCULATOR_NAME_COLLECTION_MAPPINGS,
  InputAndResponse,
} from "@/components/calculator/AllOnX/ProcedureInputsAndResponse";

import AdditionalInputs from "./AdditionalInputs";
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
  TEXT_DENTAL_IMPLANT_PROCEDURE,
  TEXT_MUA_STATUS,
  TotalQuantities,
} from "./constants";
import CustomCombinationsInputs from "./CustomCombinationsInputs";
import InputDetails from "./InputDetails";
import PDFExport from "./PdfExport";
import TeethSelector from "./TeethSelector";

interface AllOnXCalculatorProps {
  isCustom?: boolean;
}

/**
 * Name : AllOnXCalculator.
 * Desc : The code defines a functional component called `AllOnXCalculator` which is a           * calculator for the All-on-X dental procedure.
 * @param {boolean} isCustom
 */
const AllOnXCalculator: React.FC<AllOnXCalculatorProps> = ({
  isCustom = false,
}) => {
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
  const [totalQuantities, setTotalQuantities] = useState<TotalQuantities[]>([]);

  useEffect(() => {
    const newCollections = getProcedureCollections(
      procedure,
      additionalInputs,
      isCustom
    );

    setCollections(newCollections);

    if (!isCustom) {
      setSelectedCollections(newCollections);
    }
  }, [procedure, additionalInputs, isCustom]);

  useEffect(() => {
    const procedureInputsAndResponse = getProcedureInputsAndResponse(
      procedure,
      additionalInputs,
      selectedCollections,
      isCustom
    );
    setProcedureInputsAndResponse(procedureInputsAndResponse);
  }, [additionalInputs, isCustom, procedure, selectedCollections]);

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
    const calculators: string[] = responseOrder.map(
      (key: string) => CALCULATOR_NAME_COLLECTION_MAPPINGS[key]
    );
    const componentDetails: ComponentDetail = cloneDeep(
      data[site.name].componentDetails
    );
    const indexOfCollection: number = calculators.indexOf(question.calculator);
    if (indexOfCollection !== -1) {
      const keysToRemove: string[] = calculators.slice(indexOfCollection);
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

    if (
      !(
        has(componentDetails, collection) &&
        isEqual(componentDetails[collection], response)
      )
    ) {
      componentDetails = { ...componentDetails, [collection]: response };
      const updatedData = {
        ...data,
        [site.name]: {
          inputDetails: data[site.name].inputDetails,
          componentDetails,
        },
      };
      setSitesData(updatedData);
    }
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
    setSelectedSites([]);
    setSitesData({});
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

    if (
      siteSpecificReport === SITE_SPECIFIC_REPORT_OPTIONS[1].value &&
      !selectedCollections.length
    ) {
      handleSiteChange(1, true);
    }
    if (e.checked) {
      _selectedCollections.push(e.value);
    } else {
      _selectedCollections = _selectedCollections.filter(
        (collection) => collection !== e.value
      );
    }

    if (_selectedCollections.length === 0) {
      setSelectedSites([]);
      setSitesData({});
    }
    setSelectedCollections(_selectedCollections);
  };

  const handleUpdateQuantity = (quantity: number, itemName: string) => {
    const indexOfItem: number = totalQuantities.findIndex(
      (item: TotalQuantities) => item.itemName === itemName
    );
    if (indexOfItem === -1) {
      totalQuantities.push({ itemName, quantity });
    } else {
      totalQuantities[indexOfItem].quantity = quantity;
    }
    setTotalQuantities(totalQuantities);
  };

  return (
    <div className={" nav-offset flex-grow-1"}>
      <div className="wrapper my-8">
        <div className="flex flex-column p-5 border-round bg-white shadow-1">
          {!isCustom && (
            <>
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
            </>
          )}

          {!isCustom &&
            (procedure === PROCEDURES.RESTORATIVE ||
              procedure === PROCEDURES.SURGERY_AND_RESTORATIVE) && (
              <AdditionalInputs
                textDentalImplantProcedure={TEXT_DENTAL_IMPLANT_PROCEDURE}
                textMUAStatus={TEXT_MUA_STATUS}
                showMUAOptions={
                  additionalInputs[DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name] ===
                  DENTAL_IMPLANT_PROCEDURE_OPTIONS[1].value
                }
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
                  procedureInputsAndResponse?.input &&
                  procedureInputsAndResponse?.input.length > 0 &&
                  siteSpecificReport ===
                    SITE_SPECIFIC_REPORT_OPTIONS[0].value)) && (
                <TeethSelector
                  showLabel={true}
                  selectedSites={selectedSites}
                  onSiteChange={handleSiteChange}
                />
              )}

              {selectedSites.length > 0 && (
                <>
                  <PDFExport
                    selectedSites={selectedSites}
                    sitesData={sitesData}
                    calculatorName={isCustom ? `Custom` : `All-On-X`}
                    showTeethSelection={
                      siteSpecificReport ===
                      SITE_SPECIFIC_REPORT_OPTIONS[0].value
                    }
                    responseOrder={
                      procedureInputsAndResponse?.responseOrder || []
                    }
                    totalQuantities={totalQuantities}
                  />

                  <InputDetails
                    selectedSites={selectedSites}
                    sitesData={sitesData}
                    onInputSelect={handleInputSelect}
                    onAutopopulate={handleAutopopulate}
                    autoPopulateData={autoPopulateData}
                    procedureInputs={procedureInputsAndResponse?.input || []}
                    responseOrder={
                      procedureInputsAndResponse?.responseOrder || []
                    }
                    onQuizResponse={handleQuizResponse}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOnXCalculator;
