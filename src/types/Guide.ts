export type Guide = { id: number; value: string };
export type Node = { id: number; guideId: number; value: string; type: number; images: string[]; texts: string[];start?: boolean; term?: boolean };
export type Edge = { id: number; guideId: number; value: string; source: number; target: number };
