import  { MarkerType } from 'reactflow';


interface NodeData {
	id: number;
	flowId: number;
	value: string;
	start: boolean;
	children: NodeData[];
	edges: EdgeData[];
	images: [];
	videos: [];
	texts: [];
	type: number;
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
	data: {
		value: string;
		refId: number;
		start: boolean;
		end: boolean;
		selected: boolean;
		hidden: boolean;
		images: [];
		videos: [];
		texts: [];
		type: number;
		flowId: number;
	};
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
	data: { value: string; refId: number; hidden: boolean };
	source: string;
	target: string;
	type: string; // replace with your edge type
	animated: boolean;
	sourceHandle: string;
	markerEnd: any;
}

export function unpackNodesEdges(nestedNodes) {
	let nodeId = 0;
	function unpack(node: NodeData) {
		let newNodes: Node[] | any = [];
		let newEdges: Edge[] | any = [];

		const newNode = {
			id: String(nodeId),
			data: {
				children: node.children.length,
				value: node.value,
				refId: node.id,
				start: node.start,
				end: false,
				selected: false,
				hidden: true,
				images: node.images,
				videos: node.videos,
				texts: node.texts,
				type: node.type,
				flowId: node.flowId,
			},
			width: 200,
			height: 100,
			targetPosition: 'top',
			sourcePosition: 'bottom',
			
			position: { x: 0, y: 0 },
			type: 'custom',
			draggable: false,
		};
		nodeId++;
		
		if (node.children && node.children.length > 0) {


			for (let i = 0; i <= node.children.length - 1; i++) {
				const ungrouped: { newNodes: Node[]; newEdges: Edge[] } = unpack(node.children[i]);
				const children = ungrouped.newNodes;
				newNodes = [...newNodes, ...children];

				const child = children.find((child: Node) => child.data.refId === node.children[i].id);
				if (child) {
					let newEdge: Edge = {
						id: 'edge_' + newNode.id + '_' + child.id,
						data: { value: node.edges[i].value, refId: node.edges[i].id, hidden: true },
						source: String(newNode.id),
						target: String(child.id),
						type: 'custom',
						animated: false,
						sourceHandle:'sh_' + newNode.id + '_' + i.toString(),
						markerEnd: {
						  type: MarkerType.ArrowClosed,
						  width: 10,
						  height: 10,
						  color: '#023932',
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
	return unpack(nestedNodes);
}
