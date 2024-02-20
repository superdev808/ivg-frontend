"use client";

import classNames from "classnames/bind";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import ImageUploader from "@/components/shared/ImageUploader";
import {
  useGetUserInfoQuery,
  usePostSendResetPasswordMutation,
  usePostUploadLogoMutation,
  usePutUpdateUserInfoMutation,
} from "@/redux/hooks/apiHooks";
import { UserInfo } from "@/types/UserTypes";

import styles from "@/components/secure/settings/Settings.module.scss";

const cx = classNames.bind(styles);

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  logo: "",
  organizationName: "",
  organizationRole: "",
  organizationRoleOther: "",
  dentalPracticeRole: "",
  organizationState: "",
  organizationNumber: "",
  referralSource: "",
  referralSourceOther: "",
};

export default function SettingsUserInfoForm() {
  const { data, refetch } = useGetUserInfoQuery({});
  const [putUpdateUserInfo, { isLoading: isLoadingUserInfo }] =
    usePutUpdateUserInfoMutation();
  const [postUploadLogo, { isLoading: isLoadingLogo }] =
    usePostUploadLogoMutation();
  const [postSendResetPassword, { isLoading: isLoadingReset }] =
    usePostSendResetPasswordMutation();

  const [user, setUser] = useState<UserInfo>(defaultValues);
  const [updateMessage, setUpdateMessage] = useState<string>("");
  const [resetMessage, setResetMessage] = useState<string>("");
  const [uploadDialog, setUploadDialog] = useState<boolean>(false);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  const onUploadHandler = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await postUploadLogo(formData).unwrap();
      refetch();
      console.log("Image uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setUploadDialog(false);
  };

  useEffect(() => {
    if (!data) return;
    const userData = data.data;

    setUser(userData);
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("phone", userData.phone);
    setValue("email", userData.email);
    setValue("organizationName", userData.organizationName);
    setUpdateMessage("");
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues });

  const onSubmit = async (data: FormValues) => {
    try {
      await putUpdateUserInfo(data).unwrap();
      refetch();
      setUpdateMessage("Successfully updated.");
    } catch (error: any) {
      console.log(error);
    }
  };

  const onReset = async (e: any) => {
    e.preventDefault();

    try {
      await postSendResetPassword({}).unwrap();
      setResetMessage("Password reset email sent");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="px-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="col-12">
            <div className="text-2xl text-center md:text-left">Profile</div>
          </div>

          <div className="col-12">
            <span className="text-gray-600">
              Update your profile, contact detials, and preferences to
              personalize your experience
            </span>
          </div>

          <div className="col-12 md:col-3">
            <div className="pt-4 pb-2 md:pb-4">
              <div className="flex flex-column border-1 border-300 border-round-xl align-items-center pt-4">
                {user?.logo ? (
                  <Image
                    src={user.logo}
                    imageStyle={{ maxWidth: 100, maxHeight: 100 }}
                    alt="org_logo"
                  />
                ) : (
                  <Avatar
                    label={
                      user?.firstName?.charAt(0) + user?.lastName?.charAt(0)
                    }
                    shape="circle"
                    className="bg-orange-100"
                    style={{ width: 100, height: 100, fontSize: "3rem" }}
                  />
                )}

                <Button
                  onClick={() => setUploadDialog(true)}
                  disabled={isLoadingLogo}
                  icon={isLoadingLogo && "pi pi-spin pi-spinner"}
                  label="Update"
                  className="bg-transparent text-600 text-secondary"
                />
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6">
            <div className="flex flex-column justify-content-center text-center pb-6 h-full md:text-left md:pl-2 md:pb-0">
              <div className="text-lg">
                <span className="text-gray-600">Location:</span>{" "}
                {user.organizationState}
              </div>
            </div>
          </div>

          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required." }}
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
                    className={cx([
                      { "p-invalid": fieldState.error },
                      "w-full",
                    ])}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  <label htmlFor={field.name}>First Name</label>
                </span>

                {FormErrorMessage({
                  message: errors[field.name]?.message,
                })}
              </div>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required." }}
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
                    className={cx([
                      { "p-invalid": fieldState.error },
                      "w-full",
                    ])}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Last Name</label>
                </span>

                {FormErrorMessage({
                  message: errors[field.name]?.message,
                })}
              </div>
            )}
          />

          <div className="col-12 md:col-6">
            <span className="p-float-label w-full">
              <InputText className="w-full mb-3" value={user?.email} disabled />
              <label htmlFor="email">Email</label>
            </span>
          </div>

          <Controller
            name="phone"
            control={control}
            rules={{ required: "A phone number is required." }}
            render={({ field, fieldState }) => (
              <div className="col-12 md:col-6">
                <label
                  htmlFor={field.name}
                  className={cx({ "p-error": errors[field.name] })}
                />

                <span className="p-float-label w-full">
                  <InputMask
                    id={field.name}
                    value={field.value}
                    mask="(999) 999-9999"
                    className={cx([
                      { "p-invalid": fieldState.error },
                      "w-full",
                    ])}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  <label htmlFor={field.name}>Phone Number</label>
                </span>

                {FormErrorMessage({
                  message: errors[field.name]?.message,
                })}
              </div>
            )}
          />

          <Controller
            name="organizationName"
            control={control}
            rules={{ required: "Organization name is required." }}
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
                    className={cx([
                      { "p-invalid": fieldState.error },
                      "w-full",
                    ])}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  <label htmlFor={field.name}>Organization Name</label>
                </span>

                {FormErrorMessage({
                  message: errors[field.name]?.message,
                })}
              </div>
            )}
          />

          <div className="col-12">
            <div className="flex flex-column justify-content-center align-items-center gap-3 md:flex-row md:justify-content-start md:gap-4">
              <Button
                disabled={Boolean(resetMessage)}
                outlined
                rounded
                icon={isLoadingReset && "pi pi-spin pi-spinner"}
                label="Change your password"
                className="text-red-600 w-fit"
                onClick={(e) => onReset(e)}
              />

              <span className="align-self-center">
                {resetMessage && (
                  <div className="text-600 text-secondary">{resetMessage}</div>
                )}
              </span>
            </div>
          </div>

          <div className="col-12">
            <div className="flex flex-column justify-content-center align-items-center gap-3 pb-4 md:flex-row md:justify-content-end md:gap-4 md:pb-0">
              {updateMessage && (
                <div className="text-600 text-secondary align-self-center">
                  {updateMessage}
                </div>
              )}

              <Button
                disabled={isLoadingUserInfo}
                type="submit"
                icon={isLoadingUserInfo && "pi pi-spin pi-spinner"}
                label="Update"
                rounded
                className="bg-secondary md:w-10rem w-fit"
              />
            </div>
          </div>
        </div>
      </form>

      <ImageUploader
        header="Upload your logo"
        visible={uploadDialog}
        setVisible={setUploadDialog}
        handleUpload={onUploadHandler}
      />
    </>
  );
}
