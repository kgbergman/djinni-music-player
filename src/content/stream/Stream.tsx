import React from "react";
import { MiniButton } from "../../button/MiniButton";
import './stream.css'
import { Slider } from "../../slider/Slider";

export function Stream() {
    return (
    <div className="stream">
        <div className="stream-fade"></div>
        <div className="stream-high-row hidden">
            <div className="stream-volume-button-container">
                <MiniButton image="volume_full"/>
            </div>
            <Slider min={ 0 } max={ 100 } value={ 0 }/>
        </div>
        <p className="stream-icon">&#127754;</p>
        <div className="stream-low-row">
            <div className="stream-name-container">
                <span className="stream-name">Ocean</span>
            </div>
            <div className="stream-edit-button-container">
                <MiniButton image="edit"/>
            </div>
        </div>
    </div>
    );
}