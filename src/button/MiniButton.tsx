import React from "react";
import { getImage } from "../images";
import './button.css'

export function MiniButton(props: { image: string; }) {
    let extraPadding = 0;
    if (props.image === "left") {
        extraPadding = 2;
    }
    return (
        <div className="stream-button" id="">
            <img className="button-icon" id="" style={{ padding: extraPadding }}alt={props.image} src={getImage(props.image)}/>
        </div>
    );
}