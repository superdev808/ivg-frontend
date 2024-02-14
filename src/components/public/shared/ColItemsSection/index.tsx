import classNames from "classnames/bind";
import { Image } from "primereact/image";

import styles from "./ColItemsSection.module.scss";

const cx = classNames.bind(styles);

interface ThreeColSectionProps {
  title: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
  reverse?: boolean;
  dark?: boolean;
  subtitle?: string;
}

export const ColItemsSection: React.FC<ThreeColSectionProps> = ({
  title,
  items,
  reverse,
  dark,
  subtitle,
}) => (
  <div
    className={cx("col-container", "border-round overflow-hidden", {
      "bg-secondary": dark,
    })}
  >
    <div className="flex flex-column mb-6 align-items-center justify-content-center">
      <div className="flex flex-column mt-4 mb-2 md:mb-8 text-center">
        <span
          className={cx("public-section-title mb-4", { "text-white": dark })}
        >
          {title}
        </span>

        {subtitle && (
          <span
            className={cx(
              "public-section-content-xl",
              "px-6 mb-4 text-center",
              { "text-white": dark }
            )}
          >
            {subtitle}
          </span>
        )}
      </div>

      <div className="grid mx-0 px-0 justify-content-center">
        {items &&
          items.map((item, index) => (
            <div
              key={`item_${index}`}
              className={cx(
                "col-item",
                "col-12 md:col-3 flex flex-column align-items-center text-center px-3 py-4"
              )}
            >
              <span
                className={cx(
                  "public-section-label-2xl",
                  { "flex-order-1": reverse },
                  { "text-white": dark }
                )}
              >
                {item.title}
              </span>

              <div className={cx("relative mt-4", { "flex-order-0": reverse })}>
                <div
                  className={cx(
                    "public-blur-shadow",
                    { "public-blur-shadow-dark": dark },
                    "absolute"
                  )}
                />

                <Image
                  src={item.image}
                  imageClassName="h-auto w-5rem md:w-6rem md:h-6rem"
                  alt={item.title}
                />
              </div>

              <span
                className={cx(
                  "mt-4 md:mt-6 text-center public-section-content-xl",
                  { "text-white": dark }
                )}
              >
                {item.description}
              </span>
            </div>
          ))}
      </div>
    </div>
  </div>
);
