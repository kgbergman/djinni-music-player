import React from "react";
import { Button } from "../../button/Button"
import './contentheader.css'

export function ContentHeader() {
    const page = "Folders";

    if (page === "Folder") {
        return (
            <div className="contentheader">
            <div className="buttons-container">
                <div className="buttons">
                    <Button image="left"/>
                </div>
            </div>
                <span className="title">Scene Name</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <Button image="sort_name"/>
                        <Button image="edit"/>
                        <Button image="remove"/>
                    </div>
                </div>
            </div>
        );
    }
    else if (page === "Folders") {
        return (
            <div className="contentheader">
                <span className="title">All Folders</span>
                <div className="buttons-container">
                    <div className="buttons">
                        <Button image="sort_recent"/>
                        <Button image="add"/>
                    </div>
                </div>
            </div>
        );
    }
    else if (page === "Stream") {

    }
}