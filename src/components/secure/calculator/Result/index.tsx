import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import omit from "lodash/omit";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { getCookie } from "@/helpers/cookie";
import { getCalculatorName, productImages } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useSaveResultMutation,
} from "@/redux/hooks/apiHooks";

import Outputs from "./Outputs";
import { getItemName } from "./Outputs/helpers";

import styles from "./style.module.scss";

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

interface ResultProps {
  calculatorType: string;
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
}

const Result: React.FC<ResultProps> = ({ calculatorType, itemInfo, quiz }) => {
  const { refetch } = useGetUserInfoQuery({});
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const itemName = getItemName(calculatorType, itemInfo);

  const itemImage = productImages[calculatorType] || productImages["Default"];
  const purchaseLink = trim(itemInfo["Link to Purchase"]);

  const details = omit(itemInfo, [
    "Item Name",
    "Item Image",
    "Link to Purchase",
  ]);

  const handleExport = async () => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    setIsExporting(true);

    try {
      const pdfInstance = html2pdf(element, PDF_EXPORT_OPTIONS);
      await pdfInstance.output();
      (toastRef.current as any).show({
        severity: "success",
        summary: "Success",
        detail: "Downloaded PDF successfully.",
        life: 5000,
      });
    } catch {
      (toastRef.current as any).show({
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
      formData.append("calculatorType", getCalculatorName(calculatorType));
      formData.append("filename", PDF_EXPORT_OPTIONS.filename);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendCalculatorSummary`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        (toastRef.current as any).show({
          severity: "error",
          summary: "Error",
          detail: "Failed to send email.",
          life: 3000,
        });
      } else {
        (toastRef.current as any).show({
          severity: "success",
          summary: "Success",
          detail: "Sent email successfully.",
          life: 3000,
        });
      }
    } catch {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Eror",
        detail: "Failed to send email.",
        life: 5000,
      });
    }

    setIsSendingEmail(false);
  };

  const handleSave = async () => {
    const payload = {
      calculatorType,
      itemInfo,
      quiz,
    };

    try {
      await saveResult(payload).unwrap();
      refetch();

      (toastRef.current as any).show({
        severity: "success",
        summary: "Saved result",
        detail: "Go to profile page",
        life: 3000,
      });
    } catch (error) {
      (toastRef.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save result",
        life: 3000,
      });
    }
  };

  const isPreparingPDF = isExporting || isSendingEmail;

  return (
    <>
      <Toast ref={toastRef} position="top-right" />

      <div ref={contentRef} className="flex flex-column gap-4">
        <div
          className={`flex flex-column gap-4 justify-content-between
          lg:flex-row lg:align-items-center`}
        >
          <div>{itemName && <h1 className="m-0">{itemName}</h1>}</div>

          {!isPreparingPDF && (
            <div className="flex align-items-center flex-shrink-0 gap-2">
              <Button
                className="px-3 py-2"
                label="Email"
                disabled={isSendingEmail}
                onClick={handleSendEmail}
              />
              <Button
                className="px-3 py-2"
                label="Export"
                disabled={isExporting}
                onClick={handleExport}
              />
              <Button
                className="px-3 py-2"
                label="Save"
                loading={isSavingResult}
                onClick={handleSave}
              />
            </div>
          )}
        </div>

        <div className="flex justify-content-between gap-4 flex-column lg:flex-row">
          {itemImage && (
            <div className="flex-1 overflow-hidden">
              <Image src={itemImage} alt={itemName} imageClassName="w-full" />
            </div>
          )}

          <div
            className={cx(
              "bg-white flex flex-column gap-3 shadow-6 p-4 border-round-md h-fit",
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
    </>
  );
};

export default Result;
