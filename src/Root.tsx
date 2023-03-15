import React, { useEffect, useState } from 'react';
import { Composition, Folder } from 'remotion';
import { Overlay } from './Overlay';

import ClickEventContext from './ClickEventContext';
let compositions = []
if (localStorage.getItem('compositions')) {
  // // If it exists, use the existing data
  // compositions = JSON.parse(localStorage.getItem('compositions'));
  // let mycompositions = JSON.parse(localStorage.getItem('compositions'));
  // console.log(mycompositions)
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


export const RemotionRoot: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(240);
  const [selectedCompositionId, setSelectedCompositionId] = useState(null);
  const [sliderColor, setSliderColor] = useState('red');
// Check if 'compositions' item exists in Local Storage
if (localStorage.getItem('compositions')) {
  // // If it exists, use the existing data
  // compositions = JSON.parse(localStorage.getItem('compositions'));
  // let mycompositions = JSON.parse(localStorage.getItem('compositions'));
  // console.log(mycompositions)
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

const [theOpacity, setOpacity] = useState('')

const [currentIndex, setCurrentIndex] = useState(0)

  const handleChildEvent = (data) => {
    console.log('Event emitted from child:', data);
    setCompositions(data)
    return compositionss
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
  
    const sliderDuration = 3; // replace with the actual duration of your slider
    const startTime = (left / window.innerWidth) * sliderDuration;
    const endTime = ((left + width) / window.innerWidth) * sliderDuration;
  console.log(theText, '<-- the tag to be updated', compositionss[currentIndex], 'id')
    console.log(`Slider start position: ${left}px, end position: ${left + width}px`);
    console.log(`Start time: ${startTime}s, end time: ${endTime}s`);
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
      console.log(`Slider start position: ${left}px, end position: ${left + width}px`);
      console.log(theText, '<-- the tag to be updated', compositionss[currentIndex], 'id')
    }
  };
  
  const handleDragMouseUp = () => {
    document.removeEventListener('mousemove', handleDragMouseMove);
    document.removeEventListener('mouseup', handleDragMouseUp);
  
    const sliderDuration = 3; // replace with the actual duration of your slider
    const startTime = (left / window.innerWidth) * sliderDuration;
    const endTime = ((left + width) / window.innerWidth) * sliderDuration;
    console.log(theText, '<-- the tag to be updated', compositionss[currentIndex], 'id')
    console.log(`Slider start position: ${left}px, end position: ${left + width}px`);
    console.log(`Start time: ${startTime}s, end time: ${endTime}s`);
  };

  const sendStuff = () => {
    console.log('api call here');
  };
  const handleCompositionClick = (id, e) => {
    e.stopPropagation();
    setText(id);
  
    // Find the index of the composition with the given id
    const index = compositionss.findIndex((comp) => comp.id.toLowerCase() === id.toLowerCase());
  
    // Update the currentIndex state variable
    setCurrentIndex(index);
  };
  

  const handleDelete = (id) => {
    // Show a confirm prompt to the user
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
  
    if (isConfirmed) {
      // If the user confirms, filter out the item with the given id and update the state
      const updatedCompositionss = compositionss.filter((composition) => composition.id !== id);
      setCompositions(updatedCompositionss);
    }
  };
  const buttonColor = (index) => {
    switch (index) {
      case 0:
        return 'red';
      case 1:
        return 'blue';
      case 2:
        return 'green';
      default:
        return 'yellow';
    }
  };
  
  return (
    <div onClick={sendStuff}>
      {/* <div style={{height: '42vh', width: '16vw', zIndex: 3000000, background: '#1F2428', color: 'silver', position: "absolute", top: 140}}>mike</div> */}
      <ul style={{ height: '42vh', width: '16vw', listStyle: "none", zIndex: 3000000, background: '#1F2428', color: 'silver', position: "absolute", top: 140, borderRadius: '.6em'}}>
    {compositionss.map((composition, index) => (
      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button  style={{background: buttonColor(index), borderRadius: '.5em', marginTop: "6px" }}
          onClick={() => {
            setText(composition.id)
            const index = compositionss.findIndex((comp) => comp.id.toLowerCase() === composition.id.toLowerCase());
            setCurrentIndex(index);
            // sliderColor == "blue" ? setSliderColor('red') : setSliderColor('blue')
            index == 0 ? setSliderColor('red') :  index == 1 ? setSliderColor('blue') :  index == 2 ? setSliderColor('green') : setSliderColor('yellow')
          }}
        >
          {composition.id}
        </button>
        <button
          onClick={() => handleDelete(composition.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'silver',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 10px',
          }}
        >
          X
        </button>
      </li>
    ))}
  </ul>
      <div id='slider'
        style={{
          position: 'absolute',
          zIndex: 3000,
          top: 620,
          left,
          width,
          height: '3rem',
          backgroundColor: sliderColor,
          borderRadius: '10px',
          opacity: theText ? 1 : 0
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
      <div style={{}}onClick={(e) => {  e.stopPropagation()}}>
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
                defaultProps={{tags: compositions, text: theText, index: currentIndex}}
                height={comp.height}
              /></ClickEventContext.Provider>
            </div>
          ))}
        </Folder>
      </div>
    </div>
  );


};
