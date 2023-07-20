import React from "react";
import './folder.css'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { HexColorPicker } from "react-colorful";
import Button from '@mui/material/Button';

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

export function NewEditFolderPopup({ popupClose, popupType, folderToEdit, folders }) {
    
    function setColor() {

    }

    let mouseOrigin = "bg";

    function popupBackgroundMouseUp(event) {
        if (mouseOrigin === "bg") {
            popupClose();
        }
    }

    function popupClicked(event) {
        event.stopPropagation();
        mouseOrigin = "popup";
    }

    function popupBackgroundMouseDown(event) {
        mouseOrigin = "bg";
    }

    const buttonStyle = { 
        color: "rgb(187, 153, 255)",
        '&:hover': {
        backgroundColor: 'rgb(56, 57, 82)',
        },
        borderRadius: "15px",
    };

    const saveButtonStyle = { 
        color: "rgb(187, 153, 255)",
        '&:hover': {
            backgroundColor: 'rgb(56, 57, 82)',
            borderColor: "rgb(187, 153, 255)",
        },
        borderRadius: "15px",
        borderColor: "rgb(116, 101, 161)",
        width: "100%",
    };

    if (popupType === "new") {
        return (
        <div className="popup-background" onMouseDown={popupBackgroundMouseDown} onMouseUp={popupBackgroundMouseUp}>
            <div className="popup" onMouseDown={popupClicked}>
                <div className="popup-header">Add new folder</div>
                <div className="popup-name-container">
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
                                },
                                width: "100%",
                            }} 
                            size="small"
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            defaultValue="New Folder"
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
                <div className="popup-color-title">
                    Color
                </div>
                <div className="popup-color-picker">
                    <HexColorPicker color={"#000000"} onChange={setColor} />
                </div>
                <div className="popup-buttons-container">
                    <Button variant="text" sx= {buttonStyle} onClick={popupClose}>
                        Cancel
                    </Button>
                    <Button variant="text" sx= {buttonStyle}>
                        Add
                    </Button>
                </div>
            </div>
        </div>
        );
    }
    else {
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(folderToEdit))[0];
        return (
        <div className="popup-background" onMouseDown={popupBackgroundMouseDown} onMouseUp={popupBackgroundMouseUp}>
            <div className="popup" onMouseDown={popupClicked}>
                <div className="popup-header">Edit folder</div>
                <div className="popup-name-container">
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
                                },
                                width: "100%",
                            }} 
                            size="small"
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            defaultValue={thisFolder.folderName}
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
                <div className="popup-color-title">
                    Color
                </div>
                <div className="popup-color-picker">
                    <HexColorPicker color={thisFolder.folderColor} onChange={setColor} />
                </div>
                <div className="popup-buttons-container-save">
                    <Button variant="outlined" sx= {saveButtonStyle}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
        );
    }
}