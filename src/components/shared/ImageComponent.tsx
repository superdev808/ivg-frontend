import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from 'primereact/dialog';

const ImageComponent = (props) => {
	const { src, fallbackSrc, ...rest } = props;
	const [imgSrc, setImgSrc] = useState(src);
	const [ratio, setRatio] = useState(1);
	const [naturalSize, setNaturalSize] = useState<{ naturalWidth: number; naturalHeight: number }>({ naturalWidth: 0, naturalHeight: 0 });
	const [visible, setVisible] = useState(false);

	return (
		<div className='border-2 border-round border-green-300'>
			<Image
				style={{ cursor: 'zoom-in' }}
				alt={props.key}
				{...rest}
				src={imgSrc}
				width={200}
				height={200 / ratio}
				onError={() => {
					setImgSrc(fallbackSrc);
				}}
				onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
				onClick={() => setVisible(true)}
			/>
			<Dialog
				visible={visible}
				dismissableMask
				onHide={() => setVisible(false)}>
				<Image
					alt={props.key}
					src={imgSrc}
					width={1000}
					height={1000 / ratio}
					onError={() => {
						setImgSrc(fallbackSrc);
					}}
					
				/>
			</Dialog>
		</div>
	);
};

export default ImageComponent;
