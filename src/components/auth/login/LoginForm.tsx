"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { REDIRECT_TO_AUTH } from "@/constants/routes";
import { setCookie } from "@/helpers/cookie";

const cx = classNames.bind({});

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const errorMsgs = useRef(null);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    if (remembered) {
      setValue("email", localStorage.getItem("username") || "");
      setRememberMe(remembered);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const defaultValues: FormValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name: string) => {
    type ErrorType = { [key: string]: { message: string } };

    return (errors as ErrorType)[name] ? (
      <small className="p-error">{(errors as ErrorType)[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const onSubmit = async (d: FormValues) => {
    try {
      setLoading(true);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("username", getValues("email"));
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("username");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: d.email.toLowerCase(),
            password: d.password,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCookie("appToken", data.token);
      setCookie("email", data.user.email);
      setCookie("name", `${data.user.firstName} ${data.user.lastName}`);

      dispatch({ type: "auth/setAuth", payload: { authenticated: true } });

      setLoading(false);
      router.push(REDIRECT_TO_AUTH);
    } catch (error: any) {
      addError(error?.message ?? "");

      setLoading(false);
      return null;
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

      <form className="w-full md:w-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={cx({ "p-error": errors[field.name] })}
                />

                <span className="p-float-label">
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={cx(
                      { "p-invalid": fieldState.error },
                      "w-full bg-beige"
                    )}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label className="bg-beige" htmlFor={field.name}>
                    Email
                  </label>
                </span>

                {getFormErrorMessage(field.name)}
              </>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field, fieldState }) => (
              <>
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
                    className={cx(
                      { "p-invalid": fieldState.error },
                      "w-full bg-beige"
                    )}
                    {...field}
                  />

                  <label className="bg-beige" htmlFor={field.name}>
                    Password
                  </label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
        </div>

        <div className="flex align-items-center justify-content-between mb-6 mt-2">
          <div className="flex align-items-center">
            <Checkbox
              id="rememberme"
              onChange={(e) => setRememberMe(e.checked || false)}
              checked={rememberMe}
              className="mr-2"
            />
            <label htmlFor="rememberme">Remember me</label>
          </div>

          <span className="font-medium no-underline ml-2 text-dark-green text-right cursor-pointer">
            <Link
              className="text-dark-green no-underline"
              href="/forgot-password"
            >
              Forgot your password?
            </Link>
          </span>
        </div>

        <div className="flex w-full justify-content-center">
          <Button
            disabled={loading}
            type="submit"
            icon={loading ? "pi pi-spin pi-spinner" : undefined}
            label="Sign In"
            className="p-button-rounded bg-secondary w-full"
          />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
