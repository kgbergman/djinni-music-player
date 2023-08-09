import React, { useState } from "react";
import { createTheme } from '@mui/material/styles';
import "./autoplayoverlay.css"
import canAutoPlay from 'can-autoplay';

const muiTheme = createTheme({
    palette: {
      primary: {
        main: 'rgb(187, 153, 255)',
      },
    },
  });

export function AutoplayOverlay({isGM}) {

    let isChromium = !!window.chrome;
    let isMobile = false;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        isMobile = true;
    }

    let [canAutoplay, setCanAutoplay] = useState(!isChromium && !isMobile);
    canAutoPlay.video().then(({result}) => {
        if (result === true) {
            // Can autoplay
            setCanAutoplay(true);
        }
    })

    function openGithub() {
        window.open("https://github.com/kgbergman/music-player/blob/main/public/autoplay.md", "_blank");
    }

    function ignoreAutoplay() {
        setCanAutoplay(true);
    }

    return (
        <div className="autoplay-overlay">
            {isGM && !canAutoplay && isChromium && !isMobile && <div className="chromium-overlay">
                <div className="gm-overlay-text">
                    <div className="gm-overlay-top">Sorry, your browser doesn't support autoplay. Please either...</div>
                    <div>
                        <div>• Use Firefox or Safari</div>
                        <div>• Follow <a className="instructions-link" onClick={openGithub}>these instructions</a> to allow autoplay on your browser</div>
                    </div>
                </div>
                <div className="gm-overlay-ignore" onClick={ignoreAutoplay}>Ignore and continue without audio</div>
            </div>}
            {isGM && !canAutoplay && isMobile && <div className="chromium-overlay">
                <div className="gm-overlay-text">
                        <div>Sorry, mobile browsers don't support autoplay. Please use Firefox or Safari on desktop to hear audio.</div>
                </div>
                <div className="gm-overlay-ignore" onClick={ignoreAutoplay}>Ignore and continue without audio</div>
            </div>}
            {!isGM && !canAutoplay && isChromium && !isMobile && <div className="chromium-overlay">
                <div className="overlay-text">
                    <div>Sorry, your browser doesn't support autoplay. Please either...</div>
                    <div>
                        <div>• Use Firefox or Safari</div>
                        <div>• Follow <a className="instructions-link" onClick={openGithub}>these instructions</a> to allow autoplay on your browser</div>
                        <div>• Ask your GM to share their audio through Zoom, Discord, etc.</div>
                    </div>
                </div>
            </div>}
            {!isGM && !canAutoplay && isMobile && <div className="chromium-overlay">
            <div className="overlay-text">
                    <div>Sorry, mobile browsers don't support autoplay. Please either...</div>
                    <div>
                        <div>• Use Firefox or Safari on desktop</div>
                        <div>• Ask your GM to share their audio through Zoom, Discord, etc.</div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

/*

            {!canAutoplay && isChromium && !isMobile && <div className="chromium-overlay">
                <div className="overlay-text">
                    <div>Sorry, your browser doesn't support autoplay. Please either...</div>
                    <div>
                        <div>• Use Firefox or Safari</div>
                        <div>• Follow <a className="instructions-link" onClick={openGithub}>these instructions</a> to allow autoplay on your browser</div>
                        <div>• Ask your GM to share their audio through Zoom, Discord, etc.</div>
                    </div>
                </div>
            </div>}
            {!canAutoplay && isMobile && <div className="chromium-overlay">
            <div className="overlay-text">
                    <div>Sorry, mobile browsers don't support autoplay. Please either...</div>
                    <div>
                        <div>• Use Firefox or Safari on desktop</div>
                        <div>• Ask your GM to share their audio through Zoom, Discord, etc.</div>
                    </div>
                </div>
            </div>}
            */