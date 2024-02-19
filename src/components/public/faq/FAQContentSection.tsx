import classNames from "classnames/bind";
import { Accordion, AccordionTab } from "primereact/accordion";
import Link from "next/link";
import { useState } from "react";

import { CTASection } from "../shared/CTASection";

import styles from "./FAQ.module.scss";

const cx = classNames.bind(styles);

export const FAQContentSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const questionItems = [
    {
      header: "How Do I Contact Support? ",
      content: (
        <>
          <div className="flex flex-column">
            <span className="col font-bold">support@ivoryguide.com:</span>
            <span className="col">
              For any customer support questions or incorrect information listed
              on site; for any additional information or questions you may have.
            </span>

            <span className="col font-bold">feedback@ivoryguide.com:</span>
            <span className="col">
              For any feedback on the website or existing calculators
            </span>
          </div>
        </>
      ),
    },
    {
      header: "How can I request a new brand to be added into a calculator?",
      content: (
        <>
          Email feedback@ivoryguide.com with specific brand details. As
          possible, please include any relevant product catalogs. We will
          respond within 2 hours.
        </>
      ),
    },
    {
      header: "How can I request a new type of calculator?",
      content: (
        <>
          Email feedback@ivoryguide.com with details about the type of
          calculator you are requesting. We will respond within 2 hours.
        </>
      ),
    },
    {
      header: "How can I provide feedback to improve a calculator?",
      content: (
        <>
          We love feedback! Please email feedback@ivoryguide.com with what you
          would like to see improved. We will respond within 24 hours.{" "}
        </>
      ),
    },
    {
      header: "How can I reset my password?",
      content: (
        <>
          <p>
            Go to the login page and select Forgot your password? Follow the
            prompt and enter the email that is associated with your account. You
            will receive an email that will redirect you to reset your password.
          </p>
          <p>
            You can also reset your password from your account settings. Go to
            Settings {">"} Password & Security. CONT.
          </p>
        </>
      ),
    },
    {
      header: "How do I add my businessr’s information for the export feature?",
      content: (
        <>Will need to add an explanation when the section is built out.</>
      ),
    },
    {
      header: "Can I change my account’s email address?",
      content: (
        <>
          {`Yes! Go to Settings > Profile. There you will see a email… CONT.`}{" "}
        </>
      ),
    },
    {
      header: "Can I export my Calculator Results? ",
      content: <>Instructions</>,
    },
    ,
    {
      header: "How do I access my saved Calculators?",
      content: <>Instructions</>,
    },
  ];

  const renderAccordian = (index: number) => (
    <Accordion
      key={`accordian_${index}`}
      className="col-12 md:col-6 my-2 md:px-4"
      activeIndex={activeIndex === index + 1 ? 0 : -1}
      onTabChange={(e) =>
        setActiveIndex(activeIndex == index + 1 ? -1 : index + 1)
      }
    >
      <AccordionTab
        pt={{
          root: { className: cx("shadow-none") },
          header: { className: cx("border-2 border-round-2xl") },
          headeraction: {
            className: cx("border-round-2xl", {
              "bg-primary": activeIndex === index + 1,
            }),
          }, // eslint-disable-line
          headerTitle: { className: cx("w-full pr-1") },
          content: { className: cx("p-0 bg-transparent") },
        }}
        header={
          <div className="font-bold text-sm md:text-base">
            {questionItems[index]?.header}
          </div>
        }
      >
        <p className="m-0 px-3 py-3 text-sm md:text-base">
          {questionItems[index]?.content}
        </p>
      </AccordionTab>
    </Accordion>
  );

  // CTA Section
  const title: string = "What are we missing?";
  const text: JSX.Element = (
    <>
      Request an additional Calculator or feature&nbsp;
      <Link href="/contact">
        <span className="font-bold text-primary underline">here</span>
      </Link>
      .
    </>
  );

  return (
    <>
      <div className={cx("bg-secondary", "h-5rem")} />

      <div className={cx("section-header")}>
        <span className="text-2xl md:text-5xl font-bold z-1">
          Frequently Asked Questions
        </span>
        <span className="pt-4 z-1">{`We are here to help you. If you don't see your question here, please contact us.`}</span>
      </div>
      <div className="flex justify-content-center relative">
        <div className={cx("background-radial-gradient")} />
        <div className="grid m-0 p-0 mx-2 md:w-8 my-4 md:my-8">
          {questionItems.map((_, index) => renderAccordian(index))}
        </div>
      </div>

      <CTASection text={text} title={title} />
    </>
  );
};
