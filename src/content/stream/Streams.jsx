import React from "react";
import "./stream.css";
import Grid from "@mui/material/Grid";
import { Stream } from "./Stream";
import { AddStream } from "./AddStream";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

export function Streams({ sortByAlpha, folders, openedFolder, streamOpened, currentlyStreaming, streamClickedStart, streamClickedEnd, streamVolumeChangedFromFolder, volumeStreamClicked }) {

	function streamClicked(event) {
		const streamId = parseInt(event.currentTarget.id);
		const thisFolderStreams = thisFolder.streams;
		const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(streamId))[0];
		if (thisStream.interval && thisStream.interval !== 0) {
			return;
		}

		let foundStream = false;
		for (let i = 0; i < currentlyStreaming.length; i++) {
			const stream = currentlyStreaming[i];
			if (parseInt(stream.id) === streamId) {
				foundStream = true;
				if (stream.fading) {
					//Do nothing
				}
				else if (stream.playing) {
					streamClickedEnd(thisStream);
				}
				else {
					streamClickedStart(thisStream);
				}
			}
		}

		if (!foundStream) {
			streamClickedStart(thisStream);
		}
	}

	function editStreamClicked(event) {
		streamOpened(event.currentTarget.id);
		event.stopPropagation();
	}

	function addStreamClicked(event) {
		streamOpened("new");
		event.stopPropagation();
	}

	const thisFolder = folders[openedFolder]; //(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
	const thisFolderStreams = thisFolder.streams;

	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 500,
			},
		},
	});
    
	const renderStreams = () => {
		if (sortByAlpha) {
			const sorted = [...thisFolderStreams].sort(function(a, b) {
				var textA = a.streamName.toUpperCase();
				var textB = b.streamName.toUpperCase();
				return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
			return sorted.map(stream => {
				let streamSelected = false;
				let streamMuted = false;
				currentlyStreaming.forEach(targetStream => {
					if (stream.id === targetStream.id) {
						streamSelected = !targetStream.fading && targetStream.playing;
						streamMuted = targetStream.streamMute;
					}
				});
				return <Grid item xs={6} sm={3} key={stream.id}>
					<Stream 
						stream={stream} 
						id={stream.id} 
						streamClicked={streamClicked} 
						editStreamClicked={editStreamClicked} 
						sliderChanged={streamVolumeChangedFromFolder}
						volumeStreamClicked={volumeStreamClicked}
						selected={streamSelected}
						streamMuted={streamMuted}
					/>
				</Grid>;
			});
		}
		else {
			return thisFolderStreams.map(stream => {
				let streamSelected = false;
				let streamMuted = false;
				currentlyStreaming.forEach(targetStream => {
					if (stream.id === targetStream.id) {
						streamSelected = !targetStream.fading && targetStream.playing;
						streamMuted = targetStream.streamMute;
					}
				});
				return <Grid item xs={6} sm={3} key={stream.id}>
					<Stream 
						stream={stream} 
						streamClicked={streamClicked} 
						editStreamClicked={editStreamClicked} 
						sliderChanged={streamVolumeChangedFromFolder}
						volumeStreamClicked={volumeStreamClicked}
						selected={streamSelected}
						streamMuted={streamMuted}
					/>
				</Grid>;
			});
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container rowSpacing={1} columnSpacing={1}>
				{renderStreams()}
				<Grid item xs={6} sm={3}>
					<AddStream addStreamClicked={addStreamClicked}/>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}