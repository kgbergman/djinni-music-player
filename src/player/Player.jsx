import React, { memo } from "react";
import ReactPlayer from "react-player";

export function Player({streamLinkId, url, playing, loop, volume, muted, onEnded}) {
    return (
        <ReactPlayer
            key={streamLinkId}
            url={url}
            playing={playing}
            loop={loop}
            volume={volume}
            muted={muted}
            onEnded={onEnded}
        />
    );
}

export const MemoizedPlayer = memo(Player);
