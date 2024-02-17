import flattenDeep from "lodash/flattenDeep";
import omit from "lodash/omit";
import values from "lodash/values";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { getCookie } from "@/helpers/cookie";

export interface Patient {
  date?: Date | null;
  name: string;
  address: string;
  filename: string;
  actionType?: string;
  recipientsList: string;
}

interface FormValues {
  name: string;
  address: string;
  filename: string;
  recipientsList: string;
  Dentist: string[];
  "Office Staff": string[];
  Patient: string[];
}

interface Recipient {
  name: string;
  key: string;
  hasInput: boolean;
}

interface RecipientEmail {
  [key: string]: string[];
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
    recipientsList: "",
    Dentist: [],
    "Office Staff": [],
    Patient: [],
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const [recipientEmails, setRecipientEmails] = useState<RecipientEmail>({});
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    const emails = flattenDeep(values(recipientEmails)).join("|");

    setValue("recipientsList", emails);

    if (emails) {
      clearErrors("recipientsList");
    }
  }, [recipientEmails, setValue, clearErrors]);

  const recipients: Recipient[] = [
    { name: "Myself", key: "Myself", hasInput: false },
    { name: "Dentist", key: "Dentist", hasInput: true },
    { name: "Office Staff", key: "Office Staff", hasInput: true },
    { name: "Patient", key: "Patient", hasInput: true },
  ];

  const onRecipientsChange = (e: CheckboxChangeEvent) => {
    const { value: recipient } = e;

    if (e.checked) {
      setSelectedRecipients((prevState) => [...prevState, recipient]);

      if (recipient.key === "Myself") {
        const loggedInUserEmail = getCookie("email") || "";
        handleRecipientEmailChange([loggedInUserEmail], "Myself");
      }
    } else {
      setValue(recipient.key as any, []);
      setRecipientEmails(omit(recipientEmails, [recipient.key]));
      setSelectedRecipients((prevState) =>
        prevState.filter((item) => item.key !== recipient.key)
      );
    }
  };

  const handleRecipientEmailChange = (
    emails: string[],
    recipientType: string
  ) => {
    setRecipientEmails((prevState) => ({
      ...prevState,
      [recipientType]: emails,
    }));
  };

  const getFormErrorMessage = (name: string) => {
    type Errors = { [key: string]: { message: string } };

    return (errors as Errors)[name] ? (
      <small className="p-error">{(errors as Errors)[name].message}</small>
    ) : null;
  };

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

      {info?.actionType === "export" && (
        <div className="mb-3">
          <p>Who are you sending this to?</p>

          <div className="flex flex-column">
            {recipients.map((recipient: Recipient) => {
              const isChecked: boolean = selectedRecipients.some(
                (item: Recipient) => item.key === recipient.key
              );

              return (
                <React.Fragment key={recipient.key}>
                  <div className="flex align-items-center pb-3">
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
                    <div className="mb-3">
                      <Controller
                        name={recipient.key as any}
                        control={control}
                        rules={{
                          required: "Please enter email address.",
                          validate: (value: string[]) =>
                            value.every((email) =>
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                            ) || "Please enter valid email addresses",
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <Chips
                              addOnBlur
                              separator=","
                              id={field.name}
                              name={recipient.key}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                                handleRecipientEmailChange(
                                  e.value || [],
                                  recipient.key
                                );
                              }}
                              className={fieldState.error ? "p-invalid" : ""}
                            />
                            {getFormErrorMessage(recipient.key)}
                          </>
                        )}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <InputText
            hidden
            id="recipientsList"
            {...register("recipientsList", {
              required: true,
              validate: (value) => !!value.trim(),
            })}
            className={errors.recipientsList ? "p-invalid" : ""}
          />

          {errors.recipientsList && (
            <small className="p-error">
              Please provide atleast one recipient.
            </small>
          )}
        </div>
      )}

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default PatientInfo;
