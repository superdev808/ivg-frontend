import classNames from "classnames/bind";
// @ts-ignore
import html2pdf from "html2pdf.js";
import omit from "lodash/omit";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { useRef, useState } from "react";

import { getCookie } from "@/helpers/cookie";
import { isUrl } from "@/helpers/util";
import {
  useGetUserInfoQuery,
  useSaveResultMutation,
} from "@/redux/hooks/apiHooks";

import styles from "./slide.module.scss";

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

interface SlideProps {
  calculatorName: string;
  itemInfo: Record<string, string>;
  quiz: Record<string, string>;
}

const Slide: React.FC<SlideProps> = ({ calculatorName, itemInfo, quiz }) => {
  const { refetch } = useGetUserInfoQuery({});
  const [saveResult, { isLoading: isSavingResult }] = useSaveResultMutation();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

  const contentRef = useRef(null);
  const toastRef = useRef(null);

  const itemName = trim(itemInfo["Item Name"] || itemInfo["Drill Kit Name"]);
  const itemImage = trim(itemInfo["Item Image"]);
  const purchaseLink = trim(
    itemInfo["Link to Purchase"] || itemInfo["Drill Kit Link to Purchase"]
  );

  const details = omit(itemInfo, [
    "Item Name",
    "Item Image",
    "Link to Purchase",
    "Drill Kit Name",
    "Drill Kit Link to Purchase",
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
      formData.append("calculatorName", calculatorName);
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
      mainInfo: {
        "Item Name": itemName,
        "Item Image": itemImage,
        "Link to Purchase": purchaseLink,
      },
      quiz,
      details,
      calculatorName,
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
      <div className="w-12 lg:w-10 xl:w-7">
        <div
          ref={contentRef}
          className="w-full align-items-start gap-4 md:flex"
        >
          <div className="flex-1">
            {itemName && <h1 className="m-0">{itemName}</h1>}
            {isPreparingPDF && purchaseLink && (
              <div className="mt-4">
                <a href={purchaseLink}>{purchaseLink}</a>
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

            {!isPreparingPDF && (
              <div className="flex flex-wrap gap-2 w-full mt-6 justify-content-center">
                <>
                  <Button
                    label="Email"
                    className="px-3"
                    disabled={isSendingEmail}
                    onClick={handleSendEmail}
                  />
                  <Button
                    label="Export"
                    className="px-3"
                    disabled={isExporting}
                    onClick={handleExport}
                  />
                  <Button
                    label="Save"
                    className="px-3"
                    loading={isSavingResult}
                    onClick={handleSave}
                  />
                </>
                {purchaseLink && (
                  <Link href={purchaseLink} target="_blank">
                    <Button
                      label="Click to Purchase"
                      rel="noopener noreferrer"
                      className="px-3"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
