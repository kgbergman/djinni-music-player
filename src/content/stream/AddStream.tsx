import React from "react";
import { getImage } from "../../images";
import './stream.css'

export function AddStream() {
    return (
    <div className="add-stream">
        <div className="add-stream-icon">
            <img src={getImage("add_no_circle")}/>
        </div>
    </div>
    );
}