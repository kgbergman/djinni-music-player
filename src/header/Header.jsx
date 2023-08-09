import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Slider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import Tooltip from '@mui/material/Tooltip';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import './header.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(187, 153, 255)',
    },
  },
});


export function Header({setFolders, saveButtonClicked, masterVolume, setMasterVolume, soundOutput, toggleSoundOutput, masterPaused, folderKeys, addFolderKey, currentlyStreaming, togglePlayPauseStreams, stopAllStreams, fadeOutVolume }) {

  const buttonStyle = { 
    color: "#ffffff",
    '&:hover': {
      backgroundColor: 'rgb(62, 64, 80)',
    },
    aspectRatio: "1"
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
              setFolders(objects);
              Object.keys(objects).forEach(key => {
                if (!folderKeys.includes(key)) {
                  addFolderKey(key);
                }
              })
            }
          }
        }
      }
    };
    input.click();
  }

  function volumeToggleClicked() {
    const newMasterVolume = structuredClone(masterVolume);
    newMasterVolume.mute = !newMasterVolume.mute;
    setMasterVolume(newMasterVolume);
  }

  const volumeSliderChanged = (event, newValue) => {
    const newMasterVolume = structuredClone(masterVolume);
    newMasterVolume.volume = newValue;
    setMasterVolume(newMasterVolume);
  };

  return (
        <div className="header">
          <div className="buttons-container">
            <div className="buttons">
              <Tooltip title="Open File">
                <AspectRatio ratio="1/1">
                  <IconButton sx={buttonStyle} aria-label="open" onClick={openButtonClicked}>
                      <FolderIcon/>
                  </IconButton>
                </AspectRatio>
              </Tooltip>
              <Tooltip title="Save File">
                <AspectRatio ratio="1/1">
                  <IconButton sx={buttonStyle} aria-label="save" onClick={saveButtonClicked}>
                      <SaveIcon/>
                  </IconButton>
                </AspectRatio>
              </Tooltip>
            </div>
          </div>
          <div className="buttons-and-slider-container">
            <div className="buttons">
              {currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) && !masterPaused && 
              <Tooltip title="Pause All Streams">
                <AspectRatio ratio="1/1">
                  <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={togglePlayPauseStreams}>
                    <PauseIcon/>
                  </IconButton>
                </AspectRatio>
              </Tooltip>
              }
              {currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) && masterPaused && 
                <Tooltip title="Play All Streams">
                  <AspectRatio ratio="1/1">
                    <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={togglePlayPauseStreams}>
                      <PlayArrowIcon/>
                    </IconButton>
                  </AspectRatio>
                </Tooltip>
                }
              {currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) &&
              <Tooltip title="Stop All Streams">
                <AspectRatio ratio="1/1">
                  <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={stopAllStreams}>
                    <StopIcon/>
                  </IconButton>
                </AspectRatio>
              </Tooltip>
              }
              {soundOutput === "local" && 
                <Tooltip title="Playing Locally">
                  <AspectRatio ratio="1/1">
                    <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={toggleSoundOutput}>
                        <PersonIcon/>
                    </IconButton>
                  </AspectRatio>
                </Tooltip>
              }
              {soundOutput !== "local" &&
                <Tooltip title="Playing for Everyone">
                  <AspectRatio ratio="1/1">
                    <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={toggleSoundOutput}>
                        <GroupsIcon/>
                    </IconButton>
                  </AspectRatio>
                </Tooltip>
              }
              <Tooltip title="Toggle Local Volume Mute">
                <AspectRatio ratio="1/1">
                  <IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
                    {!masterVolume.mute && <VolumeUpIcon/>}
                    {masterVolume.mute && <VolumeOffIcon/>}
                  </IconButton>
                </AspectRatio>
              </Tooltip>
            </div>
            <div className="slider-container">
              <ThemeProvider theme={muiTheme}>
                <Slider min={0} max={100} defaultValue={50} disabled={masterVolume.mute} onChange={volumeSliderChanged}/>
              </ThemeProvider>
            </div>
          </div>
        </div>
    );
}