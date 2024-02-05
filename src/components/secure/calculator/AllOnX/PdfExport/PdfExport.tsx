import React, { useRef, useState } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { getCookie } from "@/helpers/cookie";
import { Toast } from "primereact/toast";
import PdfContent, { Site } from "./PdfContent/PdfContent";
import { SiteData } from "../constants";

interface PDFExportProps {
  selectedSites: Site[];
  sitesData: SiteData;
  responseOrder: string[];
  isCustomReport: boolean | undefined;
}

const PDFExport: React.FC<PDFExportProps> = ({
  responseOrder,
  selectedSites,
  sitesData,
  isCustomReport,
}) => {
  const contentRef = useRef(null);
  const toastRef = useRef(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const ExportAndSendPDF = async (type: "download" | "export" = "download") => {
    const element = contentRef.current;
    if (element) {
      try {
        const name = getCookie("name");
        const email = getCookie("email");
        const calculatorType = isCustomReport ? `Custom` : `All-On-X`;
        const filename: string = `${name}-${calculatorType
        }-Summary`;
        const options = {
          filename,
          image: { type: "jpeg", quality: 0.9 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { before: ".page-break", avoid: ["table", "thead", "tr"] },
        };
        setDate(new Date());
        // Create an html2pdf instance
        if (type === "download") {
          const pdfInstance = html2pdf(element, options);
          await pdfInstance.output();
          (toastRef.current as any).show({
            severity: "success",
            summary: "Success",
            detail: "Pdf downloaded successfully.",
            life: 5000,
          });
        } else if (type === "export") {
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", filename);

          const formData = new FormData();
          formData.append("attachment", blob, "exported-document.pdf");
          formData.append("name", name);
          formData.append("email", email);
          formData.append("calculatorType", calculatorType);
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
      } catch (error) {
        console.error("Error exporting to PDF or sending email:", error);
      }
    }
  };

  return (
    <>
      <div style={{ display: "block" }}>
        <div ref={contentRef}>
          <PdfContent
            date={date}
            selectedSites={selectedSites}
            sitesData={sitesData}
            responseOrder={responseOrder}
            isCustomReport={isCustomReport}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "3px",
          right: "0",
        }}
        className="p-buttonset"
      >
        <Button
          onClick={() => ExportAndSendPDF("download")}
          size="small"
          tooltip="Download"
          tooltipOptions={{ position: "top" }}
          icon="pi pi-download"
        />

        <Button
          onClick={() => ExportAndSendPDF("export")}
          size="small"
          tooltip="Mail"
          tooltipOptions={{ position: "top" }}
          icon="pi pi-envelope"
        />
      </div>
      <Toast ref={toastRef} position="top-right" />
    </>
  );
};

export default PDFExport;
