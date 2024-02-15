import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";
import { getCookie } from "@/helpers/cookie";

interface HelpfulFeedbackDialogProps {
  calculatorName: string;
  visible: boolean;
  setVisible: (_: boolean) => void;
}

const feedbackCategories = [
  { id: "missingData", label: "Missing Data" },
  { id: "incorrectInformation", label: "Incorrect Information" },
  { id: "calculatorBug", label: "Calculator Bug" },
  { id: "exportBug", label: "Export Bug" },
  { id: "difficultToUse", label: "Difficult to use" },
  { id: "Other", label: "Other" },
];

const HelpfulFeedbackDialog: React.FC<HelpfulFeedbackDialogProps> = ({
  calculatorName,
  visible,
  setVisible,
}) => {
  const [feedbackCategory, setFeedbackCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const name = getCookie("name");
  const email = getCookie("email");
  const toastRef = useRef(null);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = {
      calculatorName,
      name,
      email,
      feedbackCategory,
      message,
      timestamp: new Date().toString()
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/sendHelpfulFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
      <Button
        label={loading ? "Submitting" : "Send Feedback"}
        onClick={handleSubmit}
        autoFocus
        disabled={!feedbackCategory || (feedbackCategory === "Other" && !message) || loading}
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
            <div className="col-6" key={`helpful-${id}`}>
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
          {feedbackCategory === "Other" && (
            <div className="col-12 mt-2">
              <span className="p-float-label w-full mt-2">
                <InputTextarea
                  id={"message"}
                  rows={4}
                  cols={30}
                  className={"w-full"}
                  onChange={handleMessageChange}
                  value={message}
                  placeholder="If Other, specify here"
                />
              </span>
            </div>
          )}
        </div>
      </Dialog>
      <Toast ref={toastRef} position="top-right" />
    </>
  );
};

export default HelpfulFeedbackDialog;
