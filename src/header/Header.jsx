import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Slider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
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


export function Header({setFolders, saveButtonClicked, setStreamables, masterVolumeMute, setMasterVolumeMute, setMasterVolumeValue }) {

  const buttonStyle = { 
    color: "#ffffff",
    '&:hover': {
      backgroundColor: 'rgb(62, 64, 80)',
    },
  };
  
  function openButtonClicked() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
      if (input.files) {
        const file = input.files[0];
        if (file) {
          var reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = function (event) {
            if (event && event.target && event.target.result) {
              const objects = JSON.parse(String(event.target.result));
              console.log(objects);
              setFolders(objects);
              const newStreamables = [];
              //Create array of streamable links
              objects.forEach(folder => {
                folder.streams.forEach(stream => {
                  stream.streamData.forEach(streamLink => {
                    newStreamables.push({
                      "playing": false,
                      "streamId": stream.id,
                      "linkId": streamLink.id,
                      "link": streamLink.link,
                      "streamVolume": stream.streamVolume / 100,
                      "linkVolume": streamLink.volume / 100,
                      "mute": stream.streamMute || streamLink.mute,
                      "loop": streamLink.loop,
                      "fade": stream.streamFade,
                      "fadeTime": stream.streamFadeTime
                    })
                  })
                })
              })
              setStreamables(newStreamables);
            }
          }
        }
      }
    };
    input.click();
  }

  function volumeToggleClicked() {
    setMasterVolumeMute(!masterVolumeMute);
  }

  const volumeSliderChanged = (event, newValue) => {
    setMasterVolumeValue(newValue);
  };

  return (
        <div className="header">
          <div className="buttons-container">
            <div className="buttons">
              <IconButton sx={buttonStyle} aria-label="open" onClick={openButtonClicked}>
                  <FolderIcon/>
              </IconButton>
              <IconButton sx={buttonStyle} aria-label="save" onClick={saveButtonClicked}>
                  <SaveIcon/>
              </IconButton>
            </div>
          </div>
          <div className="buttons-container">
            <div className="buttons">
              <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
                {!masterVolumeMute && <VolumeUpIcon/>}
                {masterVolumeMute && <VolumeOffIcon/>}
              </IconButton>
            </div>
            <div className="slider-container">
              <ThemeProvider theme={muiTheme}>
                <Slider min={0} max={100} defaultValue={50} disabled={masterVolumeMute} onChange={volumeSliderChanged}/>
              </ThemeProvider>
            </div>
          </div>
        </div>
    );
}