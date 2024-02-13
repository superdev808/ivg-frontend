import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React from "react";

import Result from "@/components/secure/calculator/Result";
import { formatDate, getCalculatorName } from "@/helpers/util";

type SavedResult = {
  id: string;
  calculatorType: string;
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

  const { calculatorType, itemInfo, quiz, date } = savedResult;

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

      <div className="w-12 lg-w-8 xl:w-6">
        <div className="border-bottom-2 border-green-800 flex align-items-center justify-content-between mb-4 gap-3">
          <Button
            icon="pi pi-arrow-left"
            disabled={isDeleting}
            onClick={handleGoBack}
          />

          <h2>{getCalculatorName(calculatorType)} Calculator</h2>

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

        <Result
          calculatorType={calculatorType}
          itemInfo={itemInfo}
          quiz={quiz}
        />
      </div>
    </>
  );
};

export default SavedResultDetail;
