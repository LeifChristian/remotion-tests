import React, { useState } from 'react';
import { Composition, Folder } from 'remotion';
import { Overlay } from './Overlay';

export const RemotionRoot: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(300);
  const [selectedCompositionId, setSelectedCompositionId] = useState(null);


  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e) => {
    const newWidth = e.clientX - left;
    if (newWidth > 0) {
      setWidth(newWidth);
    }
  };
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  const handleDragMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleDragMouseMove);
    document.addEventListener('mouseup', handleDragMouseUp);
  };
  
  const handleDragMouseMove = (e) => {
    const newLeft = e.clientX - width / 2;
    if (newLeft >= 300 && newLeft + width <= window.innerWidth) {
      setLeft(newLeft);
    }
  };
  
  const handleDragMouseUp = () => {
    document.removeEventListener('mousemove', handleDragMouseMove);
    document.removeEventListener('mouseup', handleDragMouseUp);
  };

  const sendStuff = () => {
    console.log('api call here');
  };

  const compositions = [
    {
      id: 'cars',
      component: Overlay,
      durationInFrames: 70,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: 'trees',
      component: Overlay,
      durationInFrames: 75,
      fps: 30,
      width: 1920,
      height: 1080,
    },

    {
      id: 'bus',
      component: Overlay,
      durationInFrames: 75,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    // Add more compositions as needed
  ];

  const handleCompositionClick = (id, e) => {
    e.stopPropagation();
    setSelectedCompositionId(id);
  };
  
  return (
    <div>
      <Folder name="relevant-videos">
        {compositions.map((comp) => (
          <div
            key={comp.id}
            onClick={(e) => handleCompositionClick(comp.id, e)}
            style={{ position: 'relative' }}
          >
            <Composition
              id={comp.id}
              component={comp.component}
              durationInFrames={comp.durationInFrames}
              fps={comp.fps}
              width={comp.width}
              height={comp.height}
            />
            {selectedCompositionId === comp.id && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 9999,
                  top: 0, // Updated top position
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
            )}
          </div>
        ))}
      </Folder>
    </div>
  );
  

};
