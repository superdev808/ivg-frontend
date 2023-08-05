import { ZIndexUtils } from 'primereact/utils';
import React, { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getBezierPath } from 'reactflow';

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath}  
 />
      <EdgeLabelRenderer>
        
        <div
          style={{
            
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${sourceX}px,${sourceY}px)`,
            background: '#4baaf5',
            // marginLeft:'50px',
            // marginRight:'50px',
            padding: 5,
            // margin:'0 4rem',
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            zIndex:'10',
            textShadow: !data.visible  && data.mask ? "0 0 8px #000": "",
            color: !data.visible && data.mask ? "transparent": "white"
          }}
          className="nodrag nopan"
        >
          {data.edge.text_1}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
