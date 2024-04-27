import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React from "react";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

export interface Item {
  title: string;
  description: string;
  image: string;
  link?: string;
  isMostPopular?: boolean;
}

interface SlideProps {
  item?: Item;
  showInfoOnLeft?: boolean;
  content?: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ item, showInfoOnLeft, content }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!item?.link) {
      return;
    }

    router.push(item.link);
  };

  const info = (
    <div
      className={cx(
        "slide__info",
        "flex flex-column align-items-center text-center text-dark-green line-height-2"
      )}
    >
      {item && (
        <>
          <div className={cx("slide__title", "font-bold")}>{item.title}</div>
          <div className={cx("slide__description", "font-light")}>
            {item.description}
          </div>
          <Button
            className="bg-secondary px-6 py-3 text-xl"
            onClick={handleClick}
          >
            Try now
          </Button>
        </>
      )}
    </div>
  );

  const image = (
    <div className="relative">
      <div
        className={cx("slide__imageWrapper", "border-round", {
          slide__imageWrapperNoHeight: !item,
        })}
      >
        {item && (
          <Image
            src={item.image}
            alt={item.title}
            imageClassName={cx("slide__image")}
          />
        )}
      </div>
      <div
        className={cx(
          showInfoOnLeft ? "slide__imageBackRight" : "slide__imageBackLeft",
          "border-round"
        )}
      />
    </div>
  );

  return (
    <div
      className={cx(
        "slide",
        "flex flex-column md:flex-row justify-content-center align-items-center bg-light-brown px-2 md:px-8 py-4   md:py-8"
      )}
    >
      {showInfoOnLeft ? (
        <>
          {info}
          {image}
        </>
      ) : (
        <>
          {image}
          {info}
        </>
      )}
      {content}
    </div>
  );
};

export default Slide;
