import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import './folder.css'

export function Folder({ folderName, folderColor, folderId, folderClicked, folderDoubleClicked, editFolderClicked, selected }) {
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };

    const folderAbbreviation = folderName.substring(0, 2);
    let selectedStyle = {
        outlineWidth: '0px'
    };
    selectedStyle = selected ? { outlineWidth:'2px' } : selectedStyle;

    return (
    <div className="folder" id={folderId} onClick={folderClicked} onDoubleClick={folderDoubleClicked} style={selectedStyle}>
        <div className="folder-fade"></div>
        <div className="folder-icon-container">
            <FolderIcon sx={{ fontSize: "80px", color: folderColor, position: "absolute", pointerEvents: "none" }} />
            <span className="folder-overlay">{folderAbbreviation}</span>
        </div>
        <div className="folder-low-row">
            <div className="folder-name-container">
                <span className="folder-name">{folderName}</span>
            </div>
            <div className="folder-edit-button-container">
                <IconButton size="small" sx={buttonStyle} aria-label="edit"  onClick={(e) => editFolderClicked(e)}>
                    <EditIcon fontSize="small" sx={{ fontSize: "15px" }}/>
                </IconButton>
            </div>
        </div>
    </div>
    );
}