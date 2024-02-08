import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Patient } from "../PdfExport";

interface FormValues {
  name: string;
  address: string;
  filename: string;
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
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

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
          Name
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
        {errors.name && <small className="p-error">Name is required.</small>}
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
          Address
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
          <small className="p-error">Address is required.</small>
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
          Filename
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
          <small className="p-error">Filename is required.</small>
        )}
      </div>

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default PatientInfo;
