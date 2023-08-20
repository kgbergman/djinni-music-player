import React from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export function ContentHeaderSliders({ folders, openedFolder, openedStream, volumeToggleClicked, fadeToggleClicked, streamVolumeChanged, currentStreamFade, currentStreamFadeTime, currentStreamMute, streamFadeTimeChanged }) {

	const thisFolder = folders[openedFolder]; //(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
	const thisFolderStreams = thisFolder.streams;
	let thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];

	const muiTheme = createTheme({
		palette: {
			primary: {
				main: "rgb(187, 153, 255)",
			},
			secondary: {
				main: "rgb(187, 153, 255)",
			},
		},
		components: {
			// Name of the component
			MuiInput: {
				styleOverrides: {
					// Name of the slot
					underline: {
						"&:hover:not(.Mui-disabled):before": {
							borderColor: "white"
						},
						"&:after": {
							borderColor: "white"
						}
					}
				},
			},
		},
	});

	const buttonStyle = { 
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgb(62, 64, 80)",
		},
	};

	const sliderStyle = { 
		"& .MuiSlider-thumb": {
			height: "15px",
			width: "15px",
		},
		"& .MuiSlider-track": {
			height: "3px",
		},
		"& .MuiSlider-rail": {
			height: "3px",
		},
	};
	const [defaultValue] = React.useState(thisStream.streamVolume);
	const [defaultFadeValue] = React.useState(thisStream.streamFadeTime);

	return (
		<div className="content-header-sliders">
			<div className="volume-container">
				<div className="buttons">
					<Tooltip title="Toggle Stream Mute">
						<IconButton sx={buttonStyle} aria-label="volume toggle mute" onClick={volumeToggleClicked}>
							{!currentStreamMute && <VolumeUpIcon/>}
							{currentStreamMute && <VolumeOffIcon/>}
						</IconButton>
					</Tooltip>
				</div>
				<div className="header-slider-container">
					<ThemeProvider theme={muiTheme}>
						<Slider sx={sliderStyle} size="small" min={0} max={100} disabled={currentStreamMute} defaultValue={defaultValue} onChange={streamVolumeChanged}/>
					</ThemeProvider>
				</div>
			</div>
			<div className="fade-container">
				<div className="buttons">
					<Tooltip title="Toggle Fade Out">
						<IconButton sx={buttonStyle} aria-label="fade toggle" onClick={fadeToggleClicked}>
							{!currentStreamFade && <SvgIcon>
								<svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px" y="0px" viewBox="0 0 24 24" fill="#FFFFFF" xmlSpace="preserve">
									<polygon points="8,5 5,5 8,7.5 "/>
									<polygon points="4,20 8,20 8,9.6 4,6.2 "/>
									<polygon points="13.5,9 9.5,9 9.5,9.2 13.5,12.6 "/>
									<polygon points="9.5,20 13.5,20 13.5,14.7 9.5,11.3 "/>
									<polygon points="15,20 19,20 19,19 15,15.5 "/>
									<polygon points="19,13 15,13 15,13.5 19,16.9 "/>
									<polygon points="20.9,20.6 1.9,4.3 0.8,5.6 19.9,21.8 20.9,20.6 "/>
								</svg>
							</SvgIcon>}
							{currentStreamFade && <SvgIcon>
								<svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px" y="0px" viewBox="0 0 24 24" fill="#FFFFFF" xmlSpace="preserve">                 
									<rect x="4" y="5" width="4" height="15"/>
									<rect x="9.5" y="9" width="4" height="11"/>
									<rect x="15" y="13" width="4" height="7"/>
								</svg>
							</SvgIcon>}
						</IconButton>
					</Tooltip>
				</div>
				<div className="fade-slider-container">
					{!currentStreamFade && <span className="caption">No Fade Out</span>}
					{currentStreamFade && <span className="caption">Fade out {currentStreamFadeTime}s</span>}
					<ThemeProvider theme={muiTheme}>
						<Slider sx={sliderStyle} size="small" min={1} max={10} disabled={!currentStreamFade} defaultValue={defaultFadeValue} onChange={streamFadeTimeChanged}/>
					</ThemeProvider>
				</div>
			</div>
		</div>
	);
}