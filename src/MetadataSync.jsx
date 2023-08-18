import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useRef } from "react";
import { useMetadataStore } from "./metadataStore";
import { getPluginId } from "./getPluginId";

export function MetadataSync() {
	const prevPaused = useRef("playing");
	const prevSoundOutput = useRef("global");
	const prevCurrentlyStreaming = useRef([]);
	useEffect(
		() =>
			useMetadataStore.subscribe((state) => {
				let soundOutputChanged = false;
				if (prevSoundOutput.current !== state.soundOutput) {
					prevSoundOutput.current = state.soundOutput;
					soundOutputChanged = true;
				}

				let pausedChanged = false;
				if (prevPaused.current !== state.paused) {
					prevPaused.current = state.paused;
					pausedChanged = true;
				}

				let streamingChanged = false;
				//Check currentlyStreaming length
				if (prevCurrentlyStreaming.current.length !== state.currentlyStreaming.length) {
					streamingChanged = true;
				}
				//Check currentlyStreaming ids
				else if (!state.currentlyStreaming.every((stream, index) => stream.id === prevCurrentlyStreaming.current[index].id)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming playing
				else if (!state.currentlyStreaming.every((stream, index) => stream.playing === prevCurrentlyStreaming.current[index].playing)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming mute
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamMute === prevCurrentlyStreaming.current[index].streamMute)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming volume
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamVolume === prevCurrentlyStreaming.current[index].streamVolume)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming streamFade
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamFade === prevCurrentlyStreaming.current[index].streamFade)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming fading
				else if (!state.currentlyStreaming.every((stream, index) => stream.fading === prevCurrentlyStreaming.current[index].fading)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming fading time
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamFadeTime === prevCurrentlyStreaming.current[index].streamFadeTime)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming fading time
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamFadeVolume === prevCurrentlyStreaming.current[index].streamFadeVolume)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming name
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamName === prevCurrentlyStreaming.current[index].streamName)) {
					streamingChanged = true;
				}
				//Check currentlyStreaming icon
				else if (!state.currentlyStreaming.every((stream, index) => stream.streamIcon === prevCurrentlyStreaming.current[index].streamIcon)) {
					streamingChanged = true;
				}
				else {
					for (let i = 0; i < prevCurrentlyStreaming.current.length; i++) {
						let thisStream = prevCurrentlyStreaming.current[i];
						let thisNewStream = state.currentlyStreaming[i];
						if (thisStream.streamData.length !== thisNewStream.streamData.length) {
							streamingChanged = true;
						}
						else {
							for (let j = 0; j < thisStream.streamData.length; j++) {
								let thisStreamLink = thisStream.streamData[j];
								let thisNewStreamLink = thisNewStream.streamData[j];
								if (thisStreamLink.name !== thisNewStreamLink.name) {
									streamingChanged = true;
								}
								else if (thisStreamLink.playing !== thisNewStreamLink.playing) {
									streamingChanged = true;
								}
								else if (thisStreamLink.link !== thisNewStreamLink.link) {
									streamingChanged = true;
								}
								else if (thisStreamLink.mute !== thisNewStreamLink.mute) {
									streamingChanged = true;
								}
								else if (thisStreamLink.volume !== thisNewStreamLink.volume) {
									streamingChanged = true;
								}
								else if (thisStreamLink.loop !== thisNewStreamLink.loop) {
									streamingChanged = true;
								}
								else if (thisStreamLink.loop1 !== thisNewStreamLink.loop1) {
									streamingChanged = true;
								}
								else if (thisStreamLink.loop2 !== thisNewStreamLink.loop2) {
									streamingChanged = true;
								}
							}
						}
					}
				}

				if (streamingChanged) {
					prevCurrentlyStreaming.current = state.currentlyStreaming;
				}

				if(streamingChanged || pausedChanged || soundOutputChanged) {
					try {
						OBR.room.setMetadata({
							[getPluginId("paused")]: state.paused,
							[getPluginId("soundOutput")]: state.soundOutput,
							[getPluginId("currently")]: state.currentlyStreaming,
						});
					}
					catch(err) {
						console.log(err.message);
					}
				}
			}),
		[]
	);

	return null;
}