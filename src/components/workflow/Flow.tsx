import React, { useState, useMemo, useEffect, use } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setSelectedPathIds } from '@/redux/features/workflowSelectionSlice';
import ReactFlow, {
	ConnectionLineType,
	useNodesState,
	useEdgesState,
	Background,
	ReactFlowProvider,
	useReactFlow,
	NodeTypes,
	MiniMap,
	EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import dagre from '@dagrejs/dagre';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import {  PathIds } from '@/types/Workflow';
import { selectWorkflowSelection } from '@/redux/features/workflowSelectionSlice';
interface NodeData {
	id: number;
	flowId: number;
	value: string;
	start: boolean;
	children: NodeData[];
	edges: EdgeData[];
}

interface EdgeData {
	id: number;
	flowId: number;
	value: string;
	source: number | null;
	target: number | null;
}

interface Node {
	id: string;
	data: { value: string; refId: number; start: boolean; end: boolean; active: boolean; marked: boolean };
	position: { x: number; y: number };
	targetPosition: 'top' | 'bottom';
	sourcePosition: 'top' | 'bottom';
	width: number;
	height: number;
	type: string;
	draggable: boolean;
	hidden: boolean;
}

interface Edge {
	id: string;
	data: { value: string; refId: number };
	source: string;
	target: string;
	type: string; // replace with your edge type
	animated: boolean;
	style: any;
}

const Flow = () => {
	const dispatch = useDispatch();
	const { selectedEdgeData, selectedNodeData, selectedPathIds } = useSelector(selectWorkflowSelection);


	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { setCenter, getEdges, getNodes, getNode } = useReactFlow();

	const nodeTypes: NodeTypes = useMemo(
		() => ({
			custom: CustomNode,
		}),
		[]
	);
	const edgeTypes: EdgeTypes = useMemo(
		() => ({
			custom: CustomEdge,
		}),
		[]
	);


	// Function to calculate the XY position for nodes
	const getHierarchicalMultiLevelLayout = (nodes, edges) => {
		const spacingX = 200;
		const spacingY = 200;
		const maxChildrenPerLevel = 4;
		const activeOffset = 0; // Additional Y-offset for active nodes

		// Helper function to get the deepest y-position among children
		const getDeepestChildY = (node) => {
			const children = nodes.filter((n) => n.data.parent === node.id);
			if (children.length === 0) return node.position.y;
			return Math.max(...children.map(getDeepestChildY));
		};

		// Helper function to set positions recursively
		const setPositions = (node, x, y, level) => {
			
			
			// Additional offset for active nodes
			const additionalOffset = node.data.active ? activeOffset : 0;

			// If the node is active, move it beyond the last layer of children
			if (node.data.active) {
				y = getDeepestChildY(node) + activeOffset;
			}

			// Set the position of the current node
			node.position = { x, y: y + additionalOffset };

			// Retrieve the children of the current node
			let children = [];
			const edgeConnectors = edges.filter((edge: Edge) => edge.source === String(node.id));
			if (edgeConnectors.length > 0) {
				const targetIds = edgeConnectors.map((edge: Edge) => edge.target);

				children = nodes.filter((node: Node) => targetIds.includes(String(node.id)));
			}
			// Calculate the starting x-position for the first child
			let nextX = x - ((Math.min(maxChildrenPerLevel, children.length) - 1) * spacingX) / 2;

			// Iterate over the children, recursively setting positions
			for (let i = 0; i < children.length; i++) {
				if (i !== 0 && i % maxChildrenPerLevel === 0) {
					// Move to the next level when max children per level is reached
					nextX = x - ((Math.min(maxChildrenPerLevel, children.length - i) - 1) * spacingX) / 2;
					y += spacingY;
				}
				setPositions(children[i], nextX, y + spacingY, level + 1); // Pass next level
				nextX += spacingX;
			}
		};
		
		// Set positions starting from the root node (assuming root node has id 'root')
		setPositions(
			nodes.find((n) => n.data.start),
			0,
			0,
			0
		); // Start from level 0
	};

	// inintialize  nodes and edges for flow
	useEffect(() => {
		if (selectedNodeData.length === 0 || selectedEdgeData.length === 0) return;
		const nodesCopy = JSON.parse(JSON.stringify(selectedNodeData));
		const edgesCopy = JSON.parse(JSON.stringify(selectedEdgeData));

		getHierarchicalMultiLevelLayout(nodesCopy, edgesCopy);
		setEdges([...edgesCopy]);
		setNodes([...nodesCopy]);
		setIsLoading(false);
	}, [selectedNodeData, selectedEdgeData]); //



	useEffect(() => {
		
		if (selectedPathIds.length === 0 || nodes.length === 0) return;
		
		let flowNodes = JSON.parse(JSON.stringify(getNodes()));
		let flowEdges = JSON.parse(JSON.stringify(getEdges()));

		flowNodes = flowNodes.map(obj => ({
			...obj, 
			data: {

				...obj.data,
				hidden: true, 
				active: false,
				selected: false
			}
		
		  }));
		flowEdges = flowEdges.map(obj => ({
			...obj, 
			data: {

				...obj.data,
				hidden: true, 
				active: false,
				selected: false
			}
		  }));

		selectedPathIds.forEach((ids: [null | number, number], idx: number) => {

			const currentNode = flowNodes.find((node: any) => node.id === ids[1]);
			if (currentNode) {
				const nodeCopy = JSON.parse(JSON.stringify(currentNode));
				nodeCopy.data.hidden = false;
				flowNodes = [...flowNodes,nodeCopy]
			} 

			
			flowEdges.forEach((edge: any) => {

				if(edge.source === ids[1]) {
					// const edgeCopy = JSON.parse(JSON.stringify(edge));
					edge.data.hidden = false;
					edge.data.active = true;
					// flowEdges = [...flowEdges,edgeCopy]
				}
				if(edge.id === ids[0]) {
					edge.data.selected = true;

				}
			});


		});
	
		setEdges((eds)=> [...flowEdges]);
		setNodes((nds)=> [...flowNodes]);
	
		
	}, [selectedPathIds,isLoading]);

	useEffect(() => {	
		if (selectedPathIds.length === 0 || nodes.length === 0) return;
		const currentNodeId = selectedPathIds.slice(-1)[0][1]
		const currentNode = getNode(currentNodeId)
		if(currentNode){
			setCenter(currentNode.position.x + 100,  currentNode.position.y +100, {zoom: 1.5 , duration: 800});

		}}, [nodes, edges])

	// Updates nodes and edges when currentPath or currentNode changes

	const onNodeClick = (el, node)=> {
	
		const newPathIds:PathIds[] = [];
		for (const ids of selectedPathIds) {
			newPathIds.push(ids);
			console.log(ids[1],node.id)
			if (ids[1] === node.id) {
				break;
			}
		}

		dispatch(setSelectedPathIds(newPathIds));
	}

	const onEdgeClick = (el, edge)=> {
		console.log(edge)
	}
	return (
	
		<ReactFlow
			nodes={nodes}
			edges={edges}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			connectionLineType={ConnectionLineType.SmoothStep}
			onNodeClick={onNodeClick}
			onEdgeClick={onEdgeClick}
			fitView>
			<MiniMap
				pannable={true}
				zoomable={true}
			/>
			<Background
				style={{ backgroundColor: '#FAFAFA' }}
				// color="#fffff"
				gap={20}
			/>
		</ReactFlow>
		

	);
};
function WorkflowFlow() {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
export default WorkflowFlow;
