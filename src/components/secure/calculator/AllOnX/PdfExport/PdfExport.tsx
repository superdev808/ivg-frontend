import React, { useRef, useState } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { getCookie } from "@/helpers/cookie";
import { Toast } from "primereact/toast";
import PdfContent, { Site } from "./PdfContent/PdfContent";
import { SiteData } from "../constants";
import { Dialog } from "primereact/dialog";
import PatientInfo from "./PatientInfo/PatientInfo";

interface PDFExportProps {
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
  calculatorName: string;
  showTeethSelection: boolean;
}

export interface Patient {
  date?: Date | null;
  name: string;
  address: string;
  filename: string;
  actionType?: string;
}
const PDFExport: React.FC<PDFExportProps> = ({
  responseOrder,
  selectedSites,
  sitesData,
  calculatorName,
  showTeethSelection,
}) => {
  const contentRef = useRef(null);
  const toastRef = useRef(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const name = getCookie("name");
  const email = getCookie("email");
  const filename: string = patientInfo?.filename || `${calculatorName}-Summary`;
  const ExportAndSendPDF = async (info: Patient) => {
    const element = contentRef.current;
    if (element) {
      try {
        const options = {
          filename: info.filename || filename,
          image: { type: "jpeg", quality: 0.9 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
          pagebreak: {
            avoid: ["table", "thead", "tr", ".greet"],
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
          });
        } else if (info.actionType === "export") {
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", options.filename);

          const formData = new FormData();
          formData.append("attachment", blob, "exported-document.pdf");
          formData.append("name", name);
          formData.append("email", email);
          formData.append("calculatorName", calculatorName);
          formData.append("filename", options.filename);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendAllOnXInfo`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            response.json().then((res: any) => {
              (toastRef.current as any).show({
                severity: "error",
                summary: res.status,
                detail: res.message,
                life: 5000,
              });
            });
            return;
          } else {
            const { data, status } = await response.json();
            (toastRef.current as any).show({
              severity: "success",
              summary: status,
              detail: data,
              life: 5000,
            });
            return;
          }
        }
        //setPatientInfo(null);
      } catch (error) {
        console.error("Error exporting to PDF or sending email:", error);
      }
    }
  };

  const handleSubmit = (data: Patient) => {
    setVisible(false);
    const info: Patient = { ...patientInfo, ...data, date: new Date() };
    setPatientInfo({ ...info });
    ExportAndSendPDF(info);
  };
  const showPatientInfoDialog = (actionType: string) => {
    const info: Patient = { filename, name: "", address: "", actionType };
    setPatientInfo(info);
    setVisible(true);
  };
  return (
    <>
      <div className="block">
        <div ref={contentRef}>
          {patientInfo && (
            <PdfContent
              selectedSites={selectedSites}
              sitesData={sitesData}
              responseOrder={responseOrder}
              calculatorName={calculatorName}
              patientInfo={patientInfo}
              showTeethSelection={showTeethSelection}
            />
          )}
        </div>
      </div>
      <div className="p-buttonset absolute pt-2 top-0 right-0">
        <Button
          onClick={() => showPatientInfoDialog("download")}
          size="small"
          tooltip="Download"
          tooltipOptions={{ position: "top" }}
          icon="pi pi-download"
        />

        <Button
          onClick={() => showPatientInfoDialog("export")}
          size="small"
          tooltip="Mail"
          tooltipOptions={{ position: "top" }}
          icon="pi pi-envelope"
        />
      </div>
      <Toast ref={toastRef} position="top-right" />
      <Dialog
        header="Patient Info"
        visible={visible}
        position={"top"}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <PatientInfo info={patientInfo} onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
};

export default PDFExport;
