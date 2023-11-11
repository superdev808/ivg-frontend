import React, { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { EdgeProps } from 'reactflow';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import styles from '@/components/workflow/Workflow.module.scss';


const nodeStyles: {[key:string]: any} = {
	active: {
		border: '1px solid #83B899',
	},

	hidden: {
			visibility: 'hidden',
	
	},
	selected: {
		border: '2px solid #83B899',
	}
};

export default function CustomNode(props: NodeProps) {
	const [buttonState, setButtonState] = React.useState<string>('hidden');
	
	const node = props.data;


	useEffect(() => {
		if (node.hidden) {
			setButtonState('hidden');
		} 

		else if (node.selected) {
			setButtonState('selected');
		} 
		else {
			setButtonState('active');
		} 
	}, [node]);

	
	function onHover(enter: boolean) {
		if (node.hidden || node.selected) return;
		if (enter) {
			setButtonState('hover');
		} else {
			setButtonState('active');
		}
	}
	return (
		<>
			
				<Handle
				className={node.start ? 'hidden' : ''}
					key={'th_' + props.id}
					id={'th_' + props.id}
					type="target"
					position={Position.Top}
					style={{ visibility: node.hidden ? 'hidden' : 'unset', background: '#83B899',  width: '8px',
					height: '8px', top:'-10px'}}
					isConnectable={false}
				/>
		
			<button
			className={`${styles.node} ${node.selected ? styles.selected : ''}`}

				style={{
					...nodeStyles[buttonState],
					borderRadius: '0.25rem',
					padding: '0.75rem',
					background: 'white',
					fontSize: '0.65rem',
					alignItems: 'center',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					color:'#023932',
					width:  '175px',
					maxHeight: '100px',
					overflowY: 'auto',
					boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
					cursor: 'grab'
				}}>
				<strong>{String(node.value)} </strong>
			</button>

			<Handle
			className={node.end  ? 'hidden' : ''}
				key={'sh_' + props.id}
				id={'sh_' + props.id}
				type="source"
				position={Position.Bottom}
				style={{ visibility: node.hidden? 'hidden' : 'unset', background: '#83B899',  width: '8px',
				height: '8px', bottom:'-10px'}}
				isConnectable={false}
			/>
		</>
	);
}
