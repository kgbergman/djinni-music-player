import React from "react";
import './editstream.css'
import TextField from '@mui/material/TextField';
import { Slider } from "@mui/material";
import { IconButton } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DeleteIcon from '@mui/icons-material/Delete';

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

export function EditStream() {
    
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
            <div className="edit-stream-volume-container">
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
            <div className="loop-container">
                <div className="buttons">
                    <IconButton sx={buttonStyle} aria-label="loop toggle">
                        <VolumeUpIcon/>
                    </IconButton>
                </div>
                <div className="edit-stream-loop-slider-container">
                    <span className="caption">No Loop</span>
                    <ThemeProvider theme={muiTheme}>
                        <Slider sx={sliderStyle} size="small" min={0} max={100} defaultValue={60} />
                    </ThemeProvider>
                </div>
            </div>
            <div className="remove-container">
                <div className="buttons">
                    <IconButton sx={buttonStyle} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}