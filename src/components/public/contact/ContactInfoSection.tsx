import classNames from "classnames/bind";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

export const ContactInfoSection = () => (
  <div className={cx("section-container", "mb-0 pt-6 md:pt-4")}>
    <div style={{ maxWidth: 800 }}>
      <p className={cx("public-section-content-2xl text-center text-gray-600")}>
        Eager to learn how our product can transform your dental business?
        Please submit the form below
      </p>
    </div>
  </div>
);
