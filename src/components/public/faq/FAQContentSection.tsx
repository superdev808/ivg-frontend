import classNames from "classnames/bind";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import Link from "next/link";
import { useState } from "react";

import { CTASection } from "../shared/CTASection";

import styles from "./FAQ.module.scss";

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

  const sections = [
    {
      title: "Calculator Usage Instructions",
      quiz: [
        {
          question: "Use a standalone calculator",
          answer: (
            <ul className="px-3 m-0 flex flex-column gap-4">
              <li>
                Within the Calculators homepage, select Implant Component
                Selection and scroll through the calculators currently available
                to support component procurement.
              </li>
              <li>
                Clicking on a particular calculator will lead to a new page that
                requests several pieces of information around implant and
                product type before providing the correct components and links
                to purchase.
              </li>
            </ul>
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
              Using it is simple - click on All-on-X Surgery and Restorative
              Calculator within the calculator section, select which part of the
              procedure you would like help with as well as the sites where
              implants are being placed or restored.
              <br />
              <br />
              From there, answer the subsequent questions and receive a
              customized output for your procedure!
            </>
          ),
        },

        {
          question: "Create a custom calculator",
          answer: (
            <>
              Within the Calculators homepage, click “Custom Combinations” and
              select which calculators you would like to combine to make a
              custom report.
              <br />
              <br />
              You will then be directed through the relevant questions for each
              calculator before receiving a combined summary with the ability to
              save, email, or export your report.
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
              </li>
              <li>
                You will be prompted to enter a Patient Name and Patient
                Address, as well as name the PDF export. You can send this PDF
                to yourself, or to a colleague or patient by providing their
                email address.
              </li>
            </ul>
          ),
        },

        {
          question: "Saving a calculator",
          answer: (
            <ul className="px-3 m-0 flex flex-column gap-4">
              <li>
                Click the Save button in the top right corner of the summary
                page of your chosen calculator.
              </li>
              <li>Name the Saved output.</li>
              <li>
                To access Saved outputs, select Saved Results within your
                account Icon in the top right corner.
              </li>
            </ul>
          ),
        },
      ],
    },

    {
      title: "Product Requests ",
      quiz: [
        {
          question:
            "How can I request a new brand to be added into a calculator?",
          answer: (
            <>
              Email {renderEmailLInk("feedback@ivoryguide.com")} with specific
              brand details. As possible, please include any relevant product
              catalogs. We will respond within 24 hours.
            </>
          ),
        },

        {
          question: "How can I request a new type of calculator?",
          answer: (
            <>
              Email {renderEmailLInk("feedback@ivoryguide.com")} with details
              about the type of calculator you are requesting. We will respond
              within 24 hours.
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
            "Report a content error within a calculator (i.e. an implant input or component output is incorrect).",
          answer: (
            <>
              Email {renderEmailLInk("support@ivoryguide.com")} with details
              about where the error occurred and what the specific error was. We
              will respond within 24 hours. <br />
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

      <div className="flex justify-content-center relative overflow-hidden bg-beige text-light-green">
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
                              "bg-beige text-light-green":
                                opened !== accordionId,
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
                        <p className="m-0 px-3 pt-3 text-light-green text-sm md:text-base">
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
