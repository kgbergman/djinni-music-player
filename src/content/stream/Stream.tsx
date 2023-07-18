import React from "react";
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

export function Stream() {
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };
    return (
    <div className="stream">
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