import React, { useState, useEffect }  from "react";
import { IconButton, SvgIcon } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slider } from "@mui/material";
import './contentheader.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import { ContentHeaderSliders } from "./ContentHeaderSliders";

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
        
        let thisClass = "contentheader";
        if (isMobile) {
            thisClass = "contentheader-stream";
        }

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
                        "volume": 100,
                        "loop": false,
                        "loop1": 20,
                        "loop2": 40
                    }
                ]
            }
        }
        return (
            <div className={thisClass}>
                <div className="content-header-top-row">
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
                    {!isMobile && <ContentHeaderSliders
                        folders={folders}
                        openedFolder={openedFolder}
                        openedStream={openedStream}
                        volumeToggleClicked={volumeToggleClicked}
                        currentStreamMute={currentStreamMute}
                        streamVolumeChanged={streamVolumeChanged}
                        streamFadeTimeChanged={streamFadeTimeChanged}
                        fadeToggleClicked={fadeToggleClicked}
                        currentStreamFade={currentStreamFade}
                        currentStreamFadeTime={currentStreamFadeTime}
                    />}
                    <div className="buttons-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="delete" onClick={deleteButtonClicked}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="content-header-bottom-row">
                    {isMobile && <ContentHeaderSliders
                        folders={folders}
                        openedFolder={openedFolder}
                        openedStream={openedStream}
                        volumeToggleClicked={volumeToggleClicked}
                        currentStreamMute={currentStreamMute}
                        streamVolumeChanged={streamVolumeChanged}
                        streamFadeTimeChanged={streamFadeTimeChanged}
                        fadeToggleClicked={fadeToggleClicked}
                        currentStreamFade={currentStreamFade}
                        currentStreamFadeTime={currentStreamFadeTime}
                    />}
                </div>
            </div>
        );
    }
}