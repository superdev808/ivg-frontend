// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

import PatientInfo from "@/components/shared/PatientInfo";
import { useSaveResultMutation } from "@/redux/hooks/apiHooks";
import {
  ComponentSummary,
  Patient,
  InputSummary,
  TotalQuantities,
} from "@/types/calculators";

import PDFContent from "./PDFContent";
import SaveDialog from "../SaveDialog";

interface PDFExportProps {
  isCustom: boolean;
  showTeethSelection: boolean;
  totalQuantities: TotalQuantities[];
  inputSummary: InputSummary[];
  componentSummary: ComponentSummary[];
  hideSave?: boolean;
}

const PDFExport: React.FC<PDFExportProps> = ({
  isCustom,
  showTeethSelection,
  totalQuantities,
  inputSummary,
  componentSummary,
  hideSave = false,
}) => {
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();

  const contentRef = useRef(null);
  const toastRef = useRef(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);

  const calculatorName = isCustom ? "Custom" : "All-On-X";

  const filename = patientInfo?.filename || `${calculatorName}-Summary`;

  const handleSave = async (name: string) => {
    const compWithUpdatedQuantity = componentSummary.map((comp) => {
      const quantity = totalQuantities.find(
        (elem) => elem.itemName === comp.itemName
      )?.quantity;

      return {
        ...comp,
        quantity: quantity || comp.quantity,
      };
    });

    const payload = {
      inputSummary,
      componentSummary: compWithUpdatedQuantity,
      name,
      type: isCustom ? "combined" : "all-on-x",
    };

    try {
      await saveResult(payload).unwrap();

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

  const handleExportAndSendPDF = async (info: Patient) => {
    const element = contentRef.current;

    if (element) {
      try {
        const options = {
          margin: [8, 0],
          filename: info.filename || filename,
          image: { type: "png", quality: 2 },
          html2canvas: { scale: 1 },
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
            detail: "PDF downloaded successfully.",
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

  const handleCloseSaveDialog = (resultName?: string) => {
    setShowSaveDialog(false);

    if (resultName) {
      handleSave(resultName);
    }
  };

  const handleSubmit = (data: Patient) => {
    setVisible(false);

    const newPatientInfo = { ...patientInfo, ...data, date: new Date() };

    setPatientInfo(newPatientInfo);
    handleExportAndSendPDF(newPatientInfo);
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

  return (
    <div className="relative flex justify-content-end mt-3">
      <div className="hidden">
        <div ref={contentRef}>
          {patientInfo && (
            <PDFContent
              calculatorName={calculatorName}
              patientInfo={patientInfo}
              showTeethSelection={showTeethSelection}
              totalQuantities={totalQuantities}
              inputSummary={inputSummary}
              componentSummary={componentSummary}
            />
          )}
        </div>
      </div>

      <div className="flex align-items-center flex-shrink-0 gap-2">
        {!hideSave && (
          <Button
            className="px-3 py-2"
            label="Save"
            loading={isSavingResult}
            onClick={() => setShowSaveDialog(true)}
          />
        )}

        <Button
          className="px-3 py-2"
          label="Email"
          onClick={() => showPatientInfoDialog("export")}
        />

        <Button
          className="px-3 py-2"
          label="Export"
          onClick={() => showPatientInfoDialog("download")}
        />
      </div>

      <Toast ref={toastRef} position="top-right" />

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

      <SaveDialog
        defaultValue={
          isCustom ? "Custom Combinations" : "All-on-X Ordering Guide"
        }
        visible={showSaveDialog}
        onClose={handleCloseSaveDialog}
      />
    </div>
  );
};

export default PDFExport;
