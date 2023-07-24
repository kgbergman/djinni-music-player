import React, { useState } from "react";
import { ContentHeader } from "./contentheader/ContentHeader";
import { ContentGrid } from "./contentgrid/ContentGrid";
import { NewEditFolderPopup } from "./folder/NewEditFolderPopup";
import './content.css'

export function Content({ folders, setFolders, streamables, setStreamables, currentlyStreaming, setCurrentlyStreaming }) {

    const [showAddFolder, setShowAddFolder] = useState(false);
    const [showEditFolder, setShowEditFolder] = useState(false);
    const [folderToEdit, setFolderToEdit] = useState(0);
    const [sortByAlpha, setSortByAlpha] = useState(true);
    const [openedFolder, setOpenedFolder] = useState(0);
    const [openedPage, setOpenedPage] = useState("folders");
    const [showEmojiPopup, setShowEmojiPopup] = useState(false);
    const [openedStream, setOpenedStream] = useState(0);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(0);
    const [currentStreamObject, setCurrentStreamObject] = useState({});
    const [currentStreamMute, setCurrentStreamMute] = useState(false);
    const [currentStreamFade, setCurrentStreamFade] = useState(false);
    const [currentStreamIcon, setCurrentStreamIcon] = useState("😀");
    const [currentStreamFadeTime, setCurrentStreamFadeTime] = useState(0);

    function keyPressed(event) {
        if (event.repeat) return;
        if (openedPage !== "folder" && openedPage !== "stream") {
            if (event.key === "Delete") {
                if (selectedFolder !== 0) {
                    //Open delete dialog
                    openDeletePopup();
                }
            }
        }
    }

    function toggleSort() {
        setSortByAlpha(!sortByAlpha);
    }
    
    function addFolderClicked() {
        setShowAddFolder(true);
    }

    function popupClose() {
        setShowAddFolder(false);
        setShowEditFolder(false);
    }

    function editFolderClicked(event) {
        event.stopPropagation();
        setFolderToEdit(event.currentTarget.parentElement.parentElement.parentElement.id);
        setShowEditFolder(true);
    }

    function folderOpened(folderId) {
        setOpenedFolder(folderId);
        setOpenedPage("folder");
    }

    function streamNameEdited(event) {
        const newStream = currentStreamObject;
        newStream.streamName = event.target.value;
        setCurrentStreamObject(newStream);
    }

    function streamMuteChanged(event) {
        const newStream = currentStreamObject;
        newStream.streamMute = !newStream.streamMute;
        console.log(newStream.streamMute);
        setCurrentStreamMute(newStream.streamMute);
        setCurrentStreamObject(newStream);
    }

    function streamVolumeChanged(event) {
        const newStream = currentStreamObject;
        newStream.streamVolume = event.target.value;
        setCurrentStreamObject(newStream);
    }

    function streamFadeChanged(event) {
        const newStream = currentStreamObject;
        newStream.streamFade = !newStream.streamFade;
        setCurrentStreamFade(newStream.streamFade);
        setCurrentStreamObject(newStream);
    }

    function streamFadeTimeChanged(event) {
        const newStream = currentStreamObject;
        newStream.streamFadeTime = event.target.value;
        setCurrentStreamFadeTime(newStream.streamFadeTime);
        setCurrentStreamObject(newStream);
    }

    function streamVolumeChangedFromFolder(event, streamId) {
        //Update the folder
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisStream = thisFolder.streams.filter(stream => parseInt(stream.id) === parseInt(streamId))[0];
        thisStream.streamVolume = event.target.value;
        //Replace folder with new folder that contains the edited stream list
        const newStreams = thisFolder.streams.map(stream => {
            if (stream.id === thisStream.id) {
                return thisStream;
            }
            else {
                return stream;
            }
        });
        thisFolder.streams = newStreams;
        const newFolders = folders.map(folder => {
            if (folder.id === thisFolder.id) {
                return thisFolder;
            }
            else {
                return folder;
            }
        });
        setFolders(newFolders);
        //Update currently streaming
        setCurrentlyStreaming((currentlyStreaming) =>
            currentlyStreaming.map((stream) => {
                if (stream.id === thisStream.id) {
                    return thisStream;
                }
                else {
                    return stream;
                }
            })
        );
    }

    function volumeStreamClicked(event, streamId) {
        //Update the folder
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisStream = thisFolder.streams.filter(stream => parseInt(stream.id) === parseInt(streamId))[0];
        thisStream.streamMute = !thisStream.streamMute;
        //Replace folder with new folder that contains the edited stream list
        const newStreams = thisFolder.streams.map(stream => {
            if (stream.id === thisStream.id) {
                return thisStream;
            }
            else {
                return stream;
            }
        });
        thisFolder.streams = newStreams;
        const newFolders = folders.map(folder => {
            if (folder.id === thisFolder.id) {
                return thisFolder;
            }
            else {
                return folder;
            }
        });
        setFolders(newFolders);
        //Update currently streaming
        setCurrentlyStreaming((currentlyStreaming) =>
            currentlyStreaming.map((stream) => {
                if (stream.id === thisStream.id) {
                    return thisStream;
                }
                else {
                    return stream;
                }
            })
        );
    }

    function getRandomValue(array) {
        let e;
        do {
            e = Math.trunc(Math.random() * 10000);
        } while (array.includes(e) && e !== 0)
        return e;
    }

    function getUniqueStreamId() {
        const streamIds = [];
        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].streams.length; j++) {
                streamIds.push(folders[i].streams[j].id);
            }
        }

        return getRandomValue(streamIds);
    }

    function getUniqueEditStreamId() {
        const editStreamIds = [];
        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].streams.length; j++) {
                for (let k = 0; k < folders[i].streams[j].length; k++){
                    editStreamIds.push(folders[i].streams[j].id);
                }
            }
        }

        return getRandomValue(editStreamIds);
    }

    function streamOpened(streamId) {
        if (streamId === "new") {
            //Create a new stream with a new unique id and add to folders
            const newStream = {
                "streamName": "New Stream",
                "streamIcon": "😀",
                "streamVolume": 100,
                "streamFade": false,
                "streamFadeTime": 0,
                "id": getUniqueStreamId(),
                "playing": false,
                "streamData": [
                    {
                        "name": "",
                        "link": "",
                        "volume": 100,
                        "id": getUniqueEditStreamId(),
                        "mute": false,
                        "loop": false,
                        "loop1": 20,
                        "loop2": 40
                    }
                ]
            }
            const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
            thisFolder.streams = [...thisFolder.streams, newStream]
            streamId = newStream.id;
        }
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisStream = thisFolder.streams.filter(stream => parseInt(stream.id) === parseInt(streamId))[0];
        setCurrentStreamObject(thisStream);
        setCurrentStreamMute(thisStream.streamMute);
        setCurrentStreamFade(thisStream.streamFade);
        setCurrentStreamFadeTime(thisStream.streamFadeTime);
        setCurrentStreamIcon(thisStream.streamIcon);
        setOpenedStream(streamId);
        setOpenedPage("stream");
    }

    function backButtonClicked() {
        if (openedPage === "folder") {
            setOpenedPage("folders");
        }
        else {
            //Save the edited stream
            const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(selectedFolder))[0];
            const thisStream = thisFolder.streams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
            thisStream.streamName = currentStreamObject.streamName;
            thisStream.streamVolume = currentStreamObject.streamVolume;
            thisStream.streamFade = currentStreamObject.streamFade;
            thisStream.streamData = currentStreamObject.streamData;
            //Replace folder with new folder that contains the edited stream list
            const newStreams = thisFolder.streams.map(stream => {
                if (stream.id === thisStream.id) {
                    return thisStream;
                }
                else {
                    return stream;
                }
            });
            thisFolder.streams = newStreams;
            const newFolders = folders.map(folder => {
                if (folder.id === thisFolder.id) {
                    return thisFolder;
                }
                else {
                    return folder;
                }
            });
            setFolders(newFolders);
            setOpenedPage("folder");
            //Update this stream in streamables
            //Find in streamables
            const newStreamables = [...streamables];
            //Create array of streamable links
            let indexes = [];
            for (let i = 0; i < newStreamables.length; i++) {
                if (newStreamables[i].streamId === thisStream.id) {
                    indexes.push(i);
                }
            }

            for (let i = 0; i < indexes.length; i++) {
                //Get this streamLink
                let streamLink = {};
                for (let j = 0; j < thisStream.streamData.length; j++) {
                    if (thisStream.streamData[j].id === newStreamables[indexes[i]].linkId) {
                        streamLink = thisStream.streamData[j];
                    }
                }
                newStreamables[indexes[i]].playing = false;
                newStreamables[indexes[i]].streamId = thisStream.id;
                newStreamables[indexes[i]].linkId = streamLink.id;
                newStreamables[indexes[i]].streamVolume = thisStream.streamVolume / 100;
                newStreamables[indexes[i]].linkVolume = streamLink.volume / 100;
                newStreamables[indexes[i]].mute = thisStream.mute || streamLink.mute;
                newStreamables[indexes[i]].loop = streamLink.mute;
                newStreamables[indexes[i]].fade = thisStream.streamFade;
                newStreamables[indexes[i]].fadeTime = thisStream.streamFadeTime;
                newStreamables[indexes[i]].playing = false;
            }

            setStreamables(newStreamables);
        }
    }

    function openEmojiPopup() {
        setShowEmojiPopup(true);
    }

    function updateEmoji(emoji) {
        const newStream = currentStreamObject;
        newStream.streamIcon = emoji.native;
        setCurrentStreamIcon(newStream.streamIcon);
        setCurrentStreamObject(newStream);
    }

    function closeEmojiPopup() {
        setShowEmojiPopup(false);
    }

    function openDeletePopup() {
        setShowDeletePopup(true);
    }

    function closeDeletePopup() {
        setShowDeletePopup(false);
    }

    function updateFolders(folders) {
        setFolders(folders);
        setShowAddFolder(false);
        setShowEditFolder(false);
    }

    function deleteClicked() {
        if (openedPage === "folder") {
            //Delete folder
            const newFolders = folders.filter(folder => parseInt(folder.id) !== parseInt(openedFolder));
            setShowDeletePopup(false);
            setOpenedPage("folders");
            setFolders(newFolders);
        }
        else if (openedPage === "folders") {
            //Delete folder
            console.log(selectedFolder);
            const newFolders = folders.filter(folder => parseInt(folder.id) !== parseInt(selectedFolder));
            setShowDeletePopup(false);
            setOpenedPage("folders");
            setFolders(newFolders);
        }
        else {
            //Delete stream
            const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(selectedFolder))[0];
            const thisFolderStreams = thisFolder.streams.filter(stream => parseInt(stream.id) !== parseInt(openedStream));
            thisFolder.streams = thisFolderStreams;
            //Replace folder with new folder that contains the edited stream list
            const newFolders = folders.map(folder => {
                if (folder.id === thisFolder.id) {
                    return thisFolder;
                }
                else {
                    return folder;
                }
            });
            setShowDeletePopup(false);
            setOpenedPage("folder");
            setFolders(newFolders);
        }
    }

    return (
        <div className="content" onKeyDown={keyPressed} tabIndex="0">
            {showAddFolder && <NewEditFolderPopup popupClose={popupClose} popupType={"new"} folders={folders} updateFolders={updateFolders}/>}
            {showEditFolder && <NewEditFolderPopup popupClose={popupClose} popupType={"edit"} folderToEdit={folderToEdit} folders={folders} updateFolders={updateFolders}/>}
            <ContentHeader 
                toggleSort={toggleSort} 
                sortByAlpha={sortByAlpha} 
                folders={folders} 
                addFolderClicked={addFolderClicked} 
                openedFolder={openedFolder} 
                openedPage={openedPage} 
                backButtonClicked={backButtonClicked} 
                openedStream={openedStream} 
                openEmojiPopup={openEmojiPopup} 
                openDeletePopup={openDeletePopup}
                streamNameEdited={streamNameEdited}
                streamMuteChanged={streamMuteChanged}
                streamVolumeChanged={streamVolumeChanged}
                streamFadeTimeChanged={streamFadeTimeChanged}
                streamFadeChanged={streamFadeChanged}
                currentStreamMute={currentStreamMute}
                currentStreamFade={currentStreamFade}
                currentStreamFadeTime={currentStreamFadeTime}
                currentStreamIcon={currentStreamIcon}
            />
            <ContentGrid 
                sortByAlpha={sortByAlpha} 
                folders={folders} 
                editFolderClicked={editFolderClicked} 
                folderOpened={folderOpened} 
                streamOpened={streamOpened} 
                openedFolder={openedFolder} 
                openedPage={openedPage} 
                openedStream={openedStream} 
                showEmojiPopup={showEmojiPopup} 
                updateEmoji={updateEmoji}
                closeEmojiPopup={closeEmojiPopup} 
                showDeletePopup={showDeletePopup} 
                closeDeletePopup={closeDeletePopup}
                openDeletePopup={openDeletePopup}
                deleteClicked={deleteClicked}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                setCurrentStreamObject={setCurrentStreamObject}
                currentStreamObject={currentStreamObject}
                currentlyStreaming={currentlyStreaming}
                setCurrentlyStreaming={setCurrentlyStreaming}
                streamVolumeChangedFromFolder={streamVolumeChangedFromFolder}
                volumeStreamClicked={volumeStreamClicked}
            />
        </div>
    );
}