import React, { useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";

const PDFExport: React.FC<any> = ({ pdfContent }) => {
  const contentRef = useRef(null);
  const ExportAndSendPDF = () => {
    const element = contentRef.current;
    if (element) {
      html2pdf(element, {
        margin: 10,
        filename: "exported-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).then((pdf: any) => {
        pdf.save();
      });
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
          onClick={ExportAndSendPDF}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default PDFExport;
