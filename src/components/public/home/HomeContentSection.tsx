import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";

import AdvantageAppointments from "../../../../public/images/home/advantage_appointments.svg";
import AdvantageProcedure from "../../../../public/images/home/advantage_procedure.svg";
import AdvantageSupport from "../../../../public/images/home/advantage_support.svg";

import Practices from "../../../../public/images/home/practices.svg";
import Laboratories from "../../../../public/images/home/laboratories.svg";
import Schools from "../../../../public/images/home/schools.svg";

import { ColItemsSection } from "../shared/ColItemsSection";
import { CTASection } from "../shared/CTASection";

import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export const HomeContentSection = () => {
  const advantageItems = [
    {
      title: "Reduce Additional Appointments",
      description: "",
      image: <AdvantageAppointments />,
    },
    {
      title: "Feel Confident With Every Procedure",
      description: "",
      image: <AdvantageProcedure />,
    },
    {
      title: "Empower Customer Support Teams",
      description: "",
      image: <AdvantageSupport />,
    },
  ];

  const helpItems = [
    {
      title: "Practices",
      description: [
        "Effectively prepare for complicated dental procedures",
        "Streamline component procurement",
        "Troubleshoot patient issues in real-time",
      ],
      image: <Practices />,
    },
    {
      title: "Labs and Manufacturers",
      description: [
        "Enable Customer Support teams",
        "Reduce escalations to lab technicians",
        "Facilitate component ordering",
      ],
      image: <Laboratories />,
    },
    {
      title: "Schools and Educators",
      description: [
        "Simplify complex course material",
        "Provide evidence-supported guidance for complicated procedures",
        "Promote top-tier supplier partners",
      ],
      image: <Schools />,
    },
  ];

  const ctaSectionTitle: string = "Media/Partnership Inquiries";
  const ctaSectionText: JSX.Element = (
    <>
      Interested in collaborating with Ivory Guide? Contact us by emailing&nbsp;
      <Link href="mailto:support@ivoryguide.com">
        <span className="font-bold text-dark-green underline">
          support@ivoryguide.com
        </span>
      </Link>
    </>
  );

  return (
    <div className="relative overflow-hidden bg-light-green">
      <div className="flex flex-column align-items-center justify-content-center text-center mt-8">
        <span
          className={cx(
            "col-12 md:col-8",
            "public-section-title",
            "my-2 text-beige"
          )}
        >
          Our Platform
        </span>
        <span
          className={cx(
            "col-12 md:col-8",
            "public-section-content-2xl",
            "text-center text-beige"
          )}
        >
          Evidence based dental guidance, for all industry professionals.
        </span>
      </div>
      <div className="flex flex-column md:flex-row align-items-center justify-content-center my-6">
        <div className="flex justify-content-center w-full relative p-2">
          <div className="flex flex-1 justify-content-center">
            <Image
              src="/images/home/calculator-mockup.png"
              alt="centerImage"
              className="w-full h-full md:w-10 lg:w-8 xl:w-6"
              width={960}
              height={720}
              quality={40}
            />
          </div>
        </div>
      </div>

      <div className="p-2 md:p-4 border-round relative">
        <ColItemsSection reverse items={advantageItems} title="Our Advantage" />
      </div>

      <div className="flex flex-column align-items-center justify-content-center bg-light-green text-beige md:py-6">
        <span className={cx("mt-4 public-section-title rte")}>Who We Help</span>
        <span
          className={cx("mb-8 text-center my-4 public-section-content-2xl")}
        >
          We are a FREE resource for all dental professionals.
        </span>
        <div className="grid px-4">
          {helpItems &&
            helpItems.map((item, index) => (
              <div
                key={`item_${index}`}
                className={cx(
                  "col-12 flex flex-column gap-4 md:gap-6 md:col-4 md:align-items-center"
                )}
              >
                <div className="flex align-items-center gap-3 pl-6 md:pl-0 xl:gap-4 md:justify-content-center">
                  {item.image}

                  <span
                    className={cx(
                      "public-section-label-2xl text-grey-800 mb-0"
                    )}
                  >
                    {item.title}
                  </span>
                </div>

                {item.description.length > 0 && (
                  <div className="flex flex-column align-items-start gap-2 mb-5">
                    {item.description.map((item, index) => (
                      <div
                        key={`r_${index}`}
                        className={cx(
                          "flex justify-content-center gap-3 public-section-content-xl"
                        )}
                      >
                        <span>
                          <i className="pi pi-check" />
                        </span>
                        <span className="text-left">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <CTASection title={ctaSectionTitle} text={ctaSectionText} />
    </div>
  );
};
