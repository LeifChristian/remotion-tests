import React, { useState } from 'react';
import { Composition, Folder } from 'remotion';
import { Overlay } from './Overlay';

export const RemotionRoot: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(229);
  const [selectedCompositionId, setSelectedCompositionId] = useState(null);
  const [sliderColor, setSliderColor] = useState('red');

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
    if (newLeft >= 229 && newLeft + width <= window.innerWidth) {
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

  const handleCompositionClick = (id, e) => {
    e.stopPropagation();
    setSelectedCompositionId(id);

    // Set the slider color based on the selected composition
    switch (id) {
      case 'cars':
        setSliderColor('blue');
        break;
      case 'trees':
        setSliderColor('green');
        break;
      case 'bus':
        setSliderColor('red');
        break;
      default:
        setSliderColor('red');
    }
  };
  const compositions = [
    {
      id: 'cars',
      component: Overlay,
      durationInFrames: 75,
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

  return (
    <div onClick={sendStuff}>
      <div
        style={{
          position: 'absolute',
          zIndex: 3000,
          top: 520,
          left,
          width,
          height: '3rem',
          backgroundColor: sliderColor,
          borderRadius: '10px',
        }}
        onMouseDown={handleDragMouseDown}
      >
        {/* Add the missing arrow and bar for the left side of the slider */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: -6,
            width: 12,
            height: '100%',
            backgroundColor: 'transparent',
            cursor: 'col-resize',
            transform: 'translateY(-50%)',
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Folder name="relevant-videos">
          {compositions.map((comp) => (
            <div 
              key={comp.id}
              onClick={(e) => handleCompositionClick(comp.id, e)}
              style={{ position: 'absolute' }}
            >
              <Composition
                id={comp.id}
                component={comp.component}
                durationInFrames={comp.durationInFrames}
                fps={comp.fps}
                width={comp.width}
                height={comp.height}
              />
            </div>
          ))}
        </Folder>
      </div>
    </div>
  );
};
