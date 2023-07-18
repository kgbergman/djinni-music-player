import React from "react";
import { getImage } from "../../images";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import './folder.css'

export function Folder() {
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };
    return (
    <div className="folder">
        <div className="folder-fade"></div>
        <div className="folder-icon-container">
            <img className="folder-icon" src={getImage("open")}/>
            <span className="folder-overlay">Fo</span>
        </div>
        <div className="folder-low-row">
            <div className="folder-name-container">
                <span className="folder-name">Folder 1</span>
            </div>
            <div className="folder-edit-button-container">
                <IconButton size="small" sx={buttonStyle} aria-label="edit">
                    <EditIcon fontSize="small" sx={{ fontSize: "15px" }} />
                </IconButton>
            </div>
        </div>
    </div>
    );
}