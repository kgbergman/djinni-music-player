import React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slider } from "@mui/material";
import './contentheader.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});

export function ContentHeader() {
    
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };
    const sliderStyle = { 
        '& .MuiSlider-thumb': {
        height: '15px',
        width: '15px',
        },
        '& .MuiSlider-track': {
        height: '3px',
        },
        '& .MuiSlider-rail': {
        height: '3px',
        },
    };

    let page = "Stream";

    if (page === "Folder") {
        return (
            <div className="contentheader">
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="back">
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                </div>
                <span className="title">Scene Name</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="sort toggle">
                            <SortByAlphaIcon/>
                        </IconButton>
                        <IconButton sx={buttonStyle} aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                        <IconButton sx={buttonStyle} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
    else if (page === "Folders") {
        return (
            <div className="contentheader">
                <span className="title">All Folders</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="sort toggle">
                            <SortByAlphaIcon/>
                        </IconButton>
                        <IconButton sx={buttonStyle} aria-label="add">
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
    else if (page === "Stream") {
        return (
            <div className="contentheader">
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="back">
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                </div>
                <span className="title">Stream Name</span>
                <div className="volume-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="volume toggle mute">
                            <VolumeUpIcon/>
                        </IconButton>
                    </div>
                    <div className="header-slider-container">
                        <ThemeProvider theme={muiTheme}>
                            <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={60} />
                        </ThemeProvider>
                    </div>
                </div>
                <div className="fade-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="fade toggle">
                            <BarChartIcon/>
                        </IconButton>
                    </div>
                    <div className="fade-slider-container">
                        <span className="caption">No Fade</span>
                        <ThemeProvider theme={muiTheme}>
                            <Slider sx={sliderStyle} size="small" min={0} max={10} defaultValue={0} />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}