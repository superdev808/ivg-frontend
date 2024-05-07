import { event as gaEvent } from "@/lib/gtag";
import cloneDeep from "lodash/cloneDeep";
import has from "lodash/has";
import isEqual from "lodash/isEqual";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import React, { useCallback, useEffect, useRef, useState } from "react";

import TeethSelector from "@/components/shared/TeethSelector";
import {
  getProcedureCollections,
  getProcedureInputsAndResponse,
  serializeColInfo,
} from "@/helpers/calculators";
import {
  DENTAL_IMPLANT_PROCEDURE_OPTIONS,
  PROCEDURES,
  MUA_OPTIONS,
  SITE_SPECIFIC_REPORT_OPTIONS,
  TEXT_DENTAL_IMPLANT_PROCEDURE,
  TEXT_MUA_STATUS,
} from "@/constants/calculators";
import {
  AutoPopulateData,
  ComponentDetail,
  InputAndResponse,
  InputDetail,
  InputOutputValues,
  Site,
  SiteData,
  KeyValuePair,
  TotalQuantities,
  ItemData,
  PROCEDURE,
  ANSWER_TYPE,
} from "@/types/calculators";

import AdditionalInputs from "./AdditionalInputs";
import CustomCombinationsInputs from "./CustomCombinationsInputs";
import InputDetails from "./InputDetails";
import HelpfulFeedbackDialog from "../Feedback/HelpfulFeedbackDialog";
import FeedbackDialogWrapper from "../Feedback/FeedbackDialogWrapper";
import HelpfulButton from "../Helpful";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
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
  const calculatorName = "All-on-X Calculator" as string;

  const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);

  const toastRef = useRef(null);
  const showFeedbackToast = useCallback(() => {
    (toastRef?.current as any)?.show({
      severity: "success",
      summary: "Successfully submitted",
      detail: "Thank you for your feedback",
      life: 5000,
    });
    // eslint-disable-next-line
  }, [toastRef.current]);

  const onClickThumbUp = () => {
    gaEvent({
      action: "Thumb_Up",
      category: "Button",
      label: calculatorName,
    });
    showFeedbackToast();
  };

  const onClickFeedback = () => {
    gaEvent({
      action: "Thumb_Down",
      category: "Button",
      label: calculatorName,
    });
    setFeedbackShow(true);
  };

  const [procedure, setProcedure] = useState<PROCEDURE>(PROCEDURE.SURGERY);
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
  const [allAnsweredSites, setAllAnsweredSites] = useState<Site[]>([]);

  const { calcInfoMap } = useCalculatorsInfo();

  const isAllSitesAnswered = selectedSites.reduce(
    (acc: boolean, site: Site) => {
      if (acc == false) return false;
      return (
        allAnsweredSites.filter(
          (answeredSite: Site) => answeredSite.key === site.key
        ).length > 0
      );
    },
    true
  );

  useEffect(() => {
    let newAllAnsweredSites = allAnsweredSites.filter((site: Site) => {
      return (
        selectedSites.filter(
          (selectedSite: Site) => selectedSite.key == site.key
        ).length > 0
      );
    });
    if (newAllAnsweredSites.length != allAnsweredSites.length)
      setAllAnsweredSites(newAllAnsweredSites);
  }, [selectedSites, allAnsweredSites]);

  useEffect(() => {
    const newCollections = getProcedureCollections(
      calcInfoMap,
      procedure,
      additionalInputs,
      isCustom
    );

    setCollections(newCollections);

    if (!isCustom) {
      setSelectedCollections(newCollections);
    }
  }, [procedure, additionalInputs, isCustom, calcInfoMap]);

  useEffect(() => {
    const procedureInputsAndResponse = getProcedureInputsAndResponse(
      calcInfoMap,
      selectedCollections
    );
    setProcedureInputsAndResponse(procedureInputsAndResponse);
  }, [calcInfoMap, selectedCollections]);

  const handleAdditionalInputs = useCallback(
    (value: string, target: string) => {
      let state = { ...additionalInputs };
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
      setAdditionalInputs({ ...state, [target]: value });
      setSelectedSites([]);
      setSitesData({});
    },
    [additionalInputs]
  );

  const handleAllAnswered = useCallback(
    (site: Site) => {
      setAllAnsweredSites([...allAnsweredSites, site]);
    },
    [allAnsweredSites]
  );

  const handleProcedureChange = useCallback(
    (e: SelectButtonChangeEvent) => {
      setProcedure(e.value);
      setSelectedSites([]);
      setSitesData({});
      if (
        e.value === PROCEDURE.RESTORATIVE ||
        e.value === PROCEDURE.SURGERY_AND_RESTORATIVE
      ) {
        handleAdditionalInputs(
          DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].value,
          DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name
        );
      }
    },
    [handleAdditionalInputs]
  );

  const handleSiteChange = useCallback(
    (tooth: number, isAnonymous?: boolean): void => {
      let _selectedSites: Site[] = isAnonymous ? [] : [...selectedSites];
      const isSelected: Site[] = _selectedSites.filter(
        (site: Site) => site.key === tooth
      );
      if (isSelected.length === 0) {
        const newSite: Site = isAnonymous
          ? { name: `General Details`, key: tooth }
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
          // _selectedSites = _selectedSites.sort((a, b) => a.key - b.key);
        } else {
          const newSiteData = {
            "General Details": { inputDetails: [], componentDetails: {} },
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
    },
    [selectedSites, sitesData]
  );

  const handleInputSelect = useCallback(
    (site: Site, questions: InputOutputValues[], answer: ANSWER_TYPE) => {
      let data: SiteData = cloneDeep(sitesData);
      const inputDetails: InputDetail[] = cloneDeep(
        data[site.name].inputDetails
      );
      questions.forEach((question) => {
        const indexOfQuestion: number = inputDetails.findIndex(
          (input) => input.id === serializeColInfo(question)
        );
        if (indexOfQuestion > -1) {
          inputDetails[indexOfQuestion].answer = answer[question.colIndex];
          inputDetails.splice(indexOfQuestion + 1);
        } else {
          inputDetails.push({
            id: serializeColInfo(question),
            question: question.colName,
            questionText: question.groupText,
            answer: answer[question.colIndex],
          });
        }
      });

      //remove next collection responses
      const calculators: string[] =
        procedureInputsAndResponse?.responseOrder || [];
      const componentDetails: ComponentDetail = cloneDeep(
        data[site.name].componentDetails
      );
      questions.forEach(question => {
        const indexOfCollection: number = calculators.indexOf(
          question.calculatorType
        );
        if (indexOfCollection !== -1) {
          const keysToRemove: string[] = calculators.slice(indexOfCollection);
          keysToRemove.map((col: string) => {
            if (question.colName === "" && question.calculatorType == col) return;
            delete componentDetails[col];
          });
        }
      })

      const updatedData = {
        ...data,
        [site.name]: {
          inputDetails,
          componentDetails,
        },
      };
      setSitesData(updatedData);
    },
    [procedureInputsAndResponse, sitesData]
  );

  const handleQuizResponse = useCallback(
    (site: Site, response: ItemData[], collection: string) => {
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
    },
    [sitesData]
  );

  const handleAutoPopulate = useCallback(
    (dataToPopulate: AutoPopulateData | null) => {
      setAutoPopulateData(dataToPopulate);

      if (dataToPopulate) {
        const newSitesData: SiteData = cloneDeep(sitesData);
        const siteNameToPopulate = dataToPopulate.site.name;
        const data = { ...newSitesData[siteNameToPopulate] };

        Object.keys(newSitesData).forEach((siteName: string) => {
          if (siteName !== siteNameToPopulate) {
            newSitesData[siteName] = data;
          }
        });
        setSitesData(newSitesData);
      } else {
        // const newSitesData: SiteData = cloneDeep(sitesData);
        // const firstSiteName = selectedSites[0].name;
        // Object.keys(newSitesData).forEach((siteName: string) => {
        //   if (siteName !== firstSiteName) {
        //     newSitesData[siteName] = {
        //       inputDetails: [],
        //       componentDetails: {},
        //     };
        //   }
        // });
        // setSitesData(newSitesData);
      }
    },
    [sitesData]
  );

  const handleSiteSpecificReport = useCallback(
    (value: string) => {
      setSiteSpecificReport(value);
      if (value === SITE_SPECIFIC_REPORT_OPTIONS[1].value) {
        handleSiteChange(1, true);
      } else {
        setSelectedSites([]);
        setSitesData({});
      }
    },
    [handleSiteChange]
  );

  const handleCollectionChange = useCallback(
    (e: CheckboxChangeEvent) => {
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
    },
    [handleSiteChange, siteSpecificReport, selectedCollections]
  );

  const handleUpdateQuantity = useCallback(
    (quantity: number, groupId: string) => {
      const newTotalQuantities = cloneDeep(totalQuantities);
      const index = newTotalQuantities.findIndex((item) => item.id === groupId);

      if (index === -1) {
        newTotalQuantities.push({ id: groupId, quantity });
      } else {
        newTotalQuantities[index].quantity = quantity;
      }
      setTotalQuantities(newTotalQuantities);
    },
    []
  );

  return (
    <div className="flex-grow-1">
      <div className="px-2 my-4 wrapper md:px-0 md:my-8">
        <div className="px-3 py-5 flex flex-column m:p-5 border-round shadow-1">
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
                  options={PROCEDURES}
                />
              </div>
            </>
          )}

          {!isCustom &&
            (procedure === PROCEDURE.RESTORATIVE ||
              procedure === PROCEDURE.SURGERY_AND_RESTORATIVE) && (
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

          <div className="border-top-1 border-light-green">
            <div className="flex flex-column">
              {(!isCustom ||
                (isCustom &&
                  procedureInputsAndResponse?.input &&
                  procedureInputsAndResponse?.input.length > 0 &&
                  siteSpecificReport ===
                    SITE_SPECIFIC_REPORT_OPTIONS[0].value)) && (
                <TeethSelector
                  showLabel
                  selectedSites={selectedSites}
                  onSiteChange={handleSiteChange}
                />
              )}

              {selectedSites.length > 0 && (
                <InputDetails
                  selectedSites={selectedSites}
                  sitesData={sitesData}
                  showTeethSelection={
                    siteSpecificReport === SITE_SPECIFIC_REPORT_OPTIONS[0].value
                  }
                  isCustom={isCustom}
                  onInputSelect={handleInputSelect}
                  onAutoPopulate={handleAutoPopulate}
                  autoPopulateData={autoPopulateData}
                  procedureInputs={procedureInputsAndResponse?.input || []}
                  responseOrder={
                    procedureInputsAndResponse?.responseOrder || []
                  }
                  totalQuantities={totalQuantities}
                  onQuizResponse={handleQuizResponse}
                  onUpdateQuantity={handleUpdateQuantity}
                  onAllAnswered={handleAllAnswered}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isAllSitesAnswered && selectedSites.length > 0 && (
        <HelpfulButton
          onClickThumbUp={onClickThumbUp}
          onClickThumbDown={onClickFeedback}
        />
      )}
      {isAllSitesAnswered === false && selectedSites.length > 0 && (
        <FeedbackDialogWrapper calculatorName={calculatorName} />
      )}
      <HelpfulFeedbackDialog
        visible={feedbkackShow}
        setVisible={setFeedbackShow}
        calculatorName={calculatorName}
        quiz={[]}
      />
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
};

export default AllOnXCalculator;
