import classNames from "classnames/bind";

import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

const Loading: React.FC = () => (
  <div className={cx("loader")}>
    <div className={cx("one")} />
    <div className={cx("two")} />
  </div>
);

export default Loading;
