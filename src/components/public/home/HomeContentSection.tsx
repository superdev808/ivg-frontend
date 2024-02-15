import classNames from "classnames/bind";
import Link from "next/link";
import { Image } from "primereact/image";

import { ColItemsSection } from "../shared/ColItemsSection";
import { CTASection } from "../shared/CTASection";

import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export const HomeContentSection = () => {
  const advantageItems = [
    {
      title: "Reduce Additional Appointments",
      description: "",
      image: "/images/home/advantage_appointments.svg",
    },
    {
      title: "Feel Confident With Every Procedure",
      description: "",
      image: "/images/home/advantage_procedure.svg",
    },
    {
      title: "Empower Customer Support Teams",
      description: "",
      image: "/images/home/advantage_support.svg",
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
      image: "/images/home/practices.svg",
    },
    {
      title: "Labs and Manufacturers",
      description: [
        "Enable Customer Support teams",
        "Reduce escalations to lab technicians",
        "Facilitate component ordering",
      ],
      image: "/images/home/laboratories.svg",
    },
    {
      title: "Schools and Educators",
      description: [
        "Simplify complex course material",
        "Provide evidence-supported guidance for complicated procedures",
        "Promote top-tier supplier partners",
      ],
      image: "/images/home/schools.svg",
    },
  ];

  const ctaSectionTitle: string = "Media/Partnership Inquiries";
  const ctaSectionText: JSX.Element = (
    <>
      Interested in collaborating with Ivory Guide? Contact us by emailing&nbsp;
      <Link href="mailto:support@ivoryguide.com">
        <span className="font-bold text-white underline">
          support@ivoryguide.com
        </span>
      </Link>
    </>
  );

  return (
    <>
      <div className={cx(["section-container", "relative overflow-hidden"])}>
        <div
          className={cx("background-radial-gradient", "hidden lg:block")}
          style={{
            top: -400,
            left: -300,
            width: 800,
            height: 800,
          }}
        />

        <div
          className={cx("background-radial-gradient", "hidden lg:block")}
          style={{
            top: 400,
            right: -300,
            width: 800,
            height: 800,
          }}
        />

        <div className="flex flex-column align-items-center justify-content-center text-center mt-8">
          <span
            className={cx("col-12 md:col-8", "public-section-title", "my-2")}
          >
            Our Platform
          </span>
          <span
            className={cx(
              "col-12 md:col-8",
              "public-section-content-2xl",
              "text-center"
            )}
          >
            Evidence based dental guidance, for all industry professionals.
          </span>
        </div>
        <div className="flex flex-column md:flex-row align-items-center justify-content-center my-6">
          <div className="flex justify-content-center w-full relative p-2">
            <Image
              src="/images/common/computer.png"
              alt="centerImage"
              width="100%"
            />
            <div
              className="w-8 absolute flex justify-content-center align-content-center"
              style={{ top: "40%", transform: "translateY(-40%)" }}
            >
              <Image
                className=" "
                src="/images/home/image_01.png"
                alt="centerImage"
                width="100%"
              />
            </div>
          </div>
        </div>

        <div className="p-2 md:p-4 border-round relative">
          <ColItemsSection
            reverse
            items={advantageItems}
            title="Our Advantage"
            dark
          />
        </div>

        <div className="flex flex-column align-items-center justify-content-center surface-100 md:py-6">
          <span className={cx("mt-4 public-section-title")}>Who We Help</span>
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
                    <Image
                      src={item.image}
                      width="100%"
                      alt={item.title}
                      className="flex-shrink-0"
                      imageClassName="w-4rem h-auto xl:w-7rem xl:h-7rem"
                    />

                    <span className={cx("public-section-label-2xl mb-0")}>
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
    </>
  );
};
