import cx from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { CALCULATORS } from "@/helpers/util";
import { useUploadCalculatorDataMutation } from "@/redux/hooks/apiHooks";

const validateGSheetLink = (value: string) => {
  const regExp = new RegExp(
    /https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*?)/g
  );

  if (!regExp.test(value)) {
    return "Please provide valid Google Sheet Link.";
  }
};

interface FormValues {
  isExisting: boolean;
  calculatorId: string;
  calculatorLabel: string;
  gSheetLink: string;
}

interface AdminUploadDataFormProps {}

const AdminUploadDataForm: React.FC<AdminUploadDataFormProps> = ({}) => {
  const [uploadCalculatorData, { isLoading }] =
    useUploadCalculatorDataMutation();

  const toastRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      isExisting: true,
      calculatorId: "",
      calculatorLabel: "",
      gSheetLink: "",
    },
  });

  const isExisting = watch("isExisting");

  useEffect(() => {
    resetField("calculatorId");
    resetField("calculatorLabel");
    resetField("gSheetLink");
  }, [resetField, isExisting]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      calculatorId: data.calculatorId,
      calculatorLabel:
        data.calculatorLabel ||
        CALCULATORS.find((elem) => elem.id === data.calculatorId)?.label,
      gSheetLink: data.gSheetLink,
    };

    try {
      await uploadCalculatorData(payload).unwrap();
      reset();

      (toastRef?.current as any)?.show({
        severity: "success",
        summary: "Success",
        detail: "Uploaded data successfully.",
        life: 5000,
      });
    } catch {
      (toastRef?.current as any)?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to upload data.",
        life: 5000,
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <Controller
            name="isExisting"
            control={control}
            render={({ field, fieldState }) => (
              <div className="col-12">
                <div className="flex align-items-center gap-4">
                  <label htmlFor={field.name}>Is existing calculator?</label>

                  <InputSwitch
                    id={field.name}
                    checked={field.value}
                    disabled={isLoading}
                    className={cx({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.value)}
                  />
                </div>
              </div>
            )}
          />

          {isExisting ? (
            <Controller
              name="calculatorId"
              control={control}
              rules={{ required: "Please select Calculator." }}
              render={({ field, fieldState }) => (
                <div className="col-12 md:col-6">
                  <span className="p-float-label w-full">
                    <Dropdown
                      {...field}
                      disabled={isLoading}
                      options={CALCULATORS}
                      optionLabel="label"
                      optionValue="id"
                      className={cx(
                        { "p-invalid": fieldState.error },
                        "w-full"
                      )}
                    />

                    <label htmlFor={field.name}>Calculator</label>
                  </span>

                  {FormErrorMessage({ message: errors[field.name]?.message })}
                </div>
              )}
            />
          ) : (
            <>
              <Controller
                name="calculatorId"
                control={control}
                rules={{ required: "Please provide Calculator Id." }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6">
                    <span className="p-float-label w-full">
                      <InputText
                        id={field.name}
                        value={field.value}
                        disabled={isLoading}
                        className={cx([
                          { "p-invalid": fieldState.error },
                          "w-full",
                        ])}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label htmlFor={field.name}>Calculator Id</label>
                    </span>

                    {FormErrorMessage({ message: errors[field.name]?.message })}
                  </div>
                )}
              />

              <Controller
                name="calculatorLabel"
                control={control}
                rules={{ required: "Please provide Calculator Label." }}
                render={({ field, fieldState }) => (
                  <div className="col-12 md:col-6">
                    <span className="p-float-label w-full">
                      <InputText
                        id={field.name}
                        value={field.value}
                        disabled={isLoading}
                        className={cx([
                          { "p-invalid": fieldState.error },
                          "w-full",
                        ])}
                        onChange={(e) => field.onChange(e.target.value)}
                      />

                      <label htmlFor={field.name}>Calculator Label</label>
                    </span>

                    {FormErrorMessage({ message: errors[field.name]?.message })}
                  </div>
                )}
              />
            </>
          )}

          <Controller
            name="gSheetLink"
            control={control}
            rules={{
              required: "Please provide Google Sheet Link.",
              validate: validateGSheetLink,
            }}
            render={({ field, fieldState }) => (
              <div className="col-12 md:col-6">
                <label
                  htmlFor={field.name}
                  className={cx({ "p-error": errors[field.name] })}
                />

                <span className="p-float-label w-full">
                  <InputText
                    id={field.name}
                    value={field.value}
                    disabled={isLoading}
                    className={cx([
                      { "p-invalid": fieldState.error },
                      "w-full",
                    ])}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  <label htmlFor={field.name}>Google Sheet Link</label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <div className="col-12">
            <div className="flex justify-content-end">
              <Button
                label="Upload"
                className="p-button-primary bg-secondary border-round-3xl"
                loading={isLoading}
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminUploadDataForm;
