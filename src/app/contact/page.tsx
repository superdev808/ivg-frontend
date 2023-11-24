'use client';

import React from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import Footer from "@/components/footer";
const cx = classNames.bind(styles);

export default function ContactPage() {
    const leftOptions = [
        "First & Last Name",
        "Email Address",
        "Company Name",
        "Phone Number",
        "Location"
    ]
    const rightOptions = [
        {
            title: "Company Type",
            options: [
                "Dental Practice",
                "Dental lab",
                "Dental/Technician school",
                "Other"
            ]
        },
        {
            title: "Inquiry Details",
            options: [
                "More Information",
                "Demo request"
            ]
        }
    ]
    return <>
        <div className={cx("grid my-8")}>
            <div className="col-12 col-offset-0 text-center md:text-left md:col-3 md:col-offset-2 md:py-8 md:px-6">
                <h1 className={cx("contact-us-header")}>Contact Us</h1>
                <p className={cx("contact-us-description", "text-2xl")}>Eager to learn how our product can transform your dental business? Please email <b>info@ivoryguide.com</b> with the following information and a few details about how we can help, and we will respond ASAP!</p>
            </div>
            <div className={cx("contact-us-options", "col-12 md:col-7 p-4 md:p-8")}>
                <div className="grid flex flex-column md:flex-row" style={{ width: "100%" }}>
                    <div className="col-10 col-offset-2  md:col-offset-0 md:col-5">
                        {leftOptions.map((item, index) => (
                            <p
                                key={`left-option-${index}`}
                                className={cx("my-4 text-lg md:text-2xl md:text-left")}
                            >
                                <i className={cx("pi pi-check", "px-2")} /> {item}
                            </p>
                        ))}
                    </div>
                    <div className={cx("col-10 col-offset-2 md:col-offset-0 md:col-7 md:border-left-1 md:px-8", "contact-us-options--right")}>
                        {rightOptions.map((item, index) => (
                            <div
                                key={`right-option-${index}`}
                                className={cx("my-4 text-lg md:text-2xl text-left")}
                            >
                                <i className={cx("pi pi-check", "px-2 mb-3")} /> {item.title}
                                {item.options.map((option, optionIndex) => (
                                    <p className="px-4 my-2 text-lg md:text-xl flex align-items-center" key={`right-sub-option-${optionIndex}`}>
                                        <i className={cx("pi pi-circle-fill text-md", "px-2")} /> {option}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="grid">
            <div className={cx("col-12 text-center text-5xl md:text-7xl py-8", "check-out-social")}>
                Check Us Out On Social Media!
            </div>
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
                    "flex justify-content-between my-3"
                    )}
                >
                    <Button icon="pi pi-facebook" rounded text aria-label="Filter" />
                    <Button icon="pi pi-instagram" rounded text aria-label="Filter" />
                    <Button icon="pi pi-linkedin" rounded text aria-label="Filter" />
                </div>
            </div>
        </div>
        <Footer />
    </>
}
