import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Composition, Folder } from 'remotion';
import { Overlay } from './Overlay';

export const RemotionRoot: React.FC = () => {
  const sendStuff = () => {
    console.log('api call here');
  };

  

  // Define an array of compositions with their respective properties
  const compositions = [
    {
      id: 'Overlay',
      component: Overlay,
      durationInFrames: 75,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: 'Overlay1',
      component: Overlay,
      durationInFrames: 75,
      fps: 30,
      width: 1920,
      height: 1080,
    },

    {
      id: 'Overlay2',
      component: Overlay,

      fps: 30,
      width: 1920,
      height: 1080,
    },
    // Add more compositions as needed
  ];

  return (
    <div onClick={sendStuff}>

      <div style={{position: 'absolute', zIndex: 300, top: 520, borderRadius: '10px',left: 600, width: '20rem', height: '3rem', backgroundColor: 'red', color: 'green'}}></div>
      <Folder name="relevant-videos">
        {compositions.map((comp) => (
          <Composition
            key={comp.id}
            id={comp.id}
            component={comp.component}
            durationInFrames={comp.durationInFrames}
            fps={comp.fps}
            width={comp.width}
            height={comp.height}
          />
        ))}
      </Folder>
    </div>
  );
};
