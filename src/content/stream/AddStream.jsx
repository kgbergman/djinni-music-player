import React, { useState, useEffect }  from "react";
import { getImage } from "../../images";
import './stream.css'

export function AddStream({ addStreamClicked }) {
    return (
        <div className="add-stream" onClick={addStreamClicked}>
            <div className="add-stream-icon">
                <img src={getImage("add_no_circle")}/>
            </div>
        </div>
    );
}