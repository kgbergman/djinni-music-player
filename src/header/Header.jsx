import React from "react";
import { IconButton } from "@mui/material";
import { Slider } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SaveIcon from "@mui/icons-material/Save";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import Tooltip from "@mui/material/Tooltip";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import "./header.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({
	palette: {
		primary: {
			main: "rgb(187, 153, 255)",
		},
	},
});


export function Header({
	setFolders, 
	setOpenedPage,
	saveButtonClicked,
	masterVolume, 
	setMasterVolume, 
	soundOutput, 
	toggleOutput, 
	masterPaused, 
	folderKeys, 
	addFolderKey, 
	currentlyStreaming, 
	togglePlayPauseStreams, 
	stopAllStreams,
}) {

	const buttonStyle = { 
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgb(62, 64, 80)",
		},
	};
  
	function openButtonClicked() {
		let input = document.createElement("input");
		input.type = "file";
		input.onchange = function(){
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
							setOpenedPage("folders");
							Object.keys(objects).forEach(key => {
								if (!folderKeys.includes(key)) {
									addFolderKey(key);
								}
							});
						}
					};
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
					<div className="button">
						<Tooltip title="Open File">
							<IconButton sx={buttonStyle} aria-label="open" onClick={openButtonClicked}>
								<FolderIcon/>
							</IconButton>
						</Tooltip>
					</div>
					<div className="button">
						<Tooltip title="Save File">
							<IconButton sx={buttonStyle} aria-label="save" onClick={saveButtonClicked}>
								<SaveIcon/>
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className="buttons-and-slider-container">
				<div className="buttons">
					{currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) && masterPaused === "playing" && 
					<div className="button">
						<Tooltip title="Pause All Streams">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={togglePlayPauseStreams}>
								<PauseIcon/>
							</IconButton>
						</Tooltip>
					</div>
					}
					{currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) && masterPaused === "paused" && 
					<div className="button">
						<Tooltip title="Play All Streams">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={togglePlayPauseStreams}>
								<PlayArrowIcon/>
							</IconButton>
						</Tooltip>
					</div>
					}
					{currentlyStreaming.length > 0 && currentlyStreaming.some(stream => stream.playing) &&
					<div className="button">
						<Tooltip title="Stop All Streams">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={stopAllStreams}>
								<StopIcon/>
							</IconButton>
						</Tooltip>
					</div>
					}
					{soundOutput === "local" && 
					<div className="button">
						<Tooltip title="Playing Locally">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={toggleOutput}>
								<PersonIcon/>
							</IconButton>
						</Tooltip>
					</div>
					}
					{soundOutput !== "local" &&
					<div className="button">
						<Tooltip title="Playing for Everyone">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={toggleOutput}>
								<GroupsIcon/>
							</IconButton>
						</Tooltip>
					</div>
					}
					<div className="button">
						<Tooltip title="Toggle Local Volume Mute">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
								{!masterVolume.mute && <VolumeUpIcon/>}
								{masterVolume.mute && <VolumeOffIcon/>}
							</IconButton>
						</Tooltip>
					</div>
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