import React from "react";
import { EditStream } from "./EditStream"
import { AddEditStream } from "./AddEditStream"

export function EditStreams({ folders, openedFolder, openedStream, setCurrentStreamObject }) {

    function editStreamNameChanged(event, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.name = event.target.value;
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }

    function editStreamLinkChanged(event, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.link = event.target.value;
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }

    function editStreamVolumeChanged(event, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.volume = event.target.value;
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }

    function editStreamLoopChanged(value, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.loop1 = value[0];
            thisEditStream.loop2 = value[1];
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }

    function editStreamMuteClicked(event, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.mute = !thisEditStream.mute;
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }
    function editStreamLoopClicked(event, editStreamId) {
        //Get this edit stream
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        if (thisStream) {
            const thisEditStream = thisStream.streamData.filter(editStream => parseInt(editStream.id) === parseInt(editStreamId))[0];
            thisEditStream.loop = !thisEditStream.loop;
            thisStream.streamData = thisStream.streamData.map(editStream => {
                if (parseInt(editStream.id) === parseInt(editStreamId)) {
                    return thisEditStream;
                }
                return editStream;
            });
            setCurrentStreamObject(thisStream);
        }
    }

    function editStreamDeleteClicked(streamId) {
        console.log(streamId);
    }

    function addEditStreamClicked() {
        console.log("add");
    }

    if (openedStream === "new") {
        const editStreamData = {
            "name": "",
            "link": "",
            "mute": false,
            "volume": 50,
            "loop": false,
            "loop1": 0,
            "loop2": 1
        };
        return (
            <div>
                <EditStream 
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
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        
        const renderEditStreams = () => {
            //Find the stream by this id
            return thisStream.streamData.map(editStreamData => {
                return <EditStream 
                    editStreamData={editStreamData} 
                    editStreamDeleteClicked={editStreamDeleteClicked} 
                    editStreamLinkChanged={editStreamLinkChanged} 
                    editStreamNameChanged={editStreamNameChanged}
                    editStreamVolumeChanged={editStreamVolumeChanged}
                    editStreamLoopChanged={editStreamLoopChanged}
                    editStreamMuteClicked={editStreamMuteClicked}
                    editStreamLoopClicked={editStreamLoopClicked}
                ></EditStream>
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