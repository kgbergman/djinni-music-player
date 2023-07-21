import React, { useState, useEffect }  from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
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

export function Stream({ stream, streamClicked, selected, editStreamClicked, sliderChanged, volumeStreamClicked }) {

    let [currentTgt, setCurrentTgt] = useState("bg");

    function editStreamMouseDown(event) {
        setCurrentTgt("edit");
        event.stopPropagation();
    }

    function volumeStreamMouseDown(event) {
        setCurrentTgt("volume");
        event.stopPropagation();
    }

    function sliderMouseDown(event) {
        setCurrentTgt("volume");
        event.stopPropagation();
    }

    function streamMouseDown(event) {
        setCurrentTgt("bg");
        console.log(currentTgt);
    }

    function selectStream(event) {
        if (currentTgt === "bg") {
            streamClicked(event);
        }
    }

    function sliderMoved(event, value) {
        sliderChanged(event, value);
    }

    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };

    let selectedOutline = {
        outlineWidth: '0px'
    };
    selectedOutline = selected ? { outlineWidth:'2px' } : selectedOutline;

    let selectedShow = {
        visibility: 'hidden'
    };
    selectedShow = selected ? { visibility:'visible' } : selectedShow;

    return (
    <div className="stream" id={stream.id} onMouseDown={streamMouseDown} onMouseUp={selectStream} style={selectedOutline}>
        <div className="stream-fade"></div>
        <div className="stream-high-row" style={selectedShow}>
            <div className="stream-volume-button-container">
                <IconButton size="small" sx={buttonStyle} aria-label="volume toggle mute" onMouseDown={volumeStreamMouseDown} onClick={(e) => volumeStreamClicked(e, stream.id)}>
                    {!stream.streamMute && <VolumeUpIcon fontSize="inherit"/>}
                    {stream.streamMute && <VolumeOffIcon fontSize="inherit"/>}
                </IconButton>
            </div>
            <div className="stream-slider-container">
                <ThemeProvider theme={muiTheme}>
                    <Slider size="small" min={0} max={100} defaultValue={stream.streamVolume} disabled={stream.streamMute} onMouseDown={sliderMouseDown} onChange={(e) => sliderMoved(e, stream.id)}/>
                </ThemeProvider>
            </div>
        </div>
        <div className="stream-icon-container">
            <p className="stream-icon">{stream.streamIcon}</p>
        </div>
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