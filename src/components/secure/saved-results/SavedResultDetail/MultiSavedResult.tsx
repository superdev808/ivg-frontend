import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

import InputSummary from "@/components/secure/calculator/AllOnX/InputDetails/Summary/InputSummary";
import ComponentSummary from "@/components/secure/calculator/AllOnX/InputDetails/Summary/ComponentSummary";
import PDFExport from "@/components/shared/PDFExport";
import { formatDate } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useUpdateSavedResultMutation,
} from "@/redux/hooks/apiHooks";
import { MultiSavedResult, TotalQuantities } from "@/types/calculators";

interface MultiResultDetailProps {
  savedResult: MultiSavedResult;
  isDeleting: boolean;
  onDelete: () => void;
}

const MultiSavedResultDetail: React.FC<MultiResultDetailProps> = ({
  savedResult,
  isDeleting,
  onDelete,
}) => {
  const router = useRouter();

  const { refetch } = useGetUserInfoQuery({});
  const [updateSavedResult] = useUpdateSavedResultMutation();

  const [totalQuantities, setTotalQuantities] = useState<TotalQuantities[]>([]);
  const [editMode, setEditMode] = useState<"init" | "started" | "pending">(
    "init"
  );
  const [editingName, setEditingName] = useState<string>("");

  const toastRef = useRef(null);

  const { id, date, name, inputSummary, componentSummary } = savedResult;

  const handleGoBack = () => {
    router.push("/settings/saved-results");
  };

  const handleStartNameEdit = () => {
    setEditMode("started");
    setEditingName(name);
  };

  const handleCancelNameEdit = () => {
    setEditMode("init");
    setEditingName(name);
  };

  const handleSaveNameEdit = async () => {
    if (!id) {
      return;
    }

    const data = { name: editingName };

    try {
      setEditMode("pending");

      await updateSavedResult({ id, data }).unwrap();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Updated saved result successfully",
        life: 3000,
        className: "mt-8",
      });

      setEditMode("init");
      setEditingName("");

      refetch();
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update saved result",
        life: 3000,
        className: "mt-8",
      });

      setEditMode("started");
    }
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
    const newTotalQuantities = cloneDeep(totalQuantities);

    const index = newTotalQuantities.findIndex(
      (item) => item.itemName === itemName
    );

    if (index === -1) {
      newTotalQuantities.push({ itemName, quantity });
    } else {
      newTotalQuantities[index].quantity = quantity;
    }

    setTotalQuantities(newTotalQuantities);
  };

  return (
    <>
      <ConfirmDialog />

      <Toast ref={toastRef} />

      <div className="w-12 lg:w-8">
        <div className="border-bottom-2 border-green-800 flex align-items-center justify-content-between mb-4 gap-3">
          <Button
            icon="pi pi-arrow-left"
            disabled={isDeleting}
            onClick={handleGoBack}
          />

          <h2>
            {savedResult.type === "all-on-x"
              ? "All-on-X Ordering Guide"
              : "Custom Combinations"}
          </h2>

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

        <div className="flex flex-column gap-4">
          <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center gap-2">
              {editMode !== "init" ? (
                <InputText
                  value={editingName}
                  onChange={(evt) => setEditingName(evt.target.value)}
                />
              ) : (
                <h1 className="m-0">{name}</h1>
              )}

              <div className="flex align-items-center gap-2">
                {editMode === "init" && (
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    aria-label="Edit"
                    onClick={handleStartNameEdit}
                  />
                )}
                {(editMode === "started" || editMode === "pending") && (
                  <>
                    <Button
                      icon="pi pi-check"
                      rounded
                      text
                      aria-label="Save"
                      loading={editMode === "pending"}
                      disabled={editingName === name}
                      onClick={handleSaveNameEdit}
                    />

                    <Button
                      icon="pi pi-times"
                      rounded
                      text
                      disabled={editMode === "pending"}
                      aria-label="Cancel"
                      onClick={handleCancelNameEdit}
                    />
                  </>
                )}
              </div>
            </div>

            <PDFExport
              isCustom={savedResult.type === "combined"}
              showTeethSelection
              totalQuantities={totalQuantities}
              inputSummary={inputSummary}
              componentSummary={componentSummary}
              hideSave
            />
          </div>

          <InputSummary summary={inputSummary} />
          <ComponentSummary
            summary={componentSummary}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>
    </>
  );
};

export default MultiSavedResultDetail;
