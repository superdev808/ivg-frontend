import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React from "react";

import Slide from "@/components/secure/calculator/slide";
import { formatDate } from "@/helpers/util";

type SavedResult = {
  id: string;
  calculatorName: string;
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
  date: string;
};

interface SavedResultsListProps {
  savedResult: SavedResult;
  isDeleting: boolean;
  toastRef: any;
  onDelete: () => void;
}

const SavedResultDetail: React.FC<SavedResultsListProps> = ({
  savedResult,
  isDeleting,
  toastRef,
  onDelete,
}) => {
  const router = useRouter();

  const { calculatorName, itemInfo, quiz, date } = savedResult;

  const handleGoBack = () => {
    router.push("/settings/saved-results");
  };

  const handleShowDeleteConfirm = () => {
    if (isDeleting) {
      return;
    }

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: onDelete,
    });
  };

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <ConfirmDialog />

      <div className="w-12 lg-w-10 xl:w-7">
        <div className="border-bottom-2 border-green-800 flex align-items-center justify-content-between mb-4 gap-3">
          <Button
            icon="pi pi-arrow-left"
            disabled={isDeleting}
            onClick={handleGoBack}
          />

          <h2>{calculatorName} Calculator</h2>

          <div className="flex align-items-center gap-2">
            Saved Date: {formatDate(date)}{" "}
            <Button
              icon="pi pi-trash"
              size="small"
              loading={isDeleting}
              onClick={handleShowDeleteConfirm}
            />
          </div>
        </div>

        <Slide
          calculatorName={calculatorName}
          itemInfo={itemInfo}
          quiz={quiz}
        />
      </div>
    </>
  );
};

export default SavedResultDetail;
