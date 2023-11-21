import React from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import classNames from "classnames/bind";
import styles from "../page.module.scss";
const cx = classNames.bind(styles);

const howItWorksItems = [
  "Restoration material selection",
  "All-On-X implant guidance",
  "Scanbody selection",
];

export default function WorkflowProduct() {
  return (
    <>
      <div className={cx("grid -mt-8 px-6 md:px-0 md:pt-6", "landing-top")}>
        <div className="col-0 md:col-2 my-4 md:my-8 py-6 md:py-8 px-4 md:px-6 flex-column hidden md:flex">
          <Button icon="pi pi-linkedin" rounded outlined aria-label="Filter" />
          <Button
            className="mt-5"
            icon="pi pi-instagram"
            rounded
            outlined
            aria-label="Filter"
          />
          <Button
            className="mt-5"
            icon="pi pi-facebook"
            rounded
            outlined
            aria-label="Filter"
          />
        </div>
        <div className="col-12 md:col-4 mt-4 md:mt-7 pt-7 md:py-7 pb-0 flex flex-column align-items-center md:align-items-start">
          <h1 className={cx("landing-top-title", "my-2 text-6xl")}>
            Workflows
          </h1>
          <h1
            className={cx(
              "landing-top-description",
              "mt-4 mb-2 text-lg md:text-xl text-center md:text-left"
            )}
          >
            <b>
              <u>Ivory Guide</u>
            </b>{" "}
            workflows streamline patient care through step-by-step guidance and recommendations.
          </h1>
          <div>
            <Button className={cx("mt-4 px-4 py-3", "request-demo")}>
              Request More Information
            </Button>
          </div>
        </div>
        <div className="col-12 md:col-4 md:col-offset-2 mt-4 md:mt-7 p-0 mb-4">
          <Image src="/workflow-product.svg" alt="Ivory" height="100%" className={cx("landing-workflow")} />
        </div>
      </div>
      <div className={cx("grid p-3", "landing-middle")}>
        <div className="col-12 pt-4 md:pt-8 flex justify-content-center">
          <h1
            className={cx("landing-middle-title", "my-2 text-4xl md:text-6xl")}
          >
            How it Works
          </h1>
        </div>
      </div>
      <div className="grid mb-2 md:mb-6 pb-6 flex justify-content-center">
        <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
          <h5
            className={cx(
              "landing-middle-item-description",
              "mt-2 mb-0 text-xl text-center md:text-left"
            )}
          >
            <b>Dentists</b> using Workflows are seamlessly guided through complicated processes and decisions. Gain confidence troubleshooting roadblocks in your treatment plans or using digital workflows while your patient is in the chair.
          </h5>
        </div>
        <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
          <div className={cx("landing-middle-image-container")}>
            <div className={cx("landing-middle-image-sub-container")}>
              <Image
                src="/workflow-1.png"
                alt="landing page middle image"
                width={"100%"}
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid mb-2 md:mb-6 pb-6 flex justify-content-center flex-column-reverse md:flex-row">
        <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
          <div className={cx("landing-middle-image-container")}>
            <div className={cx("landing-middle-image-sub-container")}>
              <Image
                src="/workflow-2.png"
                alt="landing page middle image"
                width={"100%"}
                className="relative"
              />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
          <h5
            className={cx(
              "landing-middle-item-description",
              "mt-2 mb-0 text-xl text-center md:text-left"
            )}
          >
            <b>Dental Laboratories</b> frequently face challenging question from their clients, requiring escalation to technicians and slower response time. Workflows enable your team to quickly and independently guide dentists through technical processes and questions.
          </h5>
        </div>
      </div>

      <div className="grid mb-2 md:mb-6 pb-6 flex justify-content-center">
        <div className="col-12 md:col-4 md:col-offse-2 px-4 md:px-6 py-4 flex flex-column align-items-center justify-content-center">
          <h5
            className={cx(
              "landing-middle-item-description",
              "mt-2 mb-0 text-xl  text-center md:text-left"
            )}
          >
            Workflows provide <b>future dentists and lab technicians</b> with vetted advice and recommendations that bring complicated procedures to life.
          </h5>
        </div>
        <div className="col-12 md:col-4 px-6 py-4 flex flex-column align-items-center relative">
          <div className={cx("landing-middle-image-container")}>
            <div className={cx("landing-middle-image-sub-container")}>
              <Image
                src="/workflow-3.png"
                alt="landing page middle image"
                width={"100%"}
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx(
          "landing-help-introduction",
          "grid mt-2 md:mt-6 mx-4 border-round-xl"
        )}
      >
        <div className="col-12 pt-8 flex justify-content-center">
          <h1
            className={cx("landing-middle-title", "my-2 text-3xl md:text-6xl")}
          >
            Our Advantage
          </h1>
        </div>
        <div className="col-12 flex md:flex-column mt-4">
          <div className="col-12 grid py-4 flex justify-content-center">
            <div
              className={cx(
                "landing-middle-item",
                "col-12 md:col-3 px-4 flex flex-column align-items-center"
              )}
            >
              <div
                className={cx(
                  "blur-shadow",
                  "flex flex-column justify-content-center align-items-center"
                )}
              >
                <Image
                  src="/workflow-advantage1.svg"
                  height="110px"
                  alt="compatibility"
                />
              </div>
              <h5
                className={cx(
                  "landing-middle-item-description",
                  "mt-6 px-2 text-sm md:text-2xl font-bold"
                )}
              >
                Reduce Additional Appointments
              </h5>
            </div>
            <div
              className={cx(
                "landing-middle-item",
                "col-12 md:col-3 px-4 flex flex-column align-items-center"
              )}
            >
              <div
                className={cx(
                  "landing-middle-item",
                  "flex flex-column justify-content-center align-items-center md:border-x-1"
                )}
                style={{ width: "100%" }}
              >
                <div
                  className={cx(
                    "blur-shadow",
                    "flex flex-column justify-content-center align-items-center"
                  )}
                >
                  <Image
                    src="/workflow-advantage2.svg"
                    height="110px"
                    alt="suggestions"
                  />
                </div>
              </div>
              <h5
                className={cx(
                  "landing-middle-item-description",
                  "mt-6 px-2 text-sm md:text-2xl font-bold"
                )}
              >
                Feel Confident With Every Procedure
              </h5>
            </div>
            <div
              className={cx(
                "landing-middle-item",
                "col-12 md:col-3 px-4 flex flex-column align-items-center"
              )}
            >
              <div
                className={cx(
                  "blur-shadow",
                  "flex flex-column justify-content-center align-items-center"
                )}
              >
                <Image src="/workflow-advantage3.svg" height="110px" alt="schools" />
              </div>
              <h5
                className={cx(
                  "landing-middle-item-description",
                  "mt-6 px-2 text-sm md:text-2xl font-bold"
                )}
              >
                Empower Customer Support Teams
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="grid mt-6">
        <div
          className={cx(
            "landing-contact-container",
            "col-10 col-offset-1 pb-4 flex flex-column md:flex-row align-items-center justify-content-between border-bottom-1"
          )}
        >
          <Image
            src="/Ivory-Guide-Logo-Stack.svg"
            alt="Ivory Guid Logo Stack"
            width="200px"
            className="relative"
          />
          <div
            className={cx(
              "landing-contact-section",
              "blur-shadow",
              "flex justify-content-between mt-6 mb-4 md:my-3"
            )}
          >
            <Button icon="pi pi-facebook" rounded text aria-label="Filter" />
            <Button icon="pi pi-instagram" rounded text aria-label="Filter" />
            <Button icon="pi pi-linkedin" rounded text aria-label="Filter" />
          </div>
          <Button
            outlined
            className={cx("landing-contact-section-contact-us", "px-5 py-3")}
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className={"grid"}>
        <div className="col-10 col-offset-1 md:col-4 md:col-offset-0 flex flex-column align-items-center">
          <p className="text-center md:text-left">
            @ 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.
          </p>
        </div>
        <div className="col-10 col-offset-1 md:col-4 md:col-offset-4 flex flex-column align-items-center">
          <p className="text-center md:text-right">
            Report feedback/mistakes by emailing feedback@ivoryguide.com.
          </p>
        </div>
      </div>
    </>
  );
}
