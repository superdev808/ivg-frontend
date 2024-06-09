import cx from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { USER_ROLES_OPTIONS, USER_VERIFIED_OPTIONS } from "@/constants/users";
import { usePutUpdateUserMutation } from "@/redux/hooks/apiHooks";
import { EditUser } from "@/types/UserTypes";

interface AdminEditUserProps {
  user: EditUser | null;
  onClose: () => void;
  onUpdate: (response: { label: string; message: string }) => void;
}

const AdminEditUser: React.FC<AdminEditUserProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [putUpdateUser] = usePutUpdateUserMutation();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      organizationName: "",
      organizationState: "",
      active: false,
      verified: false,
      verificationEmailSent: "",
      lastLoginDate: "",
      lastActivityDate: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data: EditUser) => {
    try {
      const response: any = await putUpdateUser(data);

      if (response.error) {
        throw new Error("An error occurred while updating user.");
      }

      onUpdate({ label: "Success", message: "User updated successfully." });
      onClose();
    } catch (error) {
      onUpdate({
        label: "Error",
        message: "An error occurred while updating user.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid p-0 m-0">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-column col-12 md:col-6 pr-2">
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

                  <label className="bg-beige" htmlFor={field.name}>
                    First Name
                  </label>
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
              <div className="flex flex-column col-12 md:col-6 pl-2">
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

                  <label className="bg-beige" htmlFor={field.name}>
                    Last Name
                  </label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-column col-12 md:col-6 pr-2">
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

                  <label className="bg-beige" htmlFor={field.name}>
                    Email
                  </label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-column col-12 md:col-6 pl-2">
                <span className="p-float-label w-full">
                  <Dropdown
                    {...field}
                    options={USER_ROLES_OPTIONS}
                    optionLabel="label"
                    optionValue="value"
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                  />

                  <label className="bg-beige" htmlFor={field.name}>
                    Role
                  </label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />
          <Controller
            name="verified"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-column col-12 md:col-6 p-0">
                <span className="p-float-label w-full">
                  <Dropdown
                    {...field}
                    options={USER_VERIFIED_OPTIONS}
                    optionLabel="label"
                    optionValue="value"
                    className={cx({ "p-invalid": fieldState.error }, "w-full")}
                  />

                  <label className="bg-beige" htmlFor={field.name}>
                    Verified
                  </label>
                </span>

                {FormErrorMessage({ message: errors[field.name]?.message })}
              </div>
            )}
          />
        </div>

        <div className="flex justify-content-end">
          <Button
            label="Cancel"
            type="button"
            className="p-button-text border-round-3xl"
            onClick={(e) => {
              e.preventDefault;
              onClose();
            }}
          />

          <Button
            label="Save"
            className="p-button-primary bg-secondary border-round-3xl"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default AdminEditUser;
