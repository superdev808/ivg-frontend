import get from "lodash/get";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useMemo } from "react";

import { InputSummary as InputSummaryType } from "@/types/calculators";

interface InputSummary {
  summary: InputSummaryType[];
}

const InputSummary: React.FC<InputSummary> = ({ summary }) => {
  const questions = useMemo(() => {
    const inputDetails = get(summary, [0, "inputDetails"]);

    return inputDetails
      .filter((item) => Boolean(item.answer))
      .map((item) => item.question);
  }, [summary]);

  if (questions.length === 0) {
    return null;
  }

  const renderCell = (item: InputSummaryType, column: ColumnBodyOptions) => {
    const inputDetails = item.inputDetails;
    const answer =
      inputDetails.find((elem) => elem.question === column.field)?.answer || "";
    return answer;
  };

  return (
    <div>
      <h3 className="mb-3">Inputs:</h3>

      <DataTable
        value={summary}
        tableStyle={{ minWidth: "50rem" }}
        showGridlines
        scrollable
      >
        <Column field="site" header="Site" />
        {questions.map((question) => (
          <Column
            key={question}
            field={question}
            header={question}
            body={renderCell}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default InputSummary;
