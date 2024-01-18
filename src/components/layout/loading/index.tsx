import styles from './Loading.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


const Loading = () => {
  return <div className={cx('loader')}>
 <div className="background-gradient"></div>
    <div className={cx("one")}></div>
    <div className={cx("two")}></div>


  </div>
}
export default  Loading
