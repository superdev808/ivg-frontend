import { ZIndexUtils } from 'primereact/utils';
import React, { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getStraightPath } from 'reactflow';

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
				style={data.active ? { ...style, stroke: '#4baaf5', strokeWidth: 3 } : {}}
			/>
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',

						// transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						transform: `translate(-50%, -100%) translate(${targetX}px,${targetY}px)`,
						background: data.active ? '#4baaf5' : data.option ? '#f4fafe' : 'grey',
						border: data.option ? 'solid 1px #1769aa' : '',
						padding: 7,
						borderRadius: 5,
						fontSize: 10,
						fontWeight: 600,
						zIndex: '10',
						color: data.option &&  !data.active ? '#1769aa' : 'white',
						width: '150px',
						textAlign: 'center',
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
