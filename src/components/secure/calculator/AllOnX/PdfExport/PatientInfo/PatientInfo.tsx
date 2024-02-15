import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Patient } from "../PdfExport";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { getCookie } from "@/helpers/cookie";

interface FormValues {
  name: string;
  address: string;
  filename: string;
  recipientsList: string;
}
interface Recipient { 
  name: string, 
  key: string, 
  hasInput: boolean 
}
interface RecipientEmail {
  [key: string]: string[]
}
interface PatientInfoProps {
  onSubmit: (data: FormValues) => void;
  info: Patient | null;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ info, onSubmit }) => {
  const defaultValues: FormValues = {
    name: "",
    address: "",
    filename: info?.filename || "",
    recipientsList: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const [recipientEmails, setRecipientEmails] = useState<RecipientEmail>({});
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [recipientsList, setRecipientsList] = useState<string>("");

  useEffect(() => {
    let _recipientsList: string[] = [];
    Object.values(recipientEmails).map((emails: string[]) => {
      emails.map((email: string) => _recipientsList.push(email));
    });
    setRecipientsList(_recipientsList.join('|'))
  },[recipientEmails])

  const recipients: Recipient[] = [
    { name: 'Myself', key: 'Myself', hasInput: false },
    { name: 'Dentist', key: 'Dentist', hasInput: true },
    { name: 'Office Staff', key: 'Office Staff', hasInput: true },
    { name: 'Patient', key: 'Patient', hasInput: true }
  ];

  const onRecipientsChange = (e: CheckboxChangeEvent) => {
      let _selectedRecipients: Recipient[] = [...selectedRecipients];
      const recipient: Recipient = e.value;
      if (e.checked){
        _selectedRecipients.push(recipient);
        if(recipient.key === "Myself"){
          const loggedInUserEmail = getCookie("email") || "";
          handleRecipientEmailChange([loggedInUserEmail], "Myself")
        }
      }    
      else {
        _selectedRecipients = _selectedRecipients.filter(item => item.key !== recipient.key);
        const _recipientEmails = {...recipientEmails};
        delete _recipientEmails[recipient.key]
        setRecipientEmails(_recipientEmails);
      }
      setSelectedRecipients(_selectedRecipients);    
  };

  const handleRecipientEmailChange = (emails: string[], recipientType: string) => {
    let _recipientEmails: RecipientEmail = {...recipientEmails};
    const newEmails: RecipientEmail = {[recipientType]: emails}
    _recipientEmails = {..._recipientEmails, ...newEmails}
    setRecipientEmails(_recipientEmails);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="p-field mb-3">
        <label
          htmlFor="name"
          className={
            errors.name
              ? "p-error p-float p-label-always"
              : "p-float p-label-always"
          }
        >
          Patient Name
        </label>
        <InputText
          id="name"
          maxLength={64}
          {...register("name", {
            required: true,
            validate: (value) => !!value.trim(),
          })}
          className={errors.name ? "p-invalid" : ""}
        />
        {errors.name && (
          <small className="p-error">Patient Name is required.</small>
        )}
      </div>

      <div className="p-field mb-3">
        <label
          htmlFor="address"
          className={
            errors.address
              ? "p-error p-float p-label-always"
              : "p-float p-label-always"
          }
        >
          Street Address
        </label>
        <InputText
          id="address"
          maxLength={128}
          {...register("address", {
            required: true,
            validate: (value) => !!value.trim(),
          })}
          className={errors.address ? "p-invalid" : ""}
        />
        {errors.address && (
          <small className="p-error">Street Address is required.</small>
        )}
      </div>

      <div className="p-field mb-3">
        <label
          htmlFor="filename"
          className={
            errors.filename
              ? "p-error p-float p-label-always"
              : "p-float p-label-always"
          }
        >
          File Name
        </label>
        <InputText
          id="filename"
          maxLength={64}
          {...register("filename", {
            required: true,
            validate: (value) => !!value.trim(),
          })}
          className={errors.filename ? "p-invalid" : ""}
        />
        {errors.filename && (
          <small className="p-error">File Name is required.</small>
        )}
      </div>

      <div className="mb-3">
        <p>Who are you sending this to?</p>
        <div className="flex flex-column gap-3">
          {recipients.map((recipient) => {
            const isChecked = selectedRecipients.some(
              (item) => item.key === recipient.key
            );
            return (
              <>
                <div key={recipient.key} className="flex align-items-center">
                  <Checkbox
                    inputId={recipient.key}
                    name="recipient"
                    value={recipient}
                    onChange={onRecipientsChange}
                    checked={isChecked}
                  />
                  <label htmlFor={recipient.key} className="ml-2">
                    {recipient.name}
                  </label>
                </div>
                {recipient.hasInput && isChecked && (                
                  <Chips
                    inputId={recipient.key}
                    name={recipient.key}
                    separator=","
                    value={recipientEmails[recipient.key]}
                    onChange={(e) => handleRecipientEmailChange(e.value||[], recipient.key)}
                  />
                )}
              </>
            );
          })}
        </div>  
        <InputText
          hidden
          id="recipientsList"
          value={recipientsList}
          {...register("recipientsList")}
          className={errors.recipientsList ? "p-invalid" : ""}
        />      
      </div>

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default PatientInfo;
