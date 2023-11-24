import React, { FC, useEffect, memo } from 'react';
import { EdgeProps, getSmoothStepPath, BaseEdge, EdgeText, useStore, MarkerType, EdgeLabelRenderer } from 'reactflow';

import styles from '@/components/workflow/Workflow.module.scss';

import { Properties } from 'csstype';

type EdgeStyles = {
	[key: string]: any;
};
// 023932
const edgeStyles: EdgeStyles = {
	active: {
		background: 'white',
		border: 'solid 1px #023932',
		color: '#023932',
	},

	hidden: {
		visibility: 'hidden',
	},
	selected: {
		background: '#023932',
		border: 'solid 1px #023932',
		color: 'white',

	},
};

const CustomEdge: FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style, markerEnd }) => {
	const [buttonState, setButtonState] = React.useState<string>('hidden');

	const [edgePath, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY:  data.selected ? targetY : targetY -50,
		targetPosition,
	});

	useEffect(() => {
		if (data.hidden) {
			setButtonState('hidden');
		} else if (data.selected) {
			setButtonState('selected');
		} else if (data.active) {
			setButtonState('active');
		} else {
			setButtonState('disabled');
		}
	}, [data]);


	return (
		<>
			<BaseEdge
				id={id}
				path={edgePath}
				interactionWidth={0}
				style={
					data.selected
						? { ...style, strokeWidth: 2, stroke: '#023932' }
						: { visibility: !data.hidden ? 'visible' : 'hidden', width: '150px', height: '200px' }
				}
				markerEnd={markerEnd}

			/>
		
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform:`translate(-50%, -75px) translate(${targetX}px,${targetY}px)`,
            			pointerEvents: 'all',
					}}
					className="nodrag nopan">
					<button
						className={`${styles.edge} ${data.selected ? styles.selected : ''}`}
						style={{
							...edgeStyles[buttonState],
						
							borderRadius: '0.2rem',
							padding: '0.5rem',
							fontSize: '0.65rem',
							cursor: 'grab',
							wordBreak: 'break-word',
							maxWidth: '150px',
						}}>
						{data.value}
					</button>
				</div>
			</EdgeLabelRenderer>
		</>
	);
};

export default memo(CustomEdge);
