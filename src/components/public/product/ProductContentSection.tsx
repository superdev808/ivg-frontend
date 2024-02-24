import classNames from "classnames/bind";
import Link from "next/link";
import { Image } from "primereact/image";

import { ColItemsSection } from "../shared/ColItemsSection";
import { CTASection } from "../shared/CTASection";
import { ScrollCard } from "../shared/ScrollCard";

import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

export const ProductContentSection = () => {
  // Advantage Section
  const advantageItems = [
    {
      title: "Fractured Clinical Approaches",
      description:
        "Dental knowledge is segmented across the country between dental practices, offices, schools and manufacturers, creating communication silos",
      image: "/images/about/advantage_fracture.svg",
    },
    {
      title: "Overwhelmed Support Staffs",
      description:
        "Dental manufacturers frequently lack the ability or staff to provide patient-in-chair or case planning support",
      image: "/images/about/advantage_overwhelmed.svg",
    },
    {
      title: "Unpredictable Patient Care",
      description:
        "Treatment approaches can vary significantly between offices, harming business growth and lowering customer retention",
      image: "/images/about/advantage_inconsistent.svg",
    },
  ];

  // Offer Section
  const offerItems = [
    {
      title: "Component Compatibility Confirmation",
      description: "",
      image: "/images/product/compatibility.svg",
    },
    {
      title: "Immediate Clinical Suggestions",
      description: "",
      image: "/images/product/suggestions.svg",
    },
    {
      title: "On-Demand Procurement",
      description: "",
      image: "/images/product/procurement.svg",
    },
    {
      title: "Simple Treatment Planning",
      description: "",
      image: "/images/product/treatment.svg",
    },
  ];

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
      <div className={cx("section-container")}>
        <div className="flex flex-column align-items-center justify-content-center">
          <div
            className="flex justify-content-center relative w-full p-4 z-1"
            style={{ maxWidth: 750 }}
          >
            <Image
              imageClassName="xl:absolute top-0 left-0"
              src="/images/product/output-mockup.png"
              alt="centerImage"
              width="100%"
            />
          </div>
          <div
            className="w-full px-2 xl:mb-6 grid justify-content-center relative z-2"
            style={{ maxWidth: "1600px" }}
          >
            <div className="col-12 xl:col">
              <ScrollCard description="Easy to navigate, interactive interface" />
            </div>
            <div className="xl:col-3"></div>
            <div className="col-12 xl:col">
              <ScrollCard
                description="Allows users to save, export and email result summaries"
                rtl
              />
            </div>
          </div>
          <div
            className="w-full px-2 grid justify-content-center relative z-2"
            style={{ maxWidth: 1400 }}
          >
            <div className="col-12 xl:col">
              <ScrollCard description="Allows for planning of complicated treatment procedures with ease" />
            </div>
            <div className="xl:col-4" />
            <div className="col-12 xl:col">
              <ScrollCard
                description="Provides quick links to purchase necessary components"
                rtl
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advantage Section*/}
      <div className="p-2 md:p-4 border-round">
        <ColItemsSection
          items={advantageItems}
          title="Let's address the elephant in the room"
          subtitle="The dental industry lacks comprehensive support, training, and treatment planning solutions for doctors and their staff"
        />
      </div>

      {/* Offer Section*/}
      <div className="p-2 md:p-4 border-round">
        <ColItemsSection reverse items={offerItems} title="What We Offer" />
      </div>

      {/* CTA Section */}
      <CTASection text={text} title={title} />
    </>
  );
};
