import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import trim from "lodash/trim";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

import { getCookie } from "@/helpers/cookie";
import { formatDate, isUrl } from "@/helpers/util";

import styles from "./SavedResultDetail.module.scss";

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

type SavedResult = {
  mainInfo: Record<string, string>;
  quiz: Record<string, string>;
  details: Record<string, string>;
  id: string;
  date: string;
  calculatorName: string;
};

interface SavedResultsListProps {
  savedResult: SavedResult;
  isDeleting: boolean;
  toastRef: any;
  onDelete: () => void;
}

const SavedResultDetail: React.FC<SavedResultsListProps> = ({
  savedResult,
  isDeleting,
  toastRef,
  onDelete,
}) => {
  const router = useRouter();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

  const contentRef = useRef(null);

  const { calculatorName, mainInfo, quiz, details, date } = savedResult;
  const itemName = mainInfo["Item Name"];
  const itemImage =
    mainInfo["Item Image"] ||
    "https://ivoryguide.s3.us-west-1.amazonaws.com/images/brands/Alpha+Bio+Tec.png";
  const purchaseLink = mainInfo["Link to Purchase"];

  const handleGoBack = () => {
    router.push("/settings/saved-results");
  };

  const handleShowDeleteConfirm = () => {
    if (isDeleting) {
      return;
    }

    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: onDelete,
    });
  };

  const handleExport = async () => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    setIsExporting(true);

    try {
      const pdfInstance = html2pdf(element, PDF_EXPORT_OPTIONS);
      await pdfInstance.output();
      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: "Downloaded PDF successfully.",
        life: 5000,
      });
    } catch {
      toastRef.current.show({
        severity: "error",
        summary: "Eror",
        detail: "Failed to download PDF.",
        life: 5000,
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
      formData.append("calculatorName", calculatorName);
      formData.append("filename", PDF_EXPORT_OPTIONS.filename);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendCalculatorSummary`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Sent email successfully.",
          life: 3000,
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch {
      toastRef.current.show({
        severity: "error",
        summary: "Eror",
        detail: "Failed to send email.",
        life: 5000,
      });
    }

    setIsSendingEmail(false);
  };

  const isPreparingPDF = isExporting || isSendingEmail;

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <div className="w-12 lg-w-10 xl:w-7 pt-4">
        <ConfirmDialog />
        <div className="border-bottom-2 border-green-800 flex align-items-center justify-content-between mb-4">
          <Button
            icon="pi pi-arrow-left"
            disabled={isDeleting}
            onClick={handleGoBack}
          />

          <h2>{calculatorName} Calculator</h2>

          <div className="flex align-items-center gap-2">
            Saved Date: {formatDate(date)}{" "}
            <Button
              icon="pi pi-trash"
              size="small"
              loading={isDeleting}
              onClick={handleShowDeleteConfirm}
            />
          </div>
        </div>

        <div className="gap-4 md:flex" ref={contentRef}>
          <div className="flex-1">
            <h1 className="m-0">{itemName}</h1>

            {isPreparingPDF && purchaseLink && (
              <div className="mt-4">
                <a href={purchaseLink}>{purchaseLink}</a>
              </div>
            )}

            {!isPreparingPDF && (
              <div className="flex gap-2 mt-4">
                <Button
                  label="Email"
                  size="small"
                  disabled={isDeleting}
                  onClick={handleSendEmail}
                />
                <Button
                  label="Export"
                  size="small"
                  disabled={isDeleting}
                  onClick={handleExport}
                />
              </div>
            )}

            {itemImage && (
              <div className="mt-4">
                <Image src={itemImage} alt={itemName} width="200px" />
              </div>
            )}
          </div>

          <div className="flex flex-column align-items-center lg:align-items-end">
            <div
              className={cx(
                "bg-white flex flex-column gap-3 shadow-6 p-4 mt-4 border-2 border-green-800 md:mt-0",
                "answers"
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

            {Object.keys(details).length > 0 && (
              <div
                className={cx(
                  "bg-white flex flex-column gap-3 p-4 mt-6 border-2 border-green-800",
                  "details"
                )}
              >
                {Object.keys(details).map((text) => {
                  const value = trim(details[text]);

                  return (
                    <div key={text} className="flex align-items-center gap-4">
                      <div className="text-left" style={{ maxWidth: "50%" }}>
                        {text}
                      </div>
                      <div className="flex-1 text-right">
                        {isUrl(value) ? (
                          <Link
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ wordBreak: "break-word" }}
                          >
                            <Button
                              className="px-0"
                              link
                              label="Click to Purchase"
                            />
                          </Link>
                        ) : (
                          value
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {purchaseLink && !isPreparingPDF && (
              <div className="flex mt-6 justify-content-center">
                <Link href={purchaseLink} target="_blank">
                  <Button
                    disabled={isDeleting}
                    label="Click to Purchase"
                    rel="noopener noreferrer"
                    className="px-3"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedResultDetail;
