import React, { useState }  from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import EditIcon from '@mui/icons-material/Edit';
import './stream.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Slider } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});

export function Stream({ stream, streamClicked, selected, editStreamClicked, sliderChanged, volumeStreamClicked, streamMuted }) {

    let [currentTgt, setCurrentTgt] = useState("");

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
        outlineWidth: '2px',
        outlineColor: "rgb(187, 153, 255)",
        transition: `outline-color 0s`
    };
    let nonSelectedOutline = {
        outlineWidth: '2px',
        outlineColor: "rgb(34, 38, 57)",
        transition: `outline-color ${stream.streamFade ? stream.streamFadeTime : 0}s`
    };
    const outline = selected ? selectedOutline : nonSelectedOutline;

    let selectedShow = {
        visibility: 'hidden'
    };
    selectedShow = selected ? { visibility:'visible' } : selectedShow;

    const [defaultValue] = React.useState(stream.streamVolume);

    return (
    <div className="stream" id={stream.id} onMouseDown={streamMouseDown} onMouseUp={selectStream} style={outline}>
        <div className="stream-fade"></div>
        <div className="stream-high-row" style={selectedShow}>
            <div className="stream-volume-button-container">
                <Tooltip title="Toggle Stream Mute">
                    <IconButton size="small" sx={buttonStyle} aria-label="volume toggle mute" onMouseDown={volumeStreamMouseDown} onClick={(e) => volumeStreamClicked(e, stream.id)}>
                        {!streamMuted && <VolumeUpIcon fontSize="inherit"/>}
                        {streamMuted && <VolumeOffIcon fontSize="inherit"/>}
                    </IconButton>
                </Tooltip>
            </div>
            <div className="stream-slider-container">
                <ThemeProvider theme={muiTheme}>
                    <Slider size="small" min={0} max={100} defaultValue={defaultValue} disabled={streamMuted} onMouseDown={sliderMouseDown} onChange={(e) => sliderMoved(e, stream.id)}/>
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
                <Tooltip title="Edit Stream">
                    <IconButton id={stream.id} size="small" sx={buttonStyle} aria-label="edit" onMouseDown={editStreamMouseDown} onClick={editStreamClicked}>
                        <EditIcon fontSize="small" sx={{ fontSize: "15px" }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    </div>
    );
}