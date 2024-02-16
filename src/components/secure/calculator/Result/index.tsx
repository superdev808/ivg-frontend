import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import omit from "lodash/omit";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { getCookie } from "@/helpers/cookie";
import { getCalculatorName, productImages } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useSaveResultMutation,
  useUpdateSavedResultMutation,
} from "@/redux/hooks/apiHooks";

import Outputs from "./Outputs";
import { getItemName } from "./Outputs/helpers";
import SaveDialog from "./SaveDialog";

import styles from "./style.module.scss";
import { InputText } from "primereact/inputtext";

const cx = classNames.bind(styles);

const PDF_EXPORT_OPTIONS = {
  filename: "Summary",
  margin: 10,
  image: { type: "jpeg", quality: 0.9 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "mm", format: "letter", orientation: "landscape" },
  pagebreak: {
    avoid: ["table", "thead", "tr", ".greet"],
  },
};

interface ResultProps {
  id?: string;
  name?: string;
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
  calculatorType: string;
}

const Result: React.FC<ResultProps> = ({
  id = "",
  name = "",
  itemInfo,
  quiz,
  calculatorType,
}) => {
  const { refetch } = useGetUserInfoQuery({});
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();
  const [updateSavedResult] = useUpdateSavedResultMutation();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<"init" | "started" | "pending">(
    "init"
  );
  const [editingName, setEditingName] = useState<string>("");

  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const itemName = name || getItemName(calculatorType, itemInfo);

  const itemImage = productImages[calculatorType] || productImages["Default"];
  const purchaseLink = trim(itemInfo["Link to Purchase"]);

  const details = omit(itemInfo, [
    "Item Name",
    "Item Image",
    "Link to Purchase",
  ]);

  console.log(id);

  const isSaved = Boolean(id);

  const handleExport = async () => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    setIsExporting(true);

    try {
      const pdfInstance = html2pdf(element, PDF_EXPORT_OPTIONS);
      await pdfInstance.output();
      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Downloaded PDF successfully.",
        life: 5000,
        className: "mt-8",
      });
    } catch {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Eror",
        detail: "Failed to download PDF.",
        life: 5000,
        className: "mt-8",
      });
    }

    setIsExporting(false);
  };

  const handleSendEmail = async () => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    setIsSendingEmail(true);

    try {
      const blob = await html2pdf()
        .set(PDF_EXPORT_OPTIONS)
        .from(element)
        .outputPdf("blob", PDF_EXPORT_OPTIONS.filename);

      const formData = new FormData();
      formData.append("attachment", blob, "exported-document.pdf");
      formData.append("name", getCookie("name"));
      formData.append("email", getCookie("email"));
      formData.append("calculatorType", getCalculatorName(calculatorType));
      formData.append("filename", PDF_EXPORT_OPTIONS.filename);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendCalculatorSummary`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        (toastRef.current as any).show({
          severity: "error",
          summary: "Error",
          detail: "Failed to send email.",
          life: 3000,
          className: "mt-8",
        });
      } else {
        (toastRef.current as any).show({
          severity: "success",
          summary: "Success",
          detail: "Sent email successfully.",
          life: 3000,
          className: "mt-8",
        });
      }
    } catch {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Eror",
        detail: "Failed to send email.",
        life: 5000,
        className: "mt-8",
      });
    }

    setIsSendingEmail(false);
  };

  const handleSave = async (name: string) => {
    const payload = {
      calculatorType,
      itemInfo,
      quiz,
      name,
    };

    try {
      await saveResult(payload).unwrap();
      refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Saved result",
        detail: "Go to profile page",
        life: 3000,
        className: "mt-8",
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save result",
        life: 3000,
        className: "mt-8",
      });
    }
  };

  const handleCloseSaveDialog = (resultName?: string) => {
    setShowSaveDialog(false);

    if (resultName) {
      handleSave(resultName);
    }
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

  const isPreparingPDF = isExporting || isSendingEmail;

  return (
    <>
      <Toast ref={toastRef} />

      <SaveDialog
        visible={showSaveDialog}
        defaultValue={itemName}
        onClose={handleCloseSaveDialog}
      />

      <div ref={contentRef} className="flex flex-column gap-4">
        <div
          className={`flex flex-column gap-4 justify-content-between
          lg:flex-row lg:align-items-center`}
        >
          <div className="flex align-items-center gap-2">
            {editMode !== "init" ? (
              <InputText
                value={editingName}
                onChange={(evt) => setEditingName(evt.target.value)}
              />
            ) : (
              <h1 className="m-0">{itemName}</h1>
            )}

            {isSaved && (
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
            )}
          </div>

          {!isPreparingPDF && (
            <div className="flex align-items-center flex-shrink-0 gap-2">
              <Button
                className="px-3 py-2"
                label="Email"
                disabled={isSendingEmail}
                onClick={handleSendEmail}
              />
              <Button
                className="px-3 py-2"
                label="Export"
                disabled={isExporting}
                onClick={handleExport}
              />
              {!isSaved && (
                <Button
                  className="px-3 py-2"
                  label="Save"
                  loading={isSavingResult}
                  onClick={() => setShowSaveDialog(true)}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-content-between gap-4 flex-column lg:flex-row">
          {itemImage && (
            <div
              className={cx(
                "flex-1 flex justify-content-center overflow-hidden",
                "image"
              )}
            >
              <Image
                src={itemImage}
                alt={itemName}
                className="flex-1 flex justify-content-center"
                imageClassName="w-full sm:w-5 lg:w-full lg:h-full"
                imageStyle={{ objectFit: "contain" }}
              />
            </div>
          )}

          <div
            className={cx(
              "bg-white flex flex-column justify-content-around gap-3 shadow-6 p-4 border-round-md",
              "quiz"
            )}
          >
            {Object.keys(quiz).map((text) => (
              <div key={text} className="flex gap-1">
                <div className="text-left" style={{ maxWidth: "50%" }}>
                  {text}
                </div>
                <div className="flex-1 text-right">{trim(quiz[text])}</div>
              </div>
            ))}
          </div>
        </div>

        <Outputs
          calculatorType={calculatorType}
          itemName={itemName}
          purchaseLink={purchaseLink}
          details={details}
        />
      </div>
    </>
  );
};

export default Result;
