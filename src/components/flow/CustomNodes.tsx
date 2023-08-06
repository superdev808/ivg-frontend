import React, { useState } from 'react';
import { Handle, NodeProps, Position,  } from 'reactflow';
import { EdgeProps } from 'reactflow';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';


export default function CustomNodes(props: NodeProps) {
	const node = props.data.node;
	const edges = props.data.edges;
	const _positions: any[] = [];
	if (edges[0]) {
		let _edges = edges;
		let _width = 350;
		let _minDistance = 0;

		if (edges.length >= 3) {
			_positions.push([Position.Left, -0]);
			_edges = edges.slice(1, -1);
		}

		let totalSpacing = _width - _minDistance * (_edges.length - 1);
		let spacing = totalSpacing / (_edges.length - 1 || totalSpacing);

		let anchorOffset = (_width - totalSpacing) / 2;
		if (spacing === 1) {
			anchorOffset = _width / 2;
		}

		for (let i = 0; i < _edges.length; i++) {
			const x = anchorOffset + i * (spacing + _minDistance);

			_positions.push([Position.Bottom, Math.floor(x)]);
		}

		if (edges.length >= 3) {
			_positions.push([Position.Right, 'unset']);
		}
	} else {
		_positions.push([Position.Bottom, 0]);

	}
	const [displayResponsive, setDisplayResponsive] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState('');
	const onVideoDialogHide = () => {
		setSelectedVideo('');
		setDisplayResponsive(false);
	};
	const openLink = (link: string, type: Number) => {
		switch (type) {
			case 0:
				window.open(link);

				break;
			case 1:
				// code block
				break;
			case 2:
				setDisplayResponsive(true);
				setSelectedVideo(link);
				break;
			default:
			// code block
		}
	};
	return (
		<>
			{edges[0] ? (
				edges.map((target: string, index: number) => (
					<Handle
						key={target + '_handle'}
						id={target}
						type="source"
						position={_positions[index][0]}
						style={{ left: _positions[index][1], background: '#555', display: 'hidden' }}
						isConnectable={false}
					/>
				))
				) : (
					<></>
					)}
			<div
				style={{
					border: '1px solid var(--primary-color)',
					borderRadius: '0.25rem',
					padding: '2rem',
					background: 'white',

					width: '350px',
					height: '100%',
					alignItems: 'center',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					textShadow: !props.data.visible && props.data.mask ? '0 0 8px #000' : '',
					color: !props.data.visible && props.data.mask ? 'transparent' : 'black',
				}}>
				<div className="flex flex-column justify-content-center">
					{node.external_link && props.data.visible? (
						node.link_type === 0 ? (
							<a
								className=" cursor-pointer border-2 border-round border-gray-500 hover:border-blue-700 hover:shadow-4"
								onClick={() => openLink(node.external_link, node.link_type)}>
								<div className="flex justify-content-start">
									<Image
										src={node.thumbnail}
										alt={node.text_1}
										width={100}
										height={100}
									/>

									<div className="border-left-1 border-gray-500 ">
										<p className=" text-base px-2">{node.text_1}</p>
										<p className="text-500 text-sm">
											<Image
												src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${node.external_link}`}
												alt={node.text_2}
												width={15}
												height={15}
											/>
											<span className="px-2">{node.text_2}</span>
										</p>
									</div>
								</div>
							</a>
						) : (
							<a
								className=" cursor-pointer flex flex-column"
								onClick={() => openLink(node.external_link, node.link_type)}>
						

									<div className="">
										<p className=" text-base px-2">{node.text_1}</p>
								
									</div>
									<div className="justify-content-center ">

									<Image
										src={node.thumbnail}
										alt={node.text_1}
										width={0}
										height={0}
										style={{width: 'auto', height: '150px'}}
									/>
									</div>
							</a>
						)
					) : (

						<strong>{String(node.text_1)} </strong>
					)}
				</div>
			</div>
			{!node.start ? (
				<Handle
					type="target"
					position={Position.Top}
					style={{ background: '#555' }}
					isConnectable={false}
				/>
			) : (
				<></>
			)}
			<Dialog
				visible={displayResponsive}
				onHide={() => onVideoDialogHide()}
				draggable={false}
				breakpoints={{ '960px': '75vw' }}
				style={{ width: '75vw' }}
				closeOnEscape={true}>
				<div style={{ position: 'relative', paddingBottom: '700px', height: 0 }}>
					<iframe
						src={selectedVideo + '?hideEmbedTopBar=true&hide_share=true&hide_owner=true'}
						frameBorder={'0'}
						allowFullScreen={true}
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe>
				</div>
				{/* <Player
					playsInline
					src={selectedVideo}
					>
						
					<BigPlayButton position={'center'} />
				</Player> */}
			</Dialog>
		</>
	);
}
