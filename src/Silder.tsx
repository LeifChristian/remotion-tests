import React from 'react';

interface SliderProps {
  width: number;
  left: number;
  handleDragMouseDown: (e: React.MouseEvent) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const Slider: React.FC<SliderProps> = ({
  width,
  left,
  handleDragMouseDown,
  handleMouseDown,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 9999,
        top: "50%",
        left,
        width,
        height: '3rem',
        backgroundColor: 'red',
        borderRadius: '10px',
      }}
      onMouseDown={handleDragMouseDown}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: -6,
          width: 12,
          height: '100%',
          backgroundColor: 'blue',
          cursor: 'col-resize',
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};
