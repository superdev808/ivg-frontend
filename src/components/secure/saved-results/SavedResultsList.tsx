import cx from "classnames";
import lowerCase from "lodash/lowerCase";
import trim from "lodash/trim";
import values from "lodash/values";
import { useRouter } from "next/navigation";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React, { useMemo } from "react";
import { formatDate } from "@/helpers/util";

type SavedResult = {
  id: string;
  calculatorName: string;
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
  date: string;
};

interface SavedResultsListProps {
  savedResults: SavedResult[];
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
    if (!search) {
      return savedResults;
    }

    return savedResults.filter((result) => {
      const parsed = [...values(result.itemInfo), ...values(result.quiz)].map(
        lowerCase
      );

      return parsed.some((elem) => elem.includes(lowerCase(search)));
    });
  }, [savedResults, search]);

  const handleGoToDetailPage = (resultId: string) => {
    if (isLoading) {
      return;
    }

    router.push(`/settings/saved-results/detail/?id=${resultId}`);
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
    <div className="flex flex-column gap-4 mt-4">
      <ConfirmDialog />
      {filteredResults.map(({ id, date, itemInfo }) => {
        const itemName = trim(
          itemInfo["Item Name"] || itemInfo["Drill Kit Name"]
        );
        const itemImage = trim(
          itemInfo["Item Image"] ||
            "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alpha+Bio+Tec.png"
        );

        return (
          <div
            key={id}
            className={cx(
              `border-2 border-gray-400 px-2 py-3 text-center
            flex flex-column gap-4 align-items-center
            md:text-left md:px-3 md:py-5 md:flex-row`,
              { "cursor-pointer": !isLoading, "cursor-wait": isLoading }
            )}
            onClick={() => handleGoToDetailPage(id)}
          >
            {itemImage && (
              <div className="flex-shrink-0">
                <Image
                  src={itemImage}
                  alt={itemName}
                  width="100"
                  className="relative mb-3"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="font-bold">Title:</div>
              <div>{itemName}</div>
            </div>

            <div className="flex-shrink-0">
              <div className="font-bold">Saved Date:</div>
              <div>{formatDate(date)}</div>
            </div>

            <div className="flex-shrink-0">
              <Button
                icon="pi pi-trash"
                disabled={isLoading}
                onClick={(evt) => handleShowDeleteConfirm(evt, id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedResultsList;