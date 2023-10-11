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
import 'reactflow/dist/style.css';

import dagre from '@dagrejs/dagre';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';

import { selectGuide } from '@/redux/features/guideSelectionSlice';

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
	const { selectedEdgeData, selectedNodeData, selectedPathIds } = useSelector(selectGuide);

	const [initialNodes, setInitialNodes] = useState<Node[]>([]);
	const [initialEdges, setInitialEdges] = useState<Edge[]>([]);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const { setCenter, getNode, getNodes } = useReactFlow();

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

	const initializeFlow = () => {
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

			const newNode = {
				id: String(nodeId),
				data: { value: node.value, refId: node.id, start: node.start, end: false, active: false, marked: false },
				width: 0,
				height: 0,
				targetPosition: 'top',
				sourcePosition: 'bottom',
				position: { x: 0, y: 0 },
				type: 'custom',
				draggable: false,
				hidden: false,
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
							data: { value: node.edges[i].value, refId: node.edges[i].id, option: true },
							source: String(newNode.id),
							target: String(child.id),
							type: 'custom',
							animated: true,
							style: {
								strokeWidth: 2,
								stroke: '#FF0072',
							},
						};

						newEdges = [...newEdges, newEdge];
					}
					newEdges = [...newEdges, ...ungrouped.newEdges];
				}
			} else {
				newNode.data.end = true;
			}

			newNodes.push(newNode);

			return { newNodes, newEdges };
		}
		let nodeId = 0;

		const nodesCopy = JSON.parse(JSON.stringify(selectedNodeData));
		const edgesCopy = JSON.parse(JSON.stringify(selectedEdgeData));
		const rootNode = nestNodesEdges(nodesCopy, edgesCopy);
		if (!rootNode) return { nodes: [], edges: [] };
		const { newNodes: nodes, newEdges: edges } = unpackNodesEdges(rootNode);
		
		setInitialNodes(nodes);
		setInitialEdges(edges);
	};

	// Function to calculate the XY position for nodes
	const getHierarchicalMultiLevelLayout = (nodes) => {
		const spacingX = 600;
		const spacingY = 150;
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
			const edgeConnectors = initialEdges.filter((edge: Edge) => edge.source === String(node.id));
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


	const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
		const dagreGraph = new dagre.graphlib.Graph();
		dagreGraph.setDefaultEdgeLabel(() => ({}));
		dagreGraph.setGraph({ rankdir: 'TB' });

		nodes.forEach((node: Node) => {
			dagreGraph.setNode(node.id, {});
		});

		edges.forEach((edge: Edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

		dagre.layout(dagreGraph);
		// getHierarchicalMultiLevelLayout(nodes)

		nodes.forEach((node: Node) => {
			const nodeWidth = 250;
			const nodeHeight = 150;

			const nodeWithPosition = dagreGraph.node(node.id);
			node.targetPosition = 'top';
			node.sourcePosition = 'bottom';

			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			};

			return node;
		});

		return { nodes, edges };
	};

	// inintialize  nodes and edges for flow
	useEffect(() => {
		if (selectedNodeData.length === 0 || selectedEdgeData.length === 0) return;
		initializeFlow();
	}, [selectedNodeData, selectedEdgeData]); //

	// useEffect(() => {
	// 	if (!nodes) return;
	// 	if (!currentNode) return;
	// 	const targetNode: Node | undefined = (nodes as Node[]).find((node: Node) => node.data.refId === currentNode.id);
	// 	if (!targetNode) return;
	// 	setCenter(targetNode?.position.x + 150, targetNode.position.y, { zoom: 1.25, duration: 500 });
	// }, [currentNode, nodes]);

	// Updates nodes and edges when currentPath or currentNode changes
	useEffect(() => {
		if (initialNodes.length === 0) return;

		const nodes = JSON.parse(JSON.stringify(initialNodes));
		// getHierarchicalMultiLevelLayout(nodes);
		// const { nodes: layoutNodes, edges: layoutEdges } = getLayoutedElements(initialNodes, initialEdges);
		// console.log("🚀 ~ file: flow.tsx:292 ~ useEffect ~ nodes:", nodes)
		// console.log("🚀 ~ file: flow.tsx:293 ~ useEffect ~ initialEdges:", initialEdges)

		// setNodes((nds) => {return [...nds,...layoutNodes]});
		setEdges([...initialEdges]);
	
		// getHierarchicalMultiLevelLayout(nodes);
		// console.log("🚀 ~ file: flow.tsx:292 ~ useEffect ~ nodes:", nodes)

		// setNodes(nodes);
		// setEdges(initialEdges);
		// console.log(initialNodes)
		// getHierarchicalMultiLevelLayout(initialNodes);
		// let activeNodes: Number[] = [currentNode.id];
		// let activeEdges: Number[] = [...currentEdges.map((edge: any) => edge.id)];

		// let potentialNodes: Node[] = [];
		// currentPath.forEach((path: any) => {
		// 	if (path[0]) {
		// 		activeNodes.push(path[0].id);

		// 		activeEdges.push(path[2]);
		// 		// activeEdges = path[1].map((edge: any) => edge.id);
		// 		// potentialNodes = path[1].map((edge: any) => edge.target);
		// 	}
		// });

		// const newNodes = [];
		// let currentNodeId = '';
		// initialNodes.forEach((node: Node) => {
		// 	if (node.data.refId === currentNode.id) {
		// 		currentNodeId = node.id;
		// 		node.data = {
		// 			...node.data,
		// 			active: true,
		// 			marked: false,
		// 		};
		// 		newNodes.push(node);
		// 	}
		// 	if (activeNodes.includes(node.data.refId) && node.id !== currentNodeId) {
		// 		// set new node active if not active
		// 		// if (!node.data.active) {

		// 		node.data = {
		// 			...node.data,
		// 			active: true,
		// 			marked: false,
		// 		};
		// 		// }
		// 		newNodes.push(node);
		// 	}
		// 	// else if (node.data.active) {
		// 	// 	// set node inactive if active
		// 	// 	node.data = {
		// 	// 		...node.data,
		// 	// 		active: false,
		// 	// 	};
		// 	// }
		// });

		// //  initialEdges.filter((edge: Edge) => edge.source === currentNodeId );

		// const newEdges = [];
		// initialEdges.forEach((edge: Edge) => {
		// 	if (activeEdges.includes(edge.data.refId)) {
		// 		const targetNode = initialNodes.find((node: Node) => String(node.id) === edge.target);
		// 		if (targetNode && !newNodes.includes(targetNode)) {
		// 			targetNode.data.marked = true;
		// 			potentialNodes.push(targetNode);
		// 		}

		// 		newEdges.push(edge);
		// 	}
		// 	// else if (edge.data.active) {
		// 	// 	edge.data = {
		// 	// 		...edge.data,
		// 	// 		active: false,
		// 	// 	};
		// 	// }
		// });

		// // potentialNodes.forEach((node: Node) => {

		// // 		node.data.marked = true;
		// // });
		// // console.log(newNodes)
		// const layoutnodes: Node[] = [...newNodes, ...potentialNodes];
		// console.log('🚀 ~ file: flow.tsx:338 ~ useEffect ~ layoutnodes:', layoutnodes);
		// const layoutedges: Edge[] = [...newEdges];
		// // const layoutnodes = JSON.parse(JSON.stringify([...newNodes]));
		// // const layoutedges = JSON.parse(JSON.stringify([...newEdges]));

		// // getHierarchicalMultiLevelLayout(layoutnodes);
		// // console.log(layoutnodes, layoutedges);
		// // const { nodes: layoutNodes, edges: layoutEdges } = getLayoutedElements(layoutnodes, layoutedges);

		// // setNodes(layoutnodes);

		// setEdges((eds) =>

		// {
		// 	const filteredArray = layoutedges.filter((obj1) => {
		// 		return !eds.some((obj2) => {
		// 			return obj1.id === obj2.id;
		// 		});
		// 	});
		// 	if (eds.length > 0) {
		// 		eds.map((edge) => {

		// 			console.log("🚀 ~ file: flow.tsx:378 ~ eds.map ~ activeEdges:", activeEdges)
		// 			if (activeEdges.includes(edge.data.refId)) {
		// 				// set new node active if not active
		// 				edge.data = {
		// 					...edge.data,
		// 					active: true,

		// 				};
		// 			}
		// 			else  {
		// 				// set node inactive if active
		// 				edge.data = {
		// 					...edge.data,
		// 					active: false,
		// 					option: false
		// 				};
		// 			}

		// 		});
		// 	}

		// 	console.log("🚀 ~ file: flow.tsx:396 ~ useEffect ~ eds:", eds)
		// 	return [...eds, ...filteredArray]

		// }
		// );

		setNodes((nds) => {
			// filter out existing nodes
			// const filteredArray = layoutnodes.filter((obj1) => {
			// 	return !nds.some((obj2) => {
			// 		return obj1.id === obj2.id;
			// 	});
			// });

			// // unhide exisiting nodes

			// if (nds.length > 0) {
			// 	nds.map((node) => {
			// 		if (activeNodes.includes(node.data.refId)) {
			// 			// set new node active if not active
			// 			node.data = {
			// 				...node.data,
			// 				active: true,
			// 				marked: false,
			// 			};
			// 		}
			// 		return node;
			// 	});
			// }
			// const nodes = [...nds, ...filteredArray];

			getHierarchicalMultiLevelLayout(nodes);
			console.log('🚀 ~ file: flow.tsx:378 ~ setNodes ~ final:', nodes);

			return nodes;
		});
	}, [initialNodes, initialEdges]);

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
function GuideFlow() {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
export default GuideFlow;
