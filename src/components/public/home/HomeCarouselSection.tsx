import classNamse from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SOCIAL_BUTTONS } from "@/constants";
import { useAppSelector } from "@/redux/hooks/hooks";

import styles from "./Home.module.scss";

const cx = classNamse.bind(styles);

const SLIDES = [
  "plan",
  "purchase",
  "troubleshoot",
  "treat",
  "communicate",
  "save",
];

export const HomeCarouselSection: React.FC = () => {
  const router = useRouter();

  const { authenticated } = useAppSelector((state) => state.auth);

  const handleJoin = () => {
    router.push("/register");
  };

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2500 }}
        effect="fade"
        speed={1000}
        modules={[Autoplay, EffectFade]}
      >
        {SLIDES.map((name, idx) => (
          <SwiperSlide key={idx}>
            <div className={cx("slide", "px-4 bg-light-brown py-6 md:py-0")}>
              <div
                className={cx(
                  "slide__socialButtons",
                  "absolute flex-column justify-content-center gap-4"
                )}
              >
                {SOCIAL_BUTTONS.map((button) => (
                  <Link
                    key={button.ariaLabel}
                    href={button.link}
                    target="_blank"
                  >
                    <Button
                      className="border-light-green"
                      rounded
                      outlined
                      text
                      icon={button.icon}
                      aria-label={button.ariaLabel}
                    />
                  </Link>
                ))}
              </div>

              <div
                className={cx(
                  "slide__content",
                  "flex flex-column justify-content-center align-items-center gap-4 text-center px-4 md:pl-8"
                )}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold line-height-2">
                  High Quality Dental Care At Your Fingertips
                </div>

                <div className="capitalize bg-beige border-dark-brown border-3 border-round-xl text-dark-brown px-8 py-4 text-3xl">
                  {name}
                </div>

                {!authenticated && (
                  <Button
                    className={cx(
                      "bg-beige border-light-green border-3 border-round-xl text-light-green",
                      "font-bold"
                    )}
                    onClick={handleJoin}
                  >
                    Join for FREE
                  </Button>
                )}
              </div>

              <div className={cx("slide__imageWrapper", "relative md:my-6")}>
                <div
                  className={cx("slide__image")}
                  style={{
                    backgroundImage: `url('/images/home/carousel/${name}.png')`,
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
