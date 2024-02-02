import { useState } from 'react';
import { dentalPracticeRole, organizationRole, referralSource, states } from './constants';
import styles from '../Register.module.scss';
import classNames from 'classnames/bind';
import { FieldErrors, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';

import { FormErrorMessage } from '@/components/shared/FormErrorMessage';
import RegisterFooter from './Footer';
const cx = classNames.bind(styles);

type FormValues = {
	organizationName: string;
	organizationRole: string;
	organizationRoleOther: string;
	dentalPracticeRole: string;
	organizationState: string;
	organizationNumber: string;
	referralSource: string;
	referralSourceOther: string;
};

type FormErrors = FieldErrors<FormValues>;

const defaultValues: FormValues = {
	organizationName: '',
	organizationRole: '',
	organizationRoleOther: '',
	dentalPracticeRole: '',
	organizationState: '',
	organizationNumber: '',
	referralSource: '',
	referralSourceOther: '',
};

export const SecondForm = ({ onSubmit, back, isSubmitting }: { onSubmit: (data: FormValues) => void; back: () => void, isSubmitting:boolean }) => {
	const [selectedOrgRole, setSelectedOrgRole] = useState<string>('');
	const [selectedReferralSource, setSelectedReferralSource] = useState<string>('');

	const {
		control,
		formState: { errors },
		handleSubmit,
		clearErrors,
		resetField,
		reset,
	} = useForm<FormValues>({ defaultValues });

	const onOrgRoleChange = (role: string) => {
		if (role !== 'other') {
			resetField('organizationRoleOther');
		}
		if (role !== 'dental_practice') {
			resetField('dentalPracticeRole');
		}

		setSelectedOrgRole(role);
	};

	const onReferralSourceChange = (source: string) => {
		if (source !== 'ref_other') {
			resetField('referralSourceOther');
		}
		setSelectedReferralSource(source);
	};

	return (
		<form
			className="grid  m-0 p-0  align-items-between h-full"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="col-12 m-0 p-0 grid flex-column">
				<span className="col-12 text-center text-2xl text-secondary">A few more questions</span>
				<span className="col-12 text-center p-0 text-gray-600 mb-4">To get started, tell me a little about yourself.</span>
				{/* <span className="col-12 p-0 mb-2 font-semibold">Enter your name</span> */}
				<div className="grid m-0 p-0 col-12">
					<span className="col-12 m-0 p-0 mb-2 font-semibold">What is your role?</span>
					<Controller
						name="organizationRole"
						control={control}
						rules={{ required: 'Role is required.' }}
						render={({ field: { onChange, ...field } }) => (
							<>
								<div className="col-12 grid m-0 mb-2">
									<div className={cx( 'col-12 grid justify-content-between p-0')}>
										{organizationRole.map((role) => {
											return (
												<div
													className="mb-2"
													style={{ width: '175px' }}
													key={`org_role_${role.value.toString()}`}>
													<RadioButton
														className={cx({ 'p-invalid': errors[field.name] })}
														inputId={`org_role_${role.value.toString()}`}
														{...field}
														inputRef={field.ref}
														onChange={(e) => {
															onChange(e.target.value);
															onOrgRoleChange(e.target.value);
														}}
														value={role.value}
														checked={field.value === role.value}
													/>
													<label
														htmlFor={`org_role_${role.value.toString()}`}
														className="ml-1 mr-3 ">
														{role.label}
													</label>
												</div>
											);
										})}
										<div style={{ width: '175px' }}></div>
									</div>
								</div>
								{selectedOrgRole === 'other' ? (
									<Controller
										name="organizationRoleOther"
										control={control}
										rules={{ required: selectedOrgRole === 'other' }}
										render={({ field, fieldState }) => (
											<div
												className="mb-4"
												style={{ width: '100%' }}>
												<InputText
													id={field.name}
												
													className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
													placeholder="Please specify"
													{...field}
													></InputText>
											</div>
										)}
									/>
								) : null}
							</>
						)}
					/>

					{selectedOrgRole === 'dental_practice' && (
						<>
							<span className="col-12 p-0 mb-2 font-semibold">What type of dental practice?</span>

							<Controller
								name="dentalPracticeRole"
								control={control}
								rules={{ required: 'Dental practice role is required.' }}
								render={({ field: { onChange, ...field } }) => (
									<div className="col-12 grid m-0 mb-2">
										<div className="col-12 grid justify-content-between mb-">
											{dentalPracticeRole.map((role) => {
												return (
													<div
														className="mb-2"
														style={{ width: '175px' }}
														key={`dp_role_${role.value.toString()}`}>
														<RadioButton
															inputId={`dp_role_${role.value.toString()}`}
															{...field}
															inputRef={field.ref}
															value={role.value}
															checked={field.value === role.value}
															onChange={(e) => {
																onChange(e.target.value);
															}}
															className={cx({ 'p-invalid': errors[field.name] })}
														/>
														<label
															htmlFor={`dp_role_${role.value.toString()}`}
															className="ml-1 mr-3 ">
															{role.label}
														</label>
													</div>
												);
											})}
											<div style={{ width: '175px' }}></div>
										</div>
									</div>
								)}
							/>
						</>
					)}
					<span className="col-12 p-0 mb-3 font-semibold">What is the name of your company or school?</span>
					<Controller
						name="organizationName"
						control={control}
						rules={{ required: 'Organization type is required.' }}
						render={({ field, fieldState }) => (
							<div className="flex flex-column  col-12 p-0 mb-4">
								<label
									htmlFor={field.name}
									className={cx({ 'p-error': errors[field.name] })}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
										{...field}
									/>
									<label htmlFor={field.name}>Name</label>
								</span>
							</div>
						)}
					/>

					<Controller
						name="organizationState"
						control={control}
						rules={{ required: 'State is required.' }}
						render={({ field, fieldState }) => (
							<div className="flex flex-column col-12 md:col-6 p-0 md:pr-2 mb-4 ">
								<span className="p-float-label w-full">
									<Dropdown
										{...field}
										options={states}
										optionLabel="name"
										optionValue="value"
										filter
										clearIcon
										className={cx({ 'p-invalid': fieldState.error }, 'w-full')}
									/>
									<label htmlFor={field.name}>Location</label>
								</span>
							</div>
						)}
					/>

					<Controller
						name="organizationNumber"
						control={control}
						rules={{ required: `License or School number is required.` }}
						render={({ field, fieldState }) => (
							<div className="flex flex-column  col-12 md:col-6 p-0 md:pl-2 mb-4 ">
								<label
									htmlFor={field.name}
									className={cx({ 'p-error': errors[field.name] })}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
										{...field}
									/>
									<label htmlFor={field.name}>License/School Number</label>
								</span>
							</div>
						)}
					/>
				</div>
				<div className="grid m-0 p-0 col-12 ">
					<span className="col-12 p-0 mb-2 font-semibold">How did you hear about us?</span>

					<Controller
						name="referralSource"
						control={control}
						rules={{ required: 'Referral source is required.' }}
						render={({ field: { onChange, ...field } }) => (
							<div className="col-12 grid m-0">
								<div className="col-12 grid justify-content-between">
									{referralSource.map((source) => {
										return (
											<div
												className=" flex"
												style={{ width: '140px' }}
												key={`referral_${source.value.toString()}`}>
												<RadioButton
													inputId={`referral_${source.value.toString()}`}
													{...field}
													inputRef={field.ref}
													onChange={(e) => {
														onChange(e.target.value);
														onReferralSourceChange(e.target.value);
													}}
													value={source.value}
													checked={field.value === source.value}
													className={cx({ 'p-invalid': errors[field.name] },'mb-2')}
												/>
												<label
													htmlFor={`referral_${source.value.toString()}`}
													className="ml-1 mr-3 ">
													{source.label}
												</label>
											</div>
										);
									})}
								</div>
							</div>
						)}
					/>
					{selectedReferralSource === 'ref_other' ? (
						<Controller
							name="referralSourceOther"
							control={control}
							rules={{ required: selectedReferralSource === 'ref_other' }}
							render={({ field, fieldState }) => (
								<div
									className="mb-4"
									style={{ width: '100%' }}>
									<InputText
										id={field.name}
										
										className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
										placeholder="Please specify"
										{...field}></InputText>
								</div>
							)}
						/>
					) : null}
				</div>
			</div>
			<div className={cx("col-12 grid justify-content-between p-0 m-0 mb-4")}>
				<div className="col-6">
					<Button
						onClick={(e) => {
							e.preventDefault();
							setSelectedOrgRole('');
							setSelectedReferralSource('');
							reset();
							back();
						}}
						outlined
						label="Back"
						className="p-button-rounded text-secondary"
					/>
				</div>
				<div className="col-6 flex justify-content-end">
					<div>
					<Button
					disabled={isSubmitting}
						type="submit"
						icon={isSubmitting ? "pi pi-spin pi-spinner" : "" }
						label={"Register"}
						className=" p-button-rounded bg-secondary text-center"
					/>
					</div>
					
				</div>
			</div>
			<div className='col-12 flex-grow-1 flex align-items-end justify-content-center'>
						<RegisterFooter />


			</div>
		</form>
	);
};
