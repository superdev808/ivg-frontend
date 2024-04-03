import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { usePostSubmitContactFormMutation } from "@/redux/hooks/apiHooks";
import { Response } from "@/types/ApiResponseTypes";
import { ContactForm } from "@/types/PublicTypes";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

interface Practice {
  label: string;
  value: string;
}

export const ContactComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<
    "sending" | "sent" | "error" | ""
  >("");

  const [postSubmitContactForm] = usePostSubmitContactFormMutation();

  const practices: Practice[] = [
    { label: "Dental Practice", value: "Dental Practice" },
    { label: "Dental Laboratory", value: "Dental Laboratory" },
    { label: "Dental School", value: "Dental School" },
    { label: "Dental Student", value: "Dental Student" },
    { label: "Supplier", value: "Supplier" },
    { label: "Other", value: "other" },
  ];
  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    zip: "",
    role: "",
    message: "",
    token: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm({ defaultValues });

  const currentRole = watch("role", "");

  const onVerifyRecaptcha = (token: string | null) => {
    setValue("token", token || "");
    trigger("token");
  };

  const onSubmit = async () => {
    try {
      setSendStatus("sending");
      const data: ContactForm = getValues();
      const response = await postSubmitContactForm(data);

      if ((response as Response).data.status === "Success") {
        setVisible(true);
        setSendStatus("sent");
        reset();
      } else {
        setSendStatus("error");
      }
    } catch (error) {
      setSendStatus("error");
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSendStatus("");
  };

  const emailPattern = {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Invalid email address",
  };

  return (
    <>
      <div className="flex justify-content-center">
        <div style={{ maxWidth: 900 }}>
          <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid justify-content-between mb-3">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6 pr-2">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors.name })}
                    />

                    <span className="p-float-label w-full mb-2">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={cx(
                          { "p-invalid": fieldState.error },
                          "w-full"
                        )}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label className="bg-beige" htmlFor={field.name}>
                        Name
                      </label>
                    </span>

                    <FormErrorMessage message={errors[field.name]?.message} />
                  </div>
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "An email is required.",
                  pattern: emailPattern,
                }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6 pl-2">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors.email })}
                    />

                    <span className="p-float-label w-full mb-2">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={cx(
                          { "p-invalid": fieldState.error },
                          "w-full"
                        )}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label className="bg-beige" htmlFor={field.name}>
                        Email
                      </label>
                    </span>

                    <FormErrorMessage message={errors[field.name]?.message} />
                  </div>
                )}
              />
            </div>

            <div className="grid justify-content-between mb-3">
              <Controller
                name="phone"
                control={control}
                rules={{ required: "A phone number is required." }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6 pr-2">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors.phone })}
                    />

                    <span className="p-float-label w-full mb-2">
                      <InputMask
                        id={field.name}
                        value={field.value}
                        mask="(999) 999-9999"
                        className={cx(
                          { "p-invalid": fieldState.error },
                          "w-full"
                        )}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label className="bg-beige" htmlFor={field.name}>
                        Phone Number
                      </label>
                    </span>

                    <FormErrorMessage message={errors[field.name]?.message} />
                  </div>
                )}
              />

              <Controller
                name="zip"
                control={control}
                rules={{ required: "Zip Code is required." }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6 pl-2">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors.zip })}
                    />

                    <span className="p-float-label w-full mb-2">
                      <InputMask
                        id={field.name}
                        value={field.value}
                        mask="99999"
                        className={cx(
                          { "p-invalid": fieldState.error },
                          "w-full"
                        )}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label className="bg-beige" htmlFor={field.name}>
                        Zip Code
                      </label>
                    </span>

                    <FormErrorMessage message={errors[field.name]?.message} />
                  </div>
                )}
              />
            </div>

            <div className="flex justify-content-center mb-3">
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required." }}
                render={({ field }) => (
                  <div className="flex flex-column px-2 align-content-center">
                    <span className="mb-3 text-light-green text-lg text-center">
                      Please choose your role.
                    </span>

                    <div className="flex flex-column flex-wrap md:flex-row">
                      {practices.map((practice, index) => (
                        <div
                          className="flex align-items-center mb-2 gap-2 text-light-green"
                          key={`practice_${index}`}
                        >
                          <RadioButton
                            inputId="`f${index}`"
                            {...field}
                            inputRef={field.ref}
                            value={practice.value}
                            checked={field.value === practice.value}
                          />
                          <label className="bg-beige mr-3" htmlFor="f5">
                            {practice.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <span className="my-2 flex justify-content-center">
                      <FormErrorMessage message={errors[field.name]?.message} />
                    </span>
                  </div>
                )}
              />
            </div>

            <div className="flex justify-content-between mb-2">
              <Controller
                name="message"
                control={control}
                rules={{
                  required:
                    currentRole === "other" ? "A message is required." : false,
                }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-column w-12 ml-2 mb-2">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors.message })}
                    />

                    <span className="p-float-label w-full">
                      <InputTextarea
                        id={field.name}
                        {...field}
                        rows={4}
                        cols={30}
                        className={cx(
                          { "p-invalid": fieldState.error },
                          "w-full"
                        )}
                      />

                      <label className="bg-beige" htmlFor={field.name}>
                        Message
                      </label>
                    </span>

                    <FormErrorMessage message={errors[field.name]?.message} />
                  </div>
                )}
              />
            </div>

            {sendStatus !== "sent" && (
              <div className="flex justify-content-center mb-4">
                <Controller
                  name="token"
                  control={control}
                  rules={{ required: "You must verify the reCAPTCHA." }}
                  render={({ field }) => (
                    <div className="flex flex-column align-items-center justify-content-center">
                      <span className="mb-2">
                        <ReCAPTCHA
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={onVerifyRecaptcha}
                        />
                      </span>

                      <FormErrorMessage message={errors[field.name]?.message} />
                    </div>
                  )}
                />
              </div>
            )}

            <div className="flex flex-column align-items-center justify-content-center">
              <Button
                type="submit"
                disabled={sendStatus === "sending" || sendStatus === "sent"}
                className={cx(
                  "btn-light-brown",
                  "xl:w-3 w-12 text-xl text-center hover:text-secondary block"
                )}
              >
                {sendStatus === "sending" ? (
                  <>
                    <i
                      className="pi pi-spin pi-spinner"
                      style={{ fontSize: "2rem", marginRight: "1rem" }}
                    />{" "}
                    <span>Sending...</span>
                  </>
                ) : sendStatus === "sent" ? (
                  "Sent!"
                ) : (
                  "Submit"
                )}
              </Button>

              {sendStatus === "error" && (
                <small className="text-dark-brown mt-2">
                  There was an error, please try again.
                </small>
              )}
            </div>
          </form>
        </div>
      </div>

      <Dialog
        showHeader={false}
        blockScroll
        draggable={false}
        visible={visible}
        modal
        onHide={handleCloseModal}
      >
        <div className="flex flex-column align-content-center text-center text-light-green p-4">
          <div className="flex justify-content-end">
            <Button
              icon="pi pi-times"
              outlined
              rounded
              onClick={handleCloseModal}
              style={{
                color: "var(--light-green)",
              }}
              className="border-0 mt-2"
            />
          </div>

          <div className="flex justify-content-center">
            <Image src="/images/common/sent.png" alt="sent" width="175" />
          </div>

          <h2>Thank you for contacting us!</h2>

          <p className="text-bold">
            <strong>
              We have received your message and will be in touch shortly.
            </strong>
          </p>
        </div>
      </Dialog>
    </>
  );
};
