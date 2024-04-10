import classNames from "classnames/bind";
import Link from "next/link";
import { Image } from "primereact/image";

import { ColItemsSection } from "../shared/ColItemsSection";
import { CTASection } from "../shared/CTASection";
import { ScrollCard } from "../shared/ScrollCard";

import AdvantageFracture from "../../../../public/images/about/advantage_fracture.svg";
import AdvantageOverwhelmed from "../../../../public/images/about/advantage_overwhelmed.svg";
import AdvantageInconsistent from "../../../../public/images/about/advantage_inconsistent.svg";

import Compatibility from "../../../../public/images/about/compatibility.svg";
import Suggestions from "../../../../public/images/about/suggestions.svg";
import Procurement from "../../../../public/images/about/procurement.svg";
import Treatment from "../../../../public/images/about/treatment.svg";

import styles from "./About.module.scss";

const cx = classNames.bind(styles);

export const AboutContentSection = () => {
  // Advantage Section
  const advantageItems = [
    {
      title: "Fractured Clinical Approaches",
      description:
        "Dental knowledge is segmented across the country between dental practices, offices, schools and manufacturers, creating communication silos",
      image: <AdvantageFracture />,
    },
    {
      title: "Overwhelmed Support Staffs",
      description:
        "Dental manufacturers frequently lack the ability or staff to provide patient-in-chair or case planning support",
      image: <AdvantageOverwhelmed />,
    },
    {
      title: "Unpredictable Patient Care",
      description:
        "Treatment approaches can vary significantly between offices, harming business growth and lowering customer retention",
      image: <AdvantageInconsistent />,
    },
  ];

  // Offer Section
  const offerItems = [
    {
      title: "Component Compatibility Confirmation",
      description: "",
      image: <Compatibility />,
    },
    {
      title: "Immediate Clinical Suggestions",
      description: "",
      image: <Suggestions />,
    },
    {
      title: "On-Demand Procurement",
      description: "",
      image: <Procurement />,
    },
    {
      title: "Simple Treatment Planning",
      description: "",
      image: <Treatment />,
    },
  ];

  // CTA Section
  const title: string = "What are we missing?";
  const text: JSX.Element = (
    <>
      Request an additional Calculator or feature&nbsp;
      <Link href="/contact">
        <span className="font-bold text-dark-green underline">here</span>
      </Link>
      .
    </>
  );

  return (
    <div className="bg-light-green">
      <div className={cx("section-container")}>
        <div className="flex flex-column align-items-center justify-content-center">
          <div
            className="flex justify-content-center relative w-full p-4 z-1"
            style={{ maxWidth: 750 }}
          >
            <Image
              imageClassName="xl:absolute top-0 left-0"
              src="/images/about/output-mockup.png"
              alt="centerImage"
              width="100%"
            />
          </div>
          <div
            className="w-full px-2 xl:mb-6 grid justify-content-center relative z-2"
            style={{ maxWidth: 1600 }}
          >
            <div className="col-12 xl:col">
              <ScrollCard
                description="Easy to navigate, interactive interface"
                cardClassName={cx("card-1")}
              />
            </div>
            <div className="xl:col-4" />
            <div className="col-12 xl:col">
              <ScrollCard
                description="Allows users to save, export and email result summaries"
                rtl
                cardClassName={cx("card-2")}
              />
            </div>
          </div>
          <div
            className="w-full px-2 grid justify-content-center relative z-2"
            style={{ maxWidth: 1400 }}
          >
            <div className="col-12 xl:col">
              <ScrollCard
                description="Allows for planning of complicated treatment procedures with ease"
                cardClassName={cx("card-3")}
              />
            </div>
            <div className="xl:col-4" />
            <div className="col-12 xl:col">
              <ScrollCard
                description="Provides quick links to purchase necessary components"
                rtl
                cardClassName={cx("card-4")}
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
    </div>
  );
};