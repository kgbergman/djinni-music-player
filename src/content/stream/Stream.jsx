import React, { useState, useEffect }  from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import './stream.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Slider } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});

export function Stream({ stream, streamClicked, selected, editStreamClicked }) {

    let currentTgt = "bg";

    function editStreamMouseDown(event) {
        currentTgt = "edit";
        event.stopPropagation();
    }

    function volumeStreamMouseDown(event) {
        currentTgt = "volume";
        event.stopPropagation();
    }

    function volumeStreamClicked(event) {
        console.log("volume stream");
        event.stopPropagation();
    }

    function sliderMouseDown(event) {
        currentTgt = "slider";
        event.stopPropagation();
    }

    function streamMouseDown(event) {
        currentTgt = "bg";
    }

    function selectStream(event) {
        if (currentTgt === "bg") {
            streamClicked(event);
        }
    }

    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let selectedOutline = {
        outlineWidth: '0px'
    };
    selectedOutline = selected ? { outlineWidth:'2px' } : selectedOutline;

    let selectedShow = {
        visibility: 'hidden'
    };
    selectedShow = selected ? { visibility:'visible' } : selectedShow;

    const isMobile = width < 580;

    if (isMobile) {
        return (
        <div className="stream stream-mobile">
            <div className="stream-fade"></div>
            <div className="stream-high-row hidden">
                <div className="stream-volume-button-container">
                    <IconButton size="small" sx={buttonStyle} aria-label="volume toggle mute">
                        <VolumeUpIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="stream-slider-container">
                    <ThemeProvider theme={muiTheme}>
                        <Slider size="small" min={0} max={100} defaultValue={60} />
                    </ThemeProvider>
                </div>
            </div>
            <p className="stream-icon">&#127754;</p>
            <div className="stream-low-row">
                <div className="stream-name-container">
                    <span className="stream-name">Ocean</span>
                </div>
                <div className="stream-edit-button-container">
                    <IconButton size="small" sx={buttonStyle} aria-label="edit">
                        <EditIcon fontSize="small" sx={{ fontSize: "15px" }} />
                    </IconButton>
                </div>
            </div>
        </div>
        );
    }
    else {
        return (
        <div className="stream" id={stream.id} onMouseDown={streamMouseDown} onMouseUp={selectStream} style={selectedOutline}>
            <div className="stream-fade"></div>
            <div className="stream-high-row" style={selectedShow}>
                <div className="stream-volume-button-container">
                    <IconButton size="small" sx={buttonStyle} aria-label="volume toggle mute" onMouseDown={volumeStreamMouseDown} onClick={volumeStreamClicked}>
                        <VolumeUpIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="stream-slider-container">
                    <ThemeProvider theme={muiTheme}>
                        <Slider size="small" min={0} max={100} defaultValue={60} onMouseDown={sliderMouseDown}/>
                    </ThemeProvider>
                </div>
            </div>
            <p className="stream-icon">{stream.streamIcon}</p>
            <div className="stream-low-row">
                <div className="stream-name-container">
                    <span className="stream-name">{stream.streamName}</span>
                </div>
                <div className="stream-edit-button-container">
                    <IconButton id={stream.id} size="small" sx={buttonStyle} aria-label="edit" onMouseDown={editStreamMouseDown} onClick={editStreamClicked}>
                        <EditIcon fontSize="small" sx={{ fontSize: "15px" }} />
                    </IconButton>
                </div>
            </div>
        </div>
        );
    }
}