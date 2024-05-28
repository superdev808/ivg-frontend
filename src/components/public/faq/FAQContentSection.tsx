import classNames from "classnames/bind";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import Link from "next/link";
import { useState } from "react";

import { CTASection } from "../shared/CTASection";

import styles from "./FAQ.module.scss";
import { FAQ_VIDEOS } from "./constants";

const cx = classNames.bind(styles);

export const FAQContentSection = () => {
  const [opened, setOpened] = useState<string>("");

  const renderEmailLInk = (email: string) => (
    <Link href={`mailto:${email}`}>
      <Button
        link
        label={email}
        className="px-0 pt-0 border-noround text-dark-green"
        style={{ paddingBottom: 1 }}
      />
    </Link>
  );

  const renderVideo = (video: string) => (
    <div className="mt-3 flex flex-column gap-4">
      <video controls preload="preload" className={cx("video-custom")}>
        <source type="video/mp4" src={video}></source>
      </video>
    </div>
  );

  const sections = [
    {
      title: "Calculator Usage Instructions",
      quiz: [
        {
          question: "Use a standalone calculator",
          answer: (
            <>
              <ul className="px-3 m-0 flex flex-column gap-4">
                <li>
                  Within the Calculators + Workflows dropdown, select Explore
                  All and navigate through the tools currently available.
                </li>
                <li>
                  Clicking on a particular calculator or workflow will lead to a
                  new page that requests several pieces of information about the
                  product or procedure type before providing the corresponding
                  outputs and links to purchase, when applicable.
                </li>
              </ul>
              {renderVideo(FAQ_VIDEOS.UseStandaloneCalc)}
            </>
          ),
        },

        {
          question: "Utilizing the All-on-X Surgery and Restorative Calculator",
          answer: (
            <>
              The AoX calculator is a pre-made, custom calculator that provides
              doctors with all the tools and components they need for surgical
              or restorative implant procedures.
              <br />
              <br />
              Using it is simple - navigate to the Customize + Favorites tab on
              the Explore All page, and click on All-on-X Ordering Guide. Then
              select which part of the procedure you would like help with, as
              well as the sites where implants are being placed or restored.
              <br />
              <br />
              From there, answer the subsequent questions and receive a
              customized output for your procedure!
              {renderVideo(FAQ_VIDEOS.AllOnXCalc)}
            </>
          ),
        },

        {
          question: "Create a custom calculator",
          answer: (
            <>
              Within the Explore All page, navigate to the Customize + Favorites
              tab and click on “Custom.” Select which calculators you would like
              to combine to make a custom report.
              <br />
              <br />
              You will then be directed through the relevant questions for each
              calculator before receiving a combined summary with the ability to
              save, email, or export your report.
              {renderVideo(FAQ_VIDEOS.CustomCalc)}
            </>
          ),
        },

        {
          question: "Email exporting a PDF overview",
          answer: (
            <ul className="px-3 m-0 flex flex-column gap-4">
              <li>
                Click the Export or Email buttons in the top right corner of the
                summary page of your chosen calculator.
                {renderVideo(FAQ_VIDEOS.ExportPdf)}
              </li>
              <li>
                You will be prompted to enter a Patient Name and Patient
                Address, as well as name the PDF export. This information is
                optional. You can send this PDF to yourself, or to a colleague
                or patient by providing their email address.
                {renderVideo(FAQ_VIDEOS.EmailExportPdfOverview)}
              </li>
            </ul>
          ),
        },

        {
          question: "Saving a calculator",
          answer: (
            <>
              <ul className="px-3 m-0 flex flex-column gap-4">
                <li>
                  Click the Save button at the top of the output summary page of
                  your chosen calculator.
                </li>
                <li>Name the Saved output, and click Save.</li>
                <li>
                  To access Saved outputs, select Saved Results within your
                  account icon in the top right corner.
                </li>
              </ul>
              {renderVideo(FAQ_VIDEOS.SavingCalc)}
            </>
          ),
        },

        {
          question: "Adding a Calculator to your Favorites list",
          answer: (
            <>
              <ul className="px-3 m-0 flex flex-column gap-4">
                <li>
                  Click the Save button at the top of the output summary page of
                  your chosen calculator.
                </li>
                <li>
                  Click the “Add Calculator to Favorites” button in the bottom
                  left of the popup.
                </li>
                <li>
                  You can view your Favorites on the Customize + Favorites tab
                  of the Explore All page.
                </li>
              </ul>
              {renderVideo(FAQ_VIDEOS.AddingCalc)}
            </>
          ),
        },
      ],
    },

    {
      title: "Product Requests ",
      quiz: [
        {
          question:
            "How can I request a new brand to be added into a calculator or workflow?",
          answer: (
            <>
              Email {renderEmailLInk("feedback@ivoryguide.com")} with specific
              brand details. As possible, please include any relevant product
              catalogs. We will respond within 24 hours.
            </>
          ),
        },

        {
          question: "How can I request a new type of calculator or workflow?",
          answer: (
            <>
              On the Calculators + Workflows dropdown, select Submit Request and
              fill out the form. Alternatively, email{" "}
              {renderEmailLInk("feedback@ivoryguide.com")}
              with details about the type of calculator you are requesting and
              we will respond within 24 hours.
            </>
          ),
        },

        {
          question: "How can I provide feedback to improve a calculator?",
          answer: (
            <>
              We love feedback! Please email{" "}
              {renderEmailLInk("feedback@ivoryguide.com")} with what you would
              like to see improved. We will respond within 24 hours.
              <br />
              <br />
              Alternatively, click the Feedback button inside the platform on
              the right side of the screen. There you can attach a screenshot
              and provide details about any feature.
            </>
          ),
        },
      ],
    },

    {
      title: "Errors and Bugs",
      quiz: [
        {
          question:
            "Report a content error within a calculator or workflow (i.e. an implant input or component output is incorrect).",
          answer: (
            <>
              Email {renderEmailLInk("support@ivoryguide.com")} with details
              about where the error occurred and what the specific error was. We
              will respond within 24 hours.
              <br />
              <br />
              Alternatively, click the Feedback button inside the platform on
              the right side of the screen. There you can attach a screenshot
              and provide details about the bug.
            </>
          ),
        },

        {
          question:
            "Report a software bug within a calculator (i.e. a calculator is loading slowly, or did not display expected outputs).",
          answer: (
            <>
              Email {renderEmailLInk("support@ivoryguide.com")} with details
              about where the error occurred and what the specific error was. We
              will respond within 24 hours.
              <br />
              <br />
              Alternatively, click the Feedback button inside the platform on
              the right side of the screen. There you can attach a screenshot
              and provide details about the bug.
            </>
          ),
        },
      ],
    },

    {
      title: "Account Questions",
      quiz: [
        {
          question: "How can I reset my password?",
          answer: (
            <ul className="px-3 m-0 flex flex-column gap-4">
              <li>
                Go to the login page and select forgot your password? Follow the
                prompt and enter the email that is associated with your account.
                You will receive an email that will redirect you to reset your
                password.
              </li>
              <li>
                You can also reset your password from your account settings.
              </li>
              <li>Go to Settings {">"} Password & Security.</li>
            </ul>
          ),
        },

        {
          question: "Can I change my account’s email address?",
          answer: (
            <>
              For security reasons, we do not allow users to change their
              account&apos;s email address directly.
              <br />
              <br />
              If you need your account&apos;s email address changed, please
              contact {renderEmailLInk("support@ivoryguide.com")} for
              assistance.
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <div className={cx("section-header", "bg-light-green text-beige")}>
        <span className="text-2xl md:text-5xl font-bold z-1">
          Frequently Asked Questions
        </span>
        <span className="pt-4 z-1">{`We are here to help you. If you don't see your question here, please contact us.`}</span>
      </div>

      <div className="flex justify-content-center relative overflow-hidden">
        <div className="px-3 w-full flex flex-column gap-4 my-4 md:px-0 md:gap-6 md:w-8">
          {sections.map((section, sectionIdx) => (
            <>
              <h2 className="mb-0 text-center">{section.title}</h2>

              <div key={section.title} className="grid">
                {section.quiz.map((item, questionIdx) => {
                  const accordionId = `accordian_${sectionIdx}_${questionIdx}`;

                  return (
                    <Accordion
                      key={accordionId}
                      activeIndex={opened === accordionId ? 0 : -1}
                      className="col-12 md:col-6"
                      onTabChange={() =>
                        setOpened((prevState) =>
                          prevState === accordionId ? "" : accordionId
                        )
                      }
                    >
                      <AccordionTab
                        key={accordionId}
                        pt={{
                          root: { className: "shadow-none" },
                          header: {
                            className:
                              "border-2 border-round-2xl overflow-hidden",
                          },
                          // @ts-ignore
                          headeraction: {
                            className: cx({
                              "bg-beige": opened !== accordionId,
                              "bg-light-green text-beige":
                                opened === accordionId,
                            }),
                          },
                          headerTitle: { className: "w-full pr-1" },
                          content: { className: "p-0 bg-transparent" },
                        }}
                        header={
                          <div className="font-bold text-sm md:text-basefont-bold text-sm md:text-base">
                            {item.question}
                          </div>
                        }
                      >
                        <p className="m-0 px-3 pt-3 text-sm md:text-base">
                          {item.answer}
                        </p>
                      </AccordionTab>
                    </Accordion>
                  );
                })}
              </div>
            </>
          ))}
        </div>
      </div>

      <CTASection
        title="What are we missing?"
        text={
          <>
            Request an additional Calculator or feature{" "}
            <Link href="/contact">
              <span className="font-bold text-dark-green underline">here</span>
            </Link>
            .
          </>
        }
      />
    </>
  );
};
