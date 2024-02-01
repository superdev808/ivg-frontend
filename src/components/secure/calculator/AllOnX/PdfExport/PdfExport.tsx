import React, { useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { getCookie } from "@/helpers/cookie";
import { Toast } from "primereact/toast";

const PDFExport: React.FC<any> = ({ children }) => {
  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const ExportAndSendPDF = async (type: "download" | "export" = "download") => {
    const element = contentRef.current;
    if (element) {
      try {
        const options = {
          filename: "exported-document.pdf",
          image: { type: "jpeg", quality: 0.9 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { before: ".page-break", avoid: ["table", "thead", "tr"] },
        };
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
          const name = getCookie("name");
          const email = getCookie("email");
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", "my-invoice.pdf");

          const formData = new FormData();
          formData.append("attachment", blob, "exported-document.pdf");
          formData.append("name", name);
          formData.append("email", email);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendAllOnXInfo`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (toastRef.current) {
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
        }
      } catch (error) {
        console.error("Error exporting to PDF or sending email:", error);
      }
    }
  };

  return (
    <>
      <div style={{ display: "block" }}>
        <div ref={contentRef}>{children}</div>
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
