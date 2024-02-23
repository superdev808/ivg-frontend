import cx from "classnames";
import lowerCase from "lodash/lowerCase";
import orderBy from "lodash/orderBy";
import { useRouter } from "next/navigation";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import React, { useMemo } from "react";

import {
  SingleSavedResult as SingleSavedResultType,
  MultiSavedResult as MultiSavedResultType,
} from "@/types/calculators";
import { SingleSavedResult, MultiSavedResult } from "./ResultItems";
import { Button } from "primereact/button";
import { formatDate } from "@/helpers/util";

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
  const router = useRouter();

  const filteredResults = useMemo(() => {
    const orderedResults = orderBy(savedResults, ["date"], ["desc"]);

    if (!search) {
      return orderedResults;
    }

    return orderedResults.filter((result) => {
      return lowerCase(result.name).includes(lowerCase(search));
    });
  }, [savedResults, search]);

  const handleShowDeleteConfirm = (
    evt: React.SyntheticEvent,
    resultId: string
  ) => {
    evt.stopPropagation();

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => onDelete(resultId),
    });
  };

  const handleGoToDetailPage = (resultId: string) => {
    if (isLoading) {
      return;
    }

    router.push(`/settings/saved-results/detail/?id=${resultId}`);
  };

  return (
    <div className="w-full flex flex-column gap-4 mt-4">
      <ConfirmDialog />

      {filteredResults.map((savedResult) => {
        return (
          <div
            key={savedResult.id}
            className={cx(
              `border-2 border-gray-400 px-2 py-3 text-center
      flex flex-column gap-4 align-items-center
      md:text-left md:px-3 md:py-5 md:flex-row`,
              { "cursor-pointer": !isLoading, "cursor-wait": isLoading }
            )}
            onClick={() => handleGoToDetailPage(savedResult.id)}
          >
            {savedResult.type === "single" ? (
              <SingleSavedResult
                key={savedResult.id}
                savedResult={savedResult}
              />
            ) : (
              <MultiSavedResult
                key={savedResult.id}
                savedResult={savedResult}
              />
            )}

            <div className="flex-shrink-0">
              <div className="font-bold">Saved Date:</div>
              <div>{formatDate(savedResult.date)}</div>
            </div>

            <div className="flex-shrink-0">
              <Button
                icon="pi pi-trash"
                disabled={isLoading}
                onClick={(evt) => handleShowDeleteConfirm(evt, savedResult.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedResultsList;
