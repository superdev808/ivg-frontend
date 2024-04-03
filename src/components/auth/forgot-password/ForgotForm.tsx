"use client";

import { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

import { Controller, useForm } from "react-hook-form";
import { Messages } from "primereact/messages";
import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { usePostRequestPasswordResetMutation } from "@/redux/hooks/apiHooks";

type FormValues = {
  email: string;
};
export default function ForgotForm({
  setRequestedEmail,
}: {
  setRequestedEmail: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [postRequestPasswordReset, { isLoading }] =
    usePostRequestPasswordResetMutation();

  const errorMsgs = useRef(null);

  const defaultValues: FormValues = {
    email: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const handleSend = async (data: FormValues) => {
    try {
      await postRequestPasswordReset(data).unwrap();
      setRequestedEmail(data.email);
    } catch (error: any) {
      addError(error.data.message || "Something went wrong.");
    }
  };

  const addError = (error: string) => {
    (errorMsgs.current as any).show([
      {
        severity: "error",
        detail: error,
        sticky: false,
        closable: true,
        unstyled: true,
      },
    ]);
  };
  return (
    <>
      <div className="w-25rem my-4">
        <Messages ref={errorMsgs} />
      </div>

      <form className="w-full md:w-4" onSubmit={handleSubmit(handleSend)}>
        <div className="mb-3">
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors[field.name] })}
                />
                <span className="p-float-label">
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "w-full"
                    )}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Email</label>
                </span>
                <FormErrorMessage message={errors[field.name]?.message} />
              </>
            )}
          />
        </div>

        <div className="flex w-full justify-content-center">
          <Button
            disabled={isLoading}
            type="submit"
            icon={isLoading ? "pi pi-spin pi-spinner" : ""}
            label="Send"
            className="p-button-rounded bg-secondary w-full"
          />
        </div>
      </form>
    </>
  );
}
