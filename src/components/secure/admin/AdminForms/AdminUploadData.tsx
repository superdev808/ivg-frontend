import cx from "classnames";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { CALCULATORS } from "@/helpers/util";
import { useUploadCalculatorDataMutation } from "@/redux/hooks/apiHooks";

interface FormValues {
  calculatorId: string;
  spreadsheetId: string;
  pageName: string;
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
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      calculatorId: "",
      spreadsheetId: "",
      pageName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      calculatorId: trim(data.calculatorId),
      spreadsheetId: trim(data.spreadsheetId),
      pageName: trim(data.pageName),
    };

    try {
      const message = await uploadCalculatorData(payload).unwrap();
      reset();

      (toastRef?.current as any)?.show({
        severity: "success",
        summary: "Success",
        detail: message,
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
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                  />

                  <label htmlFor={field.name}>Calculator</label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <Controller
            name="spreadsheetId"
            control={control}
            rules={{
              required: "Please provide Spreadsheet ID.",
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

                  <label htmlFor={field.name}>Spreadsheet ID</label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <Controller
            name="pageName"
            control={control}
            rules={{
              required: "Please provide Page Name.",
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

                  <label htmlFor={field.name}>Page Name</label>
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
