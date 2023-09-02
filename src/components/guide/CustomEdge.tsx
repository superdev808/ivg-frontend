import { ZIndexUtils } from 'primereact/utils';
import React, { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getStraightPath } from 'reactflow';

const CustomEdge: FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data,style }) => {
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
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						background: '#4baaf5',
						// marginLeft:'50px',
						// marginRight:'50px',
						padding: 5,
						// margin:'0 4rem',
						borderRadius: 5,
						fontSize: 12,
						fontWeight: 700,
						zIndex: '10',
						textShadow: data.masked  ? '0 0 8px #000' : '',
						color: data.masked    ? 'transparent' : 'white',
					}}
					className="nodrag nopan">
					{data.value}
				</div>
			</EdgeLabelRenderer>
		</>
	);
};

export default CustomEdge;
