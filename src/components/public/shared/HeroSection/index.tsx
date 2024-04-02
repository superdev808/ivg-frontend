import classNames from "classnames/bind";
import noop from "lodash";
import Link from "next/link";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useEffect } from "react";

import { socialButtons } from "@/helpers/util";
import { useAppDispatch } from "@/redux/hooks/hooks";

import styles from "./HeroSection.module.scss";

const cx = classNames.bind(styles);

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: {
    label: string;
    onClick?: () => void;
  };
  video?: {
    src?: string;
    className?: string;
  };
  image?: {
    src?: string;
    width?: string;
    height?: string;
    offset?: boolean;
    hideOnMobile?: boolean;
    className?: string;
  };
  light?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  cta,
  video,
  image,
  light,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "ui/setTransparentNavBar", payload: true });

    return () => {
      dispatch({ type: "ui/setTransparentNavBar", payload: false });
    };
  }, [dispatch]);

  const renderImage = () => {
    if (!image) {
      return null;
    }

    const imageAttr = {
      alt: "hero-image",
      width: "100%",
      height: "100%",
      offset: false,
      ...image,
    };

    return (
      <div
        className={cx("md:pr-6", {
          "hero-image-container": imageAttr.offset,
          "md:flex align-items-center justify-content-center w-full pt-4":
            !imageAttr.offset,
          hidden: imageAttr.hideOnMobile,
        })}
      >
        <Image
          src={imageAttr.src}
          width={imageAttr.width}
          className={imageAttr.className || ""}
          alt="hero-image"
        />
      </div>
    );
  };

  const renderVideo = () => {
    if (!video) {
      return null;
    }

    return (
      <div
        className={cx(
          "md:pr-6 md:flex align-items-center justify-content-center w-full pt-4"
        )}
      >
        <div className={video.className || ""}>
          <iframe
            src={video.src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={cx("hero-container", "px-3 md:px-0 overflow-hidden", {
        light,
      })}
    >
      <div className={cx("hero-wrapper", "grid justify-content-between")}>
        <div className="col-12 md:col-6">
          <div className="h-full flex align-items-center gap-6 md:pl-4 lg:gap-8">
            <div className="hidden md:flex flex-column justify-content-center gap-5">
              {socialButtons.map((button) => (
                <Link key={button.ariaLabel} href={button.link} target="_blank">
                  <Button
                    pt={{
                      icon: {
                        className: cx("social-button"),
                      },
                    }}
                    className={cx({
                      "text-white": !light,
                      "text-light-green border-light-green": light,
                    })}
                    rounded
                    outlined
                    text
                    icon={button.icon}
                    aria-label={button.ariaLabel}
                  />
                </Link>
              ))}
            </div>

            <div className="flex flex-column justify-content-center align-items-center md:align-items-start lg:pl-0 xl:px-8">
              <span
                className={cx(
                  { "text-primary": !light, "text-light-green": light },
                  "text-4xl sm:text-5xl lg:text-6xl font-semibold text-center md:text-left"
                )}
              >
                {title}
              </span>
              <span className="text-white text-lg md:text-xl text-right md:text-left">
                {subtitle}
              </span>
              {cta && (
                <Button
                  className={cx(
                    { "btn-primary": !light, "btn-light-brown": light },
                    "mt-4 font-bold text-normal md:text-lg md:px-5 md:py-4",
                    { "border-light-green border-1": light }
                  )}
                  onClick={cta.onClick || noop}
                >
                  {cta.label}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 md:flex">
          {image && renderImage()}
          {video && renderVideo()}
        </div>
      </div>
    </div>
  );
};
