import React, { useEffect, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { EdgeProps } from 'reactflow';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import styles from '@/components/workflow/Workflow.module.scss';
import { useAppSelector } from '@/redux/hooks';

const nodeStyles: { [key: string]: any } = {
	active: {
		border: '1px solid #023932',
		background: '#CCD7D6',
	},

	hidden: {
		visibility: 'hidden',
	},
	selected: {
		border: '2px solid #023932',
		background: '#CCD7D6',
	},
};

const CustomNode = (props: NodeProps) => {
	const [buttonState, setButtonState] = React.useState<string>('hidden');
	const node = props.data;

	const getHandles = () => {
		const count = node.children;
	
		if (count === 2) {
			return [
				[Position.Bottom, { bottom: '-10px', left: '53px' }],
				[Position.Bottom, { bottom: '-10px', left: '106px' }],
			];
		} else if (count === 3) {
			return [
				[Position.Left, { left: '-10px' }],
				[Position.Bottom, { bottom: '-10px' }],
				[Position.Right, { right: '-10px' }],
			];
		}else if (count === 4) {
			return [
				[Position.Left, { left: '-10px' }],
				[Position.Bottom, { bottom: '-10px', left: '53px' }],
				[Position.Bottom, { bottom: '-10px', left: '106px' }],
				[Position.Right, { right: '-10px' }],
			];
		}
		return [[Position.Bottom, { bottom: '-10px' }]];
	};

	useEffect(() => {
		if (node.hidden) {
			setButtonState('hidden');
		} else if (node.selected) {
			setButtonState('selected');
		} else {
			setButtonState('active');
		}
	}, [node]);

	return (
		<>
			<Handle
				className={node.start ? 'hidden' : ''}
				key={'th_' + props.id}
				id={'th_' + props.id}
				type="target"
				position={Position.Top}
				style={{ visibility: 'hidden', background: '#83B899', width: '8px', height: '8px' }}
				isConnectable={false}
			/>

			<button
				className={`${styles.node} ${node.selected ? styles.selected : ''}`}
				style={{
					...nodeStyles[buttonState],
					borderRadius: '0.25rem',
					padding: '0.75rem',
					fontSize: '0.65rem',
					alignItems: 'center',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					color: '#023932',
					width: '175px',
					maxHeight: '100px',
					overflowY: 'auto',
					boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
					cursor: 'grab',
				}}>
				<strong>{String(node.value)} </strong>
			</button>

			{getHandles().map((handle: any, index: number) => {

				return (
					<Handle
						className={node.end ? 'hidden' : ''}
						key={'sh_' + props.id + '_' + index}
						id={'sh_' + props.id + '_' + index} 
						type="source"
						position={handle[0]}
						style={{ visibility: node.hidden ? 'hidden' : 'unset', background: '#023932', width: '8px', height: '8px', ...handle[1] }}
						isConnectable={false}
					/>
				);
			})}
			{/* <Handle
			className={node.end  ? 'hidden' : ''}
				key={'sh_left_' + props.id}
				id={'sh_left_' + props.id}
				type="source"
				position={Position.Bottom}
				style={{ visibility: node.hidden? 'hidden' : 'unset', background: '#83B899',  width: '8px',
				height: '8px', bottom:'-10px', left:'10px'}}
				isConnectable={false}
			/> */}
		</>
	);
};

export default memo(CustomNode);
