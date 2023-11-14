"use client";
import React from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
let cx = classNames.bind(styles);

export default function Index() {
  return (
    <>
      <div className={cx("grid -mt-8 md:pt-6", "landing-top")}>
        <div className="col-2 my-4 md:my-8 py-6 md:py-8 px-4 md:px-6 flex flex-column">
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
        <div className="col-9 md:col-5 mt-4 md:mt-7 py-7 flex flex-column align-items-end md:align-items-start">
          <h1 className={cx("landing-top-title", "my-2 text-lg md:text-6xl")}>
            High Quality Patient
          </h1>
          <h1 className={cx("landing-top-title", "mt-2 text-lg md:text-6xl")}>
            Care At Your Fingertips.
          </h1>
          <div>
            <Button className={cx("mt-2 px-4 py-3", "request-demo")}>
              Request More Information
            </Button>
          </div>
        </div>
        <div className="col-12 md:col-5 relative">
          <div className={cx("landing-top-image-container", "static md:absolute")}>
            <div className={cx("landing-top-image-sub-container", "static md:relative")}>
              <Image
                src="/landing-anaytics.jpg"
                alt="landing page top image"
                width={"100%"}
                height={"100%"}
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("grid mt-4 md:mt-8", "landing-middle")}>
        <div className="col-12 pt-4 md:pt-8 flex justify-content-center">
          <h1 className={cx("landing-middle-title", "my-2 text-3xl md:text-6xl")}>Our Platform</h1>
        </div>
        <div className="col-12 md:col-6 md:col-offset-3 mt-4 px-6 flex justify-content-center">
          <h2 className={cx("landing-middle-description")}>
            With <b><u>Ivory Guide</u></b>, you gain easy and instantaneous access to
            trustworthy clinical and manufacturer recommendations, allowing you
            to easily troubleshoot cases and develop treatment plans while your
            patient is in the chair
          </h2>
        </div>
      </div>
      <div className="grid mt-4 mb-2 md:mb-6 pb-6 flex justify-content-center">
        <div className="col-12 md:col-3 px-6 py-4 flex flex-column align-items-center text-lg">
          <Image src="/Workflows.svg" alt="workflow" />
          <h2 className={cx("landing-middle-item")}>Workflows</h2>
          <h5 className={cx("mt-2 mb-0", "landing-middle-item-description")}>
            Our guides can walk you through seemingly complicated processes &
            decisions and make you confident that you've chosen the right
            treatment plan every time
          </h5>
        </div>
        <div className="col-12 md:col-3 flex justify-content-center">
          <Image
            src="/display.png"
            alt="landing page top image"
            width={"100%"}
            height={"100%"}
            className="relative"
          />
        </div>
        <div className="col-12 md:col-3 px-6 py-4 flex flex-column align-items-center">
          <Image src="/Calculator.svg" alt="calculator" />
          <h2 className={cx("landing-middle-item", "pt-1")}>Calculator</h2>
          <h5 className={cx("mt-2", "landing-middle-item-description")}>
            Utilize simple input-output guidance to help make decisions around
            topics like what materials to use and where to purchase them.
          </h5>
        </div>
      </div>
      <div className={cx("landing-help-introduction", "grid mt-2 md:mt-6 mx-4 border-round-xl")}>
        <div className="col-12 pt-8 flex justify-content-center">
          <h1 className={cx("landing-middle-title", "my-2 text-3xl md:text-6xl")}>
            Who can we help?
          </h1>
        </div>
		<div className="col-12 flex md:flex-column">
			<div className="col-12 grid py-4 flex justify-content-center">
				<div className={cx("landing-middle-item", "col-12 md:col-3 px-4 flex flex-column align-items-center")}>
					<div className={cx("blur-shadow", "flex flex-column justify-content-center align-items-center")}>
						<h2>Practices</h2>
						<Image src="/Practices.svg" height="110px" alt="practices" />
					</div>
					<h5 className={cx("landing-middle-item-description", "mt-6 px-2 text-sm md:text-xl font-light")}>
						Our technology can uplevel your practice's patient care while guiding you and your staff through complicated workflows, material selection, and issues that can arise while patients are in chair.
					</h5>
				</div>
				<div className={cx("landing-middle-item", "col-12 md:col-3 px-4 flex flex-column align-items-center")}>
					<div className={cx("landing-middle-item", "flex flex-column justify-content-center align-items-center md:border-x-1")} style={{width: "100%"}}>
						<div className={cx("blur-shadow", "flex flex-column justify-content-center align-items-center")}>
							<h2>Laboratories</h2>
							<Image src="/Laboratories.svg" height="110px" alt="laboratories" />
						</div>
					</div>
					<h5 className={cx("landing-middle-item-description", "mt-6 px-2 text-sm md:text-xl font-light")}>
						Enable your Customer Service team to walk dentists and other
						customers through a variety of technical questions & workflows,
						allowing your technicans to spend more time on the floor and less
						time on the phone.
					</h5>
				</div>
				<div className={cx("landing-middle-item", "col-12 md:col-3 px-4 flex flex-column align-items-center")}>
					<div className={cx("blur-shadow", "flex flex-column justify-content-center align-items-center")}>
						<h2>Schools</h2>
						<Image src="/Schools.svg" height="110px" alt="schools" />
					</div>
					<h5 className={cx("landing-middle-item-description", "mt-6 px-2 text-sm md:text-xl font-light")}>
						Our vast database of information and advanced treatment planning
						tools provide future clinicians, assistants, and technicans with an
						additional resource to leverage while they are learning the
						fundamentals of dentistry.
					</h5>
				</div>
			</div>
		</div>
      </div>
	  <div className={cx("grid my-6 py-6", "landing-missing-section")}>
		<div className="col-12 flex flex-column align-items-center">
			<p className={cx("landing-missing-section-title", "my-2 px-2 text-xl md:text-6xl")}>What are we missing?</p>
			<p className={cx("landing-missing-section-description", "my-1 px-2 text-lg md:text-xl text-center")}>Request a Workflow, Calculator, or additional feature <b><u>here</u></b>.</p>
		</div>
	  </div>
	  <div className="grid">
		<div className={cx("landing-contact-container", "col-10 col-offset-1 pb-4 flex flex-column md:flex-row align-items-center justify-content-between border-bottom-1")}>
    >
			<Image
				src="/Ivory-Guide-Logo-Stack.svg"
				alt="Ivory Guid Logo Stack"
				width="200px"
				className="relative"
			/>
			<div className={cx("landing-contact-section", "blur-shadow", "flex justify-content-between my-3")}>
				<Button icon="pi pi-facebook" rounded text aria-label="Filter" />
				<Button icon="pi pi-instagram" rounded text aria-label="Filter" />
				<Button icon="pi pi-linkedin" rounded text aria-label="Filter" />
			</div>
			<Button outlined className={cx("landing-contact-section-contact-us", "px-5 py-3")}>Contact Us</Button>
		</div>
	  </div>
	  <div className={"grid"}>
	  	<div className="col-10 col-offset-1 md:col-4 md:col-offset-0 flex flex-column align-items-center">
			<p className="text-center md:text-left">@ 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.</p>
		</div>
	  	<div className="col-10 col-offset-1 md:col-4 md:col-offset-4 flex flex-column align-items-center">
			<p className="text-center md:text-right">Report feedback/mistakes by emailing feedback@ivoryguide.com.</p>
		</div>
	  </div>
    </>
  );
}
