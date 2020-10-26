import React from 'react';

interface ArrowProps {
  x: number;
  y: number;
  arrowPath: string;
  pointerPath: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  x,
  y,
  arrowPath,
  pointerPath,
}: ArrowProps) => {
  return (
    <div className="arrow-block" style={{ left: x, top: y }}>
      <svg preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={arrowPath} stroke="#000" strokeWidth="2px"></path>
        <path d={pointerPath} fill="#000"></path>
      </svg>
    </div>
  );
};

export default Arrow;
