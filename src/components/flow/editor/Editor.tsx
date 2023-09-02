import EditNodeComponent from './EditorNodes';
import { useState, useCallback, useEffect, useRef, use } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setSelectedNode, editorState } from '@/redux/features/editorSlice';

import { Button } from 'primereact/button';

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
	ReactFlowInstance,
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import { Card } from 'primereact/card';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

let nodeData: any[] = [];
let edgeData: {
	id: string;
	data: { edge: any; visible: boolean; mask: boolean };
	source: string;
	target: string;
	type: string;
	animated: boolean;
	sourceHandle: string;
}[] = [];
const nodeWidth = 50;
const nodeHeight = 100;

export const initialNodes = [];

export const initialEdges = [];

export const Flow = ({ mask }: any) => {
	function RenderFlow({ data }: any) {
		let id = 0;
		const getId = () => `dndnode_${id++}`;
		const dagreGraph = new dagre.graphlib.Graph();

		dagreGraph.setDefaultEdgeLabel(() => ({}));
		const { setCenter, getNode, getNodes } = useReactFlow();
		const [nodes, setNodes, onNodesChange] = useNodesState([]);
		const [edges, setEdges, onEdgesChange] = useEdgesState([]);

		const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
		const reactFlowWrapper = useRef(null);
		const dispatch = useDispatch();
		const { selectedNode } = useSelector(editorState);

		const nodeTypes: NodeTypes = useMemo(
			() => ({
				custom: EditNodeComponent,
			}),
			[]
		);

		// const edgeTypes: EdgeTypes = useMemo(
		// 	() => ({
		// 		custom: CustomEdge,
		// 	}),
		// 	[]
		// );

		const getLayoutElements = (nodes: any, edges: any) => {
			dagreGraph.setGraph({ rankdir: 'TB' });
			nodes.forEach((node) => {
				dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
			});
			edges.forEach((edge) => {
				dagreGraph.setEdge(edge.source, edge.target);
			});

			dagre.layout(dagreGraph);

			nodes.forEach((node: any) => {
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

		useEffect(() => {
			if (nodeData.length == 0) {
				nodeData = [{ id: '000_start', data: { nodeType: 'Text', label: 'Start Here' }, type: 'custom', position: { x: 0, y: 0 } }];
			}
			const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(nodeData, initialEdges);
			
			setNodes([...layoutNodes]);
			setEdges([...layoutEdges]);

			// }
		}, [initialNodes]);

		// useEffect(() => {
		// 	if (selectedProcess) {
		// 		const _focusedNode: any = nodeData.find(
		// 			(node: any) => node.id === selectedProcess.id.toString()
		// 		);
		// 		const _node: any = getNode(_focusedNode?.id) || {
		// 			position: { x: 0, y: 0 },
		// 			width: 0,
		// 			height: 0,
		// 		};

		// 		const x = _node.position.x + _node.width / 2;

		// 		const y = _node.position.y + _node.height / 2;
		// 		const zoom = 1;

		// 		setCenter(x, y, { zoom, duration: 1000 });
		// 	}
		// }, [selectedProcess, nodes]);

		useEffect(() => {
			setNodes((nds) =>
				nds.map((node) => {
					if (node.id === selectedNode?.id) {
						// it's important that you create a new object here
						// in order to notify react flow about the change
						node.data = {
							...node.data,
							label: selectedNode.data.label,
						};
					}

					return node;
				})
			);
		}, [selectedNode]);

		const onDragOver = useCallback((event) => {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
		}, []);
		const onDrop = useCallback(
			(event) => {
				event.preventDefault();

				const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
				const type = event.dataTransfer.getData('application/reactflow/type');
				const dataType = event.dataTransfer.getData('application/reactflow/dataType');

				// check if the dropped element is valid
				if (typeof type === 'undefined' || !type) {
					return;
				}

				const position = reactFlowInstance?.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				});
				const newNode = {
					id: getId(),
					type,
					position,

					data: { label: `${dataType} node`, dataType: dataType },
				};
				nodeData.push(newNode);
				setNodes((nds) => nds.concat(newNode));
			},
			[reactFlowInstance]
		);

		const onNodeSelect = (params: any) => {
			if (params.nodes.length == 0) {
				dispatch(setSelectedNode(null));
				return;
			}
			const node = params.nodes[0];

			if (selectedNode?.id !== node.id) {
				dispatch(setSelectedNode(node));
			}
		};

		const onSave = () => {
			console.log('save')

		}
		return (
			<>
				<div
					style={{ height: '100%', width: '100%' }}
					ref={reactFlowWrapper}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						connectionLineType={ConnectionLineType.SmoothStep}
						// edgeTypes={edgeTypes}
						nodeTypes={nodeTypes}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onDrop={onDrop}
						onDragOver={onDragOver}
						onInit={setReactFlowInstance}
						onSelectionChange={onNodeSelect}>
						<Background />
						<Controls showInteractive={false} />
						<MiniMap
							pannable={true}
							zoomable={true}
						/>
					
					</ReactFlow>
				</div>
			</>
		);
	}
	return (
		<>
			<ReactFlowProvider>
				<RenderFlow></RenderFlow>
			</ReactFlowProvider>
		</>
	);
};
