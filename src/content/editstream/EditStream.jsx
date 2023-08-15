import React, { useState, useEffect }  from "react";
import "./editstream.css";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditStreamSliders } from "./EditStreamSliders";
import Tooltip from "@mui/material/Tooltip";

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

export function EditStream({ 
	editStreamData, 
	editStreamDeleteClicked, 
	editStreamNameChanged, 
	editStreamLinkChanged, 
	editStreamVolumeChanged, 
	editStreamLoopChanged, 
	editStreamMuteClicked, 
	editStreamLoopClicked 
}) {

	const [width, setWidth] = useState(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const isMobile = width < 580;

	let [thisStreamMute, setThisStreamMute] = useState(editStreamData.mute);
	let [thisStreamLoop, setThisStreamLoop] = useState(editStreamData.loop);

	function deleteEditStream() {
		editStreamDeleteClicked(editStreamData.id);
	}
    
	const buttonStyle = { 
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "rgb(62, 64, 80)",
		},
	};

	let thisClass = "edit-stream";
	if (isMobile) {
		thisClass = "edit-stream-mobile";
	}
    
	return (
		<div className={thisClass}>
			<div className="edit-stream-top-row">
				<div className="name-container">
					<ThemeProvider theme={muiTheme}>
						<TextField 
							sx={{ 
								input: { color: "white" }, 
								"& .MuiInput-underline:after": {
									borderBottomColor: "rgb(187, 153, 255)",
								},
								"& .MuiInput-underline:hover": {
									borderBottomColor: "white",
								},
								"& .MuiInput-underline:before": {
									borderBottomColor: "rgb(190, 190, 190)",
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
							value={editStreamData.name}
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
							onChange={(e) => editStreamNameChanged(e, editStreamData.id)}
						/>
					</ThemeProvider>
				</div>
				<div className="link-container">
					<ThemeProvider theme={muiTheme}>
						<TextField 
							sx={{ 
								input: { color: "white" }, 
								"& .MuiInput-underline:after": {
									borderBottomColor: "rgb(187, 153, 255)",
								},
								"& .MuiInput-underline:hover": {
									borderBottomColor: "white",
								},
								"& .MuiInput-underline:before": {
									borderBottomColor: "rgb(190, 190, 190)",
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
							value={editStreamData.link}
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
							onChange={(e) => editStreamLinkChanged(e, editStreamData.id)}
						/>
					</ThemeProvider>
				</div>
				{!isMobile && <EditStreamSliders 
					editStreamData={editStreamData}
					thisStreamMute={thisStreamMute}
					thisStreamLoop={thisStreamLoop}
					setThisStreamMute={setThisStreamMute}
					setThisStreamLoop={setThisStreamLoop}
					editStreamLoopChanged={editStreamLoopChanged}
					editStreamLoopClicked={editStreamLoopClicked}
					editStreamMuteClicked={editStreamMuteClicked}
					editStreamVolumeChanged={editStreamVolumeChanged}
				/>
				}
				<div className="remove-container">
					<div className="buttons">
						<Tooltip title="Delete Link">
							<IconButton sx={buttonStyle} aria-label="delete" onClick={deleteEditStream}>
								<DeleteIcon/>
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className="edit-stream-bottom-row">
				{isMobile && <EditStreamSliders 
					editStreamData={editStreamData}
					thisStreamMute={thisStreamMute}
					thisStreamLoop={thisStreamLoop}
					setThisStreamMute={setThisStreamMute}
					setThisStreamLoop={setThisStreamLoop}
					editStreamLoopChanged={editStreamLoopChanged}
					editStreamLoopClicked={editStreamLoopClicked}
					editStreamMuteClicked={editStreamMuteClicked}
					editStreamVolumeChanged={editStreamVolumeChanged}
				/>
				}
			</div>
		</div>
	);
}