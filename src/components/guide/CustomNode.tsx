import React, { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { EdgeProps } from 'reactflow';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';

export default function CustomNode(props: NodeProps) {
	const node = props.data;

	return (
		<>

				<Handle
				className={node.start ? 'hidden' : ''}
					key={'th_' + props.id}
					id={'th_' + props.id}
					type="target"
					position={Position.Top}
					style={{ background: '#555' }}
					isConnectable={false}
				/>
		
			<div
				style={{
					border: '1px solid var(--primary-color)',
					borderRadius: '0.25rem',
					padding: '0.75rem',
					background: 'white',
					fontSize: '0.75rem',
					alignItems: 'center',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					textShadow: !props.data.active ? '0 0 8px #000' : '',
					color: !props.data.active ? 'transparent' : 'black',
					// width: !props.data.active ? '0' : '175px',
					// height: !props.data.active ? '0' : 'auto',
				}}>
				<strong>{String(node.value)} </strong>
			</div>

			<Handle
			className={node.end ? 'hidden' : ''}
				key={'sh_' + props.id}
				id={'sh_' + props.id}
				type="source"
				position={Position.Bottom}
				style={{ background: '#555' }}
				isConnectable={false}
			/>
		</>
	);
}
