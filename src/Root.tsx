import React, { useEffect, useState } from 'react';
import { Composition, Folder } from 'remotion';
import { Overlay } from './Overlay';

import ClickEventContext from './ClickEventContext';

export const RemotionRoot: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(229);
  const [selectedCompositionId, setSelectedCompositionId] = useState(null);
  const [sliderColor, setSliderColor] = useState('red');

  localStorage.setItem('myKey', 'myValue');
  const myValue = localStorage.getItem('myKey');
console.log(myValue); // Output: "myValue"
let compositions = [];

// Check if 'compositions' item exists in Local Storage
if (localStorage.getItem('compositions')) {
  // // If it exists, use the existing data
  // compositions = JSON.parse(localStorage.getItem('compositions'));
  compositions = [{
    id: 'cars',
    component: Overlay,
    durationInFrames: 75,
    fps: 30,
    width: 1920,
    height: 1080,
  },   {
    id: 'trees',
    component: Overlay,
    durationInFrames: 75,
    fps: 30,
    width: 1920,
    height: 1080,
  },]
} else {
  // If it doesn't exist, create it with default data
  compositions = [
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

  localStorage.setItem('compositions', JSON.stringify(compositions));
}


const [compositionss, setCompositions] = useState(compositions)
const [theText, setText] = useState('')


  const handleChildEvent = (data) => {
    console.log('Event emitted from child:', data);
    setCompositions(data)
localStorage.setItem('compositions', JSON.stringify(data))
console.log(localStorage.getItem('compositions'))
  };

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
setText(id)
    // Set the slider color based on the selected composition
    switch (id) {
      case 'cars':
        setSliderColor('blue');
        setText(id)
        break;
      case 'trees':
        setSliderColor('green');
  setText(id)
        break;

      case 'bus':
        setSliderColor('red');
setText(id)
        break;
      default:
        setSliderColor('red');
    }
  };
  // const compositions = [
  //   {
  //     id: 'cars',
  //     component: Overlay,
  //     durationInFrames: 75,
  //     fps: 30,
  //     width: 1920,
  //     height: 1080,
  //   },
  //   {
  //     id: 'trees',
  //     component: Overlay,
  //     durationInFrames: 75,
  //     fps: 30,
  //     width: 1920,
  //     height: 1080,
  //   },

  //   {
  //     id: 'bus',
  //     component: Overlay,
  //     durationInFrames: 75,
  //     fps: 30,
  //     width: 1920,
  //     height: 1080,
  //   },
  //   // Add more compositions as needed
  // ];

  return (
    <div onClick={sendStuff}>
      <div
        style={{
          position: 'absolute',
          zIndex: 3000,
          top: 570,
          left,
          width,
          height: '3rem',
          backgroundColor: sliderColor,
          borderRadius: '10px',
        }}
        onMouseDown={handleDragMouseDown}
      >{theText}
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
      <div style={{}}onClick={(e) => { alert('balls'); e.stopPropagation()}}>
        <Folder name="Videos">
          {compositionss.map((comp) => (
            <div
              key={comp.id}
              onClick={(e) => handleCompositionClick(comp.id, e)}
              style={{ position: 'absolute' }}
            >
                <ClickEventContext.Provider value={handleChildEvent}>
              <Composition
                id={comp.id}
                component={comp.component}
                durationInFrames={comp.durationInFrames}
                fps={comp.fps}
                width={comp.width}
                defaultProps={{tags: compositions, text: theText}}
                height={comp.height}
              /></ClickEventContext.Provider>
            </div>
          ))}
        </Folder>
      </div>
    </div>
  );


};
