import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useState, useEffect } from 'react';
import { loadFont } from '@remotion/google-fonts/Roboto';
import { v4 as uuidv4 } from 'uuid';


const { fontFamily } = loadFont();

const title: React.CSSProperties = {
  fontFamily,
  fontSize: 80,
  fontWeight: 'bold',
};

const text: React.CSSProperties = {
  fontWeight: 'bold',
  fontFamily,
  fontSize: 40,
  color: '#4290F5',
};

const disappearBeforeEnd = 20;
const overlayStartTime = 10;


export const Overlay = () => {

  const [first, setFirst] = useState(0);
  const [myVideoDuration, setMyVideoDuration] = useState(75);
  const [userInput, setUserInput] = useState({});
  const [arrayOfTags, setArrayOfTags] = useState([])
  const alertMe = () => {

  };

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  useEffect(() => {
}, [userInput, arrayOfTags]);

  function frameToSeconds(frame: number, fps: number) {
    return frame / fps;
  }

  const timeInSeconds = frameToSeconds(frame, fps);

  // Console.log(timeInSeconds, "timesec")

  const scale = spring({
    fps,
    frame,
    config: {
      mass: 0.5,
    },
  });

  const out = spring({
    fps,
    frame: frame - durationInFrames + disappearBeforeEnd,
    config: {
      damping: 600,
    },
    durationInFrames: disappearBeforeEnd,
  });

  const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
  const outY = interpolate(out, [0, 1], [0, -500]);
  

  const doThings = () => {
    const input = prompt('Enter hashtag:');
    const id = uuidv4();
    const videoId = id.substring(0, 5);

    if (input) {
      const dave = input.toString();
      const newTag = {hashTag: dave, timeStamp: timeInSeconds, videoId: videoId};
      setUserInput(newTag);
      setArrayOfTags(prevState => [...prevState, newTag]);
    }
  };

  const container: React.CSSProperties = useMemo(() => {
    return {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 25,
      right: 90,
      top: 90,
      scale: String(scale),
      translate: `0 ${outY}px`,
      rotate: `${rotate}rad`,
      padding: 40,
    };
  }, [scale, outY, rotate]);



  const tagChange = frame >= overlayStartTime && frame < overlayStartTime + disappearBeforeEnd;

  useEffect(() => {
    if (userInput?.hashTag) {
      console.log(userInput, 'stamped Object');
    }
  }, [userInput]);
  
  useEffect(() => {
 arrayOfTags.length ? console.log(arrayOfTags, '<-- all tags') : ''
  }, [arrayOfTags]);
  
  
  return (
    <div>
      <button
        id="2"
        style={{
          position: 'absolute',
         height: '100vh',
         width: '100vw',
          zIndex: 200,
          fontSize: '90rem',
          fontWeight: 'bold',
          color: 'red',
        opacity: 0
        }}
        onClick={() => doThings()}
      >
      </button>

      {tagChange ? (
        <AbsoluteFill>
          <div style={container}>
            <div style={title}>Hashtags</div>
            <div style={text}>Go here!!</div>
          </div>
        </AbsoluteFill>
      ) : null}
    </div>
  );
};
 