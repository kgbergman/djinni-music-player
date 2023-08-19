import "./App.css";
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import { SavePopup } from "./savepopup/SavePopup";
import React, { useState, useEffect } from "react";
import { exampleFile } from "./example/example";
import { MemoizedPlayer } from "./player/Player";
import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "./getPluginId";
import { PlayerView } from "./playerview/PlayerView";
import { AutoplayOverlay } from "./autoplayoverlay/AutoplayOverlay";
import fileDownload from "js-file-download";
import { MetadataSync } from "./MetadataSync";
import { useMetadataStore } from "./metadataStore";

function App () {
	const [folders, setFolders] = useState(exampleFile);
	const [openedPage, setOpenedPage] = useState("folders");
	const [currentlyStreaming, setCurrentlyStreaming] = useState([]);
	const [showSavePopup, setShowSavePopup] = useState(false);
	const [masterVolume, setMasterVolume] = useState({ volume: 50, mute: false });
	const [playerRole, setPlayerRole] = useState("");
	const [masterPaused, setMasterPaused] = useState("playing");
	const [soundOutput, setSoundOutput] = useState("global");
	const togglePaused = useMetadataStore((state) => state.togglePaused);
	const toggleSoundOutput = useMetadataStore((state) => state.toggleSoundOutput);
	const setNewCurrentlyStreaming = useMetadataStore((state) => state.setCurrentlyStreaming);
	const setFirstState = useMetadataStore((state) => state.setFirstState);

	useEffect(() => {
		OBR.onReady(async () => {
			if (playerRole === "") {
				const newPlayerRole = await OBR.player.getRole();
				setPlayerRole(newPlayerRole);
				if (newPlayerRole === "PLAYER") {
					OBR.action.setWidth(205);
					OBR.action.setHeight(106);
				}
			}
			const metadataArray = OBR.room.getMetadata();
			metadataArray.then(values => {
				let currently = [];
				let newPaused = "playing";
				let newSoundOutput = "global";
				if (values[getPluginId("currently")]) {
					currently = values[getPluginId("currently")];
					setCurrentlyStreaming(currently);
				}
				if (values[getPluginId("paused")]) {
					newPaused = (values[getPluginId("paused")]);
					setMasterPaused(newPaused);
				}
				if (values[getPluginId("soundOutput")]) {
					newSoundOutput = values[getPluginId("soundOutput")];
					setSoundOutput(newSoundOutput);
				}
				setFirstState(currently, newPaused, newSoundOutput);
			});
			OBR.room.onMetadataChange((metadata) => {
				if (metadata[getPluginId("paused")]) {
					const newPaused = metadata[getPluginId("paused")];
					setMasterPaused(newPaused);
				}

				if (metadata[getPluginId("soundOutput")]) {
					const newSoundOutput = metadata[getPluginId("soundOutput")];
					setSoundOutput(newSoundOutput);
				}

				if (metadata[getPluginId("currently")]) {
					const currentlyArray = metadata[getPluginId("currently")];
					setCurrentlyStreaming(currentlyArray);
				}
			});
		});
	}, []);

	function setCurrentlyStreamingMetadata(newCurrentlyStreaming) {
		setNewCurrentlyStreaming(newCurrentlyStreaming);
	}

	function saveButtonClicked() {
		setShowSavePopup(true);
	}

	function savePopupClose() {
		setShowSavePopup(false);
	}

	function streamClickedStart(streamToStart){ 
		startStream(streamToStart);
	}

	function streamClickedEnd(streamToEnd) {
		endStream(streamToEnd);
	}

	function startStream(streamToStart) {
		let newCurrentlyStreaming = [...currentlyStreaming];
		if (newCurrentlyStreaming.some(stream => stream.id === streamToStart.id)) {
			for(let i = 0; i < newCurrentlyStreaming.length; i++) {
				const stream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
				if (stream.id === streamToStart.id) {
					stream.fading = false;
					stream.playing = true;
					stream.paused = masterPaused;
					stream.streamData.forEach(streamLink => {
						streamLink.playing = true;
					});
					newCurrentlyStreaming[i] = stream;
					setStreamFadeVolumes({
						...streamFadeVolumes,
						[stream.id]: 100
					});
				}
			}
		}
		else {
			newCurrentlyStreaming.push(streamToStart);
			for(let i = 0; i < newCurrentlyStreaming.length; i++) {
				let changed = false;
				const stream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
				if (stream.id === streamToStart.id) {
					stream.playing = true;
					stream.streamData.forEach(streamLink => {
						streamLink.playing = true;
						changed = true;
					});
				}
				if (changed) {
					newCurrentlyStreaming[i] = stream;
					setStreamFadeVolumes({
						...streamFadeVolumes,
						[stream.id]: 100
					});
				}
			}
		}
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	function stopStream(streamToStop) {
		let newCurrentlyStreaming = [...currentlyStreaming];
		for (let i = 0; i < newCurrentlyStreaming.length; i++) {
			let thisStream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
			if (streamToStop.id === thisStream.id) {
				thisStream.playing = false;
				thisStream.fading = false;
				newCurrentlyStreaming[i] = thisStream;
			}
		}
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	function endStream(stream) {
		if (stream.streamFade && stream.streamFadeTime > 0) {
			//Send command to fade out this stream
			setFading(stream);
		}
		else {
			stopStream(stream);
		}
	}

	function saveFolders(filename) {
		const saveFolders = {...folders};
		const keys = Object.keys(saveFolders);
		keys.forEach(key => {
			const thisFolder = saveFolders[key];
			thisFolder.streams.forEach(stream => {
				stream.playing = false;
				stream.streamData.forEach(streamLink => {
					streamLink.playing = false;
				});
			});
			saveFolders[key] = thisFolder;
		});
		const data = JSON.stringify(saveFolders, null, "\t");
		const fileName = `${filename}.djinni`;
		fileDownload(data, fileName);
		setTimeout(function() {
			setShowSavePopup(false);
		}, 10);     
	}

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function setFading(stream) {
		let newCurrentlyStreaming = [...currentlyStreaming];
		for(let i = 0; i < newCurrentlyStreaming.length; i++) {
			const thisStream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
			if (parseInt(stream.id) === parseInt(thisStream.id)) {
				thisStream.fading = true;
				newCurrentlyStreaming[i] = thisStream;
			}
		}
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	const [streamFadeVolumes, setStreamFadeVolumes] = useState({});
	useEffect(() => {
		const stepTime = 200;
		const interval = setInterval(() => {
			const newStreamFadeVolumes = {...streamFadeVolumes};
			currentlyStreaming.forEach(stream => {
				if (stream.fading) {
					const midVal = stream.streamFadeTime * 1000 / stepTime;
					const minusVal = 100 / midVal * 1.5; //This 1.5x makes it a little more accurate... for some reason :)
					const setVal = streamFadeVolumes[stream.id] - minusVal;
					newStreamFadeVolumes[stream.id] = setVal;
					if (setVal <= 0) {
						stopStream(stream);
					}
				}
			});
			setStreamFadeVolumes(newStreamFadeVolumes);
		}, stepTime);
		return () => clearInterval(interval);
	}, [currentlyStreaming, streamFadeVolumes]);

	function endStreamLink(endedStreamLink) {
		let newCurrentlyStreaming = [...currentlyStreaming];
		for(let i = 0; i < newCurrentlyStreaming.length; i++) {
			let changed = false;
			const stream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
			if (!isEmpty(stream)) {
				for(let j = 0; j < stream.streamData.length; j++) {
					const streamLink = JSON.parse(JSON.stringify(stream.streamData[j]));
					if (streamLink.id === endedStreamLink.id) {
						streamLink.playing = false;
						stream.streamData[j] = streamLink;
						changed = true;
					}
				}
			}
			if (changed) {
				newCurrentlyStreaming[i] = stream;
			}
		}
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	function addStreamLink(addedStreamLink) {
		let newCurrentlyStreaming = [...currentlyStreaming];
		for(let i = 0; i < newCurrentlyStreaming.length; i++) {
			let changed = false;
			const stream = JSON.parse(JSON.stringify(newCurrentlyStreaming[i]));
			if (!isEmpty(stream)) {
				stream.streamData.forEach(streamLink => {
					if (streamLink.id === addedStreamLink.id) {
						streamLink.playing = true;
						changed = true;
					}
				});
				if (changed) {
					newCurrentlyStreaming[i] = stream;
				}
			}
		}
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	function removeFromCurrentlyStreaming(streamToRemove) {
		endStream(streamToRemove);
	}

	function checkIfRemoveFromCurrentlyStreaming(endedStreamLink) {
		//Find the stream that holds this streamlink
		currentlyStreaming.forEach(stream => {
			if (stream.streamData.some(streamLink => streamLink.id === endedStreamLink.id)) {
				//Check if all of the streams are not playing and don't loop
				let remove = true;
				stream.streamData.forEach(streamLink => {
					if (streamLink.loop || (streamLink.id !== endedStreamLink.id && streamLink.playing)) {
						remove = false;
					}
				});
				if (remove) {
					removeFromCurrentlyStreaming(stream);
				}
			}
		});
	}

	async function repeat(endedStreamLink) {
		let streaming = OBR.room.getMetadata();
		streaming.then(values => {
			if (values[getPluginId("currently")]) {
				let stillPlaying = false;
				values[getPluginId("currently")].forEach(stream => {
					if (stream.streamData.some(streamLink => streamLink.id === endedStreamLink.id)) {
						if (stream.playing) {
							stillPlaying = true;
						}
					}
				});
				if (stillPlaying) {
					addStreamLink(endedStreamLink);
				}
			}
		});
	}

	function endFunction(event, endedStreamLink) {
		endStreamLink(endedStreamLink);

		//This function should only call if the stream doesn't already loop, but to be safe
		if (!endedStreamLink.loop) {
			checkIfRemoveFromCurrentlyStreaming(endedStreamLink);
		} 
		else {
			const repeatIn = randomNumber(endedStreamLink.loop1, endedStreamLink.loop2);
			setTimeout(repeat, repeatIn * 1000, endedStreamLink);  
		}
	}

	function stopAllStreams() {
		let newCurrentlyStreaming = [];
		setCurrentlyStreamingMetadata(newCurrentlyStreaming);
	}

	function togglePlayPauseStreams() {
		togglePaused();
	}

	function toggleOutput() {
		toggleSoundOutput();
	}

	function playerVolumeSliderChanged(volume) {
		const newMasterVolume = {...masterVolume};
		newMasterVolume.volume = volume;
		setMasterVolume(newMasterVolume);
	}

	function playerVolumeToggleClicked() {
		const newMasterVolume = {...masterVolume};
		newMasterVolume.mute = !newMasterVolume.mute;
		setMasterVolume(newMasterVolume);
	}

	const [folderKeys, setFolderKeys] = useState(Object.keys(folders));
  
	function isEmpty(obj) {
		for (const prop in obj) {
			if (Object.hasOwn(obj, prop)) {
				return false;
			}
		}
  
		return true;
	}
	function renderVideos() {
		return currentlyStreaming.map(stream => {
			if (!isEmpty(stream)) {
				return stream.streamData.map(streamLink => {
					if (stream.playing && streamLink.playing) {
						let streamFadeVol = 100; 
						if (streamFadeVolumes[stream.id]) {
							streamFadeVol = streamFadeVolumes[stream.id];
						}
						const volume = masterVolume.volume / 100 * stream.streamVolume / 100 * streamLink.volume / 100 * streamFadeVol / 100;
						return <MemoizedPlayer
							key={streamLink.id}
							streamLinkId={streamLink.id}
							url={streamLink.link}
							playing={masterPaused === "playing" && !(playerRole !== "GM" && soundOutput === "local")}
							loop={streamLink.loop && streamLink.loop1 === 0 && streamLink.loop2 === 0}
							volume={volume}
							muted={stream.streamMute || streamLink.mute || masterVolume.mute}
							onEnded={(event) => endFunction(event, streamLink)}
						/>;
					}
					return "";
				});
			}
			return "";
		});
	}

	const addFolderKey = React.useCallback((folderKeyToAdd) => {
		setFolderKeys((folderKeys) => [...folderKeys, folderKeyToAdd]);
	}, []);

	if (playerRole === "GM") {
		return (
			<div className="App">
				<div className="audio-streams" id="audio-streams">
					{renderVideos()}
				</div>
				<MetadataSync/>
				{showSavePopup && 
				<SavePopup 
					savePopupClose={savePopupClose} 
					savePopupClicked={saveFolders} 
					folders={folders}
				/>
				}
				<Header 
					folderKeys={folderKeys} 
					setOpenedPage={setOpenedPage}
					addFolderKey={addFolderKey} 
					masterVolume={masterVolume} 
					setMasterVolume={setMasterVolume} 
					setFolders={setFolders} 
					saveButtonClicked={saveButtonClicked} 
					currentlyStreaming={currentlyStreaming}
					togglePlayPauseStreams={togglePlayPauseStreams}
					stopAllStreams={stopAllStreams}
					masterPaused={masterPaused}
					soundOutput={soundOutput}
					toggleOutput={toggleOutput}
				/>
				<Content 
					folders={folders} 
					setOpenedPage={setOpenedPage}
					openedPage={openedPage}
					addFolderKey={addFolderKey} 
					setFolderKeys={setFolderKeys} 
					folderKeys={folderKeys} 
					setFolders={setFolders} 
					currentlyStreaming={currentlyStreaming} 
					setCurrentlyStreamingMetadata={setCurrentlyStreamingMetadata} 
					setCurrentlyStreaming={setCurrentlyStreaming} 
					streamClickedStart={streamClickedStart}
					streamClickedEnd={streamClickedEnd}
					paused={masterPaused}
				/>
				<AutoplayOverlay isGM={playerRole === "GM"}/>
			</div>
		);
	}
	else if (playerRole === "PLAYER") {
		return (
			<div className="App">
				<div className="audio-streams" id="audio-streams">
					{renderVideos()}
				</div>
				<PlayerView masterPaused={masterPaused} soundOutput={soundOutput} currentlyStreaming={currentlyStreaming} masterVolume={masterVolume} playerVolumeSliderChanged={playerVolumeSliderChanged} playerVolumeToggleClicked={playerVolumeToggleClicked}/>
				<AutoplayOverlay isGM={playerRole === "GM"}/>
			</div>
		);
	}
}

export default App;
