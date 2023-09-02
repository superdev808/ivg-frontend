import React, { useState, useMemo, useEffect, use } from 'react';
import { useSelector } from 'react-redux';

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
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';

import { selectGuide, setGuideData } from '@/redux/features/guideSlice';

interface NodeData {
	id: number;
	guideId: number;
	value: string;
	start: boolean;
	children: NodeData[];
	edges: EdgeData[];
}

interface EdgeData {
	id: number;
	guideId: number;
	value: string;
	source: number | null;
	target: number | null;
}

interface Node {
	id: string;
	data: { value: string; refId: number; start: boolean, end: boolean, active:boolean, masked:boolean };
	position: { x: number; y: number };
	targetPosition: 'top' | 'bottom';
	sourcePosition: 'top' | 'bottom';
	width: number;
	height: number;
	type: string;
	draggable: boolean;
}

interface Edge {
	id: string;
	data: { value: string; refId: number, masked:boolean};
	source: string;
	target: string;
	type: string; // replace with your edge type
	animated: boolean;
	style: any;
}



const GuideFlow = () => {
	const {currentPath, currentNode, guideNodeData, guideEdgeData,currentEdges } = useSelector(selectGuide);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

		const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));
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


	const getLayoutedElements = (nodeData: NodeData[], edgeData: EdgeData[]) => {
		function nestNodesEdges(nodes: NodeData[], edges: EdgeData[]) {
			nodes.forEach((node: NodeData) => {
				node.children = [];
				node.edges = [];
				const nodeEdges = edges.filter((edge: EdgeData) => edge.source === node.id);

				nodeEdges.forEach((edge: EdgeData) => {
					if (edge.target) {
						const childNode = nodes.find((node: NodeData) => node.id === edge.target);
						if (childNode) {
							node.children.push(childNode);
						}
						node.edges.push(edge);
					}
				});
			});
			const rootNode: NodeData | undefined = nodes.find((node: NodeData) => node.start === true);

			return rootNode;
		}
		function unpackNodesEdges(node: NodeData) {
			let newNodes: Node[] | any = [];
			let newEdges: Edge[] | any = [];

			const newNode: Node = {
				id: String(nodeId),
				data: { value: node.value, refId: node.id, start: node.start, end: false,active: false, masked:true },
				width: 0,
				height: 0,
				targetPosition: 'top',
				sourcePosition: 'bottom',
				position: { x: 0, y: 0 },
				type: 'custom',
				draggable: false,
			};
			nodeId++;

			if (node.children && node.children.length > 0) {
				for (let i = 0; i <= node.children.length - 1; i++) {
					const ungrouped: { newNodes: Node[]; newEdges: Edge[] } = unpackNodesEdges(node.children[i]);
					const children = ungrouped.newNodes;
					newNodes = [...newNodes, ...children];

					const child = children.find((child: Node) => child.data.refId === node.children[i].id);
					if (child) {
						let newEdge: Edge = {
							id: 'edge_' + newNode.id + '_' + child.id,
							data: {value: node.edges[i].value, refId: node.edges[i].id, masked:true},
							source: String(newNode.id),
							target: String(child.id),
							type: 'custom',
							animated: true,
							style: {
								strokeWidth: 2,
								stroke: '#FF0072'}
						};
						
						newEdges = [...newEdges, newEdge];
					}
					newEdges = [...newEdges, ...ungrouped.newEdges];
				}
			}
			else {
				newNode.data.end = true;
			}

			newNodes.push(newNode);

			return { newNodes, newEdges };
		}

		const defaultWidth = 150;
		const defaultHeight = 50;
		let nodeId = 0;
		const edgeType = 'smoothstep';

		const rootNode = nestNodesEdges(nodeData, edgeData);

		if (!rootNode) return { nodes: [], edges: [] };
		const { newNodes: nodes, newEdges: edges } = unpackNodesEdges(rootNode);

		dagreGraph.setGraph({ rankdir: 'TB' });
		
		nodes.forEach((node: Node) => {
			const nodeWidth = node.data.active ? defaultWidth : defaultWidth;
			const nodeHeight = node.data.active ? defaultHeight : defaultWidth;
			dagreGraph.setNode(node.id, { width:  nodeWidth, height:  nodeHeight });
		});

		edges.forEach((edge: Edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

		dagre.layout(dagreGraph);

		nodes.forEach((node: Node) => {
			const nodeWidth = !node.data.active ? defaultWidth : defaultWidth;
			const nodeHeight = !node.data.active ? defaultHeight : defaultWidth;

			const nodeWithPosition = dagreGraph.node(node.id);
			node.targetPosition = 'top';
			node.sourcePosition = 'bottom';

			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			};

			return node;
		});

		return { nodes, edges };
	};

	const { setCenter, getNode, getNodes } = useReactFlow();

	useEffect(() => {
	
		if (!guideNodeData || !guideEdgeData) return;
		const nodes = JSON.parse(JSON.stringify(guideNodeData));
		const edges = JSON.parse(JSON.stringify(guideEdgeData));

		const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);

		setNodes([...layoutedNodes]);
		setEdges([...layoutedEdges]);
	}, [guideNodeData]);

	useEffect(() => {
		if (!nodes) return;
		if (!currentNode) return;
		const targetNode: Node | undefined = (nodes as Node[]).find((node: Node) => node.data.refId === currentNode.id);
		if (!targetNode) return;
		setCenter(targetNode?.position.x + 150,  targetNode.position.y +100  , { zoom: 1.75, duration: 500 });
	
	}, [currentNode, nodes]);

	useEffect(() => {
		if (!currentPath || !currentEdges || !currentNode ) return;
		let activeNodes:Number[] = [];
		let activeEdges:Number[] = [];

		let unmaskedEdges:Number[] = [];

		currentPath.forEach((path: any) => {
			if (path[0]) {
				activeNodes.push(path[0].id);
				activeEdges.push(path[2]);
				unmaskedEdges =   path[1].map((edge: any) => edge.id);
			}

		});
		activeNodes.push(currentNode?.id);

		unmaskedEdges = [...unmaskedEdges,...currentEdges?.map((edge: any) => edge.id)];

		setNodes((nds) =>
				nds.map((node) => {
					if (activeNodes.includes(node.data.refId)) {
						if(!node.data.active){

							node.data = {
								...node.data,
								active: true,
							};
						}
					} else if (node.data.active) {
						node.data = {
							...node.data,
							active: false,
						};
					}

					return node;
				})
			);
	
			setEdges((eds) =>
				eds.map((edge) => {
					if (activeEdges.includes(edge.data.refId)) {
						if(!edge.data.active){
						edge.data = {
							...edge.data,
							active: true,
						};
					}
					} else if (edge.data.active) {
						edge.data = {
							...edge.data,
							active: false,
						};
					}
					if (unmaskedEdges.includes(edge.data.refId)) {
						if(edge.data.masked ){
						edge.data = {
							...edge.data,
							masked: false,
						};
					}
					} else if (!edge.data.masked) {
						edge.data = {
							...edge.data,
							masked: true,
						};
					}
					return edge;
			})
	);

	}, [currentPath, currentNode]);


	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			connectionLineType={ConnectionLineType.SmoothStep}
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
function Flow() {
	return (
		<ReactFlowProvider>
			<GuideFlow />
		</ReactFlowProvider>
	);
}
export default Flow;
