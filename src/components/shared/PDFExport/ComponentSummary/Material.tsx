import keys from "lodash/keys";
import React from "react";

import {
  MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING,
  MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING,
} from "@/constants/calculators";
import { ItemInsights, Summary } from "@/types/calculators";

import SummaryTable from "./SummaryTable";

interface GenericComponentSummaryProps {
  summary: Summary[];
}

const GenericComponentSummary: React.FC<GenericComponentSummaryProps> = ({
  summary,
}) => {
  return (
    <>
      {summary.map((elem, idx) => {
        const isPopup = elem.reasoning && elem.supportingArticle;

        if (isPopup) {
          return (
            <SummaryTable
              key={idx}
              mapping={MATERIAL_CALCULATOR_POPUP_OUTPUT_MAPPING}
              item={elem}
              isPopup
            />
          );
        }

        if (
          keys(MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING).some(
            (key) => elem[key as keyof ItemInsights]
          )
        ) {
          return (
            <SummaryTable
              key={idx}
              mapping={MATERIAL_CALCULATOR_GENERIC_OUTPUT_MAPPING}
              item={elem}
            />
          );
        }
      })}
    </>
  );
};

export default GenericComponentSummary;
