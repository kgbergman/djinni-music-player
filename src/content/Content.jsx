import React, { useState } from "react";
import { ContentHeader } from "./contentheader/ContentHeader";
import { ContentGrid } from "./contentgrid/ContentGrid";
import { NewEditFolderPopup } from "./folder/NewEditFolderPopup";
import './content.css'

export function Content({ folders }) {

    function toggleSort() {
        console.log("sort button clicked");
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

    function streamOpened(streamId) {
        setOpenedStream(streamId);
        console.log("set stream to", streamId);
        setOpenedPage("stream");
    }

    function backButtonClicked() {
        if (openedPage === "folder") {
            setOpenedPage("folders");
        }
        else {
            setOpenedPage("folder");
        }
    }

    function openEmojiPopup() {
        setShowEmojiPopup(true);
    }

    function closeEmojiPopup() {
        setShowEmojiPopup(false);
    }

    function openDeletePopup() {
        console.log("open delete folder popup");
        setShowDeletePopup(true);
    }

    function closeDeletePopup() {
        console.log("close delete folder popup");
        setShowDeletePopup(false);
    }

    const [showAddFolder, setShowAddFolder] = useState(false);
    const [showEditFolder, setShowEditFolder] = useState(false);
    const [folderToEdit, setFolderToEdit] = useState(0);
    const [sortByAlpha, setSortByAlpha] = useState(true);
    const [openedFolder, setOpenedFolder] = useState(0);
    const [openedPage, setOpenedPage] = useState("folders");
    const [openedStream, setOpenedStream] = useState(0);
    const [showEmojiPopup, setShowEmojiPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    return (
        <div className="content">
            {showAddFolder && <NewEditFolderPopup popupClose={popupClose} popupType={"new"}/>}
            {showEditFolder && <NewEditFolderPopup popupClose={popupClose} popupType={"edit"} folderToEdit={folderToEdit} folders={folders}/>}
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
                closeEmojiPopup={closeEmojiPopup} 
                showDeletePopup={showDeletePopup} 
                closeDeletePopup={closeDeletePopup}
            />
        </div>
    );
}