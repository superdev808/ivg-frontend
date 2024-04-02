import classNames from "classnames/bind";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

export const ContactInfoSection = () => (
  <div className="flex justify-content-center pt-10 bg-beige mb-0 md:pt-4">
    <div style={{ maxWidth: 800 }}>
      <p
        className={cx(
          "public-section-content-2xl text-center text-light-green"
        )}
      >
        Eager to learn how our product can transform your dental business?
        Please submit the form below
      </p>
    </div>
  </div>
);
