import React from "react";
import { MiniButton } from "../../button/MiniButton";
import { getImage } from "../../images";
import './folder.css'

export function Folder() {
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
                <MiniButton image="edit"/>
            </div>
        </div>
    </div>
    );
}