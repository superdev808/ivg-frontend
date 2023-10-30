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
		<div>
			<Image
				alt={props.key}
				{...rest}
				src={imgSrc}
				width={100}
				height={100 / ratio}
				onError={() => {
					setImgSrc(fallbackSrc);
				}}
				onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
				onClick={() => setVisible(true)}
			/>
			<Dialog
				visible={visible}
				onHide={() => setVisible(false)}>
				<Image
					alt={props.key}
					src={imgSrc}
					width={1.5 * naturalSize.naturalWidth}
					height={1.5* naturalSize.naturalHeight}
					onError={() => {
						setImgSrc(fallbackSrc);
					}}
					onLoadingComplete={({ naturalWidth, naturalHeight }) => setNaturalSize({ naturalWidth, naturalHeight })}
				/>
			</Dialog>
		</div>
	);
};

export default ImageComponent;
