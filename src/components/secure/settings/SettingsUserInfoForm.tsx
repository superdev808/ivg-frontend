"use client";

import { Avatar } from "primereact/avatar";
import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import styles from "@/components/secure/settings/Settings.module.scss";
import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import ImageUploader from "@/components/shared/ImageUploader";
import {
  useGetUserInfoQuery,
  usePostSendResetPasswordMutation,
  usePostUploadLogoMutation,
  usePutUpdateUserInfoMutation,
} from "@/redux/hooks/apiHooks";
import { UserInfo } from "@/types/UserTypes";

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column justify-content-between h-full"
      >
        <div className={cx("form", "flex flex-column justify-content-between")}>
          <div className={cx("form-header")}>
            <span className={cx("form-title", "mb-2 text-center md:text-left")}>
              Profile
            </span>

            <span className={cx("form-subtitle", "px-2")}>
              Update your profile, contact detials, and preferences to
              personalize your experience
            </span>
          </div>

          <div className="grid m-0 p-0">
            <div className="col-12 md:col-3 flex flex-column border-1 border-300 border-round-xl my-4 align-items-center">
              {!user?.logo ? (
                <Avatar
                  label={user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
                  shape="circle"
                  className="bg-orange-100 mt-4"
                  style={{ width: 100, height: 100, fontSize: "3rem" }}
                />
              ) : (
                <div className="mt-4">
                  <Image
                    src={user.logo}
                    imageStyle={{ maxWidth: 100, maxHeight: 100 }}
                    alt="org_logo"
                  />
                </div>
              )}

              <div>
                <Button
                  onClick={(e) => {
                    e.preventDefault;
                    setUploadDialog(true);
                  }}
                  disabled={isLoadingLogo}
                  icon={isLoadingLogo ? "pi pi-spin pi-spinner" : ""}
                  label="Update"
                  className="bg-transparent text-600 text-secondary mt-2"
                />
              </div>
            </div>

            <div className="col-12 md:col-6 flex flex-column justify-content-center my-6 text-lg px-2 md:px-4">
              <span className="mb-2">
                <span className="text-gray-600">Organization Name:</span>{" "}
                {user.organizationName}
              </span>

              <span className="mb-2">
                <span className="text-gray-600">Location:</span>{" "}
                {user.organizationState}
              </span>
            </div>
          </div>

          <div className="grid  justify-content-center m-0 p-0">
            <div className="col-12 grid m-0 p-0">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required." }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-column col-12 md:col-6">
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

                    {FormErrorMessage({ message: errors[field.name]?.message })}
                  </div>
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required." }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-column col-12 md:col-6">
                    <label
                      htmlFor={field.name}
                      className={cx({ "p-error": errors[field.name] })}
                    />

                    <span className="p-float-label w-full ">
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

                    {FormErrorMessage({ message: errors[field.name]?.message })}
                  </div>
                )}
              />

              <div className="col-12 md:col-6">
                <span className="p-float-label w-full">
                  <InputText
                    className="w-full mb-3"
                    value={user?.email}
                    disabled
                  />
                  <label htmlFor="email">Email</label>
                </span>
              </div>

              <Controller
                name="phone"
                control={control}
                rules={{ required: "A phone number is required." }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-column col-12 md:col-6">
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

                    {FormErrorMessage({ message: errors[field.name]?.message })}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-content-center md:justify-content-start mb-6">
          <Button
            disabled={Boolean(resetMessage)}
            outlined
            onClick={(e) => onReset(e)}
            icon={isLoadingReset ? "pi pi-spin pi-spinner" : ""}
            label="Change your password"
            className=" p-button-rounded p-outlined text-red-600"
          />

          <span className="align-self-center">
            {resetMessage && (
              <div className="text-600 text-secondary mx-4">{resetMessage}</div>
            )}
          </span>
        </div>

        <div className="grid m-0 p-0 justify-content-center md:justify-content-end align-items-center pb-6 md:pb-0">
          <div className="flex align-items-center">
            {updateMessage && (
              <div className="text-600 text-secondary mx-4">
                {updateMessage}
              </div>
            )}

            <Button
              disabled={isLoadingUserInfo}
              type="submit"
              icon={isLoadingUserInfo ? "pi pi-spin pi-spinner" : ""}
              label="Update"
              className="p-button-rounded bg-secondary w-full md:w-10rem"
            />
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
