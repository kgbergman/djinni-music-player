import React from "react";
import { IconButton } from "@mui/material";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Tooltip from "@mui/material/Tooltip";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import "./playerview.css";

const muiTheme = createTheme({
	palette: {
		primary: {
			main: "rgb(187, 153, 255)",
		},
	},
});

export function PlayerView({ soundOutput, currentlyStreaming, masterVolume, playerVolumeToggleClicked, playerVolumeSliderChanged, masterPaused }) {
    
	const buttonStyle = { 
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgb(62, 64, 80)",
		},
		"&.Mui-disabled": {
			color: "rgb(189, 189, 189)"
		}
	};

	function volumeToggleClicked() {
		playerVolumeToggleClicked();
	}

	function convertVolume(value) {
		if (value < 25) {
			return 1;
		}
		else if (value < 50) {
			return 2;
		}
		else if (value < 75) {
			return 3;
		}
		else if (value < 100) {
			return 4;
		}
		else if (value < 125) {
			return 5;
		}
		else if (value < 150) {
			return 6;
		}
		else if (value < 175) {
			return 7;
		}
		else if (value < 200) {
			return 8;
		}
		else if (value < 225) {
			return 9;
		}
		else if (value < 250) {
			return 10;
		}
		else if (value < 275) {
			return 11;
		}
		else if (value < 300) {
			return 12;
		}
		else if (value < 325) {
			return 13;
		}
		else if (value < 350) {
			return 14;
		}
		else if (value < 375) {
			return 15;
		}
		else if (value < 400) {
			return 20;
		}
		else if (value < 425) {
			return 25;
		}
		else if (value < 450) {
			return 30;
		}
		else if (value < 475) {
			return 35;
		}
		else if (value < 500) {
			return 40;
		}
		else if (value < 525) {
			return 45;
		}
		else if (value < 550) {
			return 50;
		}
		else if (value < 575) {
			return 55;
		}
		else {
			return value / 10;
		}
	}

	function volumeSliderChanged(event) {
		//We are using a made up scale to be more granular at the smaller values.
		//This is because players are much more likely to be using those values, 
		//as this is intended to be background music.
		console.log(convertVolume(event.target.value));
		playerVolumeSliderChanged(convertVolume(event.target.value));
	}

	function countCurrentlyStreaming() {
		let count = 0;
		currentlyStreaming.forEach(stream => {
			if (stream.playing) {
				count += 1;
			}
		});

		if (count === 1) {
			return "1 stream";
		}
		else if (count === 0) {
			return "no streams";
		}
		else {
			return `${count} streams`;
		}
	}

	return (
		<div className="player-view-container">
			{soundOutput === "global" && !masterPaused && <div className="playing-text">GM playing {countCurrentlyStreaming()}</div>}
			{soundOutput === "global" && masterPaused && <div className="playing-text">GM paused streams</div>}
			{soundOutput !== "global" && <div className="playing-text">GM playing locally</div>}
			<div className="player-slider">
				<div className="buttons-container">
					<div className="buttons">
						<Tooltip title="Toggle Mute">
							<IconButton sx={buttonStyle} aria-label="volume toggle mute" disabled={soundOutput !== "global"} onClick={volumeToggleClicked}>
								{!masterVolume.mute && <VolumeUpIcon/>}
								{masterVolume.mute && <VolumeOffIcon/>}
							</IconButton>
						</Tooltip>
					</div>
					<div className="player-slider-container">
						<ThemeProvider theme={muiTheme}>
							<Slider min={1} max={1000} defaultValue={500} disabled={masterVolume.mute || soundOutput !== "global"} onChange={volumeSliderChanged}/>
						</ThemeProvider>
					</div>
				</div>
			</div>
		</div>
	);
}
