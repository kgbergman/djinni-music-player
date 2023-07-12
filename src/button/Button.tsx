import React from "react";
import { getImage } from "../images";
import './button.css'

export function Button(props: { image: string; }) {
    let extraPadding = 0;
    if (props.image === "left") {
        extraPadding = 2;
    }
    return (
        <div className="top-button">
            <img className="button-icon" style={{ padding: extraPadding }}alt={props.image} src={getImage(props.image)}/>
        </div>
    );
}