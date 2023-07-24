import React, { memo } from "react";
import ReactPlayer from "react-player";

export function Player({url, playing, loop, volume, muted, onEnded}) {
    return (
        <ReactPlayer
            url={url}
            playing={playing}
            loop={loop}
            volume={volume}
            muted={muted}
            onEnded={onEnded}
        />
    );
}

function areEqual(prevPlayer, nextPlayer) {
    console.log(prevPlayer, nextPlayer);
    return prevPlayer.url === nextPlayer.url
      && prevPlayer.playing === nextPlayer.playing
      && prevPlayer.loop === nextPlayer.loop;
  }  

export const MemoizedPlayer = React.memo(Player, areEqual);
