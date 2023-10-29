import { Edge, Node } from "@/types/Workflow";

type NestNodes = Node & {children: NestNodes[], edges: Edge[]};




export function nestNodesEdges(nodes: NestNodes[], edges:Edge[]) {
    const imageNodes = nodes.filter((node) => node.type === 2)
    const textNodes = nodes.filter((node) => node.type === 4);
    const addAdditionalNode = (currentNodeId:number, searchNodes: Node[]) => {  
        const matchEdges = edges.filter((edge) => edge.target === currentNodeId)
        
        const newNodes:string[] = []
        for (const node of searchNodes) {
            if (matchEdges.some((edge) => node.id === edge.source)) {
                newNodes.push(node.value);
            }
        }
        return newNodes;
    
    }
    nodes.forEach((node) => {
        const nodeImages:string[] = addAdditionalNode(node.id, imageNodes);
        node.images = nodeImages; 

        const nodeTexts:string[] = addAdditionalNode(node.id, textNodes);
        node.texts = nodeTexts; 
        
        node.children = [];
        node.edges =  [];
        const nodeEdges = edges.filter((edge) => edge.source === node.id);

        nodeEdges.forEach((edge) => {
            if (edge.target) {
                const childNode = nodes.find((node) => node.id === edge.target);
                if (childNode) {
                    node.children.push(childNode);
                }
                node.edges.push(edge);
            }
        });


    });
    const rootNode = nodes.find((node) => node.start === true);
    
    return rootNode;
}