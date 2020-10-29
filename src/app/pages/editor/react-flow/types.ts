export interface Block {
  __typename?: string;
  parent: number;
  id?: number;
  name: string;
  type: string;
  width: number;
  height: number;
  childWidth?: number;
  x?: number;
  y?: number;
  arrow?: {
    arrowPath: string;
    pointerPath: string;
    x: number;
    y: number;
  };
  blockId?: number;
}

export interface Position {
  __typename?: string;
  x: number;
  y: number;
}
