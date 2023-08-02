import React, { useState, useEffect, createRef }   from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import './folder.css'
import Lottie from "lottie-web";
import animation from "../../animations/sound.json"
import Tooltip from '@mui/material/Tooltip';

export function Folder({ sortByAlpha, folders, currentlyStreaming, folderName, folderColor, folderId, folderClicked, folderDoubleClicked, editFolderClicked, selected }) {
    
    let animationContainer = createRef();
    
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animation
        });
        return () => anim.destroy(); // optional clean up for unmounting
    }, [sortByAlpha, folders, selected])

    const folderAbbreviation = folderName.substring(0, 2);
    let selectedStyle = {
        outlineWidth: '0px'
    };
    selectedStyle = selected ? { outlineWidth:'2px' } : selectedStyle;

    Lottie.loadAnimation({
        container: animationContainer.current, // current instance of our container!
        animationData: animation, // animation file!
        renderer: "svg",
        loop: true,
        autoplay: true
      });

    return (
    <div className="folder" id={folderId} onClick={folderClicked} onDoubleClick={folderDoubleClicked} style={selectedStyle}>
        <div className="folder-fade"></div>
        <div className="folder-icon-container">
            <FolderIcon sx={{ fontSize: "80px", color: folderColor, position: "absolute", pointerEvents: "none" }} />
            {!currentlyStreaming.some(stream => stream.folderId === folderId && stream.playing) && <span className="folder-overlay">{folderAbbreviation}</span>}
            {currentlyStreaming.some(stream => stream.folderId === folderId && stream.playing) && <div className="folder-playing-container" ref={animationContainer}></div>}
        </div>
        <div className="folder-low-row">
            <div className="folder-name-container">
                <span className="folder-name">{folderName}</span>
            </div>
            <div className="folder-edit-button-container">
                <Tooltip title="Edit Folder">
                    <IconButton size="small" sx={buttonStyle} aria-label="edit"  onClick={(e) => editFolderClicked(e)}>
                        <EditIcon fontSize="small" sx={{ fontSize: "15px" }}/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    </div>
    );
}