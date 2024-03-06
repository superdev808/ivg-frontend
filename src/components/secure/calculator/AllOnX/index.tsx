import { event as gaEvent } from "@/lib/gtag";
import cloneDeep from "lodash/cloneDeep";
import has from "lodash/has";
import isEqual from "lodash/isEqual";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import React, { useEffect, useState } from "react";

import TeethSelector from "@/components/shared/TeethSelector";
import {
    getProcedureCollections,
    getProcedureInputsAndResponse,
} from "@/helpers/calculators";
import {
    CALCULATOR_NAME_COLLECTION_MAPPINGS,
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
} from "@/types/calculators";

import AdditionalInputs from "./AdditionalInputs";
import CustomCombinationsInputs from "./CustomCombinationsInputs";
import InputDetails from "./InputDetails";
import HelpfulFeedbackDialog from "../Feedback/HelpfulFeedbackDialog";

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
    const calculatorName = "All-on-X Calculator";

    const [feedbkackShow, setFeedbackShow] = useState<boolean>(false);
    const onClickThumbUp = () => {
        gaEvent({
            action: "Thumb_Up",
            category: "Button",
            label: calculatorName,
        });
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
    const [selectedCollections, setSelectedCollections] = useState<string[]>(
        []
    );
    const [totalQuantities, setTotalQuantities] = useState<TotalQuantities[]>(
        []
    );
    const [allAnsweredSites, setAllAnsweredSites] = useState<Site[]>([]);

    console.log("AAA", sitesData, selectedSites);

    const allSitesAnswered = selectedSites.reduce(
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

    const handleAllAnswered = (site: Site) => {
        setAllAnsweredSites([...allAnsweredSites, site]);
    };

    const handleProcedureChange = (e: SelectButtonChangeEvent) => {
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
    };

    const handleSiteChange = (tooth: number, isAnonymous?: boolean): void => {
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
                    [`Site ${tooth}`]: {
                        inputDetails: [],
                        componentDetails: {},
                    },
                };
                setSitesData((prev) => {
                    return { ...prev, ...newSiteData };
                });
                _selectedSites = _selectedSites.sort((a, b) => a.key - b.key);
            } else {
                const newSiteData = {
                    "General Details": {
                        inputDetails: [],
                        componentDetails: {},
                    },
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
        const inputDetails: InputDetail[] = cloneDeep(
            data[site.name].inputDetails
        );
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
        const indexOfCollection: number = calculators.indexOf(
            question.calculator
        );
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
                state = {
                    ...state,
                    [MUA_OPTIONS[0].name]: MUA_OPTIONS[0].value,
                };
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
        const newTotalQuantities = cloneDeep(totalQuantities);

        const index = newTotalQuantities.findIndex(
            (item) => item.itemName === itemName
        );

        if (index === -1) {
            newTotalQuantities.push({ itemName, quantity });
        } else {
            newTotalQuantities[index].quantity = quantity;
        }

        setTotalQuantities(newTotalQuantities);
    };

    return (
        <div className="nav-offset flex-grow-1">
            <div className="px-2 my-4 wrapper md:px-0 md:my-8">
                <div className="px-3 py-5 flex flex-column m:p-5 border-round bg-white shadow-1">
                    {!isCustom && (
                        <>
                            <h3 className="mt-0 mb-3 text-center">
                                What part of the All-on-X procedure can we help
                                you with?
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
                            procedure ===
                                PROCEDURE.SURGERY_AND_RESTORATIVE) && (
                            <AdditionalInputs
                                textDentalImplantProcedure={
                                    TEXT_DENTAL_IMPLANT_PROCEDURE
                                }
                                textMUAStatus={TEXT_MUA_STATUS}
                                showMUAOptions={
                                    additionalInputs[
                                        DENTAL_IMPLANT_PROCEDURE_OPTIONS[0].name
                                    ] ===
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
                            onChangeSiteSpecificReport={
                                handleSiteSpecificReport
                            }
                        />
                    )}

                    <div className="grid border-top-1 surface-border">
                        <div className="flex flex-column col-12">
                            {(!isCustom ||
                                (isCustom &&
                                    procedureInputsAndResponse?.input &&
                                    procedureInputsAndResponse?.input.length >
                                        0 &&
                                    siteSpecificReport ===
                                        SITE_SPECIFIC_REPORT_OPTIONS[0]
                                            .value)) && (
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
                                        siteSpecificReport ===
                                        SITE_SPECIFIC_REPORT_OPTIONS[0].value
                                    }
                                    isCustom={isCustom}
                                    onInputSelect={handleInputSelect}
                                    onAutopopulate={handleAutopopulate}
                                    autoPopulateData={autoPopulateData}
                                    procedureInputs={
                                        procedureInputsAndResponse?.input || []
                                    }
                                    responseOrder={
                                        procedureInputsAndResponse?.responseOrder ||
                                        []
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

            {allSitesAnswered && selectedSites.length > 0 && (
                <div
                    className="fixed text-2xl m-1 left-50 bg-green-300 p-3 pb-6 border-round-3xl m-0"
                    style={{
                        transform: "translate(-50%, -50%)",
                        bottom: "-90px",
                        zIndex: "100",
                    }}
                >
                    <i
                        className="pi pi-thumbs-up text-3xl mr-3"
                        onClick={onClickThumbUp}
                    />
                    Was this helpful?
                    <i
                        className="pi pi-thumbs-down text-3xl ml-3"
                        onClick={onClickFeedback}
                    />
                </div>
            )}
            <HelpfulFeedbackDialog
                visible={feedbkackShow}
                setVisible={setFeedbackShow}
                calculatorName={calculatorName}
                quiz={[]}
            />
        </div>
    );
};

export default AllOnXCalculator;
