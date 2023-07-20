import React, { useState, useEffect }  from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slider } from "@mui/material";
import './contentheader.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});

function volumeToggleClicked() {
    console.log("volume");
}

function backButtonClicked() {
    console.log("back");
}

function fadeToggleClicked() {
    console.log("fade");
}

export function ContentHeader({ toggleSort, addFolderClicked, sortByAlpha, openedPage, folders, backButtonClicked, openedFolder, openedStream, openEmojiPopup, openDeletePopup }) {

    function deleteButtonClicked() {
        openDeletePopup();
    }

    function sortButtonClicked() {
        toggleSort();
    }

    function emojiButtonClicked() {
        openEmojiPopup();
    }

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

    const isMobile = width < 580;
    
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

    if (openedPage === "folder") {
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        return (
            <div className="contentheader">
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="back" onClick={backButtonClicked}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                </div>
                <span className="title">{thisFolder.folderName}</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="sort toggle" onClick={sortButtonClicked}>
                            {sortByAlpha? <SortByAlphaIcon/>:<AccessTimeIcon/>}
                        </IconButton>
                        <IconButton sx={buttonStyle} aria-label="delete" onClick={deleteButtonClicked}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
    else if (openedPage === "folders") {
        return (
            <div className="contentheader">
                <span className="title">All Folders</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="sort toggle" onClick={sortButtonClicked}>
                            {sortByAlpha? <SortByAlphaIcon/>:<AccessTimeIcon/>}
                        </IconButton>
                        <IconButton sx={buttonStyle} aria-label="add" onClick={addFolderClicked}>
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
    else if (openedPage === "stream") {
        const muiTheme = createTheme({
            palette: {
            primary: {
                main: 'rgb(187, 153, 255)',
            },
            secondary: {
                main: 'rgb(187, 153, 255)',
            },
            },
            components: {
            // Name of the component
            MuiInput: {
                styleOverrides: {
                    // Name of the slot
                    underline: {
                        '&:hover:not(.Mui-disabled):before': {
                            borderColor: 'white'
                        },
                        '&:after': {
                            borderColor: 'white'
                        }
                    }
                    },
            },
            },
        });

        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        let thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];

        if(!thisStream && openedStream === "new") {
            thisStream = {
                "streamName": "New Stream",
                "streamIcon": "😀",
                "streamVolume": 50,
                "streamFade": 0,
                "id": 0,
                "streamData": [
                    {
                        "name": "",
                        "link": "",
                        "volume": 50,
                        "loop": false,
                        "loop1": 0,
                        "loop2": 1
                    }
                ]
            }
        }

        if (isMobile) {
            return (
                <div className="contentheader-mobile">
                    <div className="content-header-row">
                        <div className="buttons-container">
                            <div className="buttons">
                                <IconButton sx={buttonStyle} aria-label="back" onClick={backButtonClicked}>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </div>
                        </div>
                        <span className="title">Stream Name</span>
                    </div>
                    <div className="content-header-row">
                        <div className="volume-container-mobile">
                            <div className="buttons">
                                <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
                                    <VolumeUpIcon/>
                                </IconButton>
                            </div>
                            <div className="header-slider-container">
                                <ThemeProvider theme={muiTheme}>
                                    <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={60} />
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="fade-container-mobile">
                            <div className="buttons">
                                <IconButton sx={buttonStyle} aria-label="fade toggle" onClick={fadeToggleClicked}>
                                    <BarChartIcon/>
                                </IconButton>
                            </div>
                            <div className="fade-slider-container">
                                <span className="caption-mobile-content-header">No Fade</span>
                                <ThemeProvider theme={muiTheme}>
                                    <Slider sx={sliderStyle} size="small" min={0} max={10} defaultValue={0} />
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="contentheader">
                    <div className="buttons-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="back" onClick={backButtonClicked}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="emoji-button-container" onClick={emojiButtonClicked}>
                        <span>{thisStream.streamIcon}</span>
                    </div>
                    <div className="stream-name-edit-container">
                        <ThemeProvider theme={muiTheme}>
                            <TextField 
                                sx={{ 
                                    input: { color: 'white' }, 
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'rgb(187, 153, 255)',
                                    },
                                    '& .MuiInput-underline:hover': {
                                        borderBottomColor: 'white',
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: 'rgb(190, 190, 190)',
                                    },
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {
                                        borderColor: "orange"
                                        }
                                    }
                                }} 
                                size="small"
                                id="standard-basic"
                                hiddenLabel
                                variant="standard"
                                defaultValue={thisStream.streamName}
                                InputLabelProps={{
                                    sx: {
                                    // set the color of the label when not shrinked
                                    color: "rgb(190, 190, 190)",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        // set the color of the label when shrinked (usually when the TextField is focused)
                                        color: "rgb(190, 190, 190)"
                                    },
                                    [`&.${inputLabelClasses.focused}`]: {
                                        color: "rgb(187, 153, 255)"
                                    }
                                    }
                                }}
                            />
                        </ThemeProvider>
                    </div>
                    <div className="volume-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
                                <VolumeUpIcon/>
                            </IconButton>
                        </div>
                        <div className="header-slider-container">
                            <ThemeProvider theme={muiTheme}>
                                <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={thisStream.streamVolume} />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="fade-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="fade toggle" onClick={fadeToggleClicked}>
                                <BarChartIcon/>
                            </IconButton>
                        </div>
                        <div className="fade-slider-container">
                            <span className="caption">No Fade</span>
                            <ThemeProvider theme={muiTheme}>
                                <Slider sx={sliderStyle} size="small" min={0} max={10} defaultValue={thisStream.streamFade} />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="delete" onClick={deleteButtonClicked}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            );
        }
    }
}