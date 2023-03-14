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

const Overlay: React.FC = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const disappearBeforeEnd = endTime - frame;

  const scale = spring({
    fps,
    frame,
    config: {
      mass: 0.5,
    },
  });

  const out = spring({
    fps,
    frame: disappearBeforeEnd,
    config: {
      damping: 600,
    },
    durationInFrames: disappearBeforeEnd,
  });

  const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
  const outY = interpolate(out, [0, 1], [0, -500]);

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

  const handleClick = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = (startTime, endTime) => {
    setStartTime(startTime);
    setEndTime(endTime);
    setShowPopup(false);
  };

  return (
    <div style={{ position: 'relative' }} onClick={handleClick}>
      {showPopup && <Popup onSubmit={handlePopupSubmit} />}

      {frame >= startTime && frame < endTime && (
        <AbsoluteFill>
          <div style={container}>
            <div style={title}>Hashtags</div>
            <div style={text}>Go here!!</div>
          </div>
        </AbsoluteFill>
      )}
    </div>
  );
};

const Popup = ({ onSubmit }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const handleSubmit = () => {
    onSubmit(startTime, endTime);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 300,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '90%',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Set Start and End Time</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
<label htmlFor="startTime">Start Time:</label>
<input
id="startTime"
type="number"
value={startTime}
onChange={(e) => setStartTime(Number(e.target.value))}
/>
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<label htmlFor="endTime">End Time:</label>
<input
id="endTime"
type="number"
value={endTime}
onChange={(e) => setEndTime(Number(e.target.value))}
/>
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<button onClick={handleSubmit}>Submit</button>
</div>
</div>
</div>
);
};
