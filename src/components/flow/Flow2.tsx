'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
	addEdge,
	useNodesState,
	useEdgesState,
	Background,
	ReactFlowProvider,
	useReactFlow,
	EdgeTypes,
	Controls,
	MiniMap,
} from 'reactflow';
import CustomEdge from './CustomEdge';
import ColorSelectorNode from './CustomNodes';
import 'reactflow/dist/style.css';

import '../../app/globals.scss';

export const Flow = ({ options, history, currentQuestion, mask }: any) => {
	const initialNodes: any = [];
	const initialEdges: any = [];


	useEffect(()=>{
		(history || []).forEach(hist => {
			const _activeNode = initialNodes.find(el=> el.id == hist.option_id);
			if(_activeNode) {
			
				_activeNode.data.visible = true
			}
			const _activeEdge = initialEdges.find(el=> el.id == hist.option_id);
			if(_activeEdge) {
			
				_activeEdge.data.visible = true
			}
		});
		
	},[history])
	

	function FlowRender() {
		const reactFlowInstance = useReactFlow();


		let winsize = 0
		useEffect(()=>{
			winsize = window.screen.width

		},[]);

		useEffect(()=>{
			panToNode(currentQuestion)

		},[currentQuestion]);
		
		(options || []).forEach((item: any) => {
			
			if (item.target) {
				initialEdges.push({
					...item,
					id: String(item.option_id),
					source: String(item.source),
					target: String(item.target),
					data: {
						label: item.option_value,
						mask: !mask ? false: true
					},
					sourceHandle:item.source +'_'+item.source_index,
					animated: true,
					type: 'custom',
				});
			} else {
				initialNodes.push({
					...item,
					id: String(item.option_id),
					data: { label: item.option_value, 
						routes: item.route ,
					id : String(item.option_id),
					mask: !mask ? false: true},
					position: { x: 0, y: 0 },
					
					type: 'selectorNode',
				});
			}

			if (item.next) {
				initialEdges.push({
					id: String(item.option_id) + '_next',
					source: String(item.option_id),
					target: String(item.route),

					data: {
						label: 'Next',
						mask: !mask ? false: true
					},
					// sourceHandle:item.source +'_'+item.source_index,	
					animated: true,
					type: 'custom',
				});
			}
		});

		if (initialNodes.length > 0) {
			let pendingNodes = [initialNodes[0]];
			const existing_positions: {x:number,y:number}[]= [{x:0,y:0}]
			while (pendingNodes.length > 0) {
				const currentPending = [...pendingNodes];
				pendingNodes = [];
				currentPending.forEach((node) => {
					const _routes = options.filter((el: any) => el.source == node.option_id && !el.target);
					let _align = 'left';

					const _sortedRoutes = _routes.sort((a:{source_index:number}, b:{source_index:number}) => a.source_index - b.source_index);
					_sortedRoutes.forEach((route: any) => {
						const response = initialNodes.find((el: { id: string }, index: number) => el.id == route.option_id);

						let new_position = {x:0,y:0}

						new_position.y = node.position.y + 300
						new_position.x = node.position.x - 200;
						// existing_positions.push(new_position)
						while(existing_positions.some((obj) => obj.x === new_position.x && obj.y === new_position.y)) {
							// new_position.x = node.position.x + new_position.x + 200;
							if (_align == 'left') {
								_align = 'right';
								
								new_position.x = node.position.x   - 200
							} else {
								new_position.x = node.position.x + 200
							}
							
						}
						existing_positions.push(new_position)
						response.position = new_position;
						pendingNodes.push(response);
					});
				});
			}
		}
		const x = (winsize || 0)  + 300;
		const defaultViewport = { x: x, y: 250, zoom: 1 };
	
		const nodeTypes = {
			selectorNode: ColorSelectorNode,
		};
		const edgeTypes: EdgeTypes = {
			custom: CustomEdge,
		};
		const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
		const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	
		const panToNode = (question:any) => {
			if (question) {


				const node:any = reactFlowInstance.getNode(question.option_id) 
				reactFlowInstance?.setCenter(node?.position.x, node?.position.y)
				reactFlowInstance?.zoomTo(1)
			}
		  }
		return (
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodesConnectable={false}
				elementsSelectable={false}
				nodesDraggable={false}
				edgeTypes={edgeTypes}
				defaultViewport={defaultViewport}
				nodeTypes={nodeTypes}
				>
				<Controls showInteractive={false} />
				<MiniMap pannable={true} />

				<Background />
			</ReactFlow>
		);
	}

	return (
		<div style={{ height: '100%' }} className="w-full">
			<ReactFlowProvider>
				<FlowRender />
			</ReactFlowProvider>
		</div>
	);
};
