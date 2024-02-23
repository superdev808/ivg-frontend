import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useState } from "react";

import Result from "@/components/secure/calculator/Result";
import { formatDate, getCalculatorName } from "@/helpers/util";

import { ItemData } from "../calculator/AllOnX/constants";

export type SavedResult = {
  id: string;
  name: string;
  calculatorType: string;
  items: ItemData[];
  quiz: { answer: string; question: string }[];
  date: string;
};

interface SavedResultsListProps {
  savedResult: SavedResult;
  isDeleting: boolean;
  onDelete: () => void;
}

const SavedResultDetail: React.FC<SavedResultsListProps> = ({
  savedResult,
  isDeleting,
  onDelete,
}) => {
  const router = useRouter();

  const [items, setItems] = useState<ItemData[]>([]);

  const { id, calculatorType, quiz, date, name } = savedResult;

  useEffect(() => {
    setItems(savedResult.items);
  }, [savedResult.items]);

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

  const handleUpdateQuantity = (quantity: number, itemName: string) => {
    setItems((prevState) =>
      prevState.map((item) => ({
        ...item,
        info:
          item.info[0].itemName === itemName
            ? [{ ...item.info[0], quantity }]
            : item.info,
      }))
    );
  };

  return (
    <>
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
          id={id}
          name={name}
          calculatorType={calculatorType}
          items={items}
          quiz={quiz}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </div>
    </>
  );
};

export default SavedResultDetail;
