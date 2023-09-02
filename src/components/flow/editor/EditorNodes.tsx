import React, { memo, use, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const EditNodeComponent = ({ selected, data, isConnectable }: any) => {
	const nodeType = data.nodeType;
	function renderSwitch() {
		switch (nodeType) {
			case 'newStart':
				return (
					<div className="border-dashed border-round border-1 border-gray-500 p-2  text-xs text-gray-500 w-8rem flex justify-content-center bg-white hover:bg-gray-100">
						<i className="pi pi-plus text-xs"></i>
					</div>
				);
			case 'newNode':
				return (
					<div className="border-dashed border-round border-1 border-gray-500 p-2  text-xs text-gray-500 w-8rem flex justify-content-center bg-white hover:bg-gray-100">
						<i className="pi pi-plus text-xs"></i>
					</div>
				);
			default:
				return (
					<div className=" border-round border-1 border-blue-500 p-2  text-xs text-blue-500 max-w-8rem white-space-normal  text-center flex justify-content-center bg-white">
						{data.label}
					</div>
				);
		}
	}

	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
				style={{ display: 'none' }}
				isConnectable={false}
			/>
			{renderSwitch()}
		</>
	);
};

export default memo(EditNodeComponent);
