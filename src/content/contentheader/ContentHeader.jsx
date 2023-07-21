import React, { useState, useEffect }  from "react";
import { IconButton, SvgIcon } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
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

export function ContentHeader({ 
    toggleSort, 
    addFolderClicked, 
    sortByAlpha, 
    openedPage, 
    folders, 
    backButtonClicked, 
    openedFolder, 
    openedStream, 
    openEmojiPopup, 
    openDeletePopup, 
    streamNameEdited, 
    streamVolumeChanged, 
    streamMuteChanged, 
    streamFadeTimeChanged, 
    streamFadeChanged, 
    currentStreamMute, 
    currentStreamFade, 
    currentStreamFadeTime,
    currentStreamIcon
 }) {
    
    function volumeToggleClicked() {
        streamMuteChanged();
    }
    
    function fadeToggleClicked() {
        streamFadeChanged();
    }

    function deleteButtonClicked() {
        openDeletePopup(openedFolder);
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
                "streamMute": false,
                "streamVolume": 50,
                "streamFade": false,
                "streamFadeTime": 0,
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
                                    <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={thisStream.streamVolume} />
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="fade-container-mobile">
                            <div className="buttons">
                                <IconButton sx={buttonStyle} aria-label="fade toggle" onClick={fadeToggleClicked}>
                                    <SvgIcon>
                                        <svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve">
                                            <path d="M4,4h4v16H4V4z"/>
                                            <rect x="10" y="9" width="4" height="11"/>
                                            <rect x="16" y="13" width="4" height="7"/>
                                        </svg>
                                    </SvgIcon>
                                </IconButton>
                            </div>
                            <div className="fade-slider-container">
                                <span className="caption-mobile-content-header">No Fade</span>
                                <ThemeProvider theme={muiTheme}>
                                    <Slider sx={sliderStyle} size="small" min={0} max={10} defaultValue={thisStream.streamFadeTime} />
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
                        <span>{currentStreamIcon}</span>
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
                                onChange={streamNameEdited}
                            />
                        </ThemeProvider>
                    </div>
                    <div className="volume-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
                                {!currentStreamMute && <VolumeUpIcon/>}
                                {currentStreamMute && <VolumeOffIcon/>}
                            </IconButton>
                        </div>
                        <div className="header-slider-container">
                            <ThemeProvider theme={muiTheme}>
                                <Slider sx={sliderStyle} size="small" min={0} max={100} disabled={currentStreamMute} defaultValue={thisStream.streamVolume} onChange={streamVolumeChanged}/>
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="fade-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="fade toggle" onClick={fadeToggleClicked}>
                                {!currentStreamFade && <SvgIcon>
                                        <svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                x="0px" y="0px" viewBox="0 0 24 24" fill="#FFFFFF" xmlSpace="preserve">
                                            <polygon class="st0" points="8,5 5,5 8,7.5 "/>
                                            <polygon class="st0" points="4,20 8,20 8,9.6 4,6.2 "/>
                                            <polygon class="st0" points="14,9 10,9 10,9.2 14,12.6 "/>
                                            <polygon class="st0" points="10,20 14,20 14,14.7 10,11.3 "/>
                                            <polygon class="st0" points="15,20 19,20 19,19 15,15.5 "/>
                                            <polygon class="st0" points="19,13 15,13 15,13.5 19,16.9 "/>
                                            <polygon class="st0" points="20.9,20.6 1.9,4.3 0.8,5.6 19.9,21.8 20.9,20.6 20.9,20.6 "/>
                                        </svg>
                                    </SvgIcon>}
                                {currentStreamFade && <SvgIcon>
                                        <svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            x="0px" y="0px" viewBox="0 0 24 24" fill="#FFFFFF" xmlSpace="preserve">                 
                                            <rect x="4" y="5" class="st0" width="4" height="15"/>
                                            <rect x="10" y="9" class="st0" width="4" height="11"/>
                                            <rect x="15" y="13" class="st0" width="4" height="7"/>
                                        </svg>
                                    </SvgIcon>}
                            </IconButton>
                        </div>
                        <div className="fade-slider-container">
                            {!currentStreamFade && <span className="caption">No Fade Out</span>}
                            {currentStreamFade && <span className="caption">Fade out {currentStreamFadeTime}s</span>}
                            <ThemeProvider theme={muiTheme}>
                                <Slider sx={sliderStyle} size="small" min={0} max={10} disabled={!currentStreamFade} defaultValue={thisStream.streamFadeTime} onChange={streamFadeTimeChanged}/>
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