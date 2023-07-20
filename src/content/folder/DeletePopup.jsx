import React from "react";
import './folder.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { inputLabelClasses } from "@mui/material/InputLabel";
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

export function DeletePopup({ closeDeletePopup, type }) {
    let mouseOrigin = "bg";

    function popupBackgroundMouseUp(event) {
        console.log(mouseOrigin);
        if (mouseOrigin === "bg") {
            closeDeletePopup();
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

    const deleteButtonStyle = { 
        color: "rgb(255, 167, 38)",
        '&:hover': {
        backgroundColor: 'rgb(56, 57, 82)',
        },
        borderRadius: "15px",
    };

    return (
        <div className="popup-background" onMouseDown={popupBackgroundMouseDown} onMouseUp={popupBackgroundMouseUp}>
            <div className="delete-folder-popup" onMouseDown={popupClicked}>
                <div className="popup-header">Delete this {type}?</div>
                <div className="popup-caption">This operation cannot be undone.</div>
                <div className="popup-buttons-container">
                    <Button variant="text" sx= {deleteButtonStyle}>
                        Delete
                    </Button>
                    <Button variant="text" sx= {buttonStyle} onClick={closeDeletePopup}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}