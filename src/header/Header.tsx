import React from "react";
import { IconButton } from "@mui/material";
import { Slider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './header.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});


export function Header() {
  const buttonStyle = { 
    color: "#ffffff",
    '&:hover': {
      backgroundColor: 'rgb(62, 64, 80)',
    },
  };
  return (
        <div className="header">
          <div className="buttons-container">
            <div className="buttons">
              <IconButton sx={buttonStyle} aria-label="open">
                  <FolderIcon/>
              </IconButton>
              <IconButton sx={buttonStyle} aria-label="save">
                  <SaveIcon/>
              </IconButton>
            </div>
          </div>
          <div className="buttons-container">
            <div className="buttons">
              <IconButton sx={buttonStyle} aria-label="volume toggle mute">
                  <VolumeUpIcon/>
              </IconButton>
            </div>
            <div className="slider-container">
              <ThemeProvider theme={muiTheme}>
                <Slider min={18} max={90} defaultValue={40} />
              </ThemeProvider>
            </div>
          </div>
        </div>
    );
    /*
          <div className="scene-container">
            <div className="scene-name-container">
              <span className="scene-name">Scene Name</span>
              <div className="scene-dropdown">
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-yop3gh" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </div>
            </div>
            <div className="buttons">
              <div className="scene-sort-container" id="sortButton">
                <Button image="sort_recent"/>
                <div className="scene-dropdown">
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-yop3gh" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                    <path d="M7 10l5 5 5-5z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <Button image="add"/>
                <Button image="edit"/>
                <Button image="remove"/>
              </div>
            </div>
          </div>
        </div>
    );
    */
}