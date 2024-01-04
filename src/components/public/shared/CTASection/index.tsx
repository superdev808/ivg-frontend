import classNames from 'classnames/bind';
import styles from './CTASection.module.scss';
import Link from 'next/link';


const cx = classNames.bind(styles);

type CTASectionProps = {
}



export const  CTASection = () => {
	return <div className={cx(['public-content-container','cta-container'])}>
			<div className={cx('grid flex-column align-items-center px-0 my-6 py-6')}>
			<p className={cx('my-2 px-2 text-xl md:text-6xl font-bold')}>What are we missing?</p>
			<p className={cx('my-1 px-2 text-lg md:text-xl text-center')}>
				Request a Workflow, Calculator, or additional feature&nbsp;
                <Link href='/contact'><span className='font-bold text-primary underline'>here</span></Link>
			</p>


			</div>
	
	</div>
}
