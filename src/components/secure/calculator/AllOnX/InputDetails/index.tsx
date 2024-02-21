import classNames from "classnames";
import get from "lodash/get";
import values from "lodash/values";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useMemo } from "react";

import { CALCULATOR_MAPPINGS } from "@/app/(protected)/calculators/constants";

import {
  Site,
  SiteData,
  InputDetail,
  AutoPopulateData,
  InputOutputValues,
  ItemData,
} from "../constants";
import Questionnaire from "./Questionnaire";
import { InputNumber } from "primereact/inputnumber";

interface InputDetailsProps {
  selectedSites: Site[];
  sitesData: SiteData;
  autoPopulateData: AutoPopulateData | null;
  procedureInputs: InputOutputValues[];
  responseOrder: string[];
  onInputSelect: (
    site: Site,
    question: InputOutputValues,
    answer: string
  ) => void;
  onAutopopulate: (dataToPopulate: AutoPopulateData | null) => void;
  onQuizResponse: (
    site: Site,
    response: ItemData[],
    collection: string
  ) => void;
  onUpdateQuantity: (quantity: number, itemName: string) => void;
}

const InputDetails: React.FC<InputDetailsProps> = ({
  selectedSites,
  sitesData,
  autoPopulateData,
  procedureInputs,
  responseOrder,
  onInputSelect,
  onAutopopulate,
  onQuizResponse,
  onUpdateQuantity,
}) => {
  const questions = useMemo(() => {
    const inputDetails = get(values(sitesData), [0, "inputDetails"]);

    return inputDetails
      .filter((item) => Boolean(item.answer))
      .map((item) => item.question);
  }, [sitesData]);

  return (
    <div className="relative">
      <TabView renderActiveOnly={false} scrollable>
        {selectedSites.map((site, index) => (
          <TabPanel key={site.name} header={site.name}>
            <Questionnaire
              site={site}
              input={procedureInputs}
              option={CALCULATOR_MAPPINGS.ALL_ON_X_CALCULATOR}
              showAutopopulatePrompt={selectedSites.length > 1 && index === 0}
              autoPopulateData={autoPopulateData}
              sitesData={sitesData}
              responseOrder={responseOrder}
              onInputSelect={onInputSelect}
              onAutopopulate={onAutopopulate}
              onQuizResponse={onQuizResponse}
              onUpdateQuantity={onUpdateQuantity}
            />
          </TabPanel>
        ))}

        <TabPanel header="Summary">
          <div className="flex border-left-1 border-top-1 border-gray-400 mt-4 w-fit">
            <div className="flex flex-column">
              {["Questions", ...questions].map((question) => (
                <div
                  key={question}
                  style={{ height: 45 }}
                  className="flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400 font-bold"
                >
                  {question}
                </div>
              ))}
            </div>

            {Object.keys(sitesData).map((siteName) => {
              const site = sitesData[siteName];
              const answers = site.inputDetails
                .filter((item) => Boolean(item.answer))
                .map((item) => item.answer);

              return (
                <div key={siteName} className="flex flex-column">
                  {[siteName, ...answers].map((answer, idx) => (
                    <div
                      key={answer}
                      style={{ height: 45 }}
                      className={classNames(
                        "flex align-items-center px-3 border-right-1 border-bottom-1 border-gray-400",
                        { "font-bold": idx === 0 }
                      )}
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default InputDetails;
