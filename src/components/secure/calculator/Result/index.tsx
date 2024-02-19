import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import omit from "lodash/omit";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import PatientInfo from "@/components/shared/PatientInfo";
import { getCalculatorName, productImages } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useSaveResultMutation,
  useUpdateSavedResultMutation,
} from "@/redux/hooks/apiHooks";
import { Patient } from "@/types/PublicTypes";

import PdfContent from "../AllOnX/PdfExport/PdfContent";
import { prepareExportProps } from "./helper";
import Outputs from "./Outputs";
import { getItemName } from "./Outputs/helpers";
import SaveDialog from "./SaveDialog";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

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

  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const calculatorName = getCalculatorName(calculatorType);
  const filename = patientInfo?.filename || `${calculatorName}-Summary`;

  const itemName = name || getItemName(calculatorType, itemInfo);
  const itemImage = productImages[calculatorType] || productImages["Default"];
  const purchaseLink = trim(itemInfo["Link to Purchase"]);

  const details = omit(itemInfo, [
    "Item Name",
    "Item Image",
    "Link to Purchase",
  ]);

  const isSaved = Boolean(id);

  const exportAndSendPDF = async (info: Patient) => {
    const element = contentRef.current;

    if (element) {
      try {
        const options = {
          margin: [8, 0],
          filename: info.filename || filename,
          image: { type: "jpeg", quality: 0.9 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
          pagebreak: {
            avoid: ["thead", "tr", ".greet"],
          },
        };
        // Create an html2pdf instance
        if (info.actionType === "download") {
          const pdfInstance = html2pdf(element, options);
          await pdfInstance.output();
          (toastRef.current as any).show({
            severity: "success",
            summary: "Success",
            detail: "Pdf downloaded successfully.",
            life: 5000,
            className: "mt-8",
          });
        } else if (info.actionType === "export") {
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", options.filename);

          const formData = new FormData();
          formData.append("attachment", blob, "exported-document.pdf");
          formData.append("name", info.name);
          formData.append("recipientsList", info.recipientsList);
          formData.append("calculatorName", calculatorName);
          formData.append("filename", options.filename);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendCalculatorSummary`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            response.json().then((res: any) => {
              const msg: string =
                res?.message?.message || res?.message || "Something went wrong";
              (toastRef.current as any).show({
                severity: "error",
                summary: res?.status,
                detail: msg,
                life: 5000,
                className: "mt-8",
              });
            });
          } else {
            const { data, status } = await response.json();
            (toastRef.current as any).show({
              severity: "success",
              summary: status,
              detail: data,
              life: 5000,
              className: "mt-8",
            });
          }
        }
        setPatientInfo(null);
      } catch (error) {
        console.error("Error exporting to PDF or sending email:", error);
      }
    }
  };

  const showPatientInfoDialog = (actionType: string) => {
    const info: Patient = {
      filename,
      name: "",
      address: "",
      recipientsList: "",
      actionType,
    };

    setPatientInfo(info);
    setVisible(true);
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
        summary: "Success",
        detail: "Saved result successfully",
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

  const handleSubmit = (data: Patient) => {
    setVisible(false);

    const newPatientInfo = { ...patientInfo, ...data, date: new Date() };

    setPatientInfo(newPatientInfo);
    exportAndSendPDF(newPatientInfo);
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

      <div className="flex flex-column gap-4">
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
                onClick={() => showPatientInfoDialog("export")}
              />
              <Button
                className="px-3 py-2"
                label="Export"
                disabled={isExporting}
                onClick={() => showPatientInfoDialog("download")}
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

      <div className="hidden">
        <div ref={contentRef}>
          {patientInfo && (
            <PdfContent
              {...prepareExportProps(
                calculatorType,
                calculatorName,
                patientInfo,
                quiz,
                itemInfo
              )}
            />
          )}
        </div>
      </div>

      <Dialog
        header="Patient Info"
        visible={visible}
        position="top"
        className="w-10 md:w-6 xl:w-4"
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <PatientInfo info={patientInfo} onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
};

export default Result;
