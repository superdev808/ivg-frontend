import React, { useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";

const PDFExport: React.FC<any> = ({ pdfContent }) => {
  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const ExportAndSendPDF = async (type: "download" | "export" = "download") => {
    const element = contentRef.current;
    if (element) {
      try {
        const options = {
          margin: 10,
          filename: "exported-document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };
        // Create an html2pdf instance
        if (type === "download") {
          const pdfInstance = html2pdf(element, options);
          await pdfInstance.output('blob');
        } else if (type === "export") {
          const blob = await html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob", "my-invoice.pdf");

          const formData = new FormData();
          formData.append("attachment", blob, "exported-document.pdf");

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendAllOnXInfo`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok && toastRef.current) {
            response.json().then((res: any) => {
              (toastRef.current as any).show({
                severity: "error",
                summary: res.status,
                detail: res.message,
                life: 5000,
              });
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
      <div ref={contentRef}>{pdfContent}</div>
      <div
        style={{
          width: "21vh",
          padding: "8px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          style={{
            background: "#3490dc",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => ExportAndSendPDF("export")}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default PDFExport;
