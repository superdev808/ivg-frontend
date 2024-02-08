import cx from "classnames";
import lowerCase from "lodash/lowerCase";
import values from "lodash/values";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React, { useMemo } from "react";

type SavedResult = {
  mainInfo: Record<string, string>;
  quiz: Record<string, string>;
  details: Record<string, string>;
  id: string;
  date: string;
};

interface SavedResultsList {
  savedResults: SavedResult[];
  search: string;
  isLoading: boolean;
  onDelete: (_: string) => void;
}

const SavedResultsList: React.FC<SavedResultsList> = ({
  savedResults,
  search,
  isLoading,
  onDelete,
}) => {
  const filteredResults = useMemo(() => {
    if (!search) {
      return savedResults;
    }

    return savedResults.filter((result) => {
      const parsed = [
        ...values(result.mainInfo),
        ...values(result.quiz),
        ...values(result.details),
      ].map(lowerCase);

      return parsed.some((elem) => elem.includes(lowerCase(search)));
    });
  }, [savedResults, search]);

  const handleGoToDetailPage = (resultId: string) => {
    if (isLoading) {
      return;
    }
    console.log(resultId);
  };

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

  return (
    <div className="flex flex-column gap-4">
      <ConfirmDialog />
      {filteredResults.map((result) => (
        <div
          key={result.id}
          className={cx(
            `border-2 border-gray-400 px-2 py-3 text-center
            flex flex-column gap-4 align-items-center
            md:text-left md:px-3 md:py-5 md:flex-row`,
            { "cursor-pointer": !isLoading, "cursor-wait": isLoading }
          )}
          onClick={() => handleGoToDetailPage(result.id)}
        >
          {result.mainInfo["Item Name"] && (
            <div className="flex-shrink-0">
              <Image
                src="https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alpha+Bio+Tec.png"
                alt={result.mainInfo["Item Name"]}
                width="100"
                className="relative mb-3"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="font-bold">Title:</div>
            <div>{result.mainInfo["Item Name"]}</div>
          </div>

          <div className="flex-shrink-0">
            <div className="font-bold">Saved Date:</div>
            <div>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(result.date))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button
              icon="pi pi-trash"
              disabled={isLoading}
              onClick={(evt) => handleShowDeleteConfirm(evt, result.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedResultsList;
