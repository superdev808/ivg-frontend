import classNames from "classnames/bind";
import { Button } from "primereact/button";
import React from "react";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Request: React.FC = () => (
  <div className="flex flex-column align-items-center mt-6">
    <div className={cx("heading")}>Have an idea for a new feature?</div>
    <Button className="bg-secondary text-xl">Submit a new idea</Button>
  </div>
);

export default Request;
