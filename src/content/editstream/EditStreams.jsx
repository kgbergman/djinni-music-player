import React from "react";
import { EditStream } from "./EditStream";
import { AddEditStream } from "./AddEditStream";

export function EditStreams({ folders, openedStream, setCurrentStreamObject, currentStreamObject }) {

	function editStreamNameChanged(event, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.name = event.target.value;
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamLinkChanged(event, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.link = event.target.value;
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamVolumeChanged(newValue, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.volume = newValue;
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamLoopChanged(value, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.loop1 = value[0];
		thisEditStream.loop2 = value[1];
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamMuteClicked(event, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.mute = !thisEditStream.mute;
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamLoopClicked(event, editStreamId) {
		const newStream = {...currentStreamObject};
		const thisEditStream = newStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
		thisEditStream.loop = !thisEditStream.loop;
		newStream.streamData = newStream.streamData.map(editStream => {
			if (parseInt(editStream.id) === parseInt(editStreamId)) {
				return thisEditStream;
			}
			return editStream;
		});
		setCurrentStreamObject(newStream);
	}

	function editStreamDeleteClicked(editStreamId) {
		const newStreamData = currentStreamObject.streamData.map(l => Object.assign({}, l)).filter(editStream => parseInt(editStream.id) !== parseInt(editStreamId));
		const newStreamObject = {...currentStreamObject};
		newStreamObject.streamData = newStreamData;
		setCurrentStreamObject(newStreamObject);
	}

	function addEditStreamClicked() {
		const newStreamData = currentStreamObject.streamData.map(l => Object.assign({}, l));
		newStreamData.push({
			"name": "",
			"link": "",
			"mute": false,
			"volume": 100,
			"id": getUniqueEditStreamId(),
			"loop": false,
			"loop1": 20,
			"loop2": 40
		});
		const newStreamObject = {...currentStreamObject};
		newStreamObject.streamData = newStreamData;
		setCurrentStreamObject(newStreamObject);
	}

	function getRandomValue(array) {
		let e;
		do {
			e = Math.trunc(Math.random() * 10000);
		} while (array.includes(e) && e !== 0);
		return e;
	}

	function getUniqueEditStreamId() {
		const editStreamIds = [];
		const folderKeys = Object.keys(folders);
		for (let i = 0; i < folderKeys.length; i++) {
			for (let j = 0; j < folders[folderKeys[i]].streams.length; j++) {
				for (let k = 0; k < folders[folderKeys[i]].streams[j].length; k++){
					editStreamIds.push(folders[folderKeys[i]].streams[j].id);
				}
			}
		}

		return getRandomValue(editStreamIds);
	}

	if (openedStream === "new") {
		const editStreamData = {
			"name": "",
			"link": "",
			"mute": false,
			"volume": 100,
			"id": getUniqueEditStreamId(),
			"loop": false,
			"loop1": 20,
			"loop2": 40
		};
		return (
			<div>
				<EditStream 
					key={editStreamData.id}
					editStreamData={editStreamData} 
					editStreamDeleteClicked={editStreamDeleteClicked} 
					editStreamLinkChanged={editStreamLinkChanged} 
					editStreamNameChanged={editStreamNameChanged}
					editStreamVolumeChanged={editStreamVolumeChanged}
					editStreamLoopChanged={editStreamLoopChanged}
					editStreamMuteClicked={editStreamMuteClicked}
					editStreamLoopClicked={editStreamLoopClicked}
				></EditStream>
				<AddEditStream addEditStreamClicked={addEditStreamClicked}/>
			</div>
		);
	}
	else {
		const renderEditStreams = () => {
			//Find the stream by this id
			return currentStreamObject.streamData.map(editStreamData => {
				return <EditStream 
					key={editStreamData.id}
					editStreamData={editStreamData} 
					editStreamDeleteClicked={editStreamDeleteClicked} 
					editStreamLinkChanged={editStreamLinkChanged} 
					editStreamNameChanged={editStreamNameChanged}
					editStreamVolumeChanged={editStreamVolumeChanged}
					editStreamLoopChanged={editStreamLoopChanged}
					editStreamMuteClicked={editStreamMuteClicked}
					editStreamLoopClicked={editStreamLoopClicked}
				></EditStream>;
			});
		};

		return (
			<div>
				{renderEditStreams()}
				<AddEditStream addEditStreamClicked={addEditStreamClicked}/>
			</div>
		);
	}
}