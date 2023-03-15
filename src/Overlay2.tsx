import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video } from 'remotion';
import React, { useMemo, useState, useEffect } from 'react';
import { loadFont } from '@remotion/google-fonts/Roboto';
import { v4 as uuidv4 } from 'uuid';
import myVideoSrc from './sample-5s.mp4'
import { PlayerRef } from '@remotion/player';


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


export const Overlay2 = ({onCompositionClick}) => {
  
useEffect(() => {
alert('cars')
}, [])

}