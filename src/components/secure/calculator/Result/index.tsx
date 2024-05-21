import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useMemo, useRef, useState } from "react";

import PatientInfo from "@/components/shared/PatientInfo";
import PDFContent from "@/components/shared/PDFExport/PDFContent";
import SaveDialog from "@/components/shared/SaveDialog";
import { CALCULATOR_IMAGES } from "@/constants/calculators";
import { prepareExportProps } from "@/helpers/calculators";
import { event as gaEvent } from "@/lib/gtag";
import {
  useGetUserInfoQuery,
  useSaveCalculatorMutation,
  useSaveResultMutation,
  useUpdateSavedResultMutation,
} from "@/redux/hooks/apiHooks";
import { InputDetail, ItemData, Patient } from "@/types/calculators";

import Outputs from "./Outputs";

import styles from "./style.module.scss";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import InputSummary from "./InputSummary";

const cx = classNames.bind(styles);

interface ResultProps {
  id?: string;
  name?: string;
  items: ItemData[];
  quiz: InputDetail[];
  calculatorType: string;
  hideMenu?: boolean;
  className?: string;
  onUpdateQuantity: (quantity: number, groupId: string) => void;
}

const Result: React.FC<ResultProps> = ({
  id = "",
  name = "",
  items,
  quiz,
  calculatorType,
  hideMenu = false,
  className,
  onUpdateQuantity,
}) => {
  const { refetch } = useGetUserInfoQuery({});
  const [saveCalculator, { isLoading: isSavingCalculator }] =
    useSaveCalculatorMutation();
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();
  const [updateSavedResult] = useUpdateSavedResultMutation();
  const { calcInfoMap } = useCalculatorsInfo();

  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<"init" | "started" | "pending">(
    "init"
  );
  const [editingName, setEditingName] = useState<string>("");

  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const calculatorName = calcInfoMap[calculatorType].label;
  const filename = patientInfo?.filename || `${calculatorName}-Summary`;

  const image = CALCULATOR_IMAGES[calculatorType];

  const isSaved = Boolean(id);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.info.length > 0);
  }, [items]);

  const handleExportAndSendPDF = async (info: Patient) => {
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
          gaEvent({
            action: "Download_Button",
            category: "Button",
            label: calculatorName,
          });
          (toastRef.current as any).show({
            severity: "success",
            summary: "Success",
            detail: "PDF downloaded successfully.",
            life: 5000,
            className: "mt-8",
          });
        } else if (info.actionType === "export") {
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", options.filename);
          gaEvent({
            action: "Email_Button",
            category: "Button",
            label: calculatorName,
          });

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

  const handleCloseSaveDialog = () => {
    setShowSaveDialog(false);
  };

  const handleSaveResult = async (name: string) => {
    handleCloseSaveDialog();

    const payload = {
      calculatorType,
      items,
      quiz,
      name,
      type: "single",
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

  const handleSaveCalculator = async () => {
    handleCloseSaveDialog();

    const payload = { calculatorType };

    try {
      await saveCalculator(payload).unwrap();
      refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Saved calculator successfully",
        life: 3000,
        className: "mt-8",
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save calculator",
        life: 3000,
        className: "mt-8",
      });
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
    handleExportAndSendPDF(newPatientInfo);
  };

  return (
    <>
      <Toast ref={toastRef} />

      <SaveDialog
        visible={showSaveDialog}
        defaultValue={name || calculatorName}
        showSaveCalculator
        onSaveCalculator={handleSaveCalculator}
        onSaveResult={handleSaveResult}
        onClose={handleCloseSaveDialog}
      />

      <div className={cx("flex flex-column gap-4", className)}>
        <div
          className={`flex flex-column justify-content-center
          align-items-center gap-2 lg:flex-row`}
        >
          <div className="flex align-items-center gap-2">
            {editMode !== "init" ? (
              <InputText
                value={editingName}
                onChange={(evt) => setEditingName(evt.target.value)}
              />
            ) : (
              <h1 className="m-0">{name}</h1>
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

          {!hideMenu && (
            <div className="flex align-items-center flex-shrink-0 gap-2 justify-content-center lg:align-items-center">
              <Button
                className="p-button p-button-lg px-5 py-2"
                label="Email"
                onClick={() => showPatientInfoDialog("export")}
                style={{ fontSize: 28 }}
              />
              <Button
                className="p-button p-button-lg px-5 py-2"
                label="Export"
                onClick={() => showPatientInfoDialog("download")}
                style={{ fontSize: 28 }}
              />
              {!isSaved && (
                <Button
                  className="p-button p-button-lg px-5 py-2"
                  label="Save"
                  loading={isSavingCalculator || isSavingResult}
                  onClick={() => setShowSaveDialog(true)}
                  style={{ fontSize: 28 }}
                />
              )}
            </div>
          )}
        </div>

        <Outputs
          calculatorType={calculatorType}
          items={filteredItems}
          onUpdateQuantity={onUpdateQuantity}
        />
        <InputSummary
          items={filteredItems}
          name={name}
          calculatorType={calculatorType}
          quiz={quiz}
          image={image}
        />
      </div>

      <div className="hidden">
        <div ref={contentRef}>
          {patientInfo && (
            <PDFContent
              {...prepareExportProps(
                calculatorType,
                calculatorName,
                patientInfo,
                quiz,
                items
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
