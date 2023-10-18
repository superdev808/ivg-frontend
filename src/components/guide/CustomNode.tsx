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
					style={{ background: node.hidden? 'transparent' :'#555' }}
					isConnectable={false}
				/>
		
			<div
				style={{
					border: '1px solid var(--primary-color)',
					borderRadius: '0.25rem',
					padding: '0.75rem',
					background: 'white',
					fontSize: '0.65rem',
					alignItems: 'center',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					color:'black',
					width:  '175px',
					maxHeight: '100px',
					overflowY: 'auto',
					// visibility:'visible'
					opacity: node.hidden ? '0' : '1',
					// height: !props.data.active ? '0' : 'auto',
				}}>
				<strong>{String(node.value)} </strong>
			</div>

			<Handle
			className={node.end  ? 'hidden' : ''}
				key={'sh_' + props.id}
				id={'sh_' + props.id}
				type="source"
				position={Position.Bottom}
				style={{ background: node.hidden? 'transparent' : '#555'	}}
				isConnectable={false}
			/>
		</>
	);
}
