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

export default function CalculatorProduct() {
  return (
    <>
      <div className={cx("grid -mt-8 md:pt-6", "landing-top")}>
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
        <div className="col-12 md:col-3 mt-4 md:mt-7 pt-7 md:py-7 pb-0 flex flex-column align-items-center md:align-items-start">
          <h1 className={cx("landing-top-title", "my-2 text-6xl")}>
            Calculators
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
            Calculators provide quick answers to complicated everyday questions
          </h1>
          <div>
            <Button className={cx("mt-4 px-4 py-3", "request-demo")}>
              Request More Information
            </Button>
          </div>
        </div>
        <div className="col-12 md:col-4 mt-4 md:mt-7 p-0">
          <Image src="/Elephant.svg" alt="Ivory" width="100%" />
        </div>
      </div>
      <div className={cx("grid p-3", "landing-middle")}>
        <div className="col-12 pt-4 md:pt-8 flex just-content-start md:justify-content-center">
          <h1
            className={cx("landing-middle-title", "my-2 text-4xl md:text-6xl")}
          >
            How it Works
          </h1>
        </div>
      </div>
      <div className="grid mt-4 mb-2 md:mb-6 pb-6 flex justify-content-center">
        <div className="col-12 md:col-3 px-6 py-4 flex flex-column align-items-center justify-content-center">
          <h5
            className={cx(
              "landing-middle-item-description",
              "mt-2 mb-0 text-xl text-left"
            )}
          >
            Practitioners and Customer Service teams can search our ever-growing
            database for frequently asked questions and topics.
          </h5>
          <h5
            className={cx(
              "landing-middle-item-description",
              "mt-2 mb-0 text-xl text-left"
            )}
          >
            Our calculators work by prompting the user to answer all relevant
            questions & searching our database to calculate the correct answer.
          </h5>
        </div>
        <div className="col-12 md:col-3 px-6 py-4 flex flex-column align-items-center relative">
          <div className={cx("landing-middle-image-container")}>
            <div className={cx("landing-middle-image-sub-container")}>
              <Image
                src="/bogdan.jpg"
                alt="landing page middle image"
                width={"100%"}
                className="relative"
              />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-3 px-6 py-4 flex flex-column align-items-start justify-content-center">
          {howItWorksItems.map((item, index) => (
            <h3
              key={`how-it-work-${index}`}
              className={cx("my-3 text-lg md:text-2xl text-left")}
            >
              <i className={cx("pi pi-check", "px-2")} /> {item}
            </h3>
          ))}
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
                  src="/compatibility.svg"
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
                Confirm Component Compatibility
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
                    src="/suggestions.svg"
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
                Immediate Clinical Suggesetions
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
                <Image src="/procurement.svg" height="110px" alt="schools" />
              </div>
              <h5
                className={cx(
                  "landing-middle-item-description",
                  "mt-6 px-2 text-sm md:text-2xl font-bold"
                )}
              >
                On-Demand Procurement
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
