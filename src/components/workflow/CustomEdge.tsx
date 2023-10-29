import { ZIndexUtils } from 'primereact/utils';
import React, { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getStraightPath, Position } from 'reactflow';

const CustomEdge: FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style }) => {
	const [edgePath, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<BaseEdge
				id={id}
				path={edgePath}
				style={data.selected ? { ...style, stroke: 'var(--primary-color)', strokeWidth: 4 } : {visibility: !data.hidden ? 'visible' : 'hidden'}}
			/>
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',

						// transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						transform:  data.selected ? `translate(-50%,-200%) translate(${targetX}px,${targetY}px)` :`translate(-50%,-100%) translate(${targetX}px,${targetY}px)`,
						background: data.selected ? 'var(--primary-color)' : data.active ? 'var(--green-100)' : 'grey',
						border: data.selected ? 'white' : data.active ? 'solid 1px var(--primary-color)' : '',
						padding: 7,
						borderRadius: 5,
						fontSize: 10,
						fontWeight: 600,
						zIndex: '10',
						color: data.selected ? 'white' :  data.active ? 'var(--primary-dark-color)' : 'white',
						width: '150px',
						textAlign: 'center',
						visibility: !data.hidden ? 'visible' : 'hidden',
						// textShadow: !data.active  ? '0 0 8px #000' : '',
						// color: !data.active    ? 'transparent' : 'white',
					}}
					className="nodrag nopan">
					{data.value}
				</div>
			</EdgeLabelRenderer>
		</>
	);
};

export default CustomEdge;
