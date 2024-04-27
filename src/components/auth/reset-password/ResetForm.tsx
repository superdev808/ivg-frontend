"use client";

import { useState, useRef } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { Controller, useForm } from "react-hook-form";

import { Messages } from "primereact/messages";
import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { usePostResetPasswordMutation } from "@/redux/hooks/apiHooks";

import classNames from "classnames/bind";

const cx = classNames.bind({});

type FormValues = {
  password: string;
  confirm: string;
};

interface ResetFormProps {
  token: string | null;
  setSuccess: (_: boolean) => void;
}

const ResetForm: React.FC<ResetFormProps> = ({ token, setSuccess }) => {
  const [postResetPassword, { isLoading }] = usePostResetPasswordMutation();
  const errorMsgs = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: FormValues = {
    password: "",
    confirm: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ defaultValues });

  const password = watch("password");

  const handlePasswordUpdate = async (data: FormValues) => {
    try {
      await postResetPassword({ token: token || "", password: data.password });
      setSuccess(true);
    } catch (error: any) {
      addError(error.data.message);
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
      <div className="w-25rem my-4">{<Messages ref={errorMsgs} />}</div>

      <form
        className="w-full md:w-4"
        onSubmit={handleSubmit(handlePasswordUpdate)}
      >
        <div className="mb-2">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, including at least 1 letter, 1 number, and 1 special character",
              },
            }}
            render={({ field, fieldState }) => (
              <div className="mb-4">
                <label
                  htmlFor={field.name}
                  className={cx({ "p-error": errors[field.name] })}
                />
                <span className="p-float-label p-input-icon-right w-full">
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={cx(
                      { "pi pi-eye": !showPassword },
                      { "pi pi-eye-slash": showPassword }
                    )}
                  />

                  <InputText
                    type={!showPassword ? "password" : "text"}
                    id={field.name}
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                    {...field}
                  />
                  <label className="bg-beige" htmlFor={field.name}>
                    Password
                  </label>
                </span>
                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />
        </div>
        <div className="mb-4">
          <Controller
            name="confirm"
            control={control}
            rules={{
              required: "Confirm your password.",
              validate: (value) =>
                value === password || "The passwords do not match",
            }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={cx({ "p-error": errors[field.name] })}
                />
                <span className="p-float-label">
                  <InputText
                    type={!showPassword ? "password" : "text"}
                    id={field.name}
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                    {...field}
                  />
                  <label className="bg-beige" htmlFor={field.name}>
                    Confirm Password
                  </label>
                </span>
                {FormErrorMessage({ message: errors[field.name]?.message })}
              </>
            )}
          />
        </div>

        <div className="flex w-full justify-content-center">
          <Button
            disabled={isLoading}
            type="submit"
            icon={isLoading ? "pi pi-spin pi-spinner" : ""}
            label="Reset"
            className="p-button-rounded bg-secondary w-full"
          />
        </div>
      </form>
    </>
  );
};
export default ResetForm;
