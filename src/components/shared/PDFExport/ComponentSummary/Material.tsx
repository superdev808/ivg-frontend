import keys from "lodash/keys";
import React from "react";

import { Summary } from "@/types/calculators";

import SummaryTable from "./SummaryTable";

interface MaterialComponentSummaryProps {
  summary: Summary[];
}

const MaterialComponentSummary: React.FC<MaterialComponentSummaryProps> = ({
  summary,
}) => {
  return (
    <>
      {summary.map((elem, idx) => {
        return (<SummaryTable
          key={idx}
          item={elem}
        />);
      })}
    </>
  );
};

export default MaterialComponentSummary;
