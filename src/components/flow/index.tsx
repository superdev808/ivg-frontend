import CustomEdge from "./CustomEdge";
import CustomNode from "./CustomNodes";
import { useState, useCallback, useEffect, use } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectFlow } from "@/redux/features/flowSlice";

import ReactFlow, {
	ReactFlowProvider,
	Background,
	Controls,
	useReactFlow,
	useNodesState,
	MiniMap,
	ConnectionLineType,
	EdgeTypes,
	NodeTypes,
	useEdgesState,
	applyNodeChanges,
	applyEdgeChanges,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import { Card } from "primereact/card";

const position = { x: 0, y: 0 };
const edgeType = "smooth";

let nodeData: {
	id: string;
	data: any;
	position: { x: number; y: number };
	width: number;
	height: number;
}[] = [];
let edgeData: {
	id: string;
	data: { edge: any; visible: boolean; mask: boolean };
	source: string;
	target: string;
	type: string;
	animated: boolean;
	sourceHandle: string;
}[] = [];

export const Flow = ({ mask }: any) => {
	function RenderFlow({ data }: any) {
		const dagreGraph = new dagre.graphlib.Graph();
		const {
			selectedFlow,
			selectedFlowData,
			selectedStart,
			currentOptions,
			selectedProcess,
			history,
		} = useSelector(selectFlow);
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
		const { setCenter, getNode, getNodes } = useReactFlow();

		dagreGraph.setDefaultEdgeLabel(() => ({}));

		const nodeWidth = 500;
		const nodeHeight = 350;

		const getLayoutElements = useCallback(
			(nodes: any, edges: any) => {
				if (nodes.length > 0 || edges.length > 0) {
					dagreGraph.setGraph({ rankdir: "TB" });

					nodes.forEach((node: any) => {
						dagreGraph.setNode(node.id, {
							width: nodeWidth,
							height: nodeHeight,
						});
					});

					edges.forEach((edge: any) => {
						dagreGraph.setEdge(edge.source, edge.target);
					});

					dagre.layout(dagreGraph);

					nodes.forEach((node: any) => {
						const nodeWithPosition = dagreGraph.node(node.id);
						node.targetPosition = "top";
						node.sourcePosition = "bottom";

						// We are shifting the dagre node position (anchor=center center) to the top left
						// so it matches the React Flow node anchor point (top left).
						node.position = {
							x: nodeWithPosition.x - nodeWidth / 2,
							y: nodeWithPosition.y - nodeHeight / 2,
						};

						return node;
					});
				}

				return { nodes, edges };
			},
			[selectedFlowData]
		);

		const [nodes, setNodes, onNodesChange] = useNodesState([]);
		const [edges, setEdges, onEdgesChange] = useEdgesState([]);

		useEffect(() => {
			setNodes([]);
			setEdges([]);
			nodeData = [];
			edgeData = [];
			(selectedFlowData || []).map((node: any) => {
				if (node.node_type == 1) {
					const newNode = {
						id: node.id.toString(),
						data: { node: node, edges: [], visible: false, mask: mask },
						type: "custom",
						width: nodeWidth,
						height: nodeHeight,
						position,
						// selectable: false,
						draggable: false,
					};

					nodeData.push(newNode);
				} else if (node.node_type == 2) {
					edgeData.push({
						id: node.id.toString(),
						data: { edge: node, visible: false, mask: mask },
						type: "custom",
						sourceHandle: node.id.toString(),
						source: node.source.toString(),
						target: node.target.toString(),
						animated: true,
					});
				}
			});

			edgeData.forEach((edge: any) => {
				const _source = nodeData.find((node: any) => node.id === edge.source);

				if (_source) {
					_source.data.edges = [..._source.data.edges, edge.id];
				}
			});

			const { nodes: layoutNodes, edges: layoutEdges } =
				getLayoutElements(nodeData, edgeData);

			setNodes([...layoutNodes]);
			setEdges([...layoutEdges]);

			// }
		}, [selectedFlowData]);
		useEffect(() => {
			if (selectedProcess) {
				const _focusedNode: any = nodeData.find(
					(node: any) => node.id === selectedProcess.id.toString()
				);
				const _node: any = getNode(_focusedNode?.id) || {
					position: { x: 0, y: 0 },
					width: 0,
					height: 0,
				};

				const x = _node.position.x + _node.width / 3;

				const y = _node.position.y + _node.height / 3;
				const zoom = 1.5;

				setCenter(x, y, { zoom, duration: 1000 });
			}
		}, [selectedProcess, nodes]);
		useEffect(() => {
			const _activeArray: any = [];
			(history || []).forEach((hist: any) => {
				_activeArray.push(hist.id.toString());
			});

			(currentOptions || []).forEach((element: any) => {
				_activeArray.push(element.id.toString());
			});

			setNodes((nds) =>
				nds.map((node) => {
					if (_activeArray.includes(node.id)) {
						node.data = {
							...node.data,
							visible: true,
						};
					} else if (node.data.visible) {
						node.data = {
							...node.data,
							visible: false,
						};
					}

					return node;
				})
			);
			setEdges((eds) =>
				eds.map((edge) => {
					if (_activeArray.includes(edge.id)) {
						edge.data = {
							...edge.data,
							visible: true,
						};
					} else if (edge.data.visible) {
						edge.data = {
							...edge.data,
							visible: false,
						};
					}

					return edge;
				})
			);
		}, [history, currentOptions, setNodes, setEdges]);

		return (
			<>
				<div className="flow">
					<ReactFlow
						nodes={nodes}
						edges={edges}
						connectionLineType={ConnectionLineType.SmoothStep}
						edgeTypes={edgeTypes}
						nodeTypes={nodeTypes}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
					>
						<Background />
						<Controls showInteractive={false} />
						<MiniMap pannable={true} zoomable={true}/>
					</ReactFlow>
				</div>
			</>
		);
	}
	return (
		<>
			<Card className="w-8 ml-4 ">
				<ReactFlowProvider>
					<RenderFlow></RenderFlow>
				</ReactFlowProvider>
			</Card>
		</>
	);
};
