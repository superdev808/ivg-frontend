import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Slide, { Item } from "./Slide";

const ITEMS: Item[] = [
  {
    title: "Scan Requirements Calculator",
    description:
      "Remembering which scans to perform when can be challenging as your office transitions from traditional impressions to digital workflows. Provide a few details about your case, and receive a checklist of all necessary scans with helpful tips and recommendations.",
    image: "/images/calculators/scan-requirements.png",
    link: "/calculators/ScanRequirements",
    isMostPopular: true,
  },
  {
    title: "Bonding Calculator",
    description:
      "Knowing how to cement or bond two materials is crucial to seating a long-lasting restoration. See what Ivory Guide’s Clinical Review Board suggests for every material combination.",
    image: "/images/calculators/bonding.png",
    link: "/calculators/BondingEtching",
  },
  {
    title: "Crown Material Selection",
    description:
      "Every restoration is unique. Let Ivory Guide help you determine the ideal material for your patient’s crown.",
    image: "/images/calculators/supplies.png",
    link: "/calculators/ToothBorneCrown",
  },
];

const PopularCalculators: React.FC = () => (
  <div className="bg-light-brown calculator-carousel">
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
    >
      {ITEMS.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Slide item={item} showInfoOnLeft={idx % 2 === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default PopularCalculators;
