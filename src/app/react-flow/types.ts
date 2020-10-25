export interface Block {
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
}

export interface Position {
  x: number;
  y: number;
}
