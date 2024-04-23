import keys from "lodash/keys";
import React, { useMemo } from "react";

import { Summary } from "@/types/calculators";

import SummaryTable from "./SummaryTable";

interface MaterialComponentSummaryProps {
  summary: Summary[];
}

const MaterialComponentSummary: React.FC<MaterialComponentSummaryProps> = ({
  summary,
}) => {
  const { reasoning, other } = useMemo(() => {
    return summary.reduce(
      (acc, elem) => {
        if (
          keys(elem).includes("supportingArticle") ||
          keys(elem).includes("reasoning")
        ) {
          acc.reasoning.push(elem);
        } else {
          acc.other.push(elem);
        }
        return acc;
      },
      { reasoning: [], other: [] } as { reasoning: Summary[]; other: Summary[] }
    );
  }, [summary]);

  return (
    <>
      <SummaryTable items={reasoning} />
      <SummaryTable items={other} />
    </>
  );
};

export default MaterialComponentSummary;
