"use client";

import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";

import { FormErrorMessage } from "@/components/shared/FormErrorMessage";
import { useSubmitRequestMutation } from "@/redux/hooks/apiHooks";
import { Response } from "@/types/ApiResponseTypes";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const FEATURE_TYPES = [
  { label: "Calculator", value: "Calculator" },
  { label: "Workflow", value: "Workflow" },
];

const PRODUCT_TYPES = [
  { label: "Crown and Bridge", value: "Crown and Bridge" },
  { label: "Partial and Full Dentures", value: "Partial and Full Dentures" },
  { label: "Implant", value: "Implant" },
  { label: "Removables", value: "Removables" },
  { label: "All-on-X", value: "All-on-X" },
];

const DISCUSS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const RequestsForm: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [sendingStatus, setSendingStatus] = useState<
    "sending" | "sent" | "error" | ""
  >("");

  const [submitRequest] = useSubmitRequestMutation();

  const defaultValues = {
    featureType: "",
    productTypes: [] as string[],
    message: "",
    discuss: "",
    token: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
    trigger,
  } = useForm({ defaultValues });

  const onVerifyRecaptcha = (token: string | null) => {
    setValue("token", token || "");
    trigger("token");
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSendingStatus("");
  };

  const onSubmit = async () => {
    try {
      setSendingStatus("sending");
      const { productTypes, ...rest } = getValues();
      const response = await submitRequest({
        ...rest,
        productTypes: productTypes.join(", "),
      });

      if ((response as Response).data.status === "Success") {
        setVisible(true);
        setSendingStatus("sent");
        reset();
      } else {
        setSendingStatus("error");
      }
    } catch (error) {
      setSendingStatus("error");
    }
  };

  return (
    <div className="flex flex-column align-items-center text-dark-green line-height-2 text-center">
      <div className="bg-light-brown flex flex-column align-items-center py-4 w-full">
        <div className={cx("notice")}>
          <div className="text-3xl font-bold">Our users know best.</div>
          <div className="text-xl mt-2">
            Have an idea you think would be helpful to have on the Ivory Guide
            platform? Provide some details for us and we will do our best to add
            what we can into our ever-growing roadmap.
          </div>
        </div>
      </div>

      <form
        className={cx(
          "form",
          "flex flex-column align-items-center text-center gap-4 py-6"
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="featureType"
          control={control}
          rules={{ required: "Required." }}
          render={({ field }) => (
            <div className="w-full flex flex-column px-2 align-items-center">
              <div className="text-xl md:text-2xl mb-3">
                What type of feature should be built?
              </div>

              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                {FEATURE_TYPES.map((elem) => (
                  <div
                    className={cx("option", {
                      active: elem.label === field.value,
                    })}
                    key={elem.value}
                    onClick={() => field.onChange(elem.value)}
                  >
                    {elem.label}
                  </div>
                ))}
              </div>

              <div className="my-2 flex justify-content-center">
                <FormErrorMessage message={errors[field.name]?.message} />
              </div>
            </div>
          )}
        />

        <Controller
          name="productTypes"
          control={control}
          rules={{ required: "Required." }}
          render={({ field }) => (
            <div className="w-full flex flex-column px-2 align-items-center">
              <div className="text-xl md:text-2xl mb-3">
                What product type(s) does this feature cover?
                <br />
                (Choose all that apply)
              </div>

              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                {PRODUCT_TYPES.map((elem) => (
                  <div
                    className={cx("option", {
                      active: field.value.includes(elem.label),
                    })}
                    key={elem.value}
                    onClick={() =>
                      field.onChange(
                        field.value.includes(elem.value)
                          ? field.value.filter((it) => it !== elem.value)
                          : [...field.value, elem.value]
                      )
                    }
                  >
                    {elem.label}
                  </div>
                ))}
              </div>

              <div className="my-2 flex justify-content-center">
                <FormErrorMessage message={errors[field.name]?.message} />
              </div>
            </div>
          )}
        />

        <Controller
          name="message"
          control={control}
          rules={{ required: "Required." }}
          render={({ field }) => (
            <div className="w-full flex flex-column px-2 align-items-center">
              <div className="text-xl md:text-2xl mb-3">
                Please describe this feature.
              </div>

              <div className="w-full flex flex-wrap justify-content-center align-items-center gap-2">
                <textarea
                  placeholder="Enter details..."
                  className={cx("textarea")}
                  value={field.value}
                  onChange={(evt) => field.onChange(evt.target.value)}
                />
              </div>

              <div className="my-2 flex justify-content-center">
                <FormErrorMessage message={errors[field.name]?.message} />
              </div>
            </div>
          )}
        />

        <Controller
          name="discuss"
          control={control}
          rules={{ required: "Required." }}
          render={({ field }) => (
            <div className="w-full flex flex-column px-2 align-items-center">
              <div className="text-xl md:text-2xl mb-3">
                Would you be willing to discuss your idea with a member of the
                Ivory Guide team?
              </div>

              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                {DISCUSS.map((elem) => (
                  <div
                    className={cx("option", {
                      active: elem.label === field.value,
                    })}
                    key={elem.value}
                    onClick={() => field.onChange(elem.value)}
                  >
                    {elem.label}
                  </div>
                ))}
              </div>

              <div className="my-2 flex justify-content-center">
                <FormErrorMessage message={errors[field.name]?.message} />
              </div>
            </div>
          )}
        />

        {sendingStatus !== "sent" && (
          <div className="flex justify-content-center">
            <Controller
              name="token"
              control={control}
              rules={{ required: "You must verify the reCAPTCHA." }}
              render={({ field }) => (
                <div className="flex flex-column align-items-center justify-content-center">
                  <span className="mb-2">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      onChange={onVerifyRecaptcha}
                    />
                  </span>

                  <FormErrorMessage message={errors[field.name]?.message} />
                </div>
              )}
            />
          </div>
        )}

        <Button
          type="submit"
          loading={sendingStatus === "sending"}
          disabled={sendingStatus === "sending" || sendingStatus === "sent"}
          className="bg-secondary px-8"
          label={
            sendingStatus === "sending"
              ? "Sending..."
              : sendingStatus === "sent"
              ? "Sent!"
              : "Submit"
          }
        />
      </form>

      <Dialog
        showHeader={false}
        blockScroll
        draggable={false}
        visible={visible}
        modal
        onHide={handleCloseModal}
      >
        <div className="flex flex-column align-content-center text-center p-4">
          <div className="flex justify-content-end">
            <Button
              icon="pi pi-times"
              outlined
              rounded
              onClick={handleCloseModal}
              style={{
                color: "var(--light-green)",
              }}
              className="border-0 mt-2"
            />
          </div>

          <div className="flex justify-content-center">
            <Image src="/images/common/sent.png" alt="sent" width="175" />
          </div>

          <h2>Thank you for contacting us!</h2>

          <p className="text-bold">
            We have received your message and will be in touch shortly.
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default RequestsForm;
