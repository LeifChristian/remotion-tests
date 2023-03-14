import { Composition } from 'remotion';
import { Overlay } from './Overlay';


export const RemotionRoot: React.FC = () => {
	const sendStuff = () => {
		alert('ok')
	}

	return (
		<div onClick={sendStuff}>
			<Composition 
				id="Overlay"
				component={Overlay}
				durationInFrames={75} 
				fps={30}
				width={1920}
				height={1080}
			/>
		</div>
	);
};
