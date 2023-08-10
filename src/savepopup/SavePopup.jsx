import React, { useState } from "react";
import './savepopup.css'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
import Button from '@mui/material/Button';
import CsvDownload from "react-csv-downloader";

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

export function SavePopup({ savePopupClose, savePopupClicked, folders }) {
    let [currentName, setCurrentName] = useState("File");

    function textChanged(event) {
        if (event && event.target && event.target.value) {
            setCurrentName(event.target.value);
        }
    }

    let mouseOrigin = "bg";

    function popupBackgroundMouseUp(event) {
        if (mouseOrigin === "bg") {
            savePopupClose();
        }
    }

    function popupClicked(event) {
        event.stopPropagation();
        mouseOrigin = "popup";
    }

    function popupBackgroundMouseDown(event) {
        mouseOrigin = "bg";
    }

    function saveButtonClicked() {
        savePopupClicked(currentName);
    }

    const buttonStyle = { 
        color: "rgb(187, 153, 255)",
        '&:hover': {
        backgroundColor: 'rgb(56, 57, 82)',
        },
        borderRadius: "15px",
    };

    return (
        <div className="popup-background" onMouseDown={popupBackgroundMouseDown} onMouseUp={popupBackgroundMouseUp}>
            <div className="save-popup" onMouseDown={popupClicked}>
                <div className="popup-header">Save file as</div>
                <div className="save-popup-name-container">
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
                            defaultValue={currentName}
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
                            onChange={textChanged}
                        />
                    </ThemeProvider>
                    <span className="save-popup-extension">.djinni</span>
                </div>
                <div className="popup-buttons-container">
                    <Button variant="text" sx= {buttonStyle} onClick={savePopupClose}>
                        Cancel
                    </Button>
                    <Button variant="text" sx= {buttonStyle} onClick={saveButtonClicked}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}