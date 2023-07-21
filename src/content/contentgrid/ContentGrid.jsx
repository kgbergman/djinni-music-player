import React, { useState } from "react";
import './contentgrid.css'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Folders } from "../folder/Folders";
import { Streams } from "../stream/Streams";
import { EditStreams } from "../editstream/EditStreams";
import { EmojiPopup } from "../editstream/EmojiPopup";
import { DeletePopup } from "../folder/DeletePopup";

export function ContentGrid({ 
    folders, 
    sortByAlpha, 
    editFolderClicked, 
    folderOpened, 
    openedPage, 
    openedFolder, 
    streamOpened, 
    openedStream, 
    closeEmojiPopup, 
    showEmojiPopup, 
    showDeletePopup, 
    openDeletePopup,
    closeDeletePopup,
    deleteClicked,
    selectedFolder,
    setSelectedFolder,
    setCurrentStreamObject,
    updateEmoji
}) {
    if (openedPage === "folder") {
        return (
            <div className="contentgrid">
                {showDeletePopup && <DeletePopup closeDeletePopup={closeDeletePopup} deleteClicked={deleteClicked} type={"folder"}/>}
                <SimpleBar style={{ height: '300px' }}>
                    <Streams sortByAlpha={sortByAlpha} folders={folders} openedFolder={openedFolder} streamOpened={streamOpened}/>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
    else if (openedPage === "folders") {
        return (
            <div className="contentgrid">
                {showDeletePopup && <DeletePopup closeDeletePopup={closeDeletePopup} deleteClicked={deleteClicked} type={"folder"}/>}
                <SimpleBar style={{ height: '300px' }}>
                    <Folders sortByAlpha={sortByAlpha} openedPage={openedPage} folders={folders} openDeletePopup={openDeletePopup} editFolderClicked={editFolderClicked} folderOpened={folderOpened} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}/>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
    else if (openedPage === "stream") {
        return (
            <div className="contentgrid">
                {showDeletePopup && <DeletePopup closeDeletePopup={closeDeletePopup} deleteClicked={deleteClicked} type={"stream"}/>}
                {showEmojiPopup && <EmojiPopup closeEmojiPopup={closeEmojiPopup} updateEmoji={updateEmoji}/>}
                <SimpleBar style={{ height: '300px' }}>
                    <EditStreams openedFolder={openedFolder} openedStream={openedStream} folders={folders} setCurrentStreamObject={setCurrentStreamObject}/>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
}