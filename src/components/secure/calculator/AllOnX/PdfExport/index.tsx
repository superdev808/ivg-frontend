// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

import PatientInfo from "@/components/shared/PatientInfo";
import { Patient, SiteData, TotalQuantities } from "@/types/calculators";

import PdfContent, { Site } from "./PdfContent";

interface PDFExportProps {
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
  calculatorName: string;
  showTeethSelection: boolean;
  totalQuantities: TotalQuantities[];
}

const PDFExport: React.FC<PDFExportProps> = ({
  responseOrder,
  selectedSites,
  sitesData,
  calculatorName,
  showTeethSelection,
  totalQuantities,
}) => {
  const contentRef = useRef(null);
  const toastRef = useRef(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const filename: string = patientInfo?.filename || `${calculatorName}-Summary`;

  const exportAndSendPDF = async (info: Patient) => {
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

  const handleSubmit = (data: Patient) => {
    setVisible(false);

    const newPatientInfo = { ...patientInfo, ...data, date: new Date() };

    setPatientInfo(newPatientInfo);
    exportAndSendPDF(newPatientInfo);
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
    <div className="relative flex justify-content-end my-3">
      <div className="hidden">
        <div ref={contentRef}>
          {patientInfo && (
            <PdfContent
              selectedSites={selectedSites}
              sitesData={sitesData}
              responseOrder={responseOrder}
              calculatorName={calculatorName}
              patientInfo={patientInfo}
              showTeethSelection={showTeethSelection}
              totalQuantities={totalQuantities}
            />
          )}
        </div>
      </div>

      <div className="flex align-items-center flex-shrink-0 gap-2">
        <Button
          className="px-3 py-2"
          label="Save"
          onClick={() => showPatientInfoDialog("save")}
        />

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
    </div>
  );
};

export default PDFExport;
