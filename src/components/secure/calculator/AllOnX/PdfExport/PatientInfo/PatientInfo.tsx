import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Patient } from '../PdfExport';

interface FormValues {
  name: string;
  address: string;
  filename: string;
}
interface FormProps {
  onSubmit: (data: FormValues) => void;
  info: Patient|null;
}

const PatientInfo:React.FC<FormProps> = ({ info, onSubmit }) => {
  const defaultValues: FormValues = {
    name: '',
    address: '',
    filename: info?.filename || '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="p-field mb-3">
        <label htmlFor="name" className={errors.name ? 'p-error p-float p-label-always' : 'p-float p-label-always'}>Name</label>
        <InputText id="name" {...register('name', { required: true, maxLength: 64 })} className={errors.name ? 'p-invalid' : ''} />
        {errors.name && <small className="p-error">Name is required</small>}
      </div>

      <div className="p-field mb-3">
        <label htmlFor="address" className={errors.address ? 'p-error p-float p-label-always' : 'p-float p-label-always'}>Address</label>
        <InputText id="address" {...register('address', { required: true, maxLength: 128 })} className={errors.address ? 'p-invalid' : ''} />
        {errors.address && <small className="p-error">Address is required</small>}
      </div>

      <div className="p-field mb-3">
        <label htmlFor="filename" className={errors.filename ? 'p-error p-float p-label-always' : 'p-float p-label-always'}>Filename</label>
        <InputText id="filename" {...register('filename', { required: true, maxLength: 64 })} className={errors.filename ? 'p-invalid' : ''} />
        {errors.filename && <small className="p-error">Filename is required</small>}
      </div>

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default PatientInfo;
