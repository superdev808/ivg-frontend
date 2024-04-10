import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";

import { getCookie } from "@/helpers/cookie";
import { FeedbackDialogWrapperProps } from "./FeedbackDialogWrapper";
import { InputOutputValues } from "@/types/calculators";

export interface FeedbackUserTrackingProps {
  calculatorName?: string;
  userAnswers?: (InputOutputValues & { answer: string; })[];
}

interface FeedbackDialogProps extends FeedbackUserTrackingProps {
  visible: boolean;
  setVisible: (_: boolean) => void;
}

const feedbackCategories = [
  { id: "missingData", label: "Missing Data" },
  { id: "incorrectInformation", label: "Incorrect Information" },
  { id: "calculatorBug", label: "Calculator Bug" },
  { id: "exportBug", label: "Export Bug" },
];

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  visible,
  setVisible,
  calculatorName,
  userAnswers,
}) => {
  const [feedbackCategory, setFeedbackCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fileContent, setFileContent] = useState<any>({
    fileName: null,
    content: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const name = getCookie("name");
  const email = getCookie("email");
  const toastRef = useRef(null);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onUploadSelect = async (event: any) => {
    // convert file to base64 encoded
    const file = event.files[0];
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    setFileContent({ fileName: file.name, content: blob });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (fileContent.content) {
      formData.append("attachment", fileContent.content, "feedback-screenshot");
      formData.append("fileName", fileContent.fileName);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("feedbackCategory", feedbackCategory);
    formData.append("message", message);
    formData.append("timestamp", new Date().toString());
    formData.append("calculatorName", calculatorName || "");
    formData.append("userAnswers", JSON.stringify(userAnswers?.map(({ colName, colText, answer }) => ({ colName, colText, answer })) || []));

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendCalculatorFeedback`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        response.json().then((res: any) => {
          setLoading(false);
          (toastRef.current as any).show({
            severity: "error",
            summary: res.status,
            detail: res.message,
            life: 5000,
          });
        });
      } else {
        const { data, status } = await response.json();
        setLoading(false);
        (toastRef.current as any).show({
          severity: "success",
          summary: status,
          detail: data,
          life: 5000,
        });
      }
    } catch (ex) {
      console.log(">>>", ex);
    }
  };

  const footerContent = (
    <div className="flex justify-content-center">
      <FileUpload
        mode="basic"
        accept="image/*"
        onSelect={onUploadSelect}
        chooseLabel="Add Screenshot"
        disabled={loading}
      />

      <Button
        label={loading ? "Submitting" : "Send Feedback"}
        onClick={handleSubmit}
        autoFocus
        disabled={!message || !feedbackCategory || loading}
        className="ml-3"
      />
    </div>
  );

  return (
    <>
      <Dialog
        header="Help us improve!"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        footer={footerContent}
      >
        <h4>Feedback Category (Choose One)*</h4>

        <div className="grid">
          {feedbackCategories.map(({ id, label }) => (
            <div className="col-6" key={id}>
              <RadioButton
                inputId={id}
                name={id}
                value={label}
                onChange={(e) => setFeedbackCategory(e.value)}
                checked={feedbackCategory === label}
              />
              <label htmlFor={id} className="ml-2">
                {label}
              </label>
            </div>
          ))}

          <div className="col-12 mt-2">
            <label htmlFor="message">Message *</label>
            <span className="p-float-label w-full mt-2">
              <InputTextarea
                id="message"
                rows={4}
                cols={30}
                className="w-full"
                onChange={handleMessageChange}
                value={message}
              />
            </span>
          </div>
        </div>
      </Dialog>

      <Toast ref={toastRef} position="top-right" />
    </>
  );
};

export default FeedbackDialog;
