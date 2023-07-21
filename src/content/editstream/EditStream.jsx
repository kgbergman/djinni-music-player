import React, { useState, useEffect }  from "react";
import './editstream.css'
import TextField from '@mui/material/TextField';
import { Slider, SvgIcon } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import DeleteIcon from '@mui/icons-material/Delete';
import RangeSlider from '../../slider/RangeSlider'

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

export function EditStream({ 
    editStreamData, 
    editStreamDeleteClicked, 
    editStreamNameChanged, 
    editStreamLinkChanged, 
    editStreamVolumeChanged, 
    editStreamLoopChanged, 
    editStreamMuteClicked, 
    editStreamLoopClicked 
}) {


    let [thisStreamMute, setThisStreamMute] = useState(editStreamData.mute);
    let [thisStreamLoop, setThisStreamLoop] = useState(editStreamData.loop);
    let [thisStreamLoopTime, setThisStreamLoopTime] = useState([editStreamData.loop1, editStreamData.loop2]);

    function loopChanged(value, streamId) {
        setThisStreamLoopTime(value);
        editStreamLoopChanged(value, streamId);
    }

    function loopClicked(event, streamId) {
        setThisStreamLoop(!thisStreamLoop);
        editStreamLoopClicked(event, streamId);
    }

    function muteClicked(event, streamId) {
        setThisStreamMute(!thisStreamMute);
        editStreamMuteClicked(event, streamId);
    }

    function deleteEditStream() {
        editStreamDeleteClicked(editStreamData.id);
    }
    
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

    if (isMobile) {
        return (
            <div className="edit-stream-mobile">
                <div className="edit-stream-row">
                    <div className="name-container-mobile">
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
                                label="Name"
                                variant="standard"
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
                    <div className="link-container-mobile">
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
                                label="Link"
                                variant="standard"
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
                </div>
                <div className="edit-stream-row">
                    <div className="edit-stream-mobile-volume-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="volume toggle mute">
                                <VolumeUpIcon/>
                            </IconButton>
                        </div>
                        <div className="edit-stream-slider-container">
                            <ThemeProvider theme={muiTheme}>
                                <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={60} />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="mobile-loop-container">
                        <div className="buttons">
                            <IconButton sx={buttonStyle} aria-label="loop toggle">
                                <ThreeSixtyIcon/>
                            </IconButton>
                        </div>
                        <div className="edit-stream-mobile-loop-slider-container">
                            <span className="caption-mobile">No Loop</span>
                            <ThemeProvider theme={muiTheme}>
                                <RangeSlider/>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div className="delete-row">
                    <div className="buttons">
                        <Button variant="outlined" sx= {{color: "white", borderColor: "white" }} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="edit-stream">
                <div className="name-container">
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
                            label="Name"
                            defaultValue={editStreamData.name}
                            variant="standard"
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
                            onChange={(e) => editStreamNameChanged(e, editStreamData.id)}
                        />
                    </ThemeProvider>
                </div>
                <div className="link-container">
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
                            label="Link"
                            defaultValue={editStreamData.link}
                            variant="standard"
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
                            onChange={(e) => editStreamLinkChanged(e, editStreamData.id)}
                        />
                    </ThemeProvider>
                </div>
                <div className="edit-stream-volume-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={(e) => muteClicked(e, editStreamData.id)}>
                            {!thisStreamMute && <VolumeUpIcon/>}
                            {thisStreamMute && <VolumeOffIcon/>}
                        </IconButton>
                    </div>
                    <div className="edit-stream-slider-container">
                        <ThemeProvider theme={muiTheme}>
                            <Slider sx={sliderStyle} size="small" min={0} max={100} disabled={thisStreamMute} defaultValue={editStreamData.volume} onChange={(e) => editStreamVolumeChanged(e, editStreamData.id)}/>
                        </ThemeProvider>
                    </div>
                </div>
                <div className="loop-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="loop toggle" onClick={(e) => loopClicked(e, editStreamData.id)}>
                            {!thisStreamLoop && <SvgIcon>
                                <svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#FFFFFF" viewBox="0 0 24 24" xmlSpace="preserve">
                                    <g>
                                        <path d="M13.4,5.9L13.4,5.9L13.4,5.9L13.4,5.9V9l4.4-4.4l-4.4-4.4v3.6c-1.8-0.3-3.6,0-5.3,0.8l1.6,1.6C10.9,5.7,12.2,5.6,13.4,5.9z"/>
                                        <path d="M10.5,18.1V15L6,19.4l4.4,4.4v-3.6c2,0.4,4,0,5.7-1c0.8-0.5,1.5-1,2-1.7l-1.5-1.5C15.2,17.8,12.9,18.7,10.5,18.1z"/>
                                        <path d="M19.2,7.8l-1.5,1.5c0.6,1.3,0.8,2.8,0.4,4.2c-0.1,0.2-0.1,0.5-0.2,0.7l1.6,1.6C20.7,13.3,20.7,10.3,19.2,7.8z"/>
                                        <path d="M4.7,16.2l1.5-1.5c-0.6-1.3-0.8-2.8-0.4-4.2c0.3-1.3,1.1-2.5,2-3.3L6.4,5.7C3.5,8.3,2.7,12.7,4.7,16.2z"/>
                                        <rect x="11" y="0.4" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.5066 12.222)" width="2.1" height="24.6"/>
                                    </g>
                                </svg>
                            </SvgIcon>}
                            {thisStreamLoop && <SvgIcon>
                                <svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#FFFFFF" viewBox="0 0 24 24" xmlSpace="preserve">
                                    <path class="st2" d="M13.4,5.9c-3.4-0.8-6.8,1.3-7.6,4.6c-0.3,1.4-0.2,2.9,0.4,4.2l-1.5,1.5c-2.3-4-1-9.1,3-11.5c1.7-1,3.8-1.4,5.7-1V0.2l4.4,4.4L13.4,9L13.4,5.9L13.4,5.9z M10.5,18.1c3.4,0.8,6.8-1.3,7.6-4.6c0.3-1.4,0.2-2.9-0.4-4.2l1.5-1.5c2.3,4,1,9.1-3,11.5c-1.7,1-3.8,1.4-5.7,1v3.6L6,19.4l4.4-4.4L10.5,18.1z"/>
                                </svg>
                            </SvgIcon>}
                            
                        </IconButton>
                    </div>
                    <div className="edit-stream-loop-slider-container">
                        {!thisStreamLoop && <span className="caption">No Loop</span>}
                        {thisStreamLoop && <span className="caption">Loop with<br/>{thisStreamLoopTime[0]} - {thisStreamLoopTime[1]}s gap</span>}
                        <ThemeProvider theme={muiTheme}>
                            <RangeSlider loop1={editStreamData.loop1} loop2={editStreamData.loop2} disabled={!thisStreamLoop} rangeChanged={(value) => loopChanged(value, editStreamData.id)}/>
                        </ThemeProvider>
                    </div>
                </div>
                <div className="remove-container">
                    <div className="buttons">
                        <IconButton sx={buttonStyle} aria-label="delete" onClick={deleteEditStream}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}