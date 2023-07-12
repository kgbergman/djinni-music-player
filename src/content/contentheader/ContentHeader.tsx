import React from "react";
import { Button } from "../../button/Button"
import { Slider } from "../../slider/Slider"
import './contentheader.css'

export function ContentHeader() {
    let page = "Stream";

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
        return (
            <div className="contentheader">
            <div className="buttons-container">
                <div className="buttons">
                    <Button image="left"/>
                </div>
            </div>
                <span className="title">Stream Name</span>
                <div className="volume-container">
                    <div className="buttons">
                        <Button image="volume_full"/>
                    </div>
                    <Slider min={ 0 } max={ 100 } value={ 0 }/>
                </div>
                <div className="fade-container">
                    <div className="buttons">
                        <Button image="fade"/>
                    </div>
                    <div>
                        <span className="caption">No Fade</span>
                        <Slider min={ 0 } max={ 10 } value={ 0 }/>
                    </div>
                </div>
            </div>
        );
    }
}