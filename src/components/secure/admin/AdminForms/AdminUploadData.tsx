import cx from "classnames";
import trim from "lodash/trim";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { useUploadCalculatorDataMutation } from "@/redux/hooks/apiHooks";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";

const POLLING_INTERVAL = 3000;

interface FormValues {
  calculatorId: string;
  spreadsheetId: string;
  pageName: string;
}

interface AdminUploadDataFormProps { }

const AdminUploadDataForm: React.FC<AdminUploadDataFormProps> = ({ }) => {
  const [uploadCalculatorData, { isLoading: isSaving }] =
    useUploadCalculatorDataMutation();


  const toastRef = useRef(null);

  const pollingRef = useRef<any>(null);
  const [uploadingProgress, setUploadingProgress] = useState<any>(null);
  const { calcInfoMap } = useCalculatorsInfo();

  const calculatorOptions = Object.keys(calcInfoMap).filter(calcType => !calcInfoMap[calcType].disabled).map(calcType => ({
    id: calcType,
    label: calcInfoMap[calcType].label
  }))

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  const {
    control,
    handleSubmit,
    reset,
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
      setUploadingProgress(null);
      pollingRef.current = null;

      const { message, progressId } = await uploadCalculatorData(
        payload
      ).unwrap();

      (toastRef?.current as any)?.show({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 5000,
      });

      pollingRef.current = setInterval(() => {
        fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/uploadProgress/${progressId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then(({ data }) => {
            setUploadingProgress(data);
            if (!data || data.status === "FINISHED") {
              clearInterval(pollingRef.current);
              pollingRef.current = null;

              if (data.uploaded === data.total) {
                reset();
              }
            }
          })
          .catch(() => {
            setUploadingProgress(null);
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          });
      }, POLLING_INTERVAL);
    } catch (error) {
      const message =
        typeof (error as any)?.data?.message === "string"
          ? (error as any)?.data?.message
          : "Failed to upload data.";

      (toastRef?.current as any)?.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 5000,
      });
    }
  };

  const isLoading = isSaving || pollingRef.current;

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
                    options={calculatorOptions}
                    optionLabel="label"
                    optionValue="id"
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                  />

                  <label className="bg-beige" htmlFor={field.name}>
                    Calculator
                  </label>
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

                  <label className="bg-beige" htmlFor={field.name}>
                    Spreadsheet ID
                  </label>
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

                  <label className="bg-beige" htmlFor={field.name}>
                    Page Name
                  </label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <div className="col-12">
            <div className="flex justify-content-end align-items-center gap-4">
              {uploadingProgress && (
                <div>
                  <b>
                    {uploadingProgress.status === "STARTED" && "UPLOADING"}
                    {uploadingProgress.status === "FINISHED" && "FINISHED"}
                  </b>
                  :{" "}
                  <>
                    Uploaded <b>{uploadingProgress.uploaded}</b> of{" "}
                    <b>{uploadingProgress.total}</b> for{" "}
                    <b>{uploadingProgress.calculatorId}</b>
                  </>
                </div>
              )}
              <Button
                label="Upload"
                className="p-button-primary border-round-3xl"
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
