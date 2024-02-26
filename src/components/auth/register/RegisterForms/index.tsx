import cx from "classnames";
import React, { useEffect, useState } from "react";

import { usePostRegisterUserMutation } from "@/redux/hooks/apiHooks";

import RegisterComplete from "./Complete";
import { registerForm, RegisterForm } from "./constants";
import RegisterError from "./Error";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";

const RegisterFormComponent: React.FC = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const [registerValues, setRegisterValues] =
    useState<RegisterForm>(registerForm);
  const [postRegisterUser, { isLoading, isSuccess, isError }] =
    usePostRegisterUserMutation();

  const onSubmit = (data: any) => {
    const payload = { ...registerValues, ...data };
    payload.email = payload.email.toLowerCase();

    if (formStep === 0) {
      setFormStep(1);
      setRegisterValues(payload);
    }

    if (formStep === 1) {
      setRegisterValues(payload);
      postRegisterUser(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormStep(2);
    }

    if (isError) {
      setFormStep(3);
    }
  }, [isSuccess, isError]);

  return (
    <div className="h-full grid p-0 m-0 justify-content-center">
      <div className={cx("col-11 md:col-8 mt-8", { hidden: formStep !== 0 })}>
        <FirstForm onSubmit={onSubmit} />
      </div>

      <div className={cx("col-11 md:col-8 mt-8", { hidden: formStep !== 1 })}>
        <SecondForm
          onSubmit={onSubmit}
          back={() => setFormStep(0)}
          isSubmitting={isLoading}
        />
      </div>

      <div className={cx("col-11 md:col-8 mt-8", { hidden: formStep !== 2 })}>
        <RegisterComplete />
      </div>

      <div className={cx("col-11 md:col-8 mt-8", { hidden: formStep !== 3 })}>
        <RegisterError />
      </div>
    </div>
  );
};

export default RegisterFormComponent;
