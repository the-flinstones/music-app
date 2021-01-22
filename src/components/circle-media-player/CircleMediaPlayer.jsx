import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import CircleControls from 'react-player-circle-controls';
import 'react-player-circle-controls/dist/styles.css';
 
const CircleMediaPlayer = (props) => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });
 
  const onSeek = amount => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  };
 
  return (
    <>
      <ReactPlayer
        ref={player}
        url={props.src}
        playing={playing}
        height="0"
        width="0"
        onProgress={setPlayerState}
        onEnded={() => setPlaying(false)}
      />
      <CircleControls
        played={playerState.played}
        loaded={playerState.loaded}
        playing={playing}
        onSeek={onSeek}
        onTogglePlaying={() => setPlaying(!playing)}
      />
    </>
  );
};
export default  CircleMediaPlayer