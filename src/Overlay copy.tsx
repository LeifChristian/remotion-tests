import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

import React, { useMemo, useState } from 'react';
import { loadFont } from '@remotion/google-fonts/Roboto';



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
const fred = 9;
const overlayStartTime = 10;
export const Overlay: React.FC<{fred: number}> = ({fred}) => {
  console.log(fred);
  const [first, setFirst] = useState(0);
  const [myVideoDuration, setMyVideoDuration] = useState(75);
  const alertMe = () => {
    console.log('hello');
  };

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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
  const wasClicked = () => {alert('hello')}

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

  const tagChange =
    frame >= overlayStartTime && frame < overlayStartTime + disappearBeforeEnd;

  return (
    <div>
      <button
        id="2"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 200,
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'red',
        }}
        onClick={() => console.log('Button clicked')}
      >
        Click me!
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
 