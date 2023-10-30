export type Workflow = { id: number; value: string };
export type Node = { id: number; flowId: number; value: string; type: number; images?: string[]; texts?: string[]; videos?: string[];start?: boolean; term?: boolean };
export type Edge = { id: number; flowId: number; value: string; source: number; target: number };



export type PathIds = [number | null, number]