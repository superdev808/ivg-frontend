import lowerCase from "lodash/lowerCase";
import orderBy from "lodash/orderBy";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import React, { useMemo } from "react";

import {
  SingleSavedResult as SingleSavedResultType,
  MultiSavedResult as MultiSavedResultType,
} from "@/types/calculators";
import { SingleSavedResult, MultiSavedResult } from "./ResultItems";

interface SavedResultsListProps {
  savedResults: Array<SingleSavedResultType | MultiSavedResultType>;
  search: string;
  isLoading: boolean;
  onDelete: (_: string) => void;
}

const SavedResultsList: React.FC<SavedResultsListProps> = ({
  savedResults,
  search,
  isLoading,
  onDelete,
}) => {
  const filteredResults = useMemo(() => {
    const orderedResults = orderBy(savedResults, ["date"], ["desc"]);

    if (!search) {
      return orderedResults;
    }

    return orderedResults.filter((result) => {
      return lowerCase(result.name).includes(lowerCase(search));
    });
  }, [savedResults, search]);

  const handleShowDeleteConfirm = (resultId: string) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => onDelete(resultId),
    });
  };

  return (
    <div className="w-full flex flex-column gap-4 mt-4">
      <ConfirmDialog />

      {filteredResults.map((savedResult) => {
        if (savedResult.type === "single") {
          return (
            <SingleSavedResult
              key={savedResult.id}
              savedResult={savedResult}
              isLoading={isLoading}
              onDelete={() => handleShowDeleteConfirm(savedResult.id)}
            />
          );
        }

        return (
          <MultiSavedResult
            key={savedResult.id}
            savedResult={savedResult}
            isLoading={isLoading}
            onDelete={() => handleShowDeleteConfirm(savedResult.id)}
          />
        );
      })}
    </div>
  );
};

export default SavedResultsList;
